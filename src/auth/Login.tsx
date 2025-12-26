import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/context/AuthContext"
import { AuthLayout } from "@/layouts/AuthLayout"
import supabase from "@/lib/supabase"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

interface LoginData {
  email: string;
  password: string;
}


export const Login = () => {

  const { register, handleSubmit, formState: { }, reset } = useForm<LoginData>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { setAuthenticated } = useAuth()

  const onSubmit: SubmitHandler<LoginData> = async (data) => {

    event?.preventDefault()
    setLoading(true)

    try {

      const response = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      })

      if (response.error?.status == 400) {
        setError('Credenciales invalidas!')
        return
      }

      setAuthenticated(true)

      const profile = await supabase.from('profile').select('*').eq('user_id', response.data.user?.id)


      if (profile.data?.length == 0) {
        setError('No estas registrado!');
        await supabase.auth.signOut()
        return;
      }

      navigate('/alumno')

    } catch (error: any) {

      console.error(error)

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
            <div className="mb-4 rounded-md border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-900">
              <strong>Modo demostración</strong><br />
              Puedes iniciar sesión con los usuarios de prueba listados abajo.
            </div>
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

          <CardFooter>
            <div className="mt-4 rounded-md bg-muted p-3 text-xs w-full">
              <p className="font-medium mb-2">Usuarios de prueba:</p>

              <ul className="space-y-1">
                <li>
                  <strong>Alumno:</strong><br />
                  prueba@duocuc.cl<br />
                  <span className="font-mono">123</span>
                </li>

                <li>
                  <strong>Docente:</strong><br />
                  admin@duoc.cl<br />
                  <span className="font-mono">123</span>
                </li>
              </ul>
            </div>
          </CardFooter>

        </Card>

      </AuthLayout>
    </>
  )
}
