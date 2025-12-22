import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/services/api.service"
import { DollarSign, Timer,Paperclip } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"


interface Summary {
    quantity: number,
    payment: number
}

export const Summary = () => {

    const [summary, setSummary] = useState<Summary>()
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
        <section
            aria-labelledby="monthly-summary-title"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-6"
        >
            <h2 id="monthly-summary-title" className="sr-only">
                Resumen mensual
            </h2>

            {/* Horas Totales */}
            <Card className="transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Horas Totales
                        </CardTitle>

                        <Timer
                            aria-hidden="true"
                            className="h-5 w-5 text-muted-foreground"
                        />
                    </div>
                </CardHeader>

                <CardContent>
                    {loading ? (
                        <div
                            role="status"
                            aria-live="polite"
                            className="animate-pulse space-y-2"
                        >
                            <div className="h-8 w-24 rounded bg-muted" />
                            <div className="h-4 w-32 rounded bg-muted" />
                            <span className="sr-only">Cargando horas del mes</span>
                        </div>
                    ) : (
                        <>
                            <p className="text-3xl font-semibold tracking-tight">
                                {summary?.quantity ?? 0}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Horas del mes
                            </p>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Dinero */}
            <Card className="transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Dinero
                        </CardTitle>

                        <DollarSign
                            aria-hidden="true"
                            className="h-5 w-5 text-muted-foreground"
                        />
                    </div>
                </CardHeader>

                <CardContent>
                    {loading ? (
                        <div
                            role="status"
                            aria-live="polite"
                            className="animate-pulse space-y-2"
                        >
                            <div className="h-8 w-32 rounded bg-muted" />
                            <div className="h-4 w-32 rounded bg-muted" />
                            <span className="sr-only">Cargando dinero del mes</span>
                        </div>
                    ) : (
                        <>
                            <p className="text-3xl font-semibold tracking-tight">
                                {Intl.NumberFormat("es-CL", {
                                    style: "currency",
                                    currency: "CLP",
                                }).format(summary?.payment ?? 0)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Dinero del mes
                            </p>
                        </>
                    )}
                </CardContent>
            </Card>
            <Card className="transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Orden de pago
                        </CardTitle>

                        <Paperclip
                            aria-hidden="true"
                            className="h-5 w-5 text-muted-foreground"
                        />
                    </div>
                </CardHeader>

                <CardContent>
                    {loading ? (
                        <div
                            role="status"
                            aria-live="polite"
                            className="animate-pulse space-y-2"
                        >
                            <div className="h-8 w-32 rounded bg-muted" />
                            <div className="h-4 w-32 rounded bg-muted" />
                            <span className="sr-only">Cargando orden del mes</span>
                        </div>
                    ) : (
                        <>
                            <p className="text-3xl font-semibold tracking-tight">
                                En proceso
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Orden del mes
                            </p>
                        </>
                    )}
                </CardContent>
            </Card>
        </section>

    )
}
