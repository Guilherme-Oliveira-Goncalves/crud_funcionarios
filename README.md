Este projeto é uma aplicação CRUD (Create, Read, Update, Delete) simples para gerenciar funcionários. Ele foi desenvolvido utilizando React no frontend e Java no backend, com a comunicação entre as duas partes feita via API RESTful. O objetivo do projeto é fornecer uma interface para que os usuários possam cadastrar, visualizar, atualizar e excluir registros de funcionários de forma fácil e intuitiva.

Backend (Java)
O backend da aplicação foi desenvolvido em Java, utilizando a tecnologia Spring Boot para criar uma API RESTful. A API é responsável por gerenciar os dados dos funcionários e fornecer as operações CRUD. O backend se conecta a um banco de dados PostgreSQL para persistir os dados.

Funcionalidades principais:

Criar: Permite adicionar um novo funcionário ao banco de dados.
Ler: Permite visualizar todos os funcionários cadastrados.
Atualizar: Permite editar os dados de um funcionário existente.
Excluir: Permite remover um funcionário do banco de dados.
A API é projetada para ser escalável, com endpoints bem definidos, e segue boas práticas de desenvolvimento de APIs REST.

Frontend (React)

O frontend foi desenvolvido utilizando o framework React. A interface foi conastruída para ser simples, responsiva e fácil de usar, permitindo que os usuários interajam facilmente com os dados dos funcionários.

Funcionalidades principais:
Cadastro de Funcionários: Formulário para criar novos registros de funcionários.
Exibição de Funcionários: Lista de todos os funcionários cadastrados, com a possibilidade de visualizar detalhes de cada um.
Edição e Exclusão: Capacidade de editar ou excluir registros de funcionários diretamente na interface.
A interface utiliza axios para fazer chamadas à API do backend e obter as informações dos funcionários. O design foi pensado para ser simples e direto, focando na funcionalidade.
