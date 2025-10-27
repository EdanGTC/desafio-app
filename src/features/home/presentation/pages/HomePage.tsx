import { Button } from '@/ui/components/button'
import { useHomePage } from '../../application/useHomePage'
import { CharacterCard, CharacterCardProps } from '@/ui/components/CharacterCard/CharacterCard'
import { useInfiniteScroll } from '@/shared/hooks'

const HomePage = () => {
  const {
    state: { data, isLoading, isFetchingNextPage, hasNextPage, totalLoaded, maxElements },
    handlers: { handleLogout, fetchNextPage },
  } = useHomePage()

  useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  })
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-700">Desafío App</h1>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="bg-green-900 hover:bg-green-950 text-white border-green-900"
          >
            Cerrar Sesión
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Bienvenido a la aplicación</h2>
          <p className="text-gray-600 mb-2">
            Personajes de Rick and Morty. Vista disponible solo para usuarios autenticados.
          </p>
          {data && data.length > 0 && (
            <p className="text-sm text-gray-500">
              Mostrando {totalLoaded} de máximo {maxElements} personajes
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="text-lg text-gray-600">Cargando personajes...</div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center items-center content-center gap-4">
              {data?.map((item: CharacterCardProps) => (
                <CharacterCard key={item.id} {...item} />
              ))}
            </div>
            {isFetchingNextPage && (
              <div className="text-center py-4">
                <div className="text-gray-600">Cargando más personajes...</div>
              </div>
            )}
            
            {!hasNextPage && data && data.length > 0 && (
              <div className="text-center py-4">
                <div className="text-gray-500">
                  {totalLoaded >= maxElements 
                    ? `¡Has alcanzado el límite de ${maxElements} personajes!` 
                    : '¡Has visto todos los personajes disponibles!'
                  }
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage;