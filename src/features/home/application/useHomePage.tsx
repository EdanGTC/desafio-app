import { useAuth } from '@/features/login/application/use-auth.hook'
import { useInfiniteQuery} from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { API_CONFIG, MAX_PAGES, APP_CONFIG } from '@/shared/constants'
import { useRickMortyApi } from './hooks/use-rick-morty-api.hook'
import { useMemo } from 'react'

export const useHomePage = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { getCharacters } = useRickMortyApi()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Error en logout:', error)
    }
  }

  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage,
    isLoading 
  } = useInfiniteQuery({
    queryKey: ['home-data'],
    queryFn: ({ pageParam = 1 }) => getCharacters(pageParam),
    enabled: !!localStorage.getItem('auth_token'),
    staleTime: APP_CONFIG.STALE_TIME,
    refetchOnWindowFocus: APP_CONFIG.REFETCH_ON_WINDOW_FOCUS,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length
      const nextPage = lastPage.info.next ? parseInt(lastPage.info.next.split('page=')[1]) : undefined
      
      if (currentPage >= MAX_PAGES) {
        return undefined
      }
      
      const totalElementsLoaded = allPages.reduce((total, page) => total + page.results.length, 0)
      if (totalElementsLoaded >= API_CONFIG.MAX_ELEMENTS) {
        return undefined
      }
      
      return nextPage
    },
    initialPageParam: 1,
  })

  const characters = useMemo(() => data?.pages.flatMap((page) => page.results) || [], [data])

  return {
    state: {
      data: characters,
      isLoading,
      isFetchingNextPage,
      hasNextPage: !!hasNextPage,
      totalLoaded: data?.pages.reduce((total, page) => total + page.results.length, 0) || 0,
      maxElements: API_CONFIG.MAX_ELEMENTS,
    },
    handlers: {
      handleLogout,
      fetchNextPage,
    },
  }
}