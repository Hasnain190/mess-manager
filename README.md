# Mess-Manager Web Application

## Table of Contents

- [Introduction](#Introduction)
- [Technology Stack](#Technology-Stack)
- [Setup & Installation](#Setup--Installation)
- [Usage](#Usage)
- [Contribute](#Contribute)
- [Support](#Support)
- [License](#License)

## Introduction

Mess-Manager is a powerful and easy-to-use web application that is built using Django and React. It is designed to manage and automate various tasks for canteens, hostels, mess, cafes, etc. With this app, you can manage menus, manage attendance , automate billing calculations and much more.

## Technology Stack

- **Backend:** Django (3.x), Django REST Framework
- **Frontend:** React (18.x), Redux
- **Database:** PostgreSQL

## Setup & Installation

Before starting, make sure you have [Python](https://www.python.org/downloads/), [Node.js](https://nodejs.org/), [npm](https://www.npmjs.com/get-npm), and [PostgreSQL](https://www.postgresql.org/download/) installed on your system.

**1. Clone the Repository:**

```bash
git clone https://github.com/Hasnain190/mess-manager/tree/TypeScript%2Btest
```

**2. Setup Backend:**

Go to the backend directory and create a virtual environment.

```bash
cd backend
python3 -m venv env
source env/bin/activate
```

Install the requirements:

```bash
pip install -r requirements.txt
```

Setup the database in PostgreSQL, then replace the `DATABASES` configuration in `settings.py`.

Run the migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

Start the server:

```bash
python manage.py runserver
```

**3. Setup Frontend:**

Go to the frontend directory:

```bash
cd ../frontend
```

Install the necessary npm packages:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

Your application should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

To use the application, open the link that the console logs after running `npm start` (usually [http://localhost:3000](http://localhost:3000)).

## Contribute

Contributions to the Mess-Manager are always welcome. Whether it's a bug report, new feature, correction, or additional documentation, we greatly value your feedback and contributions.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more information on how to get started.

## Support

For support or any questions:

- Email us at cimrow@gmail.com
- Create an issue on Github
