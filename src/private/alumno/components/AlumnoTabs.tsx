import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HourForm } from "./HourForm"
import { AlumnoHours } from "./AlumnoHours"
import type { Props } from "../Alumno"


export const AlumnoTabs = ({ setSummary, loading, summary }: Props) => {
  return (
    <div className="p-10">
      <Tabs defaultValue="hours">
        <TabsList className="w-full">
          <TabsTrigger value="hours" > Mis horas </TabsTrigger>
          <TabsTrigger value="form" > Registrar horas </TabsTrigger>
        </TabsList>
        <TabsContent value="hours">
          <AlumnoHours />
        </TabsContent>
        <TabsContent value="form">
          <HourForm setSummary={setSummary} loading={loading} summary={summary} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
