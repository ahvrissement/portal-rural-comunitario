import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card.jsx";
import { Badge } from "./ui/badge.jsx";
import { Button } from "./ui/button.jsx";
import { 
  Download, 
  Upload, 
  RefreshCw, 
  Wifi, 
  WifiOff, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  HardDrive,
  Cloud,
  Loader2,
  Calendar,
  Database
} from 'lucide-react'

const OfflineManager = () => {
  // Estados para sincronização
  const [sincronizando, setSincronizando] = useState(false)
  const [ultimaSincronizacao, setUltimaSincronizacao] = useState(null)
  const [conteudosOffline, setConteudosOffline] = useState([])
  const [conteudosNovos, setConteudosNovos] = useState([])
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Mock data para desenvolvimento
  const mockConteudosOffline = [
    {
      titulo: "Agricultura Familiar Offline",
      descricao: "Conteúdo salvo localmente sobre agricultura familiar.",
      tipoConteudo: "VIDEO",
      categoriaConteudo: "EDUCACAO",
      urlArquivo: "local://video1.mp4",
      ultimaAtualizacao: "2024-06-01T10:00:00Z",
      status: "sincronizado"
    },
    {
      titulo: "Guia de Compostagem",
      descricao: "Manual completo sobre compostagem disponível offline.",
      tipoConteudo: "TEXTO",
      categoriaConteudo: "EDUCACAO",
      urlArquivo: "local://compostagem.pdf",
      ultimaAtualizacao: "2024-05-28T15:30:00Z",
      status: "sincronizado"
    }
  ]

  // Detectar status online/offline
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Carregar dados do localStorage ao montar componente
  useEffect(() => {
    carregarDadosOffline()
  }, [])

  // Carregar dados salvos localmente
  const carregarDadosOffline = () => {
    try {
      const dadosSalvos = localStorage.getItem('conteudos-offline')
      const ultimaSync = localStorage.getItem('ultima-sincronizacao')
      
      if (dadosSalvos) {
        setConteudosOffline(JSON.parse(dadosSalvos))
      } else {
        // Usar mock data se não houver dados salvos
        setConteudosOffline(mockConteudosOffline)
        localStorage.setItem('conteudos-offline', JSON.stringify(mockConteudosOffline))
      }
      
      if (ultimaSync) {
        setUltimaSincronizacao(new Date(ultimaSync))
      }
    } catch (err) {
      console.error('Erro ao carregar dados offline:', err)
      setConteudosOffline(mockConteudosOffline)
    }
  }

  // Função principal de sincronização - GET /conteudo/sync
  const sincronizarConteudos = async () => {
    if (!isOnline) {
      alert('Você precisa estar online para sincronizar!')
      return
    }

    setSincronizando(true)
    setError(null)
    setLoading(true)

    try {
      // Determinar data da última sincronização
      const dataDesde = ultimaSincronizacao 
        ? ultimaSincronizacao.toISOString() 
        : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 dias atrás

      console.log('Sincronizando conteúdos desde:', dataDesde)

      // Fazer requisição para /conteudo/sync
      const response = await fetch(`/conteudo/sync?desde=${encodeURIComponent(dataDesde)}`, {
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

      const conteudosNovosApi = await response.json()
      console.log('Conteúdos novos da API:', conteudosNovosApi)

      // Processar conteúdos novos
      if (Array.isArray(conteudosNovosApi) && conteudosNovosApi.length > 0) {
        setConteudosNovos(conteudosNovosApi)
        
        // Mesclar com conteúdos existentes
        const conteudosAtualizados = [...conteudosOffline]
        
        conteudosNovosApi.forEach(novoConteudo => {
          const indiceExistente = conteudosAtualizados.findIndex(
            c => c.titulo === novoConteudo.titulo
          )
          
          if (indiceExistente >= 0) {
            // Atualizar conteúdo existente
            conteudosAtualizados[indiceExistente] = {
              ...novoConteudo,
              status: 'atualizado'
            }
          } else {
            // Adicionar novo conteúdo
            conteudosAtualizados.push({
              ...novoConteudo,
              status: 'novo'
            })
          }
        })
        
        setConteudosOffline(conteudosAtualizados)
        
        // Salvar no localStorage
        localStorage.setItem('conteudos-offline', JSON.stringify(conteudosAtualizados))
      } else {
        setConteudosNovos([])
      }

      // Atualizar timestamp da última sincronização
      const agora = new Date()
      setUltimaSincronizacao(agora)
      localStorage.setItem('ultima-sincronizacao', agora.toISOString())

    } catch (err) {
      console.warn('Erro ao sincronizar da API, usando mock:', err.message)
      
      // Fallback: simular novos conteúdos
      const mockNovos = [
        {
          titulo: "Novo Conteúdo Simulado",
          descricao: "Conteúdo de exemplo para testar sincronização.",
          tipoConteudo: "VIDEO",
          categoriaConteudo: "EDUCACAO",
          urlArquivo: "https://www.youtube.com/embed/test",
          ultimaAtualizacao: new Date().toISOString(),
          status: 'novo'
        }
      ]
      
      setConteudosNovos(mockNovos)
      const conteudosAtualizados = [...conteudosOffline, ...mockNovos]
      setConteudosOffline(conteudosAtualizados)
      localStorage.setItem('conteudos-offline', JSON.stringify(conteudosAtualizados))
      
      const agora = new Date()
      setUltimaSincronizacao(agora)
      localStorage.setItem('ultima-sincronizacao', agora.toISOString())
      
      setError('API não disponível. Dados simulados foram adicionados.')
    } finally {
      setSincronizando(false)
      setLoading(false)
    }
  }

  // Limpar cache offline
  const limparCache = () => {
    if (confirm('Tem certeza que deseja limpar todos os dados offline? Esta ação não pode ser desfeita.')) {
      localStorage.removeItem('conteudos-offline')
      localStorage.removeItem('ultima-sincronizacao')
      setConteudosOffline([])
      setConteudosNovos([])
      setUltimaSincronizacao(null)
    }
  }

  // Baixar conteúdo específico para offline
  const baixarParaOffline = async (conteudo) => {
    // Esta funcionalidade seria implementada com Service Workers
    // Por agora, vamos simular
    alert(`Baixando "${conteudo.titulo}" para acesso offline... (Funcionalidade em desenvolvimento)`)
  }

  // Função para formatar data
  const formatarData = (dataString) => {
    try {
      const data = new Date(dataString)
      return data.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (err) {
      return 'Data inválida'
    }
  }

  // Calcular estatísticas
  const estatisticas = {
    total: conteudosOffline.length,
    videos: conteudosOffline.filter(c => c.tipoConteudo === 'VIDEO').length,
    textos: conteudosOffline.filter(c => c.tipoConteudo === 'TEXTO').length,
    novos: conteudosNovos.length,
    tamanhoEstimado: conteudosOffline.length * 15 // MB estimado
  }

  return (
  <div className="bg-rural-gradient">
      {/* Header */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant={isOnline ? "default" : "destructive"} className="mb-4">
                {isOnline ? <Wifi className="h-4 w-4 mr-2" /> : <WifiOff className="h-4 w-4 mr-2" />}
                {isOnline ? 'Online' : 'Offline'}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Gerenciador 
               <span className="text-emphasis"> Offline</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Sincronize e gerencie conteúdos para acesso offline. 
              Mantenha-se atualizado mesmo sem conexão à internet.
            </p>
          </div>
        </div>
      </section>

      {/* Status da Sincronização */}
      <section className="py-12 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Database className="h-5 w-5 text-primary" />
                  <Badge variant="outline">{estatisticas.total}</Badge>
                </div>
                <CardTitle className="text-sm">Conteúdos Offline</CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <RefreshCw className="h-5 w-5 text-accent-foreground" />
                  <Badge variant="outline">{estatisticas.novos}</Badge>
                </div>
                <CardTitle className="text-sm">Novos Conteúdos</CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <HardDrive className="h-5 w-5 text-chart-4" />
                  <Badge variant="outline">{estatisticas.tamanhoEstimado}MB</Badge>
                </div>
                <CardTitle className="text-sm">Espaço Usado</CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Clock className="h-5 w-5 text-chart-2" />
                  <Badge variant={ultimaSincronizacao ? "default" : "destructive"}>
                    {ultimaSincronizacao ? "Sync OK" : "Nunca"}
                  </Badge>
                </div>
                <CardTitle className="text-sm">Última Sync</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Ações de Sincronização */}
          <div className="text-center mb-8">
            <div className="space-y-4">
              {ultimaSincronizacao && (
                <p className="text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Última sincronização: {formatarData(ultimaSincronizacao)}
                </p>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={sincronizarConteudos}
                  disabled={sincronizando || !isOnline}
                  className="bg-field-gradient"
                >
                  {sincronizando ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sincronizando...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sincronizar Agora
                    </>
                  )}
                </Button>
                
                <Button variant="outline" onClick={limparCache}>
                  <Database className="h-4 w-4 mr-2" />
                  Limpar Cache
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdos Novos */}
      {conteudosNovos.length > 0 && (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              📥 Conteúdos Novos Sincronizados
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conteudosNovos.map((conteudo, index) => (
                <Card key={index} className="animate-fade-in-up border-green-200 bg-green-50/50">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="default" className="bg-green-500">
                        {conteudo.tipoConteudo}
                      </Badge>
                      <Badge variant="outline" className="text-green-600">
                        Novo
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{conteudo.titulo}</CardTitle>
                    <CardDescription>{conteudo.descricao}</CardDescription>
                    <div className="text-xs text-muted-foreground mt-2">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {formatarData(conteudo.ultimaAtualizacao)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => baixarParaOffline(conteudo)}
                      className="w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Baixar Offline
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Conteúdos Disponíveis Offline */}
      <section className="py-12 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            💾 Conteúdos Disponíveis Offline
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conteudosOffline.map((conteudo, index) => (
              <Card key={index} className="animate-fade-in-up">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">
                      {conteudo.categoriaConteudo}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Badge 
                        variant={conteudo.tipoConteudo === 'VIDEO' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {conteudo.tipoConteudo}
                      </Badge>
                      {conteudo.status === 'sincronizado' && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      {conteudo.status === 'novo' && (
                        <Badge variant="default" className="text-xs bg-blue-500">Novo</Badge>
                      )}
                      {conteudo.status === 'atualizado' && (
                        <Badge variant="default" className="text-xs bg-orange-500">Atualizado</Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{conteudo.titulo}</CardTitle>
                  <CardDescription>{conteudo.descricao}</CardDescription>
                  <div className="text-xs text-muted-foreground mt-2">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {formatarData(conteudo.ultimaAtualizacao)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="default"
                      className="flex-1"
                      onClick={() => {
                        if (conteudo.tipoConteudo === 'VIDEO') {
                          alert(`Reproduzindo: ${conteudo.titulo}`)
                        } else {
                          alert(`Abrindo: ${conteudo.titulo}`)
                        }
                      }}
                    >
                      {conteudo.tipoConteudo === 'VIDEO' ? '▶️ Assistir' : '📖 Ler'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => baixarParaOffline(conteudo)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Status de Erro */}
      {error && (
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  <CardTitle className="text-orange-700">Aviso</CardTitle>
                </div>
                <CardDescription className="text-orange-600">
                  {error}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 bg-field-gradient text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Acesso Garantido, Sempre
            </h3>
            <p className="text-white/90 mb-6">
              Com a sincronização offline, você tem acesso aos conteúdos educacionais 
              mesmo nas áreas com conectividade limitada.
            </p>
            <Button size="lg" variant="secondary">
              <Cloud className="h-5 w-5 mr-2" />
              Configurar Sincronização Automática
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OfflineManager

