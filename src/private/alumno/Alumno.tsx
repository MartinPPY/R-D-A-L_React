import { Separator } from "@/components/ui/separator"
import { AlumnoLayout } from "@/layouts/AlumnoLayout"
import { AlumnoTabs } from "./components/AlumnoTabs"
import { Summary } from "./components/Summary"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { api } from "@/services/api.service"
import { toast } from "sonner"
import supabase from "@/lib/supabase"

interface Summary {
  quantity: number,
  payment: number
}

export interface Props {
  summary: Summary | null
  loading: boolean,
  setSummary: Dispatch<SetStateAction<Summary | null>>
}




export const Alumno = () => {

  const [loading, setLoading] = useState<boolean>(false)
  const [summary, setSummary] = useState<Summary | null>(null)
  const navigate = useNavigate()

  const logOut = async () => {

    await supabase.auth.signOut()
    navigate('/login')

  }

  useEffect(() => {
    const getSummary = async () => {
      setLoading(true)
      try {

        const summaryResponse = await supabase.rpc('get_activity_summary')
        setSummary(summaryResponse.data[0])

      } catch (error) {
        toast('Error al cargar el resumen', {
          duration: 3000,
          position: 'top-center'
        })
        console.error(error)

      } finally {
        setLoading(false)
      }
    }

    getSummary()

  }, [])


  return (
    <AlumnoLayout>
      <header
        className="w-full"
        role="banner"
      >
        <div
          className="
      flex flex-col gap-4
      px-6 py-6
      sm:py-8
      lg:flex-row lg:items-center lg:justify-between
      lg:px-10 lg:py-12
    "
        >
          {/* Título y descripción */}
          <div className="space-y-1 max-w-3xl">
            <h1
              id="page-title"
              className="
          text-2xl font-bold tracking-tight
          sm:text-3xl
          lg:text-4xl
        "
            >
              Panel de horas trabajadas
            </h1>

            <p
              id="page-description"
              className="
          text-sm text-muted-foreground
          sm:text-base
          lg:text-lg
        "
            >
              Gestiona tu tiempo registrado y consulta el resumen de tus ingresos
            </p>
          </div>

          {/* Acciones contextuales (escalable) */}
          <div
            className="
        flex flex-col gap-2
        sm:flex-row sm:items-center
        sm:gap-3
      "
            aria-label="Acciones del panel"
          >

            <Button onClick={logOut}>
              Cerrar Sesión
            </Button>
          </div>
        </div>

        <Separator aria-hidden="true" />
      </header>


      {/* resumen */}
      <Summary loading={loading} summary={summary} setSummary={setSummary} />
      {/* horas registradas - registrar horas - ver pagos */}
      <AlumnoTabs loading={loading} setSummary={setSummary} summary={summary} />

    </AlumnoLayout>
  )
}
