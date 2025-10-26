import { useAuth } from '@/features/login/application/use-auth.hook'
import { useInfiniteQuery} from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { API_CONFIG, MAX_PAGES, APP_CONFIG } from '@/shared/constants'

export const useHomePage = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Error en logout:', error)
    }
  }

  const getHomeData = async (page: number = 1) => {
    const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.CHARACTERS_ENDPOINT}?page=${page}`)
    return response.data
  }

  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage,
    isLoading 
  } = useInfiniteQuery({
    queryKey: ['home-data'],
    queryFn: ({ pageParam = 1 }) => getHomeData(pageParam),
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

  return {
    state: {
      data: data?.pages.flatMap((page) => page.results) || [],
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