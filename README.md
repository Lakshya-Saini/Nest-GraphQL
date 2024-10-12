# NestJS GraphQL

## Description

Welcome to the **Nest-GraphQL** repository! This project showcases how to integrate **GraphQL** with **NestJS** using a code-first approach. The repository is structured into multiple modules, such as **Authors**, **Books**, **Users**, and **Rentals**, to demonstrate different functionalities that are commonly used in backend applications. Each module handles a specific domain while following best practices for NestJS and GraphQL integration.

## How to Setup

Follow these steps to get the project up and running on your local machine:

### 1. Clone the repository

```bash
git clone git@github.com:Lakshya-Saini/Nest-GraphQL.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application

```bash
npm run start:dev
```

This will run the app locally at http://localhost:3000/graphql, where you can access the Apollo Server and test the queries and mutations for all the defined modules.

## Modules

This repository is organized into multiple branches, each containing the code for a specific module. Below is an overview of the available modules and their branches:

- **Authors Module**: Handles CRUD operations for authors, including adding, updating, deleting, and querying authors. You can check the code for this module in the [`authors_module`](https://github.com/Lakshya-Saini/Nest-GraphQL/tree/authors_module) branch.

- **Books Module**: Manages books, including operations such as creating, updating, and deleting books, as well as querying books by various filters. It also handles relationships between books and authors. You can find this module's code in the [`books_module`](https://github.com/Lakshya-Saini/Nest-GraphQL/tree/books_module) branch.

- **Users Module**: Manages users, focusing on user-related functionalities such as user creation, authentication, and role assignments. This module is available in the [`users_module`](https://github.com/Lakshya-Saini/Nest-GraphQL/tree/users_module) branch.

- **Rentals Module**: Manages book rentals and their associations with users and books. This module's code can be found in the [`rentals_module`](https://github.com/Lakshya-Saini/Nest-GraphQL/tree/rentals_module) branch.

Each of these modules is self-contained in its respective branch. You can switch to a specific branch if you're only interested in a particular module. Alternatively, you can explore the full, integrated project in the `master` branch, which includes all modules combined.

## GraphQL API Overview

Once the application is running, you can explore the GraphQL API by opening the GraphQL playground at:

```bash
http://localhost:3000/graphql
```

In the playground, you can execute the following operations for each module:

- Authors: Create, update, delete authors, and query the list of authors or a single author.
- Books: Manage books, query books by author, and handle relationships between books and authors.
- Users & Rentals: The users and rentals modules work similarly with CRUD operations and relationships with books.

## FAQ

### 1. What is GraphQL?

GraphQL is a query language for APIs and a runtime for executing those queries by using type systems. It allows clients to request exactly the data they need, making APIs more flexible and efficient compared to RESTful services. Clients send a query to the GraphQL server, and the server responds with the exact shape of data requested.

### 2. How do I use GraphQL with NestJS?

NestJS provides an out-of-the-box integration with GraphQL via the `@nestjs/graphql` package. This project follows the **code-first** approach, where the GraphQL schema is auto-generated from TypeScript classes and decorators.

### 3. How can I test the GraphQL API?

Once the application is running, navigate to the `/graphql` endpoint in your browser. You'll find an interactive GraphQL Playground, where you can explore the schema and run queries or mutations directly.
