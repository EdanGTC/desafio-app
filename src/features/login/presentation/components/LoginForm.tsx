"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { useLoginForm } from "../../application/useLoginForm"

export const LoginForm = () => {

  const {
    state: { email, password, isLoading, error }, 
    handlers: { setEmail, setPassword, handleSubmit },
  } = useLoginForm()

  return (
    <Card className="w-full shadow-2xl border-0">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold tracking-tight text-balance">Bienvenido de nuevo!</CardTitle>
        <CardDescription className="text-muted-foreground">
          Ingresa tus credenciales para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="h-11"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 mt-4">
          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full h-11 font-medium" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
