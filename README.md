## Installation

### Clone the project

- With SSH:: git@github.com:AOAmara/graphics-upload.git
- With HTTPS: https://github.com/AOAmara/graphics-upload.git
- cd graphics-upload

## Prepare the .env file

- Create an .env file from .env-example under the project root folder.
- Fill in the missing configurations in the .env file. 
- Follow the instructions in the [configuration](https://github.com/AOAmara/graphics-upload.git#configuration) section.
- php artisan key:generate

## Configuration

- All the following environment variables will be defined in this .env file.
    #### Configuration parameters for URL:
- APP_URL domain name
    #### Configuration parameters for connection to a database:
- DB_CONNECTION the type of connection to the DB, example mysql
- DB_HOST the IP of the host, example 127.0.0.1 or mysql for docker
- DB_PORT the port, example 3306
- DB_DATABASE name of the database
- DB_USERNAME username of the database
- DB_PASSWORD database password

## Install project dependencies

- composer install
- npm install

## Create the database tables

- php artisan migrate

## Run applications
- php artisan serve
- npm run dev

## Note to the app tester / code reviewer
- To See the ProgressBar change the Network throttling to slow down the transfer speed.

