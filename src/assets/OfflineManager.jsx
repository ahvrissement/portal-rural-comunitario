import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Wifi, 
  WifiOff, 
  Download, 
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'

const OfflineManager = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isInstalling, setIsInstalling] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    // Registrar service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registrado:', registration)
          setIsInstalled(true)
        })
        .catch((error) => {
          console.log('Erro ao registrar Service Worker:', error)
        })
    }

    // Monitorar status de conexão
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Capturar evento de instalação PWA
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallApp = async () => {
    if (!deferredPrompt) return

    setIsInstalling(true)
    deferredPrompt.prompt()
    
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('App instalado')
    }
    
    setDeferredPrompt(null)
    setIsInstalling(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Status de Conexão */}
      <div className="mb-2">
        <Badge 
          variant={isOnline ? "default" : "destructive"}
          className={`${isOnline ? 'bg-green-500' : 'bg-red-500'} text-white`}
        >
          {isOnline ? (
            <>
              <Wifi className="h-3 w-3 mr-1" />
              Online
            </>
          ) : (
            <>
              <WifiOff className="h-3 w-3 mr-1" />
              Offline
            </>
          )}
        </Badge>
      </div>

      {/* Botão de Instalação PWA */}
      {deferredPrompt && (
        <Button
          onClick={handleInstallApp}
          disabled={isInstalling}
          className="bg-field-gradient hover:opacity-90 shadow-lg"
        >
          {isInstalling ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          {isInstalling ? 'Instalando...' : 'Instalar App'}
        </Button>
      )}

      {/* Indicador de Service Worker */}
      {isInstalled && (
        <div className="mt-2">
          <Badge variant="outline" className="bg-white/90">
            <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
            Modo Offline Ativo
          </Badge>
        </div>
      )}
    </div>
  )
}

export default OfflineManager

