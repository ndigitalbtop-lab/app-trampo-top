"use client"

import { useState } from "react"
import { Search, MapPin, Star, Shield, Crown, Phone, MessageCircle, TrendingUp, Hammer, Zap, Wrench, Paintbrush, Droplet, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Tipos
type Professional = {
  id: string
  name: string
  photo: string
  specialty: string[]
  rating: number
  reviews: number
  distance: string
  price: string
  verified: boolean
  pro: boolean
  bio: string
  experience: number
  phone: string
}

// Dados mockados
const professionals: Professional[] = [
  {
    id: "1",
    name: "Carlos Silva",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    specialty: ["Pintura", "Textura"],
    rating: 4.9,
    reviews: 127,
    distance: "2.3 km",
    price: "R$ 80-120/dia",
    verified: true,
    pro: true,
    bio: "15 anos de experiência em pintura residencial e comercial. Especialista em texturas decorativas.",
    experience: 15,
    phone: "(11) 98765-4321"
  },
  {
    id: "2",
    name: "João Pereira",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    specialty: ["Pintura", "Acabamento"],
    rating: 4.7,
    reviews: 89,
    distance: "3.1 km",
    price: "R$ 70-100/dia",
    verified: true,
    pro: true,
    bio: "Pintor profissional com foco em acabamento de alta qualidade.",
    experience: 10,
    phone: "(11) 97654-3210"
  },
  {
    id: "3",
    name: "Roberto Costa",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    specialty: ["Pintura"],
    rating: 4.5,
    reviews: 45,
    distance: "4.8 km",
    price: "R$ 60-90/dia",
    verified: true,
    pro: false,
    bio: "Pintor com experiência em projetos residenciais.",
    experience: 7,
    phone: "(11) 96543-2109"
  }
]

const popularServices = [
  { name: "Pintor", icon: Paintbrush },
  { name: "Eletricista", icon: Zap },
  { name: "Encanador", icon: Droplet },
  { name: "Pedreiro", icon: Hammer },
  { name: "Marceneiro", icon: Wrench },
  { name: "Iluminação", icon: Lightbulb }
]

export default function Home() {
  const [currentView, setCurrentView] = useState<"home" | "results" | "profile" | "dashboard" | "plans">("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null)

  // Componente: Home
  const HomeView = () => (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Header */}
      <header className="bg-[#1A1A1A] text-white py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center">
              <Hammer className="w-6 h-6 text-[#1A1A1A]" />
            </div>
            <h1 className="text-2xl font-bold">BUILDR</h1>
          </div>
          <Button 
            variant="outline" 
            className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A1A1A]"
            onClick={() => setCurrentView("dashboard")}
          >
            Sou profissional
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-20">
        <div className="max-w-3xl w-full text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1A1A1A]">
              Encontre o profissional certo
            </h2>
            <p className="text-xl text-gray-600">
              Busque. Encontre. Contrate.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <Input
              type="text"
              placeholder="Digite o serviço que você precisa (ex: pintor, eletricista...)"
              className="pl-14 pr-4 py-7 text-lg border-2 border-gray-200 focus:border-[#D4AF37] rounded-2xl shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  setCurrentView("results")
                }
              }}
            />
          </div>

          {/* Popular Services */}
          <div className="space-y-4">
            <p className="text-sm text-gray-500 font-medium">Serviços populares:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {popularServices.map((service) => {
                const Icon = service.icon
                return (
                  <button
                    key={service.name}
                    onClick={() => {
                      setSearchQuery(service.name)
                      setCurrentView("results")
                    }}
                    className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-[#D4AF37] hover:shadow-lg transition-all duration-300"
                  >
                    <Icon className="w-6 h-6 text-[#1A1A1A]" />
                    <span className="text-sm font-medium text-[#1A1A1A]">{service.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-6 px-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-400">
          <p>Sem burocracia. Apenas resultados.</p>
        </div>
      </footer>
    </div>
  )

  // Componente: Results
  const ResultsView = () => (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-[#1A1A1A] text-white py-4 px-4 sm:px-6 sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => setCurrentView("home")} className="hover:text-[#D4AF37] transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                  <Hammer className="w-5 h-5 text-[#1A1A1A]" />
                </div>
                <span className="font-bold text-lg">BUILDR</span>
              </div>
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar serviço..."
              className="pl-11 pr-4 py-5 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#D4AF37] rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button variant="outline" size="sm" className="rounded-full border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white whitespace-nowrap">
            <MapPin className="w-4 h-4 mr-2" />
            Distância
          </Button>
          <Button variant="outline" size="sm" className="rounded-full border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white whitespace-nowrap">
            <Star className="w-4 h-4 mr-2" />
            Avaliação
          </Button>
          <Button variant="outline" size="sm" className="rounded-full border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white whitespace-nowrap">
            Preço
          </Button>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">
            {professionals.length} profissionais encontrados
          </h2>
          <p className="text-gray-600">Resultados para "{searchQuery}"</p>
        </div>

        {/* Professional Cards */}
        <div className="space-y-4">
          {professionals.map((prof) => (
            <Card
              key={prof.id}
              className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                prof.pro ? "border-2 border-[#D4AF37] bg-gradient-to-br from-white to-[#D4AF37]/5" : "border-gray-200"
              }`}
              onClick={() => {
                setSelectedProfessional(prof)
                setCurrentView("profile")
              }}
            >
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                    <AvatarImage src={prof.photo} alt={prof.name} />
                    <AvatarFallback>{prof.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  {prof.pro && (
                    <div className="absolute -top-2 -right-2 bg-[#D4AF37] rounded-full p-1.5 shadow-lg">
                      <Crown className="w-5 h-5 text-[#1A1A1A]" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-[#1A1A1A]">{prof.name}</h3>
                      {prof.verified && (
                        <Shield className="w-5 h-5 text-blue-500" />
                      )}
                      {prof.pro && (
                        <Badge className="bg-[#D4AF37] text-[#1A1A1A] hover:bg-[#D4AF37]/90">
                          PRÓ
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {prof.specialty.map((spec) => (
                        <Badge key={spec} variant="outline" className="border-[#1A1A1A]/20">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                      <span className="font-semibold text-[#1A1A1A]">{prof.rating}</span>
                      <span>({prof.reviews} avaliações)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{prof.distance}</span>
                    </div>
                    <div className="font-semibold text-[#1A1A1A]">{prof.price}</div>
                  </div>

                  <p className="text-gray-700 line-clamp-2">{prof.bio}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )

  // Componente: Profile
  const ProfileView = () => {
    if (!selectedProfessional) return null

    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        {/* Header */}
        <header className="bg-[#1A1A1A] text-white py-4 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <button onClick={() => setCurrentView("results")} className="hover:text-[#D4AF37] transition-colors mb-4">
              ← Voltar
            </button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Profile Header */}
          <Card className={`p-8 mb-6 ${selectedProfessional.pro ? "border-2 border-[#D4AF37]" : ""}`}>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                  <AvatarImage src={selectedProfessional.photo} alt={selectedProfessional.name} />
                  <AvatarFallback>{selectedProfessional.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                {selectedProfessional.pro && (
                  <div className="absolute -bottom-2 -right-2 bg-[#D4AF37] rounded-full p-2 shadow-lg">
                    <Crown className="w-6 h-6 text-[#1A1A1A]" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold text-[#1A1A1A]">{selectedProfessional.name}</h1>
                    {selectedProfessional.verified && (
                      <Shield className="w-6 h-6 text-blue-500" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedProfessional.specialty.map((spec) => (
                      <Badge key={spec} className="bg-[#1A1A1A] text-white">
                        {spec}
                      </Badge>
                    ))}
                    {selectedProfessional.pro && (
                      <Badge className="bg-[#D4AF37] text-[#1A1A1A]">
                        PROFISSIONAL PRÓ
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                    <span className="font-bold text-lg text-[#1A1A1A]">{selectedProfessional.rating}</span>
                    <span className="text-gray-600">({selectedProfessional.reviews} avaliações)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{selectedProfessional.distance} de você</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <TrendingUp className="w-5 h-5" />
                    <span>{selectedProfessional.experience} anos de experiência</span>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-lg font-semibold text-[#1A1A1A]">{selectedProfessional.price}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Bio */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">Sobre</h2>
            <p className="text-gray-700 leading-relaxed">{selectedProfessional.bio}</p>
          </Card>

          {/* Reviews */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Avaliações</h2>
            <div className="space-y-4">
              {[
                { name: "Maria Santos", rating: 5, comment: "Excelente profissional! Trabalho impecável e pontual.", date: "Há 2 dias" },
                { name: "Pedro Lima", rating: 5, comment: "Muito satisfeito com o resultado. Recomendo!", date: "Há 1 semana" },
                { name: "Ana Costa", rating: 4, comment: "Bom trabalho, preço justo.", date: "Há 2 semanas" }
              ].map((review, idx) => (
                <div key={idx} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{review.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-[#1A1A1A]">{review.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Contact Button (Fixed) */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl">
            <div className="max-w-4xl mx-auto flex gap-3">
              <Button 
                className="flex-1 bg-[#25D366] hover:bg-[#25D366]/90 text-white py-6 text-lg rounded-xl shadow-lg"
                onClick={() => window.open(`https://wa.me/55${selectedProfessional.phone.replace(/\D/g, "")}`, "_blank")}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
              <Button 
                className="flex-1 bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white py-6 text-lg rounded-xl shadow-lg"
                onClick={() => window.open(`tel:${selectedProfessional.phone.replace(/\D/g, "")}`, "_blank")}
              >
                <Phone className="w-5 h-5 mr-2" />
                Ligar
              </Button>
            </div>
          </div>
          <div className="h-24"></div>
        </main>
      </div>
    )
  }

  // Componente: Dashboard
  const DashboardView = () => (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-[#1A1A1A] text-white py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={() => setCurrentView("home")} className="hover:text-[#D4AF37] transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                <Hammer className="w-5 h-5 text-[#1A1A1A]" />
              </div>
              <span className="font-bold text-lg">BUILDR</span>
            </div>
          </button>
          <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A1A1A]">
            Sair
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Área do Profissional</h1>
          <p className="text-gray-600">Gerencie seu perfil e acompanhe seu desempenho</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <Card className="p-6 bg-gradient-to-br from-[#D4AF37] to-[#D4AF37]/80 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium opacity-90">Visualizações</span>
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold">247</p>
            <p className="text-sm opacity-90 mt-1">Últimos 30 dias</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-[#1A1A1A] to-[#1A1A1A]/80 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium opacity-90">Contatos</span>
              <MessageCircle className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold">42</p>
            <p className="text-sm opacity-90 mt-1">Últimos 30 dias</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium opacity-90">Avaliação</span>
              <Star className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold">4.9</p>
            <p className="text-sm opacity-90 mt-1">127 avaliações</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200 p-1 rounded-xl">
            <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-white">
              Perfil
            </TabsTrigger>
            <TabsTrigger value="plan" className="rounded-lg data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-white">
              Plano
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-lg data-[state=active]:bg-[#1A1A1A] data-[state=active]:text-white">
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Seu Perfil</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 border-2 border-[#D4AF37]">
                    <AvatarImage src={professionals[0].photo} />
                    <AvatarFallback>CS</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white">
                    Alterar foto
                  </Button>
                </div>
                <Separator />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Nome completo</label>
                    <Input defaultValue="Carlos Silva" className="border-gray-300" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Telefone/WhatsApp</label>
                    <Input defaultValue="(11) 98765-4321" className="border-gray-300" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Especialidades</label>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-[#1A1A1A] text-white">Pintura</Badge>
                      <Badge className="bg-[#1A1A1A] text-white">Textura</Badge>
                      <Button variant="outline" size="sm" className="h-6 text-xs">+ Adicionar</Button>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Bio (máx. 200 caracteres)</label>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                      rows={3}
                      defaultValue="15 anos de experiência em pintura residencial e comercial. Especialista em texturas decorativas."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Preço médio</label>
                    <Input defaultValue="R$ 80-120/dia" className="border-gray-300" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Anos de experiência</label>
                    <Input type="number" defaultValue="15" className="border-gray-300" />
                  </div>
                </div>
                <Button className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A1A1A] font-semibold py-6">
                  Salvar alterações
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="plan">
            <Card className="p-6 border-2 border-[#D4AF37]">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-8 h-8 text-[#D4AF37]" />
                <div>
                  <h2 className="text-xl font-bold text-[#1A1A1A]">Plano PRÓ Ativo</h2>
                  <p className="text-sm text-gray-600">Renovação em 23 dias</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Prioridade no topo da busca</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Badge PRÓ dourado no perfil</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Visualizações ilimitadas</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  <span>Estatísticas detalhadas</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-[#1A1A1A]">R$ 49,90<span className="text-sm font-normal text-gray-600">/mês</span></p>
                </div>
                <Button variant="outline" className="border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white">
                  Gerenciar assinatura
                </Button>
              </div>
            </Card>

            <div className="mt-6 text-center">
              <Button 
                variant="link" 
                className="text-[#D4AF37] hover:text-[#D4AF37]/80"
                onClick={() => setCurrentView("plans")}
              >
                Ver todos os planos disponíveis →
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Configurações</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Notificações por email</p>
                    <p className="text-sm text-gray-600">Receba atualizações sobre visualizações</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 accent-[#D4AF37]" defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Disponibilidade</p>
                    <p className="text-sm text-gray-600">Aparecer nas buscas</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 accent-[#D4AF37]" defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Raio de atendimento</p>
                    <p className="text-sm text-gray-600">Até 20 km</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white">
                    Alterar
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )

  // Componente: Plans
  const PlansView = () => (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-[#1A1A1A] text-white py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <button onClick={() => setCurrentView("dashboard")} className="hover:text-[#D4AF37] transition-colors">
            ← Voltar para Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1A1A1A] mb-3">Escolha seu plano</h1>
          <p className="text-xl text-gray-600">Aumente sua visibilidade e receba mais contatos</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Plano Básico */}
          <Card className="p-6 border-2 border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Básico</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-[#1A1A1A]">Grátis</span>
              </div>
              <p className="text-gray-600">Para começar</p>
            </div>
            <Separator className="mb-6" />
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs">✓</span>
                </div>
                <span className="text-gray-700">Aparece na busca</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs">✓</span>
                </div>
                <span className="text-gray-700">Perfil completo</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs">✓</span>
                </div>
                <span className="text-gray-700">10 visualizações/mês</span>
              </li>
              <li className="flex items-start gap-2 opacity-50">
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs">✗</span>
                </div>
                <span className="text-gray-700">Prioridade na busca</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white py-6">
              Plano atual
            </Button>
          </Card>

          {/* Plano PRÓ */}
          <Card className="p-6 border-4 border-[#D4AF37] relative hover:shadow-2xl transition-all duration-300 scale-105">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#1A1A1A] px-4 py-1 rounded-full text-sm font-bold">
              MAIS POPULAR
            </div>
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="w-6 h-6 text-[#D4AF37]" />
                <h3 className="text-2xl font-bold text-[#1A1A1A]">PRÓ</h3>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold text-[#1A1A1A]">R$ 49,90</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <p className="text-gray-600">Para profissionais sérios</p>
            </div>
            <Separator className="mb-6" />
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-[#1A1A1A]">✓</span>
                </div>
                <span className="text-gray-700 font-medium">Tudo do Básico +</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-[#1A1A1A]">✓</span>
                </div>
                <span className="text-gray-700">Prioridade no topo</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-[#1A1A1A]">✓</span>
                </div>
                <span className="text-gray-700">Badge PRÓ dourado</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-[#1A1A1A]">✓</span>
                </div>
                <span className="text-gray-700">Visualizações ilimitadas</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-[#1A1A1A]">✓</span>
                </div>
                <span className="text-gray-700">Estatísticas detalhadas</span>
              </li>
            </ul>
            <Button className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1A1A1A] font-bold py-6 text-lg">
              Assinar PRÓ
            </Button>
          </Card>

          {/* Plano Premium */}
          <Card className="p-6 border-2 border-[#1A1A1A] hover:shadow-xl transition-all duration-300">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-[#1A1A1A]" />
                <h3 className="text-2xl font-bold text-[#1A1A1A]">Premium</h3>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold text-[#1A1A1A]">R$ 99,90</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <p className="text-gray-600">Máxima visibilidade</p>
            </div>
            <Separator className="mb-6" />
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white">✓</span>
                </div>
                <span className="text-gray-700 font-medium">Tudo do PRÓ +</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white">✓</span>
                </div>
                <span className="text-gray-700">Destaque rotativo na home</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white">✓</span>
                </div>
                <span className="text-gray-700">Selo "Top Avaliado"</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white">✓</span>
                </div>
                <span className="text-gray-700">Suporte prioritário</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-white">✓</span>
                </div>
                <span className="text-gray-700">Análise de concorrência</span>
              </li>
            </ul>
            <Button className="w-full bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white font-bold py-6 text-lg">
              Assinar Premium
            </Button>
          </Card>
        </div>

        {/* Impulso Avulso */}
        <div className="mt-12 max-w-3xl mx-auto">
          <Card className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Impulso Avulso</h3>
                <p className="text-gray-700 mb-1">Apareça no topo da busca por 7 dias sem compromisso mensal</p>
                <p className="text-2xl font-bold text-orange-600">R$ 19,90</p>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-6">
                Comprar Impulso
              </Button>
            </div>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1A1A1A] text-center mb-6">Perguntas Frequentes</h2>
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold text-[#1A1A1A] mb-2">Posso cancelar a qualquer momento?</h3>
              <p className="text-gray-700">Sim, você pode cancelar sua assinatura a qualquer momento sem multas.</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold text-[#1A1A1A] mb-2">Como funciona o pagamento?</h3>
              <p className="text-gray-700">Aceitamos cartão de crédito e Pix. A cobrança é mensal e automática.</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold text-[#1A1A1A] mb-2">Posso mudar de plano depois?</h3>
              <p className="text-gray-700">Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento.</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )

  // Render baseado na view atual
  return (
    <>
      {currentView === "home" && <HomeView />}
      {currentView === "results" && <ResultsView />}
      {currentView === "profile" && <ProfileView />}
      {currentView === "dashboard" && <DashboardView />}
      {currentView === "plans" && <PlansView />}
    </>
  )
}
