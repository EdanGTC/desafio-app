import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRouter } from './core/router/AppRouter'
import AppProviders from './common/providers/app.providers'

createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <AppRouter />
  </AppProviders>
)
