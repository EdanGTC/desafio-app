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
