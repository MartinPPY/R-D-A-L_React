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
  const { setAuthenticated } = useAuth()
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
        <Card
          className="w-full sm:w-4/5 md:w-2/5 shadow-lg border border-muted"
          role="region"
          aria-labelledby="login-title"
        >
          <CardHeader className="text-center space-y-2">
            <CardTitle
              id="login-title"
              className="text-2xl font-semibold tracking-tight"
            >
              Inicio de sesión
            </CardTitle>

            <CardDescription id="login-description">
              Accede a la plataforma académica con tus credenciales institucionales
            </CardDescription>
          </CardHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            noValidate
            aria-describedby={error ? 'login-error' : undefined}
          >
            <CardContent className="flex flex-col gap-5 px-6">
              {/* Email */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="email">
                  Correo electrónico
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="nombre.apellido@universidad.edu"
                  autoComplete="email"
                  required
                  aria-invalid={!!error}
                  aria-describedby="email-help"
                  {...register('email')}
                />

                <span
                  id="email-help"
                  className="text-xs text-muted-foreground"
                >
                  Usa tu correo institucional
                </span>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="password">
                  Contraseña
                </Label>

                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  aria-invalid={!!error}
                  aria-describedby="password-help"
                  {...register('password')}
                />

                <span
                  id="password-help"
                  className="text-xs text-muted-foreground"
                >
                  Mínimo 8 caracteres
                </span>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 px-6 pb-6">
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Spinner aria-hidden="true" />
                    <span aria-live="polite">Verificando credenciales…</span>
                  </span>
                ) : (
                  'Iniciar sesión'
                )}
              </Button>

              <div className="flex flex-col sm:flex-row justify-between text-sm text-center gap-2">
                <Link to="/forgot-password" className="underline-offset-4 hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>

                <Link to="/register" className="underline-offset-4 hover:underline">
                  Crear cuenta
                </Link>
              </div>
            </CardFooter>
          </form>

          {error && (
            <p
              id="login-error"
              className="text-red-600 text-sm text-center px-6 pb-4"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </p>
          )}
        </Card>

      </AuthLayout>
    </>
  )
}
