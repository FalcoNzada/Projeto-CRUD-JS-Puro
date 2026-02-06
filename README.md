📦 CRUD de Produtos - HTML, CSS e JavaScript

Este projeto consiste em um CRUD completo de Produtos desenvolvido utilizando HTML, CSS e JavaScript puro, com armazenamento em LocalStorage, permitindo salvar os dados diretamente no navegador sem necessidade de backend.

O sistema permite cadastrar, visualizar, editar, excluir, buscar e organizar produtos, além de possuir funcionalidades extras como modo Dark/Light e importação/exportação de dados em JSON.

🚀 Funcionalidades

✅ Cadastrar Produto
✅ Listar Produtos
✅ Editar Produto
✅ Excluir Produto
✅ Buscar Produto por Nome ou Categoria
✅ Ordenar Produtos (Nome, Preço ou Categoria)
✅ Tema Dark/Light com persistência
✅ Exportar Produtos para arquivo JSON
✅ Importar Produtos através de arquivo JSON
✅ Mensagens Toast para feedback ao usuário

🛠️ Tecnologias Utilizadas

HTML5

CSS3

JavaScript (Vanilla JS)

LocalStorage (Browser Storage)

📂 Estrutura do Projeto
crud-produtos/
│── index.html
│── style.css
│── script.js
│── README.md

📌 Como Executar o Projeto

Baixe ou clone este repositório:

git clone https://github.com/seu-usuario/crud-produtos.git


Abra a pasta do projeto:

cd crud-produtos


Execute o arquivo index.html no navegador:

Clique duas vezes no arquivo
ou

Abra pelo VSCode usando a extensão Live Server

💾 Como funciona o armazenamento?

Todos os produtos são armazenados usando LocalStorage, ou seja:

Os dados ficam salvos no navegador

Não precisa banco de dados

Não precisa servidor ou API

Se você limpar o cache/dados do navegador, os produtos serão apagados

🌙 Tema Dark/Light

O sistema conta com um botão de alternância entre temas:

🌙 Dark Mode

☀️ Light Mode

O tema selecionado é salvo automaticamente no LocalStorage, garantindo que ao recarregar a página ele continue configurado.

📤 Exportar Produtos

O botão Exportar gera automaticamente um arquivo chamado:

📄 produtos.json

Isso é útil para backup ou transferência de dados.

📥 Importar Produtos

O botão Importar permite selecionar um arquivo .json e carregar os produtos automaticamente no sistema.

⚠️ O arquivo precisa estar no formato correto (array de objetos).

Exemplo:

[
  {
    "id": 1700000000000,
    "name": "Mouse Gamer",
    "price": 120.50,
    "category": "Periféricos"
  }
]

📌 Regras de Validação

O sistema aplica validações para evitar dados incorretos:

Nome não pode ser vazio

Categoria não pode ser vazia

Preço deve ser maior que 0

📷 Demonstração (Sugestão)

Você pode adicionar aqui prints do projeto para deixar mais profissional no GitHub:

📌 Exemplo:

/assets/crud-preview.png


E depois no README:

![Preview do Sistema](assets/crud-preview.png)

🎯 Melhorias Futuras (Ideias)

Algumas melhorias possíveis para evoluir o projeto:

Paginação de produtos

Modal customizado no lugar do alert() e confirm()

Validação avançada de formulário

Exportação em Excel

Dashboard com gráficos (estoque e valores)

Integração com API e banco de dados futuramente

👨‍💻 Autor

Projeto desenvolvido por Thales de Lima Barbosa
📌 LinkedIn: https://www.linkedin.com/in/thales-de-lima-barbosa 

📜 Licença

Este projeto é livre para uso e modificação para fins de estudo e aprendizado.
