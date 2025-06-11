import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { 
  BookOpen, 
  Users, 
  Sprout, 
  TrendingUp,
  Clock,
  Award,
  Download,
  Play,
  ChevronRight
} from 'lucide-react'

const EducacaoRural = () => {
  const cursos = [
    {
      titulo: "Agricultura Familiar e Alimentação Escolar",
      descricao: "Aprenda como a agricultura familiar contribui para o desempenho escolar e a alimentação saudável.",
      duracao: "2 horas",
      nivel: "Iniciante",
      categoria: "Nutrição",
      disponivel: true
    },
    {
      titulo: "Sustentabilidade no Campo",
      descricao: "Práticas sustentáveis para agricultura familiar e conservação ambiental.",
      duracao: "3 horas",
      nivel: "Intermediário", 
      categoria: "Sustentabilidade",
      disponivel: true
    },
    {
      titulo: "Tecnologias Digitais para o Campo",
      descricao: "Como usar ferramentas digitais para melhorar a produtividade e gestão rural.",
      duracao: "4 horas",
      nivel: "Intermediário",
      categoria: "Tecnologia",
      disponivel: true
    },
    {
      titulo: "Comercialização e Circuitos Curtos",
      descricao: "Estratégias para venda direta e criação de circuitos curtos de comercialização.",
      duracao: "2.5 horas",
      nivel: "Avançado",
      categoria: "Comercialização",
      disponivel: false
    }
  ]

  const artigos = [
    {
      titulo: "O Impacto da Agricultura Familiar na Educação",
      resumo: "Estudo do IPEA mostra que escolas que adquirem alimentos da agricultura familiar têm melhor desempenho.",
      categoria: "Pesquisa",
      tempo: "5 min de leitura"
    },
    {
      titulo: "Inclusão Produtiva no Brasil Rural",
      resumo: "Relatório CEBRAP sobre transição rural justa, sustentável e inclusiva no país.",
      categoria: "Relatório",
      tempo: "15 min de leitura"
    },
    {
      titulo: "Digitalização como Oportunidade Rural",
      resumo: "Como a inclusão digital pode impulsionar a inclusão produtiva no campo.",
      categoria: "Tecnologia",
      tempo: "8 min de leitura"
    }
  ]

  return (
    <div className="min-h-screen bg-rural-gradient">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary">
                <BookOpen className="h-4 w-4 mr-2" />
                Educação Rural
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Conhecimento que 
                <span className="bg-field-gradient bg-clip-text text-transparent"> Transforma o Campo</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Acesse conteúdos educativos especializados em agricultura familiar, 
                sustentabilidade e tecnologias rurais. Aprenda com especialistas e 
                compartilhe conhecimento com sua comunidade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-field-gradient hover:opacity-90">
                  <Play className="h-5 w-5 mr-2" />
                  Começar Agora
                </Button>
                <Button size="lg" variant="outline">
                  <Download className="h-5 w-5 mr-2" />
                  Baixar Materiais
                </Button>
              </div>
            </div>
            <div className="animate-grow-in">
              <img 
                src="/src/assets/agriculture-education.jpg" 
                alt="Educação Rural" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Cursos Disponíveis</div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="text-3xl font-bold text-accent-foreground mb-2">15k+</div>
              <div className="text-muted-foreground">Alunos Ativos</div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="text-3xl font-bold text-chart-4 mb-2">98%</div>
              <div className="text-muted-foreground">Satisfação</div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="text-3xl font-bold text-chart-2 mb-2">24/7</div>
              <div className="text-muted-foreground">Acesso Offline</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cursos em Destaque */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Cursos em Destaque
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conteúdos curados por especialistas para fortalecer a agricultura familiar 
              e promover o desenvolvimento sustentável no campo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {cursos.map((curso, index) => (
              <Card key={index} className="animate-grow-in hover:shadow-lg transition-all duration-300" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {curso.categoria}
                        </Badge>
                        <Badge variant={curso.disponivel ? "default" : "secondary"} className="text-xs">
                          {curso.disponivel ? "Disponível" : "Em Breve"}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mb-2">{curso.titulo}</CardTitle>
                      <CardDescription className="text-sm">
                        {curso.descricao}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {curso.duracao}
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      {curso.nivel}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full" 
                    variant={curso.disponivel ? "default" : "secondary"}
                    disabled={!curso.disponivel}
                  >
                    {curso.disponivel ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Iniciar Curso
                      </>
                    ) : (
                      <>
                        <Clock className="h-4 w-4 mr-2" />
                        Em Breve
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Artigos e Recursos */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Artigos e Pesquisas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mantenha-se atualizado com as últimas pesquisas e descobertas 
              sobre agricultura familiar e desenvolvimento rural.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {artigos.map((artigo, index) => (
              <Card key={index} className="animate-fade-in-up hover:shadow-lg transition-shadow cursor-pointer" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {artigo.categoria}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{artigo.tempo}</span>
                  </div>
                  <CardTitle className="text-lg">{artigo.titulo}</CardTitle>
                  <CardDescription>
                    {artigo.resumo}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-between">
                    Ler Artigo
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-field-gradient text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Transforme seu Conhecimento em Ação
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Junte-se a milhares de produtores que já estão aplicando 
              conhecimentos para melhorar suas práticas e resultados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Users className="h-5 w-5 mr-2" />
                Participar da Comunidade
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
                <Download className="h-5 w-5 mr-2" />
                Baixar App Offline
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EducacaoRural

