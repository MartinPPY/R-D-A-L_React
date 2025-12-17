import type { ReactNode } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"


interface Props {
    children: ReactNode
}


export const RoutesWithNotFound = ({ children }: Props) => {
    return (
        <BrowserRouter>
            <Routes>                                
                {children}
                <Route path="/404" element={<h1> Not found </h1>} />
                <Route path="/*" element={<Navigate to="/404" />} />
            </Routes>
        </BrowserRouter>
    )
}
