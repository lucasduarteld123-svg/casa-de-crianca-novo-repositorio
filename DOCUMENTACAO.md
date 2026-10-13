# 📦 Documentação do Sistema de Gestão de Estoque

### 1. Introdução

Este documento detalha a arquitetura, funcionalidades e configuração do sistema **Gestão de Estoque | Casa de Criança**. A aplicação é uma ferramenta web projetada para gerenciar o ciclo de vida de materiais em um estoque provisório, desde a sua entrada e triagem até a sua destinação final.

O sistema foi construído com Vanilla JavaScript, HTML e CSS, utilizando o Firebase como backend (Backend-as-a-Service) para autenticação e armazenamento de dados em tempo real.

### 2. Funcionalidades Principais

-   **Autenticação Segura:** Acesso restrito ao sistema através de e-mail e senha, gerenciado pelo Firebase Authentication.
-   **Registro Unificado:** Formulário único para registrar a entrada de um material e realizar sua triagem inicial (questionário de destinação).
-   **Dashboard (Visão Geral):** Painel com métricas em tempo real:
    -   Total de itens em estoque.
    -   Total de itens com destino finalizado.
    -   Total de triagens processadas.
    -   Gráficos de status dos materiais (Doughnut Chart) e entradas por mês (Bar Chart).
-   **Inventário Completo:** Tabela paginada, pesquisável e ordenável com todos os materiais registrados.
-   **Controle de Prazos (Lembretes):** Seção que monitora o tempo de permanência dos itens no estoque, destacando itens próximos do vencimento do prazo de permanência.
-   **Gestão de Destino Final:** Interface para aplicar o destino final (Doação, Descarte, Reutilizável) a um item em estoque, movendo-o para o status "Finalizado".
-   **Auditoria de Triagens:** Histórico de todos os formulários de triagem preenchidos.
-   **Exportação para PDF:** Funcionalidade para exportar a lista de materiais (filtrada ou completa) para um documento PDF.
-   **Notificações por E-mail:** Envio automático de um e-mail de confirmação para o remetente ao registrar um novo item, utilizando EmailJS.
-   **Design Responsivo:** Interface adaptada para uso em desktops, tablets e dispositivos móveis.

### 3. Arquitetura do Sistema

O sistema segue uma arquitetura baseada em cliente (client-side) com serviços de backend fornecidos pelo Firebase.

-   **Frontend:**
    -   **HTML5 (`index.html`):** Estrutura semântica de todas as telas e componentes da aplicação (Single Page Application - SPA).
    -   **CSS3 (`styles.css`):** Estilização completa, incluindo layout, design system (variáveis CSS), e responsividade.
    -   **JavaScript (ES Modules):** Lógica da aplicação, dividida em módulos para melhor organização:
        -   `app.js`: Ponto de entrada principal, gerencia o ciclo de vida da aplicação, autenticação e eventos globais.
        -   `services.js`: Contém a lógica de negócio, manipulação de dados (CRUD), renderização de tabelas, gráficos e interações com o Firebase.
        -   `ui.js` (não fornecido): Funções auxiliares para manipulação da interface, como exibir toasts, modais e alternar seções.
        -   `utils.js` (não fornecido): Funções utilitárias para formatação de datas, sanitização de inputs, etc.
        -   `firebase.js`: Configuração e inicialização do SDK do Firebase.

-   **Backend (Firebase):**
    -   **Firebase Authentication:** Gerencia o login e a sessão dos usuários.
    -   **Firebase Realtime Database:** Armazena os dados da aplicação em duas coleções principais:
        -   `materiais`: Guarda os registros de cada item do estoque.
        -   `questionarios_descarte`: Guarda as respostas dos formulários de triagem, vinculadas a um material.

-   **Serviços de Terceiros (via CDN):**
    -   **Chart.js:** Para a renderização dos gráficos no dashboard.
    -   **jsPDF & jsPDF-AutoTable:** Para a geração de relatórios em PDF.
    -   **EmailJS:** Para o envio de e-mails transacionais sem a necessidade de um servidor de backend.

### 4. Configuração e Instalação

Para executar o projeto localmente, siga os passos abaixo.

#### 4.1. Pré-requisitos

-   Conta no Firebase.
-   Conta no EmailJS.
-   Um servidor web local (a extensão "Live Server" para VS Code é recomendada).

#### 4.2. Passos de Configuração

