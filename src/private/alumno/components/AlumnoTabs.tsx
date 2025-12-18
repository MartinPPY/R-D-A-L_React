import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HourForm } from "./HourForm"


export const AlumnoTabs = () => {
  return (
    <div className="p-10">
      <Tabs>
        <TabsList>
          <TabsTrigger value="form" > Registrar horas </TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <HourForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
