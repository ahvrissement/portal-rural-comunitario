import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Sprout, 
  Users, 
  BookOpen, 
  Wifi, 
  Heart, 
  Tractor,
  Sun,
  Droplets,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  ChevronRight,
  Star,
  Download,
  Globe,
  Shield
} from 'lucide-react'
import EducacaoRural from './components/EducacaoRural.jsx'
import ServicosPublicos from './components/ServicosPublicos.jsx'
import ComunidadeRural from './components/ComunidadeRural.jsx'
import OfflineManager from './components/OfflineManager.jsx'
import './App.css'

// Componente Header separado para usar useLocation
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-field-gradient p-2 rounded-lg">
              <Sprout className="h-8 w-8 text-white animate-gentle-sway" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Portal Rural</h1>
              <p className="text-sm text-muted-foreground">Conectando o Campo</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`transition-colors ${isActive('/') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
            >
              Início
            </Link>
            <Link 
              to="/educacao" 
              className={`transition-colors ${isActive('/educacao') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
            >
              Educação
            </Link>
            <Link 
              to="/servicos" 
              className={`transition-colors ${isActive('/servicos') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
            >
              Serviços
            </Link>
            <Link 
              to="/comunidade" 
              className={`transition-colors ${isActive('/comunidade') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
            >
              Comunidade
            </Link>
            <Link 
              to="/contato" 
              className={`transition-colors ${isActive('/contato') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
            >
              Contato
            </Link>
            <Button variant="default" className="bg-field-gradient hover:opacity-90">
              <Download className="h-4 w-4 mr-2" />
              App Offline
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in-up">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`py-2 transition-colors ${isActive('/') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                to="/educacao" 
                className={`py-2 transition-colors ${isActive('/educacao') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Educação
              </Link>
              <Link 
                to="/servicos" 
                className={`py-2 transition-colors ${isActive('/servicos') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Serviços
              </Link>
              <Link 
                to="/comunidade" 
                className={`py-2 transition-colors ${isActive('/comunidade') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Comunidade
              </Link>
              <Link 
                to="/contato" 
                className={`py-2 transition-colors ${isActive('/contato') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
              <Button variant="default" className="bg-field-gradient hover:opacity-90 w-full mt-2">
                <Download className="h-4 w-4 mr-2" />
                App Offline
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

// Componente da página inicial
const HomePage = () => {
  return (
    <div className="min-h-screen bg-rural-gradient">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up">
            <Badge variant="secondary" className="mb-4 bg-accent/20 text-accent-foreground">
              <Globe className="h-4 w-4 mr-2" />
              Acesso Digital para Todos
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Conectando o Campo ao
              <span className="bg-field-gradient bg-clip-text text-transparent"> Futuro Digital</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Portal comunitário que leva educação, serviços públicos e conectividade para zonas rurais, 
              funcionando mesmo com internet limitada através de tecnologia offline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/educacao">
                <Button size="lg" className="bg-field-gradient hover:opacity-90 text-lg px-8">
                  <Sprout className="h-5 w-5 mr-2" />
                  Explorar Portal
                </Button>
              </Link>
              <Link to="/comunidade">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Users className="h-5 w-5 mr-2" />
                  Junte-se à Comunidade
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="animate-grow-in">
            <img 
              src="/src/assets/hero-rural-landscape.jpg" 
              alt="Paisagem Rural" 
              className="rounded-2xl shadow-2xl w-full h-auto max-h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Recursos Pensados para o Campo
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tecnologia adaptada às necessidades rurais, com foco em simplicidade, 
              acessibilidade e funcionamento offline.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Cards */}
            <Link to="/educacao">
              <Card className="animate-grow-in hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-lg w-fit">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Educação Rural</CardTitle>
                  <CardDescription>
                    Conteúdo educativo especializado em agricultura, sustentabilidade e tecnologias rurais.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Card className="animate-grow-in hover:shadow-lg transition-shadow" style={{animationDelay: '0.1s'}}>
              <CardHeader>
                <div className="bg-accent/10 p-3 rounded-lg w-fit">
                  <Wifi className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle>Modo Offline</CardTitle>
                <CardDescription>
                  Acesse informações essenciais mesmo sem internet. Sincroniza automaticamente quando conectado.
                </CardDescription>
              </CardHeader>
            </Card>

            <Link to="/comunidade">
              <Card className="animate-grow-in hover:shadow-lg transition-shadow cursor-pointer" style={{animationDelay: '0.2s'}}>
                <CardHeader>
                  <div className="bg-chart-4/10 p-3 rounded-lg w-fit">
                    <Users className="h-6 w-6 text-chart-4" />
                  </div>
                  <CardTitle>Comunidade Ativa</CardTitle>
                  <CardDescription>
                    Conecte-se com outros produtores, compartilhe experiências e aprenda em conjunto.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Card className="animate-grow-in hover:shadow-lg transition-shadow" style={{animationDelay: '0.3s'}}>
              <CardHeader>
                <div className="bg-chart-2/10 p-3 rounded-lg w-fit">
                  <Sun className="h-6 w-6 text-chart-2" />
                </div>
                <CardTitle>Clima & Agricultura</CardTitle>
                <CardDescription>
                  Previsões meteorológicas, calendário agrícola e dicas de manejo adaptadas à sua região.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="animate-grow-in hover:shadow-lg transition-shadow" style={{animationDelay: '0.4s'}}>
              <CardHeader>
                <div className="bg-chart-3/10 p-3 rounded-lg w-fit">
                  <Tractor className="h-6 w-6 text-chart-3" />
                </div>
                <CardTitle>Tecnologia Rural</CardTitle>
                <CardDescription>
                  Informações sobre equipamentos, técnicas modernas e inovações para o campo.
                </CardDescription>
              </CardHeader>
            </Card>

            <Link to="/servicos">
              <Card className="animate-grow-in hover:shadow-lg transition-shadow cursor-pointer" style={{animationDelay: '0.5s'}}>
                <CardHeader>
                  <div className="bg-chart-5/10 p-3 rounded-lg w-fit">
                    <Shield className="h-6 w-6 text-chart-5" />
                  </div>
                  <CardTitle>Serviços Públicos</CardTitle>
                  <CardDescription>
                    Acesso facilitado a documentos, benefícios e serviços governamentais essenciais.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-field-gradient text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="text-4xl font-bold mb-2">1.2M+</div>
              <div className="text-white/80">Produtores Conectados</div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="text-4xl font-bold mb-2">850+</div>
              <div className="text-white/80">Comunidades Rurais</div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-white/80">Satisfação dos Usuários</div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-white/80">Suporte Disponível</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Pronto para Transformar sua Comunidade Rural?
            </h3>
            <p className="text-xl text-muted-foreground mb-8">
              Junte-se a milhares de produtores que já estão usando o Portal Rural 
              para acessar educação, serviços e se conectar com a comunidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-field-gradient hover:opacity-90 text-lg px-8">
                <Download className="h-5 w-5 mr-2" />
                Baixar App Gratuito
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Phone className="h-5 w-5 mr-2" />
                Falar com Especialista
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Componente de Contato
const ContatoPage = () => {
  return (
    <div className="min-h-screen bg-rural-gradient py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Entre em Contato</h1>
          <p className="text-xl text-muted-foreground">
            Estamos aqui para ajudar você a aproveitar ao máximo o Portal Rural
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>0800 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>contato@portalrural.com.br</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Brasil</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Envie uma Mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Em breve teremos um formulário de contato aqui. Por enquanto, 
                use os canais de comunicação ao lado.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Componente Footer
const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold">Portal Rural</h4>
                <p className="text-sm text-background/70">Conectando o Campo</p>
              </div>
            </div>
            <p className="text-background/70 text-sm">
              Levando tecnologia e conhecimento para as comunidades rurais do Brasil.
            </p>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Recursos</h5>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/educacao" className="hover:text-background transition-colors">Educação Rural</Link></li>
              <li><Link to="/servicos" className="hover:text-background transition-colors">Serviços Públicos</Link></li>
              <li><Link to="/comunidade" className="hover:text-background transition-colors">Comunidade</Link></li>
              <li><a href="#" className="hover:text-background transition-colors">App Offline</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Suporte</h5>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Tutoriais</a></li>
              <li><Link to="/contato" className="hover:text-background transition-colors">Contato</Link></li>
              <li><a href="#" className="hover:text-background transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Contato</h5>
            <div className="space-y-2 text-sm text-background/70">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>0800 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contato@portalrural.com.br</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Brasil</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/70">
          <p>&copy; 2024 Portal Rural Comunitário. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

// Componente principal da aplicação
function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/educacao" element={<EducacaoRural />} />
            <Route path="/servicos" element={<ServicosPublicos />} />
            <Route path="/comunidade" element={<ComunidadeRural />} />
            <Route path="/contato" element={<ContatoPage />} />
          </Routes>
        </main>
        <Footer />
        <OfflineManager />
      </div>
    </Router>
  )
}

export default App