1.  **Clonar o Repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd <NOME_DA_PASTA>
    ```

2.  **Configurar o Firebase:**
    a. Crie um novo projeto no console do Firebase.
    b. Adicione um novo aplicativo Web ao seu projeto.
    c. Copie o objeto de configuração do Firebase (`firebaseConfig`).
    d. Abra o arquivo `js/firebase.js` e substitua o objeto `firebaseConfig` existente pelo seu.
    e. No console do Firebase, vá para a seção **Authentication** -> **Sign-in method** e habilite o provedor "E-mail/senha".
    f. Crie pelo menos um usuário na aba **Users** para poder acessar o sistema.
    g. Vá para a seção **Realtime Database**, crie um novo banco de dados em modo de teste (ou configure as regras de segurança para permitir leitura/escrita por usuários autenticados).

3.  **Configurar o EmailJS:**
    a. Faça login no EmailJS.
    b. Adicione um novo serviço de e-mail (ex: Gmail).
    c. Crie um novo template de e-mail. O template deve conter as variáveis usadas no código (ex: `{{to_email}}`, `{{nome_produto}}`, etc.). O template ID `template_p6qgrip` é usado no código.
    d. Obtenha seu **Service ID** (em "Email Services"), **Template ID** (em "Email Templates") e **Public Key** (em "Account" -> "API Keys").
    e. No arquivo `index.html`, atualize a linha de inicialização do EmailJS com sua Public Key:
       ```html
       <script>(function(){ emailjs.init("SUA_PUBLIC_KEY"); })();</script>
       ```
    f. No arquivo `js/app.js`, atualize as constantes com seu Service ID e Template ID:
       ```javascript
       const EMAILJS_SERVICE_ID = "SEU_SERVICE_ID";
       const EMAILJS_TEMPLATE_CONFIRMACAO = "SEU_TEMPLATE_ID";
       ```

4.  **Executar a Aplicação:**
    -   Abra o diretório do projeto no VS Code.
    -   Clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".
    -   A aplicação será aberta no seu navegador padrão.

**AVISO DE SEGURANÇA:** O arquivo `js/firebase.js` contém a chave de API do Firebase. Em um ambiente de produção real, é crucial proteger essas chaves usando variáveis de ambiente e um processo de build (ex: Vite, Webpack) para evitar que sejam expostas publicamente.

### 5. Estrutura dos Arquivos

```
/
├── index.html              # Arquivo principal da aplicação (HTML)
├── styles.css              # Folha de estilos principal (CSS)
├── DOCUMENTACAO.md         # Este arquivo de documentação
├── js/
│   ├── app.js              # Lógica principal, eventos e inicialização
│   ├── services.js         # Lógica de negócio, CRUD, renderização
│   ├── firebase.js         # Configuração e exportação do Firebase
│   ├── ui.js               # (Inferido) Funções de UI (toasts, modais)
│   └── utils.js            # (Inferido) Funções utilitárias (datas, etc.)
└── ... (outros arquivos como imagens, etc.)
```

### 6. Detalhamento das Funcionalidades

#### 6.1. Autenticação (`app.js`)

-   A tela de login é exibida por padrão (`#loginOverlay`).
-   O evento de `submit` do formulário `#loginForm` chama a função `signInWithEmailAndPassword` do Firebase.
-   Um observador (`onAuthStateChanged`) monitora o estado de autenticação. Se o usuário estiver logado, a aplicação é inicializada (`initializeApp`); caso contrário, a tela de login é exibida e os listeners de dados são removidos (`cleanupApp`).
-   O logout é feito pela função `signOut`.

#### 6.2. Entrada e Triagem (`app.js`, `services.js`)

-   O formulário `#formUnificado` combina dados do material e um questionário.
-   A função `handleFormSubmit` em `app.js` é acionada no envio.
-   Ela valida os campos e, se tudo estiver correto, cria dois objetos: `objetoMaterial` e `objetoTriagem`.
-   **Criação:** Se for um novo item, duas novas chaves são geradas (`push`) e os objetos são salvos em `materiais` e `questionarios_descarte`, com referências cruzadas (`id_triagem_origem` e `id_material_vinculado`).
-   **Edição:** Se um item estiver sendo editado (`state.editandoMaterialId`), os registros existentes são atualizados (`set`).
-   Após salvar, uma notificação por e-mail é enviada via `emailjs.send`.

#### 6.3. Visão Geral e Inventário (`services.js`)

-   A função `carregarEstoque` é o coração desta seção.
-   Ela filtra os dados do `state.materiaisCache` com base nos filtros de status e na busca por texto.
-   Ordena os dados se uma coluna de ordenação estiver definida (`state.sortColuna`).
-   Realiza a paginação dos resultados.
-   Renderiza a tabela HTML dinamicamente, incluindo linhas de "espaço livre" para preencher a tabela.
-   Renderiza a paginação com lógica para exibir números de página e botões de navegação.
-   Chama `renderizarGraficos` para atualizar os charts com os dados filtrados.

#### 6.4. Destino Final (`services.js`)

-   A função `carregarDestinoEPlanoPVPS` filtra os materiais com status "Em Estoque" e os exibe em uma tabela.
-   O botão "Selecionar" preenche o campo de ID no formulário de aplicação de destino.
-   A função `aplicarDestino` é chamada ao confirmar. Ela valida o ID, exibe um modal de confirmação e, se confirmado, atualiza o registro do material no Firebase, mudando o `status` para "Finalizado" e o campo `destino`.

### 7. Dependências Externas

As seguintes bibliotecas são carregadas via CDN no `index.html`:

-   **Google Fonts:** (JetBrains Mono, Syne) para a tipografia.
-   **EmailJS:** Para envio de e-mails.
-   **Chart.js:** Para gráficos.
-   **jsPDF & jsPDF-AutoTable:** Para exportação de PDF.
-   **Firebase SDK:** (App, Auth, Database) para integração com o backend.