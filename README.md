# node-todos
A webservice for performing crude on todo items built using express as http server, mongodb database and hosted on heroku.

### Visit ###
* [Live at](https://tg-node-todo.herokuapp.com)

### Endpoints includes ###
* [Post /users](https://tg-node-todo.herokuapp.com/users/users) Create a user account
* [Get /users](https://tg-node-todo.herokuapp.com/users/users) Get all user's account, Authentication required
* [Get /users/login](https://tg-node-todo.herokuapp.com/users/login) Login using password and email
* [Get /users/me](https://tg-node-todo.herokuapp.com/users/me) Get logged in user, Authentication required
* [Post /todos](https://tg-node-todo.herokuapp.com/todos) Create a todo item, Authentication required
* [Get /todos](https://tg-node-todo.herokuapp.com/todos) Get all todo item, Authentication required
* [Get /todos/:id](https://tg-node-todo.herokuapp.com/todos) Get a item details, Authentication required
* [Delete /todos/:id](https://tg-node-todo.herokuapp.com/todos) Delete an item, Authentication required
* [Patch /todos/:id](https://tg-node-todo.herokuapp.com/todos) Update an item, Authentication required

### Setup Requirement ###
The following component is required to set up the app on any system.

* [ossaijad/node-ready](https://app.vagrantup.com/ossaijad/boxes/node-ready) A vagrant box with configured for developing node application.
* You can pull the box and run the app inside, everything from latest node, redis, mongodb, node reverse proxsy with nginx, rabbitmq etc configured and working

### Run locally ###

* Clone  repository: `git clone https://github.com/PrinceDavis/tg-chat.git`
* Switch into project directory: `cd tg-chat/`
* Install dependencies: `npm install`
* Start web server: `vagrant up`
* Happ coding ):
