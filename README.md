API Characters CRUD
===================

Prerequisite
-------------

- Node 8
- Postgresql 9

Create a user and database **characters_crud**
or change the values in the configuration file *config/dev.json*

    "db": {
        "user": "characters_crud",
        "host": "localhost",
        "database": "characters_crud",
        "password": "password",
        "port": 5432
      }

Install
-------
    npm install

Launch
------

    npm start

To launch a multiple instance, you can pass the port in parameters (default port 3000)

    npm start 3001
    
To launch the server with the log in debug mode

    DEBUG=charactersCrud:* npm start

Swagger UI
----------

    http://localhost:3000/swagger


