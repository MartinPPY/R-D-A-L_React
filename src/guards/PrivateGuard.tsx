import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export const PrivateGuard = () => {

    const { authenticated, loading } = useAuth()

    if (loading) {
        return (<><Spinner /> Cargando...</>)
    }

    return authenticated ? <Outlet /> : <Navigate to='/login' replace />



}
