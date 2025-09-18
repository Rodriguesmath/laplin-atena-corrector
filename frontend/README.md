# Frontend - Laplin Atena Corrector

Este é o frontend da aplicação Laplin Atena Corrector, um sistema inteligente para correção de textos em português.

## Estrutura do Frontend

```
frontend/
│
├── static/
│   ├── css/
│   │   ├── main.css          # Estilos principais
│   │   └── components.css    # Componentes reutilizáveis
│   ├── js/
│   │   ├── main.js           # JavaScript principal
│   │   └── corrector.js      # Funcionalidade do corretor
│   └── images/
│       └── (arquivos de imagem)
│
├── templates/
│   ├── base.html             # Template base
│   ├── index.html            # Página inicial
│   └── corrector.html        # Página do corretor
│
├── components/
│   └── ui-components.js      # Componentes JavaScript reutilizáveis
│
├── pages/
│   ├── home.js               # JavaScript específico da home
│   └── about.js              # JavaScript específico do sobre
│
└── assets/
    └── (recursos estáticos)
```

## Recursos

### Templates
- **base.html**: Template base com navegação e estrutura comum
- **index.html**: Página inicial com hero section e recursos
- **corrector.html**: Interface principal do corretor de texto

### Estilos
- Design responsivo e moderno
- Sistema de cores consistente
- Animações suaves
- Suporte para dispositivos móveis

### JavaScript
- **TextCorrector**: Classe principal para correção de texto
- **Components**: Componentes reutilizáveis (alerts, loading, etc.)
- **Utilities**: Funções utilitárias para validação e manipulação

## Como Usar

### 1. Integração com Backend
O frontend faz chamadas para a API backend:
```javascript
fetch('/api/correct', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
```

### 2. Componentes Reutilizáveis
```javascript
// Componente de input de texto
const textInput = new TextInputComponent('container-id', {
    placeholder: 'Digite seu texto...',
    showWordCount: true
});

// Alertas
Alert.show('Mensagem de sucesso', 'success');
```

### 3. Personalização
- Modifique `main.css` para ajustar o tema
- Adicione novos componentes em `components/`
- Crie páginas específicas em `pages/`

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com Flexbox/Grid
- **JavaScript ES6+**: Funcionalidades interativas
- **Responsive Design**: Suporte a dispositivos móveis

## Recursos Implementados

- ✅ Interface de correção de texto
- ✅ Visualização de resultados
- ✅ Contadores de caracteres/palavras
- ✅ Cópia para área de transferência
- ✅ Mensagens de feedback
- ✅ Design responsivo
- ✅ Validação de formulários
- ✅ Componentes reutilizáveis

## Próximas Funcionalidades

- [ ] Modo escuro
- [ ] Histórico de correções
- [ ] Exportação para PDF
- [ ] Configurações de usuário
- [ ] Suporte a múltiplos idiomas
- [ ] Integração com serviços de nuvem

## Desenvolvimento

Para desenvolvimento local:
1. Certifique-se de que o backend está rodando
2. Abra os arquivos HTML em um servidor local
3. Teste as funcionalidades JavaScript no console do navegador

## Compatibilidade

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+