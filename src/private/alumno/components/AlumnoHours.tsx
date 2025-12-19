import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { api } from "@/services/api.service"
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

                const response = await api.get('activity')
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
        <div className="mt-10">
            <Card className="p-6">
                <CardHeader>
                    <CardTitle> Registro de horas </CardTitle>
                    <CardDescription> Visualiza todas tus horas registradas por área </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>Tus horas del mes {' (Monto por hora : 2500 CLP) '}</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Hora de inicio</TableHead>
                                <TableHead>Hora de Termino</TableHead>
                                <TableHead>Horas trabajadas</TableHead>
                                <TableHead>Monto $</TableHead>
                                <TableHead>Area de trabajo</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                hours.map((hour) => (
                                    <TableRow key={hour.id}>
                                        <TableCell> {hour.id} </TableCell>
                                        <TableCell> {hour.date} </TableCell>
                                        <TableCell> {hour.init_date} </TableCell>
                                        <TableCell> {hour.end_date} </TableCell>
                                        <TableCell> {hour.quantity} </TableCell>
                                        <TableCell className="text-green-500" > {hour.payment} CLP </TableCell>
                                        <TableCell> {hour.name} </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>

                </CardContent>
            </Card>

        </div>
    )
}
