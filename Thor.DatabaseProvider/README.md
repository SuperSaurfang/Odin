# Thor Databaseprovider

This project contains the code for communicating with the databases. The goal is to support different databases e.g. MariaDB or MongoDB and in future maybe Redis, CosmosDB and more.

## How should it work?
At the moment the config structure looks like ths:
```json
"DatabaseConfig": {
    "DatabaseType": "",
    "ConnectionSettings": {
      "Host": "",
      "Port": "",
      "Database": "",
      "User": "",
      "Password": ""
    }
  }
```
Based on the DatabaseType value the a ContextProvider will be registered in the DI Container