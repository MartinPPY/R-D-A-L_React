import { Separator } from "@/components/ui/separator"
import { AlumnoLayout } from "@/layouts/AlumnoLayout"
import { AlumnoTabs } from "./components/AlumnoTabs"

export const Alumno = () => {
  return (
    <AlumnoLayout>
      <header>
        <div className="p-10">
          <h1 className="text-2xl lg:text-4xl leading-relaxed font-bold"> Panel de horas trabajadas </h1>
          <p className="text-sm lg:text-xl"> Gestiona tu tiempo y visualiza tus ganancias </p>
        </div>
        <Separator orientation="horizontal" />
      </header>

      {/* resumen */}
      <AlumnoTabs />



      {/* horas registradas - registrar horas - ver pagos */}

    </AlumnoLayout>
  )
}
