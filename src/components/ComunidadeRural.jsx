import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card.jsx";
import { Badge } from "./ui/badge.jsx";
import { Button } from "./ui/button.jsx";
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Calendar,
  MapPin,
  Star,
  TrendingUp,
  User,
  ChevronRight,
  BookOpen,
  Video,
  FileText,
  Headphones,
  FileImage,
  Eye,
  Play,
  Clock,
  Filter,
  Search,
  Loader2,
  AlertCircle,
  Globe,
  Building,
  Stethoscope,
  FileCheck,
  ShoppingBag,
  GraduationCap,
  RefreshCw,
  ArrowRight,
  CheckCircle,
  ThumbsUp,
  MessageSquare,
  MoreVertical,
  Reply,
  Image,
  Send,
  Camera,
  Edit3,
  Trash2,
  Check,
  X
} from 'lucide-react'

const ComunidadeRural = () => {
  // Estados para conteúdos por categoria
  const [conteudosPorCategoria, setConteudosPorCategoria] = useState({})
  const [loadingCategorias, setLoadingCategorias] = useState(false)
  const [errorCategorias, setErrorCategorias] = useState(null)
  const [categoriaAtiva, setCategoriaAtiva] = useState('TODAS')

  // Estados para comunidade
  const [membros, setMembros] = useState([])
  const [discussoes, setDiscussoes] = useState([])
  const [eventos, setEventos] = useState([])
  const [comentarios, setComentarios] = useState([])
  const [novoComentario, setNovoComentario] = useState('')

  // Estados para paginação de comentários
  const [paginaComentarios, setPaginaComentarios] = useState(1)
  const comentariosPorPagina = 3

  // Estados para dropdown e edição
  const [dropdownAberto, setDropdownAberto] = useState(null)
  const [comentarioEditando, setComentarioEditando] = useState(null)
  const [textoEdicao, setTextoEdicao] = useState('')
  const dropdownRef = useRef(null)

  // Estados para modal de vídeo - ADICIONAR
  const [videoModalAberto, setVideoModalAberto] = useState(false)
  const [videoAtual, setVideoAtual] = useState(null)

  // Estado para animação de like - EXPANDIDO
  const [likesAnimando, setLikesAnimando] = useState(new Set())
  const [likesConteudo, setLikesConteudo] = useState(new Map()) // Para controlar likes dos conteúdos

  // Mock data para conteúdos por categoria
  const mockConteudosPorCategoria = {
    EDUCACAO: [
      {
        titulo: "Técnicas de Agricultura Sustentável",
        descricao: "Aprenda métodos ecológicos para melhorar a produtividade.",
        tipoConteudo: "VIDEO",
        categoriaConteudo: "EDUCACAO",
        urlArquivo: "https://www.youtube.com/embed/0bJ_M9S9GBE?si=vQKsggbHr5H7Il0l",
        ultimaAtualizacao: "2025-06-10T10:00:00Z"
      },
      {
        titulo: "Manual de Compostagem",
        descricao: "Guia completo para criar compostagem orgânica.",
        tipoConteudo: "TEXTO",
        categoriaConteudo: "EDUCACAO",
        urlArquivo: "https://sau.usp.br/wp-content/uploads/sites/646/2023/06/E-bookCompostagemComCienciav2.pdf",
        ultimaAtualizacao: "2025-06-09T15:30:00Z"
      }
    ],
    SAUDE: [
      {
        titulo: "Primeiros Socorros no Campo",
        descricao: "Procedimentos essenciais para emergências rurais.",
        tipoConteudo: "VIDEO",
        categoriaConteudo: "SAUDE",
        urlArquivo: "https://www.youtube.com/embed/KCzYPEy4oLo?si=r_DBb9Sl26e3RLNp",
        ultimaAtualizacao: "2025-06-08T14:20:00Z"
      },
      {
        titulo: "Plantas Medicinais Brasileiras",
        descricao: "Catálogo de plantas com propriedades medicinais.",
        tipoConteudo: "PDF",
        categoriaConteudo: "SAUDE",
        urlArquivo: "https://ciorganicos.com.br/wp-content/uploads/2017/10/A-ENCICLOPEDIA-DAS-PLANTAS-MEDICINAIS.pdf",
        ultimaAtualizacao: "2025-06-07T11:45:00Z"
      }
    ],
    CIDADANIA: [
      {
        titulo: "Direitos do Trabalhador Rural",
        descricao: "Conheça seus direitos e deveres trabalhistas.",
        tipoConteudo: "TEXTO",
        categoriaConteudo: "CIDADANIA",
        urlArquivo: "https://www.trt4.jus.br/portais/media/3020338/Cartilha%20Trabalhador%20Rural%20-%20atualizado%201%20ago.pdf",
        ultimaAtualizacao: "2025-06-06T16:10:00Z"
      }
    ],
    GOVERNO: [
      {
        titulo: "Programas de Crédito Rural",
        descricao: "Linhas de financiamento disponíveis para produtores.",
        tipoConteudo: "INFOGRAFICO",
        categoriaConteudo: "GOVERNO",
        urlArquivo: "https://www.gov.br/pt-br/noticias/agricultura-e-pecuaria/2020/02/28.02InfograficoparaportalCreditorural.png/view",
        ultimaAtualizacao: "2025-06-05T13:30:00Z"
      }
    ],
    COMERCIO_LOCAL: [
      {
        titulo: "Feira do Produtor - Dicas de Venda",
        descricao: "Como vender seus produtos na feira local.",
        tipoConteudo: "AUDIO",
        categoriaConteudo: "COMERCIO_LOCAL",
        urlArquivo: "/audio/feira-produtor.mp3",
        ultimaAtualizacao: "2025-06-04T09:20:00Z"
      }
    ]
  }

  // Mock data para comunidade
  const mockMembros = [
    { id: 1, nome: "João Silva", avatar: "🧑‍🌾", especialidade: "Agricultura Orgânica", membrosDesde: "2023", posts: 45 },
    { id: 2, nome: "Maria Santos", avatar: "👩‍🌾", especialidade: "Pecuária Sustentável", membrosDesde: "2024", posts: 32 },
    { id: 3, nome: "Carlos Oliveira", avatar: "🧑‍🔬", especialidade: "Agronomia", membrosDesde: "2022", posts: 78 }
  ]

  const mockDiscussoes = [
    { 
      id: 1, 
      titulo: "Melhor época para plantar milho?", 
      autor: "Ana Costa", 
      respostas: 12, 
      curtidas: 8, 
      categoria: "EDUCACAO",
      tempo: "2 horas atrás" 
    },
    { 
      id: 2, 
      titulo: "Controle natural de pragas", 
      autor: "Pedro Lima", 
      respostas: 5, 
      curtidas: 15, 
      categoria: "EDUCACAO",
      tempo: "5 horas atrás" 
    }
  ]

  const mockEventos = [
    {
      id: 1,
      titulo: "Workshop de Agricultura Sustentável",
      data: "2025-06-20",
      local: "Centro Comunitário - Zona Rural",
      participantes: 45,
      categoria: "EDUCACAO"
    },
    {
      id: 2,
      titulo: "Feira do Produtor Local",
      data: "2025-06-25",
      local: "Praça Central",
      participantes: 120,
      categoria: "COMERCIO_LOCAL"
    }
  ]

  // Mock data para comentários com imagens da página posts
  const mockComentarios = [
    {
      id: 1,
      autor: "Maria Silva",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
      tempo: "3 horas atrás",
      conteudo: "Excelente iniciativa! Acabei de plantar meu primeiro canteiro de hortaliças usando as técnicas que aprendi aqui. 🌱",
      imagem: "/images/posts/plantacao-horta.jpg",
      curtidas: 24,
      respostas: 5,
      curtido: false,
      categoria: "EDUCACAO",
      tags: ["agricultura", "horta", "sustentabilidade"]
    },
    {
      id: 2,
      autor: "João Santos",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      tempo: "5 horas atrás",
      conteudo: "Pessoal, deem uma olhada de como estava a última feira da comunidade! Foi incrível! Muitas vendas e troca de experiências. 🛒✨",
      imagem: "/images/posts/feira-local.jpg",
      curtidas: 18,
      respostas: 12,
      curtido: true,
      categoria: "EDUCACAO",
      tags: ["irrigação", "economia", "água"]
    },
    {
      id: 3,
      autor: "Ana Costa",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      tempo: "1 dia atrás",
      conteudo: "Compartilho aqui a colheita de hoje! 3 meses de cuidado e dedicação. O resultado foi incrível! 🥕🥬🍅",
      imagem: "/images/posts/tomates-organicos.jpg",
      curtidas: 45,
      respostas: 8,
      curtido: false,
      categoria: "COMERCIO_LOCAL",
      tags: ["colheita", "orgânico", "sucesso"]
    },
    {
      id: 4,
      autor: "Carlos Oliveira",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      tempo: "2 dias atrás",
      conteudo: "Workshop sobre compostagem foi um sucesso! Mais de 50 produtores participaram. Próximo será sobre controle biológico de pragas. 📚",
      imagem: "/images/posts/post-4.jpg",
      curtidas: 67,
      respostas: 15,
      curtido: true,
      categoria: "EDUCACAO",
      tags: ["workshop", "compostagem", "educação"]
    },
    {
      id: 5,
      autor: "Lucia Ferreira",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=50&h=50&fit=crop&crop=face",
      tempo: "3 dias atrás",
      conteudo: "Feira do produtor rural foi um sucesso total! Vendemos tudo em 3 horas. A comunidade realmente valoriza nossos produtos locais! 🛒✨",
      imagem: "/images/posts/post-5.jpg",
      curtidas: 38,
      respostas: 9,
      curtido: false,
      categoria: "COMERCIO_LOCAL",
      tags: ["feira", "vendas", "comunidade"]
    },
    {
      id: 6,
      autor: "Pedro Machado",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      tempo: "4 dias atrás",
      conteudo: "Implementei sistema de captação de água da chuva. Economia de 60% na conta! Recomendo muito. 🌧️💧",
      imagem: "/images/posts/post-6.jpg",
      curtidas: 52,
      respostas: 18,
      curtido: false,
      categoria: "EDUCACAO",
      tags: ["sustentabilidade", "água", "economia"]
    }
  ]

  // Buscar conteúdos por categoria - GET /conteudo/por-categoria
  const buscarConteudosPorCategoria = async () => {
    setLoadingCategorias(true)
    setErrorCategorias(null)

    const categorias = ['EDUCACAO', 'SAUDE', 'CIDADANIA', 'GOVERNO', 'COMERCIO_LOCAL']
    const resultados = {}

    try {
      // Buscar cada categoria
      for (const categoria of categorias) {
        try {
          console.log(`Buscando conteúdos da categoria: ${categoria}`)
          
          const response = await fetch(`/conteudo/por-categoria?categoriaConteudo=${categoria}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // Adicione headers de autenticação se necessário
              // 'Authorization': `Bearer ${token}`
            }
          })

          if (response.ok) {
            const data = await response.json()
            console.log(`Conteúdos ${categoria}:`, data)
            
            // Limitar a 4 itens por categoria na página da comunidade
            resultados[categoria] = Array.isArray(data) ? data.slice(0, 4) : []
          } else {
            console.warn(`Erro ao buscar ${categoria}: ${response.status}`)
            resultados[categoria] = []
          }
        } catch (err) {
          console.warn(`Erro ao buscar ${categoria}:`, err.message)
          resultados[categoria] = []
        }
      }

      // Se não há dados da API, usar mock
      const temDados = Object.values(resultados).some(arr => arr.length > 0)
      if (!temDados) {
        console.log('Usando dados mock para categorias')
        setConteudosPorCategoria(mockConteudosPorCategoria)
      } else {
        setConteudosPorCategoria(resultados)
      }

    } catch (err) {
      console.warn('Erro geral ao buscar categorias, usando mock:', err.message)
      setConteudosPorCategoria(mockConteudosPorCategoria)
      setErrorCategorias('API não disponível. Usando dados de exemplo.')
    } finally {
      setLoadingCategorias(false)
    }
  }

  // Função para curtir conteúdo da categoria - ATUALIZADA
  const curtirConteudo = async (categoriaIndex, conteudoIndex) => {
    const conteudoId = `${categoriaIndex}-${conteudoIndex}`
    
    // Adicionar à lista de animações
    setLikesAnimando(prev => new Set([...prev, conteudoId]))
    
    // Atualizar estado do like do conteúdo (apenas curtido/não curtido)
    setLikesConteudo(prev => {
      const newMap = new Map(prev)
      const currentLikes = newMap.get(conteudoId) || { curtido: false }
      newMap.set(conteudoId, {
        curtido: !currentLikes.curtido
      })
      return newMap
    })

    // Simular delay da API e remover animação
    setTimeout(() => {
      setLikesAnimando(prev => {
        const newSet = new Set(prev)
        newSet.delete(conteudoId)
        return newSet
      })
    }, 600) // Duração da animação
  }

  // Função para curtir comentário - MANTIDA
  const curtirComentario = async (id) => {
    // Adicionar à lista de animações
    setLikesAnimando(prev => new Set([...prev, id]))
    
    // Atualizar estado do comentário
    setComentarios(prev => prev.map(comentario => 
      comentario.id === id 
        ? { 
            ...comentario, 
            curtido: !comentario.curtido,
            curtidas: comentario.curtido ? comentario.curtidas - 1 : comentario.curtidas + 1
          }
        : comentario
    ))

    // Simular delay da API e remover animação
    setTimeout(() => {
      setLikesAnimando(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }, 600) // Duração da animação
  }

  // Função para adicionar novo comentário
  const adicionarComentario = () => {
    if (!novoComentario.trim()) return

    const novoPost = {
      id: Date.now(),
      autor: "Você",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face",
      tempo: "agora",
      conteudo: novoComentario,
      imagem: null,
      curtidas: 0,
      respostas: 0,
      curtido: false,
      categoria: "EDUCACAO",
      tags: ["novo"]
    }

    setComentarios(prev => [novoPost, ...prev])
    setNovoComentario('')
  }

  // Função para filtrar comentários por categoria
  const comentariosFiltrados = categoriaAtiva === 'TODAS' 
    ? comentarios 
    : comentarios.filter(comentario => comentario.categoria === categoriaAtiva)

  // Função para obter comentários da página atual
  const obterComentariosPagina = () => {
    const comentariosFiltrados = categoriaAtiva === 'TODAS' 
      ? comentarios 
      : comentarios.filter(comentario => comentario.categoria === categoriaAtiva)
    
    const inicio = (paginaComentarios - 1) * comentariosPorPagina
    const fim = inicio + comentariosPorPagina
    
    return comentariosFiltrados.slice(inicio, fim)
  }

  // Função para carregar mais comentários
  const carregarMaisComentarios = () => {
    setPaginaComentarios(prev => prev + 1)
  }

  // Verificar se há mais comentários para carregar
  const temMaisComentarios = () => {
    const comentariosFiltrados = categoriaAtiva === 'TODAS' 
      ? comentarios 
      : comentarios.filter(comentario => comentario.categoria === categoriaAtiva)
    
    return comentariosFiltrados.length > paginaComentarios * comentariosPorPagina
  }

  // Reset da página quando categoria muda
  useEffect(() => {
    setPaginaComentarios(1)
  }, [categoriaAtiva])

  // Carregar dados ao montar componente
  useEffect(() => {
    buscarConteudosPorCategoria()
    setMembros(mockMembros)
    setDiscussoes(mockDiscussoes)
    setEventos(mockEventos)
    setComentarios(mockComentarios)
  }, [])

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

  // Função para obter ícone por categoria
  const obterIconePorCategoria = (categoria) => {
    const icones = {
      EDUCACAO: GraduationCap,
      SAUDE: Stethoscope,
      CIDADANIA: FileCheck,
      GOVERNO: Building,
      COMERCIO_LOCAL: ShoppingBag
    }
    return icones[categoria] || BookOpen
  }

  // Função para obter cor por categoria
  const obterCorPorCategoria = (categoria) => {
    const cores = {
      EDUCACAO: 'bg-blue-500',
      SAUDE: 'bg-green-500',
      CIDADANIA: 'bg-purple-500',
      GOVERNO: 'bg-red-500',
      COMERCIO_LOCAL: 'bg-orange-500'
    }
    return cores[categoria] || 'bg-gray-500'
  }

  // Função para obter nome amigável da categoria
  const obterNomeCategoria = (categoria) => {
    const nomes = {
      EDUCACAO: 'Educação',
      SAUDE: 'Saúde',
      CIDADANIA: 'Cidadania',
      GOVERNO: 'Governo',
      COMERCIO_LOCAL: 'Comércio Local'
    }
    return nomes[categoria] || categoria
  }

  // Função para obter ícone por tipo de conteúdo
  const obterIconePorTipo = (tipo) => {
    const icones = {
      VIDEO: Video,
      TEXTO: FileText,
      PDF: FileText,
      AUDIO: Headphones,
      INFOGRAFICO: FileImage
    }
    return icones[tipo] || FileText
  }

  // Filtrar conteúdos por categoria ativa
  const conteudosFiltrados = categoriaAtiva === 'TODAS' 
    ? conteudosPorCategoria 
    : { [categoriaAtiva]: conteudosPorCategoria[categoriaAtiva] || [] }

  // Função para abrir/fechar dropdown
  const toggleDropdown = (comentarioId) => {
    setDropdownAberto(dropdownAberto === comentarioId ? null : comentarioId)
  }

  // Função para iniciar edição
  const iniciarEdicao = (comentario) => {
    setComentarioEditando(comentario.id)
    setTextoEdicao(comentario.conteudo)
    setDropdownAberto(null)
  }

  // Função para cancelar edição
  const cancelarEdicao = () => {
    setComentarioEditando(null)
    setTextoEdicao('')
  }

  // Função para salvar edição
  const salvarEdicao = () => {
    if (!textoEdicao.trim()) return

    setComentarios(prev => prev.map(comentario => 
      comentario.id === comentarioEditando 
        ? { ...comentario, conteudo: textoEdicao.trim() }
        : comentario
    ))
    
    setComentarioEditando(null)
    setTextoEdicao('')
  }

  // Função para excluir comentário
  const excluirComentario = (comentarioId) => {
    if (window.confirm('Tem certeza que deseja excluir este comentário?')) {
      setComentarios(prev => prev.filter(comentario => comentario.id !== comentarioId))
      setDropdownAberto(null)
    }
  }

  // Função para abrir modal de vídeo - ADICIONAR
  const abrirModalVideo = (conteudo) => {
    setVideoAtual(conteudo)
    setVideoModalAberto(true)
  }

  // Função para fechar modal de vídeo - ADICIONAR
  const fecharModalVideo = () => {
    setVideoModalAberto(false)
    setVideoAtual(null)
  }

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownAberto(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="bg-rural-gradient">
      {/* Header com imagem */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Texto do Header */}
            <div className="text-center md:text-left">
              <Badge variant="secondary" className="mb-4 bg-chart-4/20 text-chart-4">
                <Users className="h-4 w-4 mr-2" />
                Comunidade Ativa
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Comunidade 
                <span className="text-emphasis"> Rural</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Conecte-se, compartilhe conhecimento e cresça junto com outros produtores rurais. 
                Uma rede de apoio e aprendizado para o campo.
              </p>
            </div>

            {/* Imagem do Header */}
            <div className="animate-grow-in">
              <img 
                src="/images/community/rural-community.jpg" 
                alt="Comunidade Rural - Conectando produtores" 
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas da Comunidade */}
      <section className="py-12 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-center">
                  <Users className="h-8 w-8 text-chart-4 mb-2" />
                </div>
                <CardTitle className="text-2xl">{mockMembros.length}K+</CardTitle>
                <CardDescription>Membros Ativos</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-center">
                  <MessageCircle className="h-8 w-8 text-blue-500 mb-2" />
                </div>
                <CardTitle className="text-2xl">{mockDiscussoes.length}K+</CardTitle>
                <CardDescription>Discussões</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-green-500 mb-2" />
                </div>
                <CardTitle className="text-2xl">{mockEventos.length}+</CardTitle>
                <CardDescription>Eventos Mensais</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-orange-500 mb-2" />
                </div>
                <CardTitle className="text-2xl">95%</CardTitle>
                <CardDescription>Satisfação</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Filtros de Categoria */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <Button
              variant={categoriaAtiva === 'TODAS' ? "default" : "outline"}
              onClick={() => setCategoriaAtiva('TODAS')}
              disabled={loadingCategorias}
            >
              <Globe className="h-4 w-4 mr-2" />
              Todas as Categorias
            </Button>
            
            {Object.keys(mockConteudosPorCategoria).map((categoria) => {
              const IconeCategoria = obterIconePorCategoria(categoria)
              return (
                <Button
                  key={categoria}
                  variant={categoriaAtiva === categoria ? "default" : "outline"}
                  onClick={() => setCategoriaAtiva(categoria)}
                  disabled={loadingCategorias}
                  className="transition-all duration-300"
                >
                  <IconeCategoria className="h-4 w-4 mr-2" />
                  {obterNomeCategoria(categoria)}
                </Button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Conteúdos por Categoria - COM ANIMAÇÃO DE LIKE SEM NÚMEROS */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              📚 Recursos por Categoria
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore conteúdos organizados por área de interesse. 
              Encontre exatamente o que precisa para sua atividade rural.
            </p>
          </div>

          {loadingCategorias && (
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
                Carregando conteúdos por categoria...
              </div>
            </div>
          )}

          {errorCategorias && (
            <div className="text-center py-4 mb-8">
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <div className="flex items-center justify-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    <CardTitle className="text-orange-700">Aviso</CardTitle>
                  </div>
                  <CardDescription className="text-orange-600">
                    {errorCategorias}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          )}

          {!loadingCategorias && Object.keys(conteudosFiltrados).length > 0 && (
            <div className="space-y-12">
              {Object.entries(conteudosFiltrados).map(([categoria, conteudos], categoriaIndex) => {
                if (!conteudos || conteudos.length === 0) return null
                
                const IconeCategoria = obterIconePorCategoria(categoria)
                
                return (
                  <div key={categoria} className="animate-fade-in-up" style={{animationDelay: `${categoriaIndex * 0.1}s`}}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg ${obterCorPorCategoria(categoria)}`}>
                          <IconeCategoria className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">
                            {obterNomeCategoria(categoria)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {conteudos.length} conteúdo{conteudos.length !== 1 ? 's' : ''} disponível{conteudos.length !== 1 ? 'is' : ''}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        Ver todos
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {conteudos.map((conteudo, index) => {
                        const IconeTipo = obterIconePorTipo(conteudo.tipoConteudo)
                        const conteudoId = `${categoriaIndex}-${index}`
                        const likeData = likesConteudo.get(conteudoId) || { curtido: false }
                        
                        return (
                          <Card key={index} className="animate-grow-in hover:shadow-lg transition-all duration-300" style={{animationDelay: `${(categoriaIndex * 3 + index) * 0.05}s`}}>
                            <CardHeader>
                              <div className="flex items-start justify-between mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {obterNomeCategoria(conteudo.categoriaConteudo)}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <IconeTipo className="h-4 w-4 text-muted-foreground" />
                                  <Badge variant="secondary" className="text-xs">
                                    {conteudo.tipoConteudo}
                                  </Badge>
                                </div>
                              </div>
                              <CardTitle className="text-lg leading-tight">{conteudo.titulo}</CardTitle>
                              <CardDescription className="text-sm">
                                {conteudo.descricao}
                              </CardDescription>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3">
                                <Clock className="h-3 w-3" />
                                {formatarData(conteudo.ultimaAtualizacao)}
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  className="flex-1"
                                  onClick={() => {
                                    if (conteudo.tipoConteudo === 'VIDEO') {
                                      abrirModalVideo(conteudo)
                                    } else {
                                      window.open(conteudo.urlArquivo, '_blank', 'noopener,noreferrer')
                                    }
                                  }}
                                >
                                  {conteudo.tipoConteudo === 'VIDEO' ? (
                                    <>
                                      <Play className="h-4 w-4 mr-2" />
                                      Assistir
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="h-4 w-4 mr-2" />
                                      Acessar
                                    </>
                                  )}
                                </Button>
                                
                                {/* BOTÃO DE LIKE APENAS COM ANIMAÇÃO - SEM NÚMEROS */}
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => curtirConteudo(categoriaIndex, index)}
                                  className={`relative overflow-hidden transition-all duration-300 ${
                                    likeData.curtido 
                                      ? 'text-red-500 hover:text-red-600 bg-red-50 border-red-200' 
                                      : 'text-muted-foreground hover:text-red-500 hover:bg-red-50'
                                  }`}
                                  title={likeData.curtido ? 'Curtido!' : 'Curtir'}
                                >
                                  {/* Efeito de ondas no clique */}
                                  {likesAnimando.has(conteudoId) && (
                                    <>
                                      {/* Onda 1 */}
                                      <div className="absolute inset-0 rounded-md bg-red-500/20 animate-ping" />
                                      {/* Onda 2 */}
                                      <div className="absolute inset-0 rounded-md bg-red-500/10 animate-ping" style={{animationDelay: '0.1s'}} />
                                      {/* Onda 3 */}
                                      <div className="absolute inset-0 rounded-md bg-red-500/5 animate-ping" style={{animationDelay: '0.2s'}} />
                                    </>
                                  )}
                                  
                                  {/* Ícone do coração com animação - SEM CONTADOR */}
                                  <Heart 
                                    className={`h-4 w-4 relative z-10 transition-all duration-300 ${
                                      likeData.curtido ? 'fill-current scale-110' : ''
                                    } ${
                                      likesAnimando.has(conteudoId) 
                                        ? 'animate-bounce scale-125' 
                                        : ''
                                    }`} 
                                  />

                                  {/* Partículas de coração voando */}
                                  {likesAnimando.has(conteudoId) && likeData.curtido && (
                                    <>
                                      {[...Array(4)].map((_, i) => (
                                        <div
                                          key={i}
                                          className="absolute pointer-events-none"
                                          style={{
                                            left: `${15 + Math.random() * 30}%`,
                                            top: `${20 + Math.random() * 30}%`,
                                            animation: `floatUp 0.6s ease-out forwards`,
                                            animationDelay: `${i * 0.08}s`
                                          }}
                                        >
                                          <Heart 
                                            className="h-2 w-2 text-red-500 fill-current" 
                                            style={{
                                              transform: `rotate(${Math.random() * 360}deg)`
                                            }}
                                          />
                                        </div>
                                      ))}
                                    </>
                                  )}
                                </Button>
                                
                                <Button variant="outline" size="sm">
                                  <Share2 className="h-4 w-4" />
                                </Button>
                              </div>

                              {/* REMOVER SEÇÃO DE ESTATÍSTICAS */}
                              {/* Seção de estatísticas removida completamente */}
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {!loadingCategorias && Object.keys(conteudosFiltrados).length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h4 className="text-xl font-semibold text-foreground mb-2">
                Nenhum conteúdo encontrado
              </h4>
              <p className="text-muted-foreground mb-6">
                Não foram encontrados conteúdos para esta categoria.
              </p>
              <Button onClick={buscarConteudosPorCategoria} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Tentar Novamente
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Discussões Recentes */}
      <section className="py-12 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              💬 Discussões Recentes
            </h2>
            <p className="text-muted-foreground">
              Participe das conversas da comunidade
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mockDiscussoes.map((discussao, index) => (
              <Card key={discussao.id} className="animate-fade-in-up cursor-pointer hover:shadow-lg transition-shadow" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{discussao.titulo}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Por: {discussao.autor}</span>
                        <span>{discussao.tempo}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {obterNomeCategoria(discussao.categoria)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {discussao.respostas} respostas
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {discussao.curtidas}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Participar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline">
              Ver Todas as Discussões
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Eventos da Comunidade */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              📅 Próximos Eventos
            </h2>
            <p className="text-muted-foreground">
              Participe dos eventos da sua região
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mockEventos.map((evento, index) => (
              <Card key={evento.id} className="animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{evento.titulo}</CardTitle>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(evento.data).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {evento.local}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {evento.participantes} participantes
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {obterNomeCategoria(evento.categoria)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Participar do Evento
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feed da Comunidade - COM ANIMAÇÃO DE LIKE */}
      <section className="py-12 px-4 bg-white/30">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              💬 Feed da Comunidade
            </h2>
            <p className="text-muted-foreground">
              Veja o que está acontecendo na nossa comunidade rural
            </p>
          </div>

          {/* Caixa para novo comentário */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face" 
                  alt="Seu avatar" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <textarea
                    value={novoComentario}
                    onChange={(e) => setNovoComentario(e.target.value)}
                    placeholder="Compartilhe suas experiências, dúvidas ou sucessos..."
                    className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Camera className="h-4 w-4 mr-1" />
                        Foto
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Image className="h-4 w-4 mr-1" />
                        Galeria
                      </Button>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={adicionarComentario}
                      disabled={!novoComentario.trim()}
                      className="bg-field-gradient"
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Publicar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de comentários com ANIMAÇÃO DE LIKE */}
          <div className="space-y-6">
            {obterComentariosPagina().map((comentario, index) => (
              <Card key={comentario.id} className="animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="pt-6">
                  {/* Header do comentário com dropdown */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={comentario.avatar} 
                        alt={comentario.autor}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">{comentario.autor}</h4>
                          <Badge variant="outline" className="text-xs">
                            {obterNomeCategoria(comentario.categoria)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {comentario.tempo}
                        </p>
                      </div>
                    </div>
                    
                    {/* Dropdown de ações */}
                    <div className="relative" ref={dropdownRef}>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleDropdown(comentario.id)}
                        className="hover:bg-muted"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                      
                      {dropdownAberto === comentario.id && (
                        <div className="absolute right-0 top-8 bg-white border border-border rounded-lg shadow-lg z-10 min-w-[120px] animate-fade-in-up">
                          <div className="py-1">
                            <button
                              onClick={() => iniciarEdicao(comentario)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                            >
                              <Edit3 className="h-4 w-4" />
                              Editar
                            </button>
                            <button
                              onClick={() => excluirComentario(comentario.id)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                              Excluir
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Conteúdo do comentário - Editável */}
                  <div className="mb-4">
                    {comentarioEditando === comentario.id ? (
                      // Modo de edição
                      <div className="space-y-3">
                        <textarea
                          value={textoEdicao}
                          onChange={(e) => setTextoEdicao(e.target.value)}
                          className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                          rows={3}
                          placeholder="Edite seu comentário..."
                        />
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={salvarEdicao}
                            disabled={!textoEdicao.trim()}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Salvar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={cancelarEdicao}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // Modo de visualização
                      <>
                        <p className="text-foreground leading-relaxed mb-3">
                          {comentario.conteudo}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {comentario.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Imagem do comentário */}
                        {comentario.imagem && (
                          <div className="rounded-lg overflow-hidden mb-3">
                            <img 
                              src={comentario.imagem} 
                              alt="Imagem do post"
                              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                              onClick={() => {
                                window.open(comentario.imagem, '_blank')
                              }}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Ações do comentário - Só mostrar se não estiver editando */}
                  {comentarioEditando !== comentario.id && (
                    <>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-4">
                          {/* BOTÃO DE LIKE COM ANIMAÇÃO */}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => curtirComentario(comentario.id)}
                            className={`relative overflow-hidden transition-all duration-300 ${
                              comentario.curtido 
                                ? 'text-red-500 hover:text-red-600 bg-red-50' 
                                : 'text-muted-foreground hover:text-red-500 hover:bg-red-50'
                            }`}
                          >
                            {/* Efeito de ondas no clique */}
                            {likesAnimando.has(comentario.id) && (
                              <>
                                {/* Onda 1 */}
                                <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
                                {/* Onda 2 */}
                                <div className="absolute inset-0 rounded-full bg-red-500/10 animate-ping" style={{animationDelay: '0.1s'}} />
                                {/* Onda 3 */}
                                <div className="absolute inset-0 rounded-full bg-red-500/5 animate-ping" style={{animationDelay: '0.2s'}} />
                              </>
                            )}
                            
                            {/* Ícone do coração com animação */}
                            <Heart 
                              className={`h-4 w-4 mr-1 relative z-10 transition-all duration-300 ${
                                comentario.curtido ? 'fill-current scale-110' : ''
                              } ${
                                likesAnimando.has(comentario.id) 
                                  ? 'animate-bounce scale-125' 
                                  : ''
                              }`} 
                            />
                            
                            {/* Contador com animação */}
                            <span className={`relative z-10 transition-all duration-300 ${
                              likesAnimando.has(comentario.id) ? 'scale-110 font-semibold' : ''
                            }`}>
                              {comentario.curtidas} Curtidas
                            </span>

                            {/* Partículas de coração voando */}
                            {likesAnimando.has(comentario.id) && comentario.curtido && (
                              <>
                                {[...Array(6)].map((_, i) => (
                                  <div
                                    key={i}
                                    className="absolute pointer-events-none"
                                    style={{
                                      left: `${20 + Math.random() * 40}%`,
                                      top: `${30 + Math.random() * 40}%`,
                                      animation: `floatUp 0.8s ease-out forwards`,
                                      animationDelay: `${i * 0.1}s`
                                    }}
                                  >
                                    <Heart 
                                      className="h-3 w-3 text-red-500 fill-current" 
                                      style={{
                                        transform: `rotate(${Math.random() * 360}deg)`
                                      }}
                                    />
                                  </div>
                                ))}
                              </>
                            )}
                          </Button>
                          
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500 transition-colors">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {comentario.respostas} Comentários
                          </Button>
                          
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500 transition-colors">
                            <Share2 className="h-4 w-4 mr-1" />
                            Compartilhar
                          </Button>
                        </div>

                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary transition-colors">
                          <Reply className="h-4 w-4 mr-1" />
                          Responder
                        </Button>
                      </div>

                      {/* Preview de respostas */}
                      {comentario.respostas > 0 && (
                        <div className="mt-4 pl-4 border-l-2 border-primary/20">
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                            Ver {comentario.respostas} resposta{comentario.respostas !== 1 ? 's' : ''}
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Botão carregar mais - ATUALIZADO PARA PAGINAÇÃO */}
          <div className="text-center mt-8">
            {temMaisComentarios() ? (
              <Button variant="outline" size="lg" onClick={carregarMaisComentarios}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Carregar Mais Posts ({comentariosPorPagina} de {categoriaAtiva === 'TODAS' ? comentarios.length : comentarios.filter(c => c.categoria === categoriaAtiva).length})
              </Button>
            ) : (
              <p className="text-muted-foreground text-sm">
                ✅ Todos os posts foram carregados
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Membros Destacados */}
      <section className="py-12 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              🌟 Membros Destacados
            </h2>
            <p className="text-muted-foreground">
              Conheça os especialistas da nossa comunidade
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {mockMembros.map((membro, index) => (
              <Card key={membro.id} className="animate-fade-in-up text-center" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="text-4xl mb-4">{membro.avatar}</div>
                  <CardTitle className="text-lg">{membro.nome}</CardTitle>
                  <CardDescription>{membro.especialidade}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center gap-4 text-sm text-muted-foreground mb-4">
                    <div>
                      <div className="font-semibold text-foreground">{membro.posts}</div>
                      <div>Posts</div>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{membro.membrosDesde}</div>
                      <div>Membro desde</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    Ver Perfil
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-field-gradient text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Faça Parte da Nossa Comunidade
            </h3>
            <p className="text-white/90 mb-6">
              Conecte-se com outros produtores, compartilhe experiências e 
              cresça junto com a maior rede rural do Brasil.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Users className="h-5 w-5 mr-2" />
                Participar Agora
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <MessageCircle className="h-5 w-5 mr-2" />
                Iniciar Discussão
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Vídeo - ADICIONAR */}
      {videoModalAberto && videoAtual && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {videoAtual.titulo}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {obterNomeCategoria(videoAtual.categoriaConteudo)}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={fecharModalVideo}
                className="hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6">
              {/* Player de Vídeo */}
              <div className="aspect-video mb-4 bg-black rounded-lg overflow-hidden">
                <iframe
                  src={videoAtual.urlArquivo}
                  title={videoAtual.titulo}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Informações do Vídeo */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Descrição</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {videoAtual.descricao}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formatarData(videoAtual.ultimaAtualizacao)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Video className="h-4 w-4" />
                    {videoAtual.tipoConteudo}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {obterNomeCategoria(videoAtual.categoriaConteudo)}
                  </Badge>
                </div>

                {/* Ações do Vídeo */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    Curtir
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Comentar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay para fechar modal clicando fora */}
      {videoModalAberto && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={fecharModalVideo}
        />
      )}
    </div>
  )

  // Fechar modal com ESC - ADICIONAR useEffect
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        if (videoModalAberto) {
          fecharModalVideo()
        }
        if (comentarioEditando) {
          cancelarEdicao()
        }
        if (dropdownAberto) {
          setDropdownAberto(null)
        }
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [videoModalAberto, comentarioEditando, dropdownAberto])
}

export default ComunidadeRural

// CSS personalizado para animações - ATUALIZADO
const style = document.createElement('style')
style.textContent = `
  @keyframes floatUp {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1) rotate(0deg);
    }
    50% {
      opacity: 0.8;
      transform: translateY(-15px) scale(1.2) rotate(180deg);
    }
    100% {
      opacity: 0;
      transform: translateY(-30px) scale(0.5) rotate(360deg);
    }
  }

  @keyframes heartBeat {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  @keyframes heartPulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
    }
    70% {
      transform: scale(1.05);
      box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
    }
  }

  .heart-liked {
    animation: heartBeat 0.3s ease-in-out;
  }

  .like-button:hover .heart-icon {
    transform: scale(1.05);
    transition: transform 0.2s ease;
  }

  .like-ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(239, 68, 68, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  /* Animação específica para cards de conteúdo */
  .content-like-button {
    position: relative;
    overflow: hidden;
  }

  .content-like-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .content-like-button.liked {
    animation: heartPulse 0.6s ease-in-out;
  }
`
document.head.appendChild(style)

