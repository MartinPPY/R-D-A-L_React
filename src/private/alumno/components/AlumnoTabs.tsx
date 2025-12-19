import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HourForm } from "./HourForm"
import { AlumnoHours } from "./AlumnoHours"


export const AlumnoTabs = () => {
  return (
    <div className="p-10">
      <Tabs defaultValue="hours">
        <TabsList>
          <TabsTrigger value="hours" > Mis horas </TabsTrigger>
          <TabsTrigger value="form" > Registrar horas </TabsTrigger>
        </TabsList>
        <TabsContent value="hours">
          <AlumnoHours />
        </TabsContent>
        <TabsContent value="form">
          <HourForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
