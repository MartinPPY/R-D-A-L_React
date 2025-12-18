import type { ReactNode } from "react"


interface Props {
  children: ReactNode
}

export const AuthLayout = ({ children }: Props) => {
  return (
    <>
      <main className="w-full h-screen flex justify-center items-center p-4 sm:p-0">
        {children}
      </main>
      
    </>

  )
}
