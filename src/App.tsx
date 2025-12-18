import type { ReactNode } from "react"
import { Toaster } from "@/components/ui/sonner"

interface Props {
  children: ReactNode
}

function App({ children }: Props) {


  return (
    <>
      {children}
      <Toaster/>
    </>
  )
}

export default App
