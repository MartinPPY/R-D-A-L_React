import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import supabase from "@/lib/supabase"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface Hours {
    date: string,
    end_date: string,
    id: number,
    init_date: string,
    name: string,
    payment: string,
    quantity: number
}

export const AlumnoHours = () => {

    const [hours, setHours] = useState<Hours[]>([])


    useEffect(() => {

        const getActivities = async () => {
            try {

                const response = await supabase.rpc('get_activities')

                setHours(response.data)

            } catch (error) {
                toast('Ha ocurrido un error al obtener tus horas del mes!', {
                    duration: 3000,
                    position: 'top-center'
                })
                console.error(error)

            } finally {
            }
        }

        getActivities()

    }, [])

    return (
        <section
            className="mt-10"
            aria-labelledby="hours-title"
        >
            <Card className="shadow-sm">
                <CardHeader className="space-y-1 px-6 pt-6">
                    <CardTitle
                        id="hours-title"
                        className="text-xl font-semibold tracking-tight"
                    >
                        Registro de horas
                    </CardTitle>

                    <CardDescription id="hours-description">
                        Visualiza el detalle de las horas registradas por área
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-6 pb-6">
                    <div
                        className="relative w-full overflow-x-auto rounded-md border"
                        role="region"
                        aria-labelledby="hours-title"
                        aria-describedby="hours-description"
                    >
                        <ScrollArea>
                            <Table>
                                <TableCaption className="text-sm">
                                    Horas registradas del mes{' '}
                                    <span className="text-muted-foreground">
                                        (Valor hora: 2.500 CLP)
                                    </span>
                                </TableCaption>

                                <TableHeader>
                                    <TableRow>
                                        <TableHead scope="col">ID</TableHead>
                                        <TableHead scope="col">Fecha</TableHead>
                                        <TableHead scope="col">Inicio</TableHead>
                                        <TableHead scope="col">Término</TableHead>
                                        <TableHead scope="col">Horas</TableHead>
                                        <TableHead scope="col">Monto</TableHead>
                                        <TableHead scope="col">Área</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {hours.length > 0 ? (
                                        hours.map((hour) => (
                                            <TableRow
                                                key={hour.id}
                                                className="hover:bg-muted/50 transition-colors"
                                            >
                                                <TableCell className="font-medium">
                                                    {hour.id}
                                                </TableCell>

                                                <TableCell>
                                                    <time dateTime={hour.date}>
                                                        {hour.date}
                                                    </time>
                                                </TableCell>

                                                <TableCell>{hour.init_date}</TableCell>
                                                <TableCell>{hour.end_date}</TableCell>

                                                <TableCell>
                                                    {hour.quantity} h
                                                </TableCell>

                                                <TableCell className="font-semibold text-green-700">
                                                    {hour.payment.toLocaleString()} CLP
                                                </TableCell>

                                                <TableCell>
                                                    {hour.name}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                className="text-center text-sm text-muted-foreground py-8"
                                                role="status"
                                            >
                                                No hay horas registradas para este período
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </div>
                </CardContent>
            </Card>
        </section>

    )
}
