import supabase from "@/lib/supabase";
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

    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {

        const checkAuth = async () => {

            const auth = await supabase.auth.getSession()

            if (auth.error) {
                setAuthenticated(false)
                setLoading(false)
                console.error(auth.error)
                return
            }

            if (!auth.data.session) {
                setAuthenticated(false)
                setLoading(false)
                return
            }


            setAuthenticated(true)
            setLoading(false)

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