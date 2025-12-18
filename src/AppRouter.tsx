import { Navigate, Route } from "react-router-dom"
import { RoutesWithNotFound } from "./components/RoutesWithNotFound"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Alumno } from "./private/alumno/Alumno"
import { PrivateGuard } from "./guards/PrivateGuard"

export const AppRouter = () => {
    return (
        <RoutesWithNotFound>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateGuard />} >
                <Route path="/alumno" element={<Alumno />} />
            </Route>


        </RoutesWithNotFound>
    )
}
