import { Card } from "@/components/ui/card"

export type CharacterCardProps = {
  id: number
  name: string
  status: string
  species: string
  gender: string
  image: string
  created: string
}

export const CharacterCard = ({ name, status, species, gender, image, created }: CharacterCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "text-green-600"
      case "dead":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card className="pt-0 relative w-64 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-full h-72 bg-gray-100">
        <img src={image || "/placeholder.svg"} alt={name} className="object-cover w-full h-full" />
      </div>
      <div className="p-4 space-y-2">
        <p className={`text-sm font-medium ${getStatusColor(status)}`}>{status}</p>
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">{name}</h3>
        <div className="space-y-1 text-sm text-gray-600">
          <p>
            {species} • {gender}
          </p>
          <p className="text-xs text-gray-500">Creado: {formatDate(created)}</p>
        </div>
      </div>
      <button
        className="absolute bottom-4 right-4 w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Add to favorites"
      >
      </button>
    </Card>
  )
}
