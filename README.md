# Desafío App

Aplicación React con autenticación y visualización de personajes de Rick and Morty.

## Requisitos previos

- Node.js 18+ 
- pnpm

## Instalación

```bash
pnpm install
```

## Desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`

## Stack Tecnológico

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **TanStack Query** - Data fetching
- **Axios** - HTTP client
- **Shadcn/ui** - UI components
- **Tailwind CSS** - Styling

## Estructura del Proyecto

```
src/
├── common/         # Infraestructura compartida (HTTP, providers)
├── features/       # Features de la app (home, login)
├── shared/         # Constantes, hooks, tipos compartidos
├── ui/             # Componentes UI reutilizables
└── core/           # Configuración de router
```
## Mejoras a futuro

Actualmente, el login implementado es simulado y no está conectado a un backend real, por lo que el token se almacena en localStorage solo con fines de demostración. A futuro, se recomienda implementar un sistema de autenticación seguro en el servidor que utilice cookies con atributos httpOnly, secure y sameSite para proteger mejor la información y evitar vulnerabilidades de seguridad.

Se recomienda implementar una estrategia de testing completa que incluya pruebas unitarias, de integración y e2e para garantizar la calidad del código y la estabilidad de los flujos principales. Se sugiere configurar herramientas como Jest y React Testing Library
