import { api } from "@/services/api.service";
import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface Props {
    children: ReactNode
}

interface AuthContextType {
    authenticated: boolean,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean
}

const AuthContext = createContext<AuthContextType>({
    authenticated: false,
    setAuthenticated: () => { },
    loading: true
})

export const AuthProvider = ({ children }: Props) => {
    console.log("🟢 AuthProvider render")
    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        console.log("🟡 useEffect auth")
        const checkAuth = async () => {
            console.log("🔵 checkAuth start")
            try {
                const token = sessionStorage.getItem('token')
                console.log('llamando a express')
                await api.get('/auth/is-authenticated', {
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: 'Bearer ' + token
                    }
                })
                console.log('setenado el auth')
                setAuthenticated(true)
                setLoading(false)

            } catch (error) {
                console.error(error)
                setAuthenticated(false)
            } finally {
                console.log("🔴 FINALLY EJECUTADO")
                setLoading(false)
            }
        }

        checkAuth()

    }, [])

    const values = {
        authenticated,
        setAuthenticated,
        loading
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)