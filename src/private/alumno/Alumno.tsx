import { Separator } from "@/components/ui/separator"
import { AlumnoLayout } from "@/layouts/AlumnoLayout"
import { AlumnoTabs } from "./components/AlumnoTabs"
import { Summary } from "./components/Summary"
import { Button } from "@/components/ui/button"

export const Alumno = () => {
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

            <Button>
              Agregar horas
            </Button>
          </div>
        </div>

        <Separator aria-hidden="true" />
      </header>


      {/* resumen */}
      <Summary />
      {/* horas registradas - registrar horas - ver pagos */}
      <AlumnoTabs />

    </AlumnoLayout>
  )
}
