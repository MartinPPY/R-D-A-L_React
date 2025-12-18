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

interface Activity {
    date: string,
    hourInic: string,
    hourEnd: string,
    areaId: number
}


export const HourForm = () => {


    const [roles, setRoles] = useState<Role[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Activity>()


    useEffect(() => {

        const getRoles = async () => {
            const response = await api.get('/roles', {
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            setRoles(response.data)
        }

        getRoles()

    }, [roles])

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
        <div className="mt-10">
            <Card className="p-6">
                <CardHeader>
                    <CardTitle> Registrar hora nueva </CardTitle>
                    <CardDescription> Añade un nuevo registro de horas trabajadas </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <CardContent className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                        <fieldset className="flex flex-col gap-2">
                            <Label htmlFor="date"> Fecha </Label>
                            <Input type="date" required id="date" {...register('date')} disabled={loading} />
                        </fieldset>
                        <fieldset className="flex flex-col gap-2">
                            <Label htmlFor="date-init"> Hora de inicio </Label>
                            <Input type="time" required id="date-init" {...register('hourInic')} disabled={loading} />
                        </fieldset>
                        <fieldset className="flex flex-col gap-2">
                            <Label htmlFor="date-end"> Hora de termino </Label>
                            <Input type="time" required id="date-end" {...register('hourEnd')} disabled={loading} />
                        </fieldset>

                        <fieldset className="flex flex-col gap-2">
                            <Label> Area de trabajo </Label>
                            <NativeSelect {...register('areaId')} disabled={loading}>
                                <NativeSelectOption> Selecciona un area de trabajo </NativeSelectOption>
                                {
                                    roles!.map((role) => (
                                        <NativeSelectOption value={parseInt(role.id.toString())} key={role.id} > {role.name} </NativeSelectOption>
                                    ))
                                }

                            </NativeSelect>
                            {errors.areaId && (<p className="text-red-600"> Verifica tu area de trabajo! </p>)}
                        </fieldset>

                    </CardContent>

                    <CardFooter className="mt-4">
                        <Button className="w-full"> {loading ? (<><Spinner /> Cargando...</>) : 'Registrar hora'} </Button>
                    </CardFooter>
                </form>
            </Card>

        </div>
    )
}
