import App from "./App"
import { AppRouter } from "./AppRouter"
import { AuthProvider } from "./context/AuthContext"

export const AppHookContainer = () => {
  return (
    <AuthProvider>
      <App>
        <AppRouter />
      </App>
    </AuthProvider>
  )
}
