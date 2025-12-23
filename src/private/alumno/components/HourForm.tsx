import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Spinner } from "@/components/ui/spinner"
import type { Role } from "@/models/role.model"
import { api } from "@/services/api.service"
import { useEffect, useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { toast } from "sonner"
import type { Props } from "../Alumno"

interface Activity {
    date: string,
    hourInic: string,
    hourEnd: string,
    areaId: number
}


export const HourForm = ({ setSummary }: Props) => {


    const [roles, setRoles] = useState<Role[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Activity>()


    useEffect(() => {

        const getRoles = async () => {
            const response = await api.get('/role', {
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            setRoles(response.data)
        }

        getRoles()

        const getSummary = async () => {

        }

        getSummary()

    }, [])

    const onSubmit: SubmitHandler<Activity> = async (data) => {
        setLoading(true)
        try {

            await api.post('/activity', data, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })

            toast('Actividad creada!', {
                action: {
                    label: 'Deshacer',
                    onClick: () => { }
                },
                duration: 3000,
                position: 'top-center'
            })

            const response = await api.get('activity/summary', {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            setSummary(response.data)

        } catch (error) {

            toast('Ha ocurrido un error! verifica tus datos!', {
                action: {
                    label: 'Deshacer',
                    onClick: () => { }
                },
                duration: 3000,
                position: 'top-center'
            })

            console.error(error)

        } finally {

            reset()
            setLoading(false)

        }

    }


    return (
        <section
            className="mt-10"
            aria-labelledby="new-hour-title"
        >
            <Card className="shadow-sm">
                <CardHeader className="space-y-1 px-6 pt-6">
                    <CardTitle
                        id="new-hour-title"
                        className="text-xl font-semibold tracking-tight"
                    >
                        Registrar nueva hora
                    </CardTitle>

                    <CardDescription id="new-hour-description">
                        Añade un nuevo registro de horas trabajadas en el sistema
                    </CardDescription>
                </CardHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                    noValidate
                    aria-describedby="new-hour-description"
                >
                    <CardContent className="grid grid-cols-1 gap-4 px-6 lg:grid-cols-2">
                        {/* Fecha */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="date">
                                Fecha
                            </Label>

                            <Input
                                id="date"
                                type="date"
                                required
                                disabled={loading}
                                aria-invalid={!!errors.date}
                                aria-describedby={errors.date ? 'date-error' : undefined}
                                {...register('date')}
                            />

                            {errors.date && (
                                <p
                                    id="date-error"
                                    className="text-sm text-red-600"
                                    role="alert"
                                >
                                    Debes seleccionar una fecha válida
                                </p>
                            )}
                        </div>

                        {/* Hora inicio */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="hour-init">
                                Hora de inicio
                            </Label>

                            <Input
                                id="hour-init"
                                type="time"
                                required
                                disabled={loading}
                                aria-invalid={!!errors.hourInic}
                                aria-describedby={errors.hourInic ? 'hour-init-error' : undefined}
                                {...register('hourInic')}
                            />

                            {errors.hourInic && (
                                <p
                                    id="hour-init-error"
                                    className="text-sm text-red-600"
                                    role="alert"
                                >
                                    Indica una hora de inicio válida
                                </p>
                            )}
                        </div>

                        {/* Hora término */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="hour-end">
                                Hora de término
                            </Label>

                            <Input
                                id="hour-end"
                                type="time"
                                required
                                disabled={loading}
                                aria-invalid={!!errors.hourEnd}
                                aria-describedby={errors.hourEnd ? 'hour-end-error' : undefined}
                                {...register('hourEnd')}
                            />

                            {errors.hourEnd && (
                                <p
                                    id="hour-end-error"
                                    className="text-sm text-red-600"
                                    role="alert"
                                >
                                    La hora de término debe ser posterior a la hora de inicio
                                </p>
                            )}
                        </div>

                        {/* Área de trabajo */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="area">
                                Área de trabajo
                            </Label>

                            <NativeSelect
                                id="area"
                                disabled={loading}
                                aria-invalid={!!errors.areaId}
                                aria-describedby={errors.areaId ? 'area-error' : 'area-help'}
                                {...register('areaId', { required: true })}
                            >
                                <NativeSelectOption value="">
                                    Selecciona un área de trabajo
                                </NativeSelectOption>

                                {roles?.map((role) => (
                                    <NativeSelectOption
                                        key={role.id}
                                        value={Number(role.id)}
                                    >
                                        {role.name}
                                    </NativeSelectOption>
                                ))}
                            </NativeSelect>

                            {!errors.areaId && (
                                <span
                                    id="area-help"
                                    className="text-xs text-muted-foreground"
                                >
                                    Área asociada a la actividad realizada
                                </span>
                            )}

                            {errors.areaId && (
                                <p
                                    id="area-error"
                                    className="text-sm text-red-600"
                                    role="alert"
                                >
                                    Debes seleccionar un área de trabajo válida
                                </p>
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="px-6 pb-6 pt-2">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                            aria-busy={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Spinner aria-hidden="true" />
                                    <span aria-live="polite">
                                        Guardando registro…
                                    </span>
                                </span>
                            ) : (
                                'Registrar hora'
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </section>


    )
}
