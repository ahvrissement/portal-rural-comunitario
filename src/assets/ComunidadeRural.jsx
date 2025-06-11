import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2,
  Calendar,
  MapPin,
  Bookmark,
  ThumbsUp,
  Eye,
  Send,
  Plus,
  Filter
} from 'lucide-react'

const ComunidadeRural = () => {
  const [novoPost, setNovoPost] = useState('')

  const posts = [
    {
      id: 1,
      autor: "Maria Silva",
      avatar: "MS",
      localizacao: "Zona Rural - MG",
      tempo: "2 horas atrás",
      conteudo: "Acabei de colher minha primeira safra de tomates orgânicos! O resultado foi incrível. Quem quiser dicas sobre cultivo sem agrotóxicos, estou aqui para ajudar! 🍅",
      categoria: "Agricultura Orgânica",
      curtidas: 24,
      comentarios: 8,
      visualizacoes: 156,
      imagem: true
    },
    {
      id: 2,
      autor: "João Santos",
      avatar: "JS",
      localizacao: "Interior - SP",
      tempo: "5 horas atrás",
      conteudo: "Pessoal, consegui aumentar em 30% a produtividade da minha horta usando técnicas de rotação de culturas. Vou compartilhar um guia completo em breve!",
      categoria: "Produtividade",
      curtidas: 18,
      comentarios: 12,
      visualizacoes: 203,
      imagem: false
    },
    {
      id: 3,
      autor: "Ana Costa",
      avatar: "AC",
      localizacao: "Campo - RS",
      tempo: "1 dia atrás",
      conteudo: "Organizando uma feira de produtos locais para o próximo sábado! Quem tem interesse em participar? Vamos fortalecer nossa economia local! 🛒",
      categoria: "Eventos",
      curtidas: 31,
      comentarios: 15,
      visualizacoes: 287,
      imagem: false
    }
  ]

  const grupos = [
    {
      nome: "Agricultura Familiar Brasil",
      membros: 2847,
      categoria: "Agricultura",
      ativo: true
    },
    {
      nome: "Sustentabilidade no Campo",
      membros: 1523,
      categoria: "Sustentabilidade",
      ativo: true
    },
    {
      nome: "Tecnologia Rural",
      membros: 956,
      categoria: "Tecnologia",
      ativo: false
    },
    {
      nome: "Mulheres do Campo",
      membros: 1834,
      categoria: "Empoderamento",
      ativo: true
    }
  ]

  const eventos = [
    {
      titulo: "Workshop: Compostagem Doméstica",
      data: "15 Jun",
      local: "Centro Comunitário",
      participantes: 23
    },
    {
      titulo: "Feira de Sementes Crioulas",
      data: "22 Jun",
      local: "Praça Central",
      participantes: 67
    },
    {
      titulo: "Curso: Irrigação Sustentável",
      data: "30 Jun",
      local: "Online",
      participantes: 145
    }
  ]

  return (
    <div className="min-h-screen bg-rural-gradient">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-chart-1/10 to-chart-5/10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <Badge variant="secondary" className="mb-4 bg-chart-1/20 text-chart-1">
                <Users className="h-4 w-4 mr-2" />
                Comunidade Rural
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Conecte-se com
                <span className="bg-field-gradient bg-clip-text text-transparent"> Produtores de Todo o Brasil</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Compartilhe experiências, aprenda com outros produtores e fortaleça 
                a rede de agricultura familiar. Juntos somos mais fortes!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-field-gradient hover:opacity-90">
                  <Plus className="h-5 w-5 mr-2" />
                  Participar da Comunidade
                </Button>
                <Button size="lg" variant="outline">
                  <Calendar className="h-5 w-5 mr-2" />
                  Ver Eventos
                </Button>
              </div>
            </div>
            <div className="animate-grow-in">
              <img 
                src="/src/assets/rural-community.jpg" 
                alt="Comunidade Rural" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas da Comunidade */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="text-3xl font-bold text-chart-1 mb-2">8.5k+</div>
              <div className="text-muted-foreground">Membros Ativos</div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="text-3xl font-bold text-chart-2 mb-2">1.2k+</div>
              <div className="text-muted-foreground">Posts por Mês</div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="text-3xl font-bold text-chart-4 mb-2">45+</div>
              <div className="text-muted-foreground">Grupos Ativos</div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="text-3xl font-bold text-chart-5 mb-2">120+</div>
              <div className="text-muted-foreground">Eventos por Ano</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feed Principal */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Feed de Posts */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Feed da Comunidade
                </h2>
                
                {/* Criar Post */}
                <Card className="mb-6 animate-fade-in-up">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                        U
                      </div>
                      <div className="flex-1">
                        <Input 
                          placeholder="Compartilhe suas experiências com a comunidade..."
                          value={novoPost}
                          onChange={(e) => setNovoPost(e.target.value)}
                          className="mb-4"
                        />
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <MapPin className="h-4 w-4 mr-2" />
                              Localização
                            </Button>
                            <Button variant="outline" size="sm">
                              <Calendar className="h-4 w-4 mr-2" />
                              Evento
                            </Button>
                          </div>
                          <Button size="sm" className="bg-field-gradient">
                            <Send className="h-4 w-4 mr-2" />
                            Publicar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts */}
                <div className="space-y-6">
                  {posts.map((post, index) => (
                    <Card key={post.id} className="animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3">
                            <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                              {post.avatar}
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground">{post.autor}</h4>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                {post.localizacao}
                                <span>•</span>
                                {post.tempo}
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {post.categoria}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground mb-4">{post.conteudo}</p>
                        
                        {post.imagem && (
                          <div className="bg-muted rounded-lg h-48 mb-4 flex items-center justify-center">
                            <span className="text-muted-foreground">Imagem do post</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex gap-6">
                            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                              <ThumbsUp className="h-4 w-4" />
                              <span className="text-sm">{post.curtidas}</span>
                            </button>
                            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                              <MessageCircle className="h-4 w-4" />
                              <span className="text-sm">{post.comentarios}</span>
                            </button>
                            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                              <Share2 className="h-4 w-4" />
                              <span className="text-sm">Compartilhar</span>
                            </button>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Eye className="h-4 w-4" />
                            <span className="text-sm">{post.visualizacoes}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Grupos */}
              <Card className="animate-grow-in">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Grupos Populares
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {grupos.map((grupo, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-sm">{grupo.nome}</h4>
                          <p className="text-xs text-muted-foreground">
                            {grupo.membros.toLocaleString()} membros
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          variant={grupo.ativo ? "default" : "outline"}
                          className="text-xs"
                        >
                          {grupo.ativo ? "Participando" : "Participar"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Eventos */}
              <Card className="animate-grow-in" style={{animationDelay: '0.1s'}}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Próximos Eventos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {eventos.map((evento, index) => (
                      <div key={index} className="border-l-2 border-primary pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-primary">{evento.data}</span>
                          <Badge variant="outline" className="text-xs">
                            {evento.participantes} participantes
                          </Badge>
                        </div>
                        <h4 className="font-medium text-sm mb-1">{evento.titulo}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {evento.local}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    Ver Todos os Eventos
                  </Button>
                </CardContent>
              </Card>

              {/* Sugestões */}
              <Card className="animate-grow-in" style={{animationDelay: '0.2s'}}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Sugestões para Você
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium">Conecte-se com produtores da sua região</p>
                      <p className="text-muted-foreground text-xs">Encontre vizinhos e forme parcerias</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Participe do grupo "Agricultura Orgânica"</p>
                      <p className="text-muted-foreground text-xs">Baseado nos seus interesses</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Siga especialistas em sustentabilidade</p>
                      <p className="text-muted-foreground text-xs">Receba dicas valiosas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-field-gradient text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Faça Parte da Maior Rede Rural do Brasil
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Conecte-se com milhares de produtores, compartilhe conhecimento 
              e fortaleça a agricultura familiar em todo o país.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Plus className="h-5 w-5 mr-2" />
                Criar Conta Gratuita
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
                <Users className="h-5 w-5 mr-2" />
                Explorar Comunidade
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ComunidadeRural

