import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { AuthLayout } from "@/layouts/AuthLayout"
import { api } from "@/services/api.service"
import { Label } from "@radix-ui/react-label"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

type RegisterData = {
    email: string,
    name: string,
    lastname: string,
    password: string
}

export const Register = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState(null)
    const { register, handleSubmit, reset } = useForm<RegisterData>()
    const [btnText, setBtnText] = useState('Registrarme')
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<RegisterData> = async (data) => {
        setLoading(true)
        try {
            setBtnText('Verificando Email')
            await api.post('/auth/verificate-email', { email: data.email })
            setBtnText('Cargando...')
            await api.put('/auth/register', data)
            toast('Registro exitoso!', {
                action: {
                    label: 'Deshacer',
                    onClick: () => { }
                },
                duration: 3000,
                position: "top-center"
            })
            navigate('/login')


        } catch (error: any) {

            setError(error.response.data.message)

        } finally {

            setLoading(false)
            setBtnText('Registrarme')
            reset()

        }

    }

    return (
        <AuthLayout>
            <Card className="w-full sm:w-2/5 shadow-md">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl font-semibold">
                        Registro de usuario
                    </CardTitle>
                    <CardDescription>
                        Completa los campos para crear tu cuenta
                    </CardDescription>
                </CardHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                    noValidate
                >
                    <CardContent className="flex flex-col gap-4 px-6">
                        {/* Email */}
                        <fieldset className="flex flex-col gap-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                autoComplete="email"
                                required
                                aria-invalid={!!error}
                                {...register('email')}
                            />
                        </fieldset>

                        {/* Nombre */}
                        <fieldset className="flex flex-col gap-1">
                            <Label htmlFor="name">Nombre</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Juan"
                                autoComplete="given-name"
                                required
                                aria-invalid={!!error}
                                {...register('name')}
                            />
                        </fieldset>

                        {/* Apellido */}
                        <fieldset className="flex flex-col gap-1">
                            <Label htmlFor="lastname">Apellido</Label>
                            <Input
                                id="lastname"
                                type="text"
                                placeholder="Pérez"
                                autoComplete="family-name"
                                required
                                aria-invalid={!!error}
                                {...register('lastname')}
                            />
                        </fieldset>

                        {/* Contraseña */}
                        <fieldset className="flex flex-col gap-1">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                required
                                aria-invalid={!!error}
                                {...register('password')}
                            />
                        </fieldset>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3 px-6 pb-6">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                            aria-busy={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Spinner aria-hidden="true" />
                                    <span aria-live="polite">{btnText}</span>
                                </span>
                            ) : (
                                btnText
                            )}
                        </Button>

                        <Link to="/login" className="text-center">
                            <Button variant="link" className="px-0" disabled={loading}>
                                ¿Ya tienes cuenta? Inicia sesión
                            </Button>
                        </Link>
                    </CardFooter>

                    {error && (
                        <p
                            className="text-red-600 text-sm text-center px-6 pb-4"
                            role="alert"
                        >
                            {error}
                        </p>
                    )}
                </form>
            </Card>

        </AuthLayout>
    )
}
