import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/context/AuthContext"
import { AuthLayout } from "@/layouts/AuthLayout"
import { api } from "@/services/api.service"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

type LoginData = {
  email: string,
  password: string
}

interface LoginRespose {
  roleId: number,
  token: string
}

export const Login = () => {

  const { register, handleSubmit, formState: { }, reset } = useForm<LoginData>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState(null)
  const {setAuthenticated} = useAuth()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<LoginData> = async (data) => {

    event?.preventDefault()
    setLoading(true)

    try {
      const response = await api.post('/auth/login', data, {
        headers: {
          "Content-Type": 'application/json'
        }
      })

      const responseData: LoginRespose = response.data

      sessionStorage.setItem('token', responseData.token)
      setAuthenticated(true)

      switch (responseData.roleId) {
        case 5:
          navigate('/alumno')
          break
        default:
          alert('Aun no tienes una pagina para tu perfil!')
          break

      }


    } catch (error: any) {

      setError(error.response.data.message)

    } finally {
      setLoading(false)
      reset()
    }

  }

  return (
    <>
      <AuthLayout>
        <Card className="w-full sm:w-2/5">
          <CardHeader className="text-center">
            <CardTitle> Inicio de sesion</CardTitle>
            <CardDescription> Ingresa tus credenciales para acceder </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <CardContent className="flex flex-col gap-2 p-4">
              <div className="flex flex-col gap-2">
                <Label> Email: </Label>
                <Input type="email" required {...register('email')} />
              </div>
              <div className="flex flex-col gap-2">
                <Label> Contraseña: </Label>
                <Input type="password" required {...register('password')} />
              </div>
            </CardContent>

            <CardFooter className="p-4 flex flex-col gap-2">

              <Button type="submit" className="w-full" disabled={loading ? true : false} >
                {loading ? (<> <Spinner /> cargando...  </>) : 'Iniciar Sesion'}
              </Button>
              <Link to="/register" > <Button variant="link" > Registrarme </Button> </Link>

            </CardFooter>
          </form>

          {error && (<p className="text-red-600 text-center"> {error} </p>)}

        </Card>
      </AuthLayout>
    </>
  )
}
