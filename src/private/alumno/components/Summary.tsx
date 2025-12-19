import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { api } from "@/services/api.service"
import { DollarSign, Timer } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"


interface Summary {
    quantity: number,
    payment: number
}

export const Summary = () => {

    const [summary, setSummary] = useState<Summary[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const getSummary = async () => {
            setLoading(true)
            try {

                const response = await api.get('activity/summary')
                console.log(response)
                setSummary(response.data)

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
        <div className="p-10 grid grid-cols-1 lg:grid-cols-3 gap-3">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle> Horas Totales </CardTitle>
                        <Timer />
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (<> <Spinner /> </>) : (
                        <h3 className="text-2xl">{summary[0]?.quantity}</h3>
                    )}
                    <p className="text-gray-500 text-sm">Horas del mes</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle> Dinero </CardTitle>
                        <DollarSign />
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (<> <Spinner /> </>) : (
                        <h3 className="text-2xl">{summary[0]?.payment} CLP</h3>
                    )}
                    <p className="text-gray-500 text-sm">Dinero del mes</p>
                </CardContent>
            </Card>
        </div>
    )
}
