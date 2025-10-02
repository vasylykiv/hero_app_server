# Hero Rest API - Back-end

This is a backand part of hero app, build with ***express.js*** + ***typescript*** + ***postgresql*** and related node.js libraries. The application contain all basic operation with data, namely: create new hero with user information and images, edit hero information and save changes, get all heroes data for client frontend and delete heroes at all. This app has 2  advantages that set it apart from others: 
- **image system**, 
- **docker launch**. 

All images store on backend in special folder.

## 🚀 Tech Stack

This project is built using the following technologies and libraries:

* **[Express.js](https://expressjs.com/)** - The Node.js Framework.
* **[TypeScript](https://www.typescriptlang.org/)** - A strongly typed programming language that builds on JavaScript
* **[Postgresql (pg)](https://node-postgres.com/)** - Node-postgres is a collection of node.js modules for interfacing with PostgreSQL database
* **[Multer](https://www.npmjs.com/package/multer/)** - Multer is a node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files


## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

**1. Clone the repo:**
```bash
git clone https://github.com/vasylykiv/hero_app_server.git
```
**2. Navigate to the project directory:**
```bash
cd hero_app_server
```

###  3 Starting the server locally

---
**3.1  Starting with docker**
```bash
docker compose up
```
- ***! With this option, you should already have the latest version of docker installed.***

In this method, you don't need to have any database schema, because it is already included in the docker startup file. When you start, the database located in the init-db folder is automatically pulled up.

---

**3.2  Starting without docker**
```bash
npm install
```
In this case, you need to generate the database yourself and connect to it.

1.  Create .env file in your directory on top level.
2.  Create new user in your database  "**heroapp**" with password "**heroapp**".
3.  Name your database "**heroapp_db**" and import sql file from **init-db**. (*only if you use pgadmin*)
4. Fill in the required fields or just copy in your .env file:
 ```bash  
 DATABASE_URL=postgresql://heroapp:heroapp@localhost:5432/heroapp_db?schema=public

URL=http://localhost:3001

PORT=3001

FILES_FOLDER=public/images

PUBLIC_IMAGES_FOLDER=images
 ```
 5. And run server
 ```bash
npm run dev
```
___
**DATABASE_URL**=postgresql://[<u>username</u>]:[<u>password</u>]@localhost:5432/[<u>database name</u>]?schema=public

---
After this, open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to see the application.
