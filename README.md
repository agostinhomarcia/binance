# Crypto Exchange App

Uma aplicação mobile de exchange de criptomoedas desenvolvida com React Native, inspirada na Binance.

## 📱 Sobre o Projeto

Este aplicativo é uma exchange de criptomoedas que oferece funcionalidades como visualização de mercado em tempo real, trading e gerenciamento de perfil. O projeto foi desenvolvido utilizando as melhores práticas de desenvolvimento mobile e design de interface.

---

## 🎥 Demonstração do Projeto

### 📱 Screenshots

<div align="center">
  <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWxxcnV4ZXpleDR2YjR6bzZ2bW9xNnM0ZzdycTJpNnBnOGZjZGV0ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ijKEOx0Fx9MFphrWIj/giphy.gif" alt="Home Screen" width="200"/>
  <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmQ5cDBlaXpqZHJpMGlmcG1lczZ2M2txYmxkZ2VlZWoxazdjeGVqayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bxNenYmaYPZ5re4DXN/giphy.gif" alt="Markets Screen" width="200"/>
  <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3hhc2Yzb2d0b3R2ZDl4aHNjMGg1cWpyNXdwYXVrMGVsYm41dXA4eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iXb234rPdzeQH5GdD1/giphy.gif" alt="Trade Screen" width="200"/>
  <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWg4YXg3Mmhoa2hmd2MyMHhmdmVlOGVmNWM4amx1Zzc1MjRwcmQ3aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vJVjsOGV2Mymc14sLR/giphy.gif" alt="Trade Screen" width="200"/>
  <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXhnNHgzdGs5eGJwMXlhaXZ6ZjBiZ2dlNTFwZmIwM3RqaXd2eXRmbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sunP6z1QZPjlFC7fMZ/giphy.gif" alt="Profile Screen" width="200"/>
  <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2FrMTVoOHJieXR3eHVlOXQ1djBnaDJ3cmJ4Nm00ZHNyZHN6eGFqbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XPZsi93o3Wfco1GlYS/giphy.gif" alt="Profile Screen" width="200"/>
</div>

<div align="center">
  <h3>Android</h3>
  <img src="/assets/images/home.jpg" alt="Home Screen" width="200"/>
  <img src="/assets/images/markets1.jpg" alt="Markets Screen" width="200"/>
  <img src="/assets/images/markets2.jpg" alt="Trade Screen" width="200"/>
  <img src="/assets/images/trade1.jpg" alt="Profile Screen" width="200"/>
  <img src="/assets/images/trade2.jpg" alt="Profile Screen" width="200"/>
  <img src="/assets/images/profile.jpg" alt="Profile Screen" width="200"/>
</div>

<div align="center">
  <h3>IPhone</h3>
  <img src="/assets/images/home-iphone.png" alt="Home Screen" width="200"/>
  <img src="/assets/images/markets-iphone1.png" alt="Markets Screen" width="200"/>
  <img src="/assets/images/markets-iphone2.png" alt="Trade Screen" width="200"/>
  <img src="/assets/images/trade-iphone1.png" alt="Profile Screen" width="200"/>
  <img src="/assets/images/trade-iphone2.png" alt="Profile Screen" width="200"/>
  <img src="/assets/images/trade-iphone3.png" alt="Profile Screen" width="200"/>
  <img src="/assets/images/profile-iphone1.png" alt="Profile Screen" width="200"/>
  <img src="/assets/images/profile-iphone2.png" alt="Profile Screen" width="200"/>
</div>

---

## 🚀 Tecnologias Utilizadas

- React Native
- TypeScript
- React Navigation
- React Native Reanimated
- Victory Native (para gráficos)
- WebSocket (para dados em tempo real)
- React Native Vector Icons

---

## 🔐 Funcionalidades de Autenticação

### Login Tradicional

- Sistema de autenticação com usuário e senha
- Credenciais armazenadas de forma segura usando SecureStore
- Interface intuitiva com feedback visual
- Visualização opcional da senha
- Conversão automática do nome de usuário para minúsculas

### Autenticação Biométrica

- Suporte para autenticação via biometria (digital)
- Toggle para ativar/desativar a funcionalidade
- Persistência da preferência do usuário

### Tecnologias Utilizadas

- `expo-secure-store`: Armazenamento seguro de credenciais
- `expo-local-authentication`: Autenticação biométrica
- `@react-native-async-storage/async-storage`: Gerenciamento de preferências

---

## 📋 Funcionalidades Principais

### 🏠 Home

- Dashboard com diferentes tipos de gráficos
- Gráfico de linha/área em tempo real
- Gráfico de velas (Candlestick) em tempo real
- Dados atualizados via WebSocket da Binance

### 📊 Markets

- Lista de criptomoedas com preços em tempo real
- Busca e filtros
- Ordenação por preço e variação
- Indicadores de variação de preço
- Pull-to-refresh para atualização manual

### 💱 Trade

- Interface completa de trading
- Livro de ofertas em tempo real
- Formulário de compra/venda
- Suporte a ordens limite e mercado
- Feedback visual para ações do usuário

### 👤 Profile

- Visualização de informações do usuário
- Opções de segurança
- Gerenciamento de carteira
- Configurações do aplicativo

### 💱 Trading View

O módulo de trading oferece uma experiência completa de negociação com:

#### 📊 Livro de Ofertas (OrderBook)

- Visualização em tempo real das ordens de compra e venda
- Atualização automática via WebSocket
- Indicadores visuais de pressão compradora/vendedora
- Preço atual e variação percentual
- Formatação numérica otimizada para valores financeiros

#### 🔄 Interface de Trading

- Tabs alternáveis entre Compra/Venda
- Suporte a ordens Limite e Mercado
- Cálculo automático do valor total
- Validação em tempo real dos inputs
- Feedback visual para todas as ações
- Confirmação de ordens para prevenir erros
- Campos auto-ajustáveis para diferentes moedas

#### 💡 UX/UI

- Design inspirado nas principais exchanges
- Tema escuro profissional
- Feedback visual instantâneo
- Animações suaves
- Interface responsiva
- Suporte a gestos

---

## 🔌 APIs Utilizadas

- Binance WebSocket API para dados em tempo real
  - Preços: wss://stream.binance.com:9443/ws/
  - Gráfico de velas: /stream?streams=btcusdt@kline_1m
  - Livro de ofertas: /stream?streams=btcusdt@depth

---

## 🎨 Design

O aplicativo segue o tema escuro da Binance com:

### Cores principais:

- ⚫ Background: `#1E2026`
- 🟡 Accent: `#F0B90B`
- 🟢 Success: `#0ecb81`
- 🔴 Error: `#f6465d`
- ⚪ Text: `#FFFFFF`
- Tipografia consistente
- Animações suaves
- Interface responsiva

---

## 📦 Como Instalar

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/crypto-exchange-app.git
```

2. Instale as dependências:

```bash
cd crypto-exchange-app
npm install
```

3. Execute o projeto:

```bash
npm run android
# ou
npm run ios
```

---

## 🛠️ Estrutura do Projeto

```
src/
├── app/
│   └── index.tsx
├── components/
│   ├── markets/
│   │   ├── MarketsHeader.tsx
│   │   └── MarketListItem.tsx
│   └── Toast.tsx
├── screens/
│   ├── HomeScreen.tsx
│   ├── MarketsScreen.tsx
│   ├── TradeScreen.tsx
│   └── ProfileScreen.tsx
└── types/
    ├── chart.ts
    └── market.ts
```

---

## 👥 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

---

[🔝 Voltar ao topo](#crypto-exchange-app)
