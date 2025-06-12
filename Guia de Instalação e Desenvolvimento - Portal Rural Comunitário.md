# Guia de Instalação e Desenvolvimento - Portal Rural Comunitário

## 📋 Pré-requisitos

### Sistema Operacional
- Windows 10/11, macOS 10.15+, ou Linux (Ubuntu 18.04+)

### Software Necessário
- **Node.js**: versão 18.0 ou superior
- **npm**: versão 8.0 ou superior (incluído com Node.js)
- **Git**: para controle de versão

### Verificação dos Pré-requisitos
```bash
# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version

# Verificar versão do Git
git --version
```

## 🚀 Instalação Local

### 1. Clone do Repositório
```bash
# Clone o projeto (substitua pela URL real do repositório)
git clone [URL_DO_REPOSITORIO]
cd portal-rural-comunitario
```

### 2. Instalação das Dependências
```bash
# Instalar dependências do projeto
npm install --legacy-peer-deps
```

**Nota**: O flag `--legacy-peer-deps` é necessário devido a compatibilidade entre algumas dependências.

### 3. Executar em Modo de Desenvolvimento
```bash
# Iniciar servidor de desenvolvimento
npm run dev

# O servidor estará disponível em:
# http://localhost:5173
```

### 4. Build para Produção
```bash
# Gerar build otimizado
npm run build

# Visualizar build localmente
npm run preview
```

## 📁 Estrutura do Projeto

```
portal-rural-comunitario/
├── public/                 # Arquivos estáticos
│   ├── sw.js              # Service Worker
│   ├── manifest.json      # Manifesto PWA
│   ├── offline.html       # Página offline
│   ├── icon-192.png       # Ícone 192x192
│   └── icon-512.png       # Ícone 512x512
├── src/                   # Código fonte
│   ├── components/        # Componentes React
│   │   ├── EducacaoRural.jsx
│   │   ├── ServicosPublicos.jsx
│   │   ├── ComunidadeRural.jsx
│   │   └── OfflineManager.jsx
│   ├── assets/           # Imagens e recursos
│   │   ├── hero-rural-landscape.jpg
│   │   ├── agriculture-education.jpg
│   │   └── rural-community.jpg
│   ├── lib/              # Dados e conteúdo
│   │   ├── conteudo_educativo_agricultura_familiar.md
│   │   └── resumo_inclusao_produtiva_rural.md
│   ├── App.jsx           # Componente principal
│   ├── App.css           # Estilos globais
│   └── main.jsx          # Ponto de entrada
├── package.json          # Dependências e scripts
├── vite.config.js        # Configuração do Vite
├── tailwind.config.js    # Configuração do TailwindCSS
└── README.md             # Documentação
```

## 🔧 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev          # Servidor de desenvolvimento
npm run dev -- --host  # Servidor acessível na rede local
```

### Produção
```bash
npm run build        # Build para produção
npm run preview      # Visualizar build localmente
```

### Linting
```bash
npm run lint         # Verificar código com ESLint
```

## 🌐 Deploy

### Deploy Automático (Recomendado)
O projeto está configurado para deploy automático na plataforma Manus:

```bash
# Build e deploy
npm run build
# Upload da pasta dist/ para o serviço de hosting
```

### Deploy Manual
1. Execute `npm run build`
2. Faça upload da pasta `dist/` para seu servidor web
3. Configure o servidor para servir `index.html` para todas as rotas (SPA)

### Configuração do Servidor Web

#### Apache (.htaccess)
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

#### Nginx
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## 📱 Funcionalidades PWA

### Service Worker
O service worker está configurado para:
- Cache de recursos estáticos
- Funcionalidade offline
- Sincronização automática

### Instalação como App
1. Acesse o site no navegador
2. Clique no botão "Instalar App"
3. Confirme a instalação
4. O app aparecerá na tela inicial

### Teste Offline
1. Acesse o site online
2. Desconecte a internet
3. Navegue pelo site (funcionará offline)
4. Reconecte para sincronizar

## 🛠️ Desenvolvimento

### Adicionando Novas Páginas
1. Crie o componente em `src/components/`
2. Adicione a rota em `src/App.jsx`
3. Atualize a navegação no header

### Modificando Estilos
- Estilos globais: `src/App.css`
- Classes utilitárias: TailwindCSS
- Componentes: Shadcn/UI

### Adicionando Conteúdo
- Conteúdo educativo: `src/lib/`
- Imagens: `src/assets/`
- Dados estáticos: dentro dos componentes

## 🐛 Solução de Problemas

### Erro de Dependências
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Erro de Build
```bash
# Verificar sintaxe
npm run lint

# Build com logs detalhados
npm run build -- --debug
```

### Service Worker não Funciona
1. Verifique se está em HTTPS ou localhost
2. Abra DevTools > Application > Service Workers
3. Force refresh (Ctrl+Shift+R)

### PWA não Instala
1. Verifique o manifesto em DevTools > Application > Manifest
2. Confirme que todos os ícones estão acessíveis
3. Teste em navegador compatível (Chrome, Edge, Firefox)

## 📞 Suporte

### Logs de Desenvolvimento
```bash
# Console do navegador (F12)
# Verificar erros JavaScript

# Terminal
# Verificar erros de build/servidor
```

### Recursos Úteis
- [Documentação do React](https://react.dev/)
- [Documentação do Vite](https://vitejs.dev/)
- [Documentação do TailwindCSS](https://tailwindcss.com/)
- [Guia PWA](https://web.dev/progressive-web-apps/)

## 🔄 Atualizações

### Atualizar Dependências
```bash
# Verificar dependências desatualizadas
npm outdated

# Atualizar dependências
npm update
```

### Versionamento
- Use semantic versioning (semver)
- Documente mudanças no CHANGELOG.md
- Teste antes de fazer deploy

---

**Guia de Instalação** - Portal Rural Comunitário 🌱

*Para dúvidas técnicas, consulte a documentação ou entre em contato*

