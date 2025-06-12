import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card.jsx";
import { Badge } from "./ui/badge.jsx";
import { Button } from "./ui/button.jsx";
import { 
  BookOpen, 
  Users, 
  Sprout, 
  TrendingUp,
  Clock,
  Award,
  Download,
  Play,
  ChevronRight,
  X,
  Loader2,
  ArrowLeft,
  Eye
} from 'lucide-react'

const EducacaoRural = () => {
  const [videoModal, setVideoModal] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(null)
  const [conteudos, setConteudos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filtroAtivo, setFiltroAtivo] = useState('TODOS')
  
  // Estados para o GET /conteudo/{id}
  const [detalhesModal, setDetalhesModal] = useState(false)
  const [conteudoDetalhado, setConteudoDetalhado] = useState(null)
  const [loadingDetalhes, setLoadingDetalhes] = useState(false)

  // Mock data para desenvolvimento
  const mockConteudos = [
    {
      id: 1,
      titulo: "Agricultura Familiar e Alimentação Escolar",
      descricao: "Aprenda como a agricultura familiar contribui para o desempenho escolar e a alimentação saudável.",
      tipoConteudo: "VIDEO",
      categoriaConteudo: "EDUCACAO",
      urlArquivo: "https://www.youtube.com/embed/EuWweofefeY?si=4hzYkqMbYJU19Yiy",
      ultimaAtualizacao: "2025-06-10T10:00:00Z"
    },
    {
      id: 2,
      titulo: "Sustentabilidade no Campo",
      descricao: "Práticas sustentáveis para agricultura familiar e conservação ambiental.",
      tipoConteudo: "VIDEO",
      categoriaConteudo: "EDUCACAO",
      urlArquivo: "https://www.youtube.com/embed/WjfjeLH0B2I?si=nOGIpbzbJ25Gi2BB",
      ultimaAtualizacao: "2025-06-09T15:30:00Z"
    },
    {
      id: 3,
      titulo: "Tecnologias Digitais para o Campo",
      descricao: "Como usar ferramentas digitais para melhorar a produtividade e gestão rural.",
      tipoConteudo: "TEXTO",
      categoriaConteudo: "EDUCACAO",
      urlArquivo: "https://www.embrapa.br/busca-de-noticias/-/noticia/62787080/digitalizacao-no-campo-oportunidades-e-desafios",
      ultimaAtualizacao: "2025-06-08T09:15:00Z"
    },
    {
      id: 4,
      titulo: "Comercialização e Circuitos Curtos",
      descricao: "Estratégias para venda direta e criação de circuitos curtos de comercialização.",
      tipoConteudo: "TEXTO",
      categoriaConteudo: "EDUCACAO",
      urlArquivo: "https://www.gov.br/incra/pt-br/assuntos/reforma-agraria",
      ultimaAtualizacao: "2025-06-07T14:45:00Z"
    }
  ]

  // Artigos estáticos (que estavam na versão anterior)
  const artigosEstaticos = [
    {
      titulo: "Agricultura Familiar e PNAE",
      resumo: "Como o Programa Nacional de Alimentação Escolar fortalece a agricultura familiar.",
      categoria: "Política Pública",
      tempo: "7 min de leitura",
      url: "https://www.fnde.gov.br/programas/pnae",
      autor: "Instituto PNAE",
      dataPublicacao: "2025-01-15",
      tags: ["PNAE", "Política Pública", "Educação"]
    },
    {
      titulo: "Tecnologias Sociais no Campo",
      resumo: "Soluções inovadoras desenvolvidas para e pela agricultura familiar.",
      categoria: "Inovação",
      tempo: "10 min de leitura",
      url: "https://www.fbb.org.br/pt/tecnologia-social",
      autor: "Fundação Banco do Brasil",
      dataPublicacao: "2025-02-20",
      tags: ["Inovação", "Tecnologia", "Agricultura Familiar"]
    },
    {
      titulo: "Sustentabilidade e Agroecologia",
      resumo: "Práticas agroecológicas para uma agricultura mais sustentável e produtiva.",
      categoria: "Sustentabilidade",
      tempo: "12 min de leitura",
      url: "https://www.embrapa.br/tema-agroecologia",
      autor: "Embrapa",
      dataPublicacao: "2025-03-10",
      tags: ["Agroecologia", "Sustentabilidade", "Meio Ambiente"]
    },
    {
      titulo: "Cooperativismo Rural",
      resumo: "A importância das cooperativas para o fortalecimento da agricultura familiar.",
      categoria: "Cooperativismo",
      tempo: "6 min de leitura",
      url: "https://www.ocb.org.br/ramo-agropecuario",
      autor: "OCB",
      dataPublicacao: "2025-02-28",
      tags: ["Cooperativismo", "Organização", "Agricultura Familiar"]
    },
    {
      titulo: "Crédito Rural e PRONAF",
      resumo: "Guia completo sobre financiamento para a agricultura familiar no Brasil.",
      categoria: "Financiamento",
      tempo: "15 min de leitura",
      url: "https://www.bndes.gov.br/wps/portal/site/home/financiamento/pronaf",
      autor: "BNDES",
      dataPublicacao: "2025-01-20",
      tags: ["PRONAF", "Crédito", "Financiamento"]
    },
    {
      titulo: "Mulheres na Agricultura",
      resumo: "O papel fundamental das mulheres na agricultura familiar brasileira.",
      categoria: "Gênero",
      tempo: "8 min de leitura",
      url: "https://www.gov.br/incra/pt-br/assuntos/reforma-agraria/projetos_programas/mulheres_rurais",
      autor: "INCRA",
      dataPublicacao: "2025-03-08",
      tags: ["Mulheres", "Gênero", "Protagonismo"]
    }
  ]

  // Buscar conteúdos da API com fallback para mock
  const buscarConteudos = async (filtros = {}) => {
    setLoading(true)
    setError(null)
    
    try {
      // Primeiro, tentar buscar da API
      const queryParams = new URLSearchParams()
      
      const filtroObj = {
        categoriaConteudo: "EDUCACAO",
        ...filtros
      }
      
      // Adicionar filtros como query parameters
      if (filtroObj.titulo) queryParams.append('titulo', filtroObj.titulo)
      if (filtroObj.descricao) queryParams.append('descricao', filtroObj.descricao)
      if (filtroObj.tipoConteudo) queryParams.append('tipoConteudo', filtroObj.tipoConteudo)
      if (filtroObj.categoriaConteudo) queryParams.append('categoriaConteudo', filtroObj.categoriaConteudo)

      // Construir URL completa
      const apiUrl = `/conteudo?${queryParams.toString()}`
      console.log('Tentando buscar:', apiUrl)

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Adicione headers de autenticação se necessário
          // 'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error(`API não disponível (${response.status}). Usando dados de exemplo.`)
      }

      const data = await response.json()
      console.log('Dados da API:', data)
      setConteudos(Array.isArray(data) ? data : [])
      
    } catch (err) {
      console.warn('Erro ao buscar da API, usando mock data:', err.message)
      
      // Usar mock data como fallback
      let dadosFiltrados = [...mockConteudos]
      
      // Aplicar filtros no mock data
      if (filtros.tipoConteudo) {
        dadosFiltrados = dadosFiltrados.filter(item => item.tipoConteudo === filtros.tipoConteudo)
      }
      
      setConteudos(dadosFiltrados)
    } finally {
      setLoading(false)
    }
  }

  // Novo: Buscar detalhes de um conteúdo específico - GET /conteudo/{id}
  const buscarDetalhesConteudo = async (id) => {
    setLoadingDetalhes(true)
    
    try {
      console.log('Buscando detalhes do conteúdo ID:', id)
      
      const response = await fetch(`/conteudo/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Adicione headers de autenticação se necessário
          // 'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Detalhes do conteúdo:', data)
      setConteudoDetalhado(data)
      setDetalhesModal(true)
      
    } catch (err) {
      console.warn('Erro ao buscar detalhes da API, usando mock:', err.message)
      
      // Fallback para mock data
      const mockDetalhes = mockConteudos.find(item => item.id === parseInt(id))
      if (mockDetalhes) {
        setConteudoDetalhado(mockDetalhes)
        setDetalhesModal(true)
      } else {
        alert('Conteúdo não encontrado!')
      }
    } finally {
      setLoadingDetalhes(false)
    }
  }

  // Carregar conteúdos ao montar componente
  useEffect(() => {
    buscarConteudos()
  }, [])

  // Filtrar por tipo de conteúdo
  const filtrarPorTipo = (tipo) => {
    setFiltroAtivo(tipo)
    
    if (tipo === 'TODOS') {
      buscarConteudos()
    } else {
      buscarConteudos({ tipoConteudo: tipo })
    }
  }

  // Separar conteúdos por tipo
  const cursosVideo = conteudos.filter(c => c.tipoConteudo === 'VIDEO')
  const artigosTexto = conteudos.filter(c => c.tipoConteudo === 'TEXTO')

  // Função para abrir o modal com vídeo
  const abrirVideo = (conteudo) => {
    setCurrentVideo({
      titulo: conteudo.titulo,
      descricao: conteudo.descricao,
      categoria: conteudo.categoriaConteudo,
      videoUrl: conteudo.urlArquivo,
      duracao: "Variável",
      nivel: "Todos os níveis"
    })
    setVideoModal(true)
  }

  // Função para fechar o modal de vídeo
  const fecharVideo = () => {
    setVideoModal(false)
    setCurrentVideo(null)
  }

  // Função para fechar o modal de detalhes
  const fecharDetalhes = () => {
    setDetalhesModal(false)
    setConteudoDetalhado(null)
  }

  // Função para abrir artigo em nova aba
  const abrirArtigo = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // Função para formatar data
  const formatarData = (dataString) => {
    try {
      const data = new Date(dataString)
      return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    } catch (err) {
      return 'Data inválida'
    }
  }

  // Loading state
  if (loading && conteudos.length === 0) {
    return (
      <div className="min-h-screen bg-rural-gradient flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Carregando conteúdos educacionais...</p>
        </div>
      </div>
    )
  }

  // Error state (apenas para erros críticos)
  if (error && conteudos.length === 0) {
    return (
      <div className="min-h-screen bg-rural-gradient flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 mb-4">❌</div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Erro ao carregar conteúdos</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => buscarConteudos()} className="bg-field-gradient">
            Tentar Novamente
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-rural-gradient">
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
                 <span className="text-emphasis"> Transforma o Campo</span>
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
                src="/images/education/agriculture-education.jpg" 
                alt="Educação Rural - Aprendizado no campo" 
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="bg-gradient-to-br from-blue-400 to-green-500 rounded-2xl shadow-2xl w-full h-80 flex items-center justify-center text-white" style={{display: 'none'}}>
                <div className="text-center">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-semibold">Educação Rural</p>
                  <p className="text-sm opacity-80">Conhecimento que Transforma</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="text-3xl font-bold text-primary mb-2">{conteudos.length}+</div>
              <div className="text-muted-foreground">Conteúdos Disponíveis</div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="text-3xl font-bold text-accent-foreground mb-2">{cursosVideo.length}+</div>
              <div className="text-muted-foreground">Vídeos Educativos</div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="text-3xl font-bold text-chart-4 mb-2">{artigosTexto.length}+</div>
              <div className="text-muted-foreground">Artigos e Textos</div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="text-3xl font-bold text-chart-2 mb-2">24/7</div>
              <div className="text-muted-foreground">Acesso Livre</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros de Conteúdo */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {['TODOS', 'VIDEO', 'TEXTO'].map((tipo) => (
              <Button
                key={tipo}
                variant={filtroAtivo === tipo ? "default" : "outline"}
                onClick={() => filtrarPorTipo(tipo)}
                disabled={loading}
                className="transition-all duration-300"
              >
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {tipo === 'TODOS' ? 'Todos os Conteúdos' : 
                 tipo === 'VIDEO' ? 'Vídeos' : 'Artigos'}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Cursos em Vídeo */}
      {cursosVideo.length > 0 && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Vídeos Educacionais
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Aprenda através de vídeos práticos e didáticos sobre agricultura familiar.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {cursosVideo.map((conteudo, index) => (
                <Card key={`video-${index}`} className="animate-grow-in hover:shadow-lg transition-all duration-300" style={{animationDelay: `${index * 0.1}s`}}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {conteudo.categoriaConteudo}
                          </Badge>
                          <Badge variant="default" className="text-xs">
                            Vídeo
                          </Badge>
                        </div>
                        <CardTitle className="text-lg mb-2">{conteudo.titulo}</CardTitle>
                        <CardDescription className="text-sm">
                          {conteudo.descricao}
                        </CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Atualizado: {formatarData(conteudo.ultimaAtualizacao)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        onClick={() => abrirVideo(conteudo)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Assistir
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => buscarDetalhesConteudo(conteudo.id)}
                        disabled={loadingDetalhes}
                      >
                        {loadingDetalhes ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Modal de Detalhes do Conteúdo - Novo */}
      {detalhesModal && conteudoDetalhado && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-xl font-bold text-foreground">Detalhes do Conteúdo</h3>
                <p className="text-muted-foreground text-sm">ID: {conteudoDetalhado.id || 'N/A'}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={fecharDetalhes}
                className="hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">
                      {conteudoDetalhado.categoriaConteudo}
                    </Badge>
                    <Badge variant={conteudoDetalhado.tipoConteudo === 'VIDEO' ? 'default' : 'secondary'}>
                      {conteudoDetalhado.tipoConteudo}
                    </Badge>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {conteudoDetalhado.titulo}
                  </h4>
                  <p className="text-muted-foreground">
                    {conteudoDetalhado.descricao}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-foreground">Tipo:</span>
                      <p className="text-muted-foreground">{conteudoDetalhado.tipoConteudo}</p>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Categoria:</span>
                      <p className="text-muted-foreground">{conteudoDetalhado.categoriaConteudo}</p>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Última Atualização:</span>
                      <p className="text-muted-foreground">{formatarData(conteudoDetalhado.ultimaAtualizacao)}</p>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Status:</span>
                      <p className="text-green-600">✅ Disponível</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <span className="font-medium text-foreground">Link do Arquivo:</span>
                  <p className="text-muted-foreground text-xs break-all mt-1">
                    {conteudoDetalhado.urlArquivo}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t bg-gray-50">
              <div className="flex gap-3">
                <Button 
                  onClick={() => {
                    if (conteudoDetalhado.tipoConteudo === 'VIDEO') {
                      fecharDetalhes()
                      abrirVideo(conteudoDetalhado)
                    } else {
                      abrirArtigo(conteudoDetalhado.urlArquivo)
                    }
                  }}
                  className="flex-1"
                >
                  {conteudoDetalhado.tipoConteudo === 'VIDEO' ? (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Assistir Vídeo
                    </>
                  ) : (
                    <>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Ler Artigo
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={fecharDetalhes}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Vídeo */}
      {videoModal && currentVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden animate-fade-in-up">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-xl font-bold text-foreground">{currentVideo.titulo}</h3>
                <p className="text-muted-foreground text-sm">{currentVideo.categoria}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={fecharVideo}
                className="hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="relative aspect-video">
              <iframe
                src={currentVideo.videoUrl}
                title={currentVideo.titulo}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
            
            <div className="p-6 border-t bg-gray-50">
              <p className="text-sm text-muted-foreground mb-4">
                {currentVideo.descricao}
              </p>
              <div className="flex gap-3">
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Material
                </Button>
                <Button size="sm" variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Notas do Curso
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Artigos e Pesquisas - UNIFICADO */}
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
            {/* Artigos da API (tipo TEXTO) */}
            {artigosTexto.map((artigo, index) => (
              <Card key={`api-texto-${index}`} className="animate-fade-in-up hover:shadow-lg transition-shadow cursor-pointer" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {artigo.categoriaConteudo}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatarData(artigo.ultimaAtualizacao)}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{artigo.titulo}</CardTitle>
                  <CardDescription>
                    {artigo.descricao}
                  </CardDescription>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>📡 Conteúdo Digital</span>
                      <Badge variant="secondary" className="text-xs px-2 py-0">
                        Online
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between hover:bg-primary/10 transition-colors"
                    onClick={() => abrirArtigo(artigo.urlArquivo)}
                  >
                    Ler Artigo
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}

            {/* Artigos Estáticos */}
            {artigosEstaticos.map((artigo, index) => (
              <Card key={`estatico-${index}`} className="animate-fade-in-up hover:shadow-lg transition-shadow cursor-pointer" style={{animationDelay: `${(artigosTexto.length + index) * 0.1}s`}}>
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
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Por: {artigo.autor}</span>
                      <span>{new Date(artigo.dataPublicacao).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {artigo.tags.slice(0, 2).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs px-2 py-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between hover:bg-primary/10 transition-colors"
                    onClick={() => abrirArtigo(artigo.url)}
                  >
                    Ler Artigo
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quando não há conteúdos */}
      {conteudos.length === 0 && !loading && (
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-md mx-auto">
              <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Nenhum conteúdo encontrado
              </h3>
              <p className="text-muted-foreground mb-6">
                Não foram encontrados conteúdos educacionais. Tente novamente ou entre em contato conosco.
              </p>
              <Button onClick={() => buscarConteudos()} className="bg-field-gradient">
                Recarregar Conteúdos
              </Button>
            </div>
          </div>
        </section>
      )}

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

