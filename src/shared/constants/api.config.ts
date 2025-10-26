/**
 * Configuración de la API de Rick and Morty
 * Requerimiento solicitado por el cliente (2000 elementos)
 */
export const API_CONFIG = {
  MAX_ELEMENTS: 2000,
  ELEMENTS_PER_PAGE: 20,
  BASE_URL: 'https://rickandmortyapi.com/api',
  
  CHARACTERS_ENDPOINT: '/character',
  
  CACHE_TIME: 1000 * 60 * 5,
} as const

export const MAX_PAGES = Math.ceil(API_CONFIG.MAX_ELEMENTS / API_CONFIG.ELEMENTS_PER_PAGE)

export const APP_CONFIG = {
  STALE_TIME: API_CONFIG.CACHE_TIME,
  REFETCH_ON_WINDOW_FOCUS: false,
} as const
