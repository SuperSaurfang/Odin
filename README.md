[![Build Status](https://dev.azure.com/radiergummi90/Odin/_apis/build/status/SuperSaurfang.Odin?branchName=master)](https://dev.azure.com/radiergummi90/Odin/_build/latest?definitionId=3&branchName=master)
# Odin

Odin is a dotnet webapi called 'Thor' with a webclient app called 'Sif'. At the moment Odin isn't ready for production enviroments, but you can setup this on a local
machine.

## Setup dev enviroment

### Requirements
1. MariaDB
2. Dotnet Core 3.1 or higher
3. Node.js
4. Angular CLI

### Setup Database
Import the SQL file into the Database and if need, create a database user

### Setup Webapi
Open the appsetting.blank.json add a secret under the appsettings section. Under the connectionstrings section add the setting for the database and connectionsettings. 
Currently only 'maria' and 'mariadb' are supported for the database property otherwise the webapi crash with the execption 'failed to configure database interface'. 
Save the file as 'appsetting.json' or 'appsetting.Development.json'
Open a terminal and navigate to the thor folder, then execute 'dotnet restore' and after thar 'dotnet run' to restore the dependencies and start the server. Keep this
the terminal open. Open a browser and navigate to localhost:5000/swagger if a page is loaded you can test the endpoints of the webapi. Test api/blog endpoint under the
'Blog' section. If the http response is 200, the server runs fine

### Setup Webclient
Open another terminal and navigate to the sif folder, then execute 'npm install' to install the dependencies, if this was successful execute 'ng serve'. If last terminal 
output is 'compiled successfully' open your browser and navigate to localhost:42000. The website should be loaded.

### Add a user
At the moment there is no mechanism create an user. You have to do this manually by insert a new row into 'user' table. The webapi use bcrypt to hash passwords, so you
have to generate one with a bcrypt generator for exampe here: https://bcrypt-generator.com/. 
