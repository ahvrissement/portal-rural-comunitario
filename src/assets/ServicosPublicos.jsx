import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { 
  FileText, 
  CreditCard, 
  MapPin, 
  Phone,
  Globe,
  Shield,
  Clock,
  CheckCircle,
  ExternalLink,
  Download,
  Search
} from 'lucide-react'

const ServicosPublicos = () => {
  const servicos = [
    {
      titulo: "Cadastro de Imóveis Rurais (CAFIR)",
      descricao: "Inscreva, atualize, cancele ou reative o CIB do seu imóvel rural no sistema nacional.",
      orgao: "Receita Federal",
      categoria: "Documentação",
      disponivel: true,
      online: true
    },
    {
      titulo: "Programa Nacional de Alimentação Escolar (PNAE)",
      descricao: "Participe do programa que conecta agricultura familiar com alimentação escolar.",
      orgao: "FNDE/MEC",
      categoria: "Agricultura Familiar",
      disponivel: true,
      online: true
    },
    {
      titulo: "PRONAF - Crédito Rural",
      descricao: "Acesse linhas de crédito especiais para agricultura familiar e pequenos produtores.",
      orgao: "Banco do Brasil",
      categoria: "Crédito",
      disponivel: true,
      online: false
    },
    {
      titulo: "Assistência Técnica e Extensão Rural (ATER)",
      descricao: "Receba orientação técnica gratuita para melhorar sua produção.",
      orgao: "INCRA",
      categoria: "Assistência Técnica",
      disponivel: true,
      online: false
    },
    {
      titulo: "Programa de Aquisição de Alimentos (PAA)",
      descricao: "Venda seus produtos diretamente para programas sociais do governo.",
      orgao: "CONAB",
      categoria: "Comercialização",
      disponivel: true,
      online: true
    },
    {
      titulo: "Seguro da Agricultura Familiar (SEAF)",
      descricao: "Proteja sua produção contra perdas por eventos climáticos adversos.",
      orgao: "MAPA",
      categoria: "Seguro",
      disponivel: true,
      online: true
    }
  ]

  const documentos = [
    {
      nome: "CPF Rural",
      descricao: "Documento essencial para acessar programas governamentais",
      requisitos: "RG, CPF, comprovante de residência"
    },
    {
      nome: "DAP - Declaração de Aptidão ao PRONAF",
      descricao: "Comprova a condição de agricultor familiar",
      requisitos: "Documentos pessoais, comprovante de atividade rural"
    },
    {
      nome: "CAR - Cadastro Ambiental Rural",
      descricao: "Registro obrigatório para propriedades rurais",
      requisitos: "Documentos da propriedade, coordenadas geográficas"
    }
  ]

  return (
    <div className="min-h-screen bg-rural-gradient">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-chart-4/10 to-chart-2/10">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 bg-chart-4/20 text-chart-4">
              <Shield className="h-4 w-4 mr-2" />
              Serviços Públicos
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Acesso Simplificado aos
              <span className="bg-field-gradient bg-clip-text text-transparent"> Serviços Governamentais</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Encontre e acesse facilmente os serviços públicos essenciais para 
              produtores rurais, agricultura familiar e comunidades do campo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-field-gradient hover:opacity-90">
                <Search className="h-5 w-5 mr-2" />
                Buscar Serviços
              </Button>
              <Button size="lg" variant="outline">
                <Download className="h-5 w-5 mr-2" />
                Guia de Documentos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços Principais */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Serviços Essenciais
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Acesse os principais serviços públicos disponíveis para o meio rural, 
              muitos deles disponíveis online para sua comodidade.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicos.map((servico, index) => (
              <Card key={index} className="animate-grow-in hover:shadow-lg transition-all duration-300" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {servico.categoria}
                    </Badge>
                    <div className="flex gap-1">
                      {servico.online && (
                        <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                          <Globe className="h-3 w-3 mr-1" />
                          Online
                        </Badge>
                      )}
                      {servico.disponivel && (
                        <Badge variant="default" className="text-xs bg-blue-100 text-blue-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Ativo
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg mb-2">{servico.titulo}</CardTitle>
                  <CardDescription className="text-sm mb-3">
                    {servico.descricao}
                  </CardDescription>
                  <div className="text-xs text-muted-foreground">
                    <strong>Órgão:</strong> {servico.orgao}
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant={servico.online ? "default" : "outline"}>
                    {servico.online ? (
                      <>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Acessar Online
                      </>
                    ) : (
                      <>
                        <MapPin className="h-4 w-4 mr-2" />
                        Encontrar Local
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Documentos Necessários */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Documentos Essenciais
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conheça os principais documentos necessários para acessar 
              serviços públicos e programas governamentais.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {documentos.map((doc, index) => (
              <Card key={index} className="animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{doc.nome}</CardTitle>
                  </div>
                  <CardDescription className="mb-4">
                    {doc.descricao}
                  </CardDescription>
                  <div className="text-sm">
                    <strong className="text-foreground">Requisitos:</strong>
                    <p className="text-muted-foreground mt-1">{doc.requisitos}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Formulário
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contatos e Suporte */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Precisa de Ajuda?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Entre em contato com os órgãos responsáveis ou acesse 
              nosso suporte para orientações.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center animate-grow-in">
              <CardHeader>
                <div className="bg-chart-4/10 p-3 rounded-lg w-fit mx-auto mb-3">
                  <Phone className="h-6 w-6 text-chart-4" />
                </div>
                <CardTitle className="text-lg">Central de Atendimento</CardTitle>
                <CardDescription>
                  Suporte telefônico especializado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-primary">0800 123 4567</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Seg-Sex: 8h às 18h
                </p>
              </CardContent>
            </Card>

            <Card className="text-center animate-grow-in" style={{animationDelay: '0.1s'}}>
              <CardHeader>
                <div className="bg-chart-2/10 p-3 rounded-lg w-fit mx-auto mb-3">
                  <MapPin className="h-6 w-6 text-chart-2" />
                </div>
                <CardTitle className="text-lg">Escritórios Locais</CardTitle>
                <CardDescription>
                  Encontre o escritório mais próximo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Localizar
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center animate-grow-in" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-lg w-fit mx-auto mb-3">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Portal gov.br</CardTitle>
                <CardDescription>
                  Acesso unificado aos serviços
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Acessar
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center animate-grow-in" style={{animationDelay: '0.3s'}}>
              <CardHeader>
                <div className="bg-accent/10 p-3 rounded-lg w-fit mx-auto mb-3">
                  <Clock className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg">Agendamento</CardTitle>
                <CardDescription>
                  Agende seu atendimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Agendar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-field-gradient text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Simplifique o Acesso aos Seus Direitos
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Use nosso portal para encontrar rapidamente os serviços que você precisa, 
              com orientações claras e links diretos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Search className="h-5 w-5 mr-2" />
                Buscar Serviços
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
                <Download className="h-5 w-5 mr-2" />
                Baixar Guia Completo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicosPublicos

