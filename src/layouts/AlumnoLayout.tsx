import type { ReactNode } from "react"


interface Props {
    children: ReactNode
}

export const AlumnoLayout = ({ children }: Props) => {
    return (
        <main className="w-full h-screen">
            {children}
        </main>
    )
}
