import { LoginForm } from '../components/LoginForm'

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      
    <img src="https://wallpapers.com/images/high/fondoabstracto-de-degradado-negro-y-verde-zb6uxzkjkscaermm.webp" alt="Background" className="absolute inset-0 z-0 w-full h-full object-cover" />
    <div
      className="absolute inset-0 z-0 "
    >
      <div className="absolute inset-0 bg-black/40" />
    </div>

    <div className="relative z-10 w-full max-w-md px-4">
      <LoginForm />
    </div>
  </div>
  )
}
