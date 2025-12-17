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
                duration:3000,
                position:"top-center"
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
            <Card className="w-full sm:w-2/5">
                <CardHeader className="text-center">
                    <CardTitle> Registro de usuario </CardTitle>
                    <CardDescription> Completa los campos para registrarte</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="flex flex-col gap-2">
                        <fieldset className="flex flex-col gap-2">
                            <Label> Email: </Label>
                            <Input type="email" required {...register('email')} />
                        </fieldset>
                        <fieldset className="flex flex-col gap-2">
                            <Label> Nombre </Label>
                            <Input type="text" required {...register('name')} />
                        </fieldset>
                        <fieldset className="flex flex-col gap-2">
                            <Label> Apellido </Label>
                            <Input type="text" required  {...register('lastname')} />
                        </fieldset>
                        <fieldset className="flex flex-col gap-2">
                            <Label> Contraseña: </Label>
                            <Input type="password" required  {...register('password')} />
                        </fieldset>

                    </CardContent>

                    <CardFooter className="mt-4 flex flex-col gap-2">
                        <Button className="w-full" disabled={loading} >
                            {
                                loading ? (<> <Spinner /> {btnText} </>) : (btnText)
                            }
                        </Button>
                        <Link to="/login" > <Button variant="link" disabled={loading} > Iniciar Sesion</Button> </Link>
                    </CardFooter>

                    {error && (<p className="text-red-600 text-center">{error}</p>)}

                </form>
            </Card>
        </AuthLayout>
    )
}
