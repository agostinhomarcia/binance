# Crypto Exchange App

Uma aplicação mobile de exchange de criptomoedas desenvolvida com React Native, inspirada na Binance.

## 📱 Sobre o Projeto

Este aplicativo é uma exchange de criptomoedas que oferece funcionalidades como visualização de mercado em tempo real, trading e gerenciamento de perfil. O projeto foi desenvolvido utilizando as melhores práticas de desenvolvimento mobile e design de interface.

## 🚀 Tecnologias Utilizadas

- React Native
- TypeScript
- React Navigation
- React Native Reanimated
- Victory Native (para gráficos)
- WebSocket (para dados em tempo real)
- React Native Vector Icons

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

#### 🔐 Segurança

- Validação dupla de ordens
- Confirmação antes da execução
- Feedback claro de sucesso/erro
- Proteção contra cliques duplos
- Formatação segura de valores decimais

#### 💡 UX/UI

- Design inspirado nas principais exchanges
- Tema escuro profissional
- Feedback visual instantâneo
- Animações suaves
- Interface responsiva
- Suporte a gestos

## 🔌 APIs Utilizadas

- Binance WebSocket API para dados em tempo real
  - Preços: wss://stream.binance.com:9443/ws/
  - Gráfico de velas: /stream?streams=btcusdt@kline_1m
  - Livro de ofertas: /stream?streams=btcusdt@depth

## 🎨 Design

O aplicativo segue o tema escuro da Binance com:

- Cores principais:
  - Background: #1E2026
  - Accent: #F0B90B
  - Success: #0ecb81
  - Error: #f6465d
- Tipografia consistente
- Animações suaves
- Interface responsiva

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

## 🔄 Atualizações Futuras Planejadas

- [ ] Implementação de autenticação
- [ ] Suporte a múltiplas criptomoedas
- [ ] Histórico de transações
- [ ] Notificações de preço
- [ ] Temas claro/escuro
- [ ] Suporte a múltiplos idiomas
- [ ] Mais tipos de gráficos
- [ ] Sistema de favoritos

## 👥 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🎥 Demonstração do Projeto

[![Crypto Exchange App Demo](https://img.youtube.com/vi/SEU_VIDEO_ID/maxresdefault.jpg)](https://youtu.be/SEU_VIDEO_ID)

> Clique na imagem acima para ver a demonstração completa do projeto no YouTube

### ✨ Principais funcionalidades demonstradas no vídeo:

- Dashboard com visão geral do mercado
- Lista de criptomoedas com preços em tempo real
- Interface completa de trading com orderbook
- Sistema de compra e venda de criptomoedas
- Perfil do usuário
