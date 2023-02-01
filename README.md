# E-Commerce_With_ORM
![License Badge](https://shields.io/badge/license-MIT-yellow)
## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Contributing](#contributing)
5. [Tests](#tests)
6. [License](#license)
7. [Questions](#questions)

## Description
A database that uses sequile to GET, POST, and Delete data
<br>
Walkthrough Video can be found [HERE](https://github.com/ColtonWilson/E-Commerce_With_ORM/blob/main/assets/Walkthrough_video.webm)
<br> Note: Video is too large for Github to load, but should be able to view raw or inside of Visual Studio Code. 
<br>
Insomnia was used to verify working code. 
<br>
![screenshot of working products](https://github.com/ColtonWilson/E-Commerce_With_ORM/blob/main/assets/products.png)
![screenshot of working categories](https://github.com/ColtonWilson/E-Commerce_With_ORM/blob/main/assets/categories.png)
![screenshot of working tags](https://github.com/ColtonWilson/E-Commerce_With_ORM/blob/main/assets/tags.png)
## Installation
Clone code to desktop and use Visual Studio Code.
<br>
MYSQL can be downloaded [HERE](https://coding-boot-camp.github.io/full-stack/mysql/mysql-installation-guide)
<br>
Insomnia can be found [HERE](https://docs.insomnia.rest/insomnia/get-started)
<br>
To Install a dotenv use
<pre>
npm i dotenv
</pre>
Will need to create a .env file to hold MySQL password and username. Once complete use this command to access MySQL
<pre>
mysql -u root -p
</pre>
and to create database
<pre>
SOURCE db/schema.sql
</pre>
To Seed the database
<pre>
npm run seed
</pre>
Finally to run the server
<pre>
npm start
</pre>
Once complete, Insomnia should be able to see all products with GET localhost:3001/api/products
## Usage
To replicate a e-commerce database
## Contributing
Submit bug and feature requests
## Tests
No Tests Provided
## License
Please see https://mit-license.org/ to get detailed information for this license

## Questions
You can find me [HERE](https://github.com/ColtonWilson) on Github
You can email me at colton_wilson93@yahoo.com if you have any additional questions.
