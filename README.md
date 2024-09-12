# 🌎 Country Explorer

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## About <a name = "about"></a>

The aim of this project is to showcase my skills in developing React and Rails applications. 🤓

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

⚠️ Before `building` the countries_api project, you need to make some changes directly to the project. See the countries_api README.

### Prerequisites

What things you need to run the project.

- Docker
- docker-compose

The technologies involved in this project.

- Docker (26.0.0)
- docker-compose (2.26.1)
- NodeJS (Latest)
- React (18.3.1)

### Installing

A step by step series of examples that tell you how to get a development env running.

Clone this repository
```bash
git clone git@github.com:gabrielmbarboza/country-explorer.git
```

Initialize the submodule:
```bash
git submodule init
```

Force git to clone the submodule:
```bash
git submodule update
```

Building the project

```bash
docker compose build
```

Running the Bundler
```bash
docker compose run --rm countries_api bundle install
```

Preparing to use the API

```bash
docker compose run --rm countries_api bin/rails db:create
```

Migrating the Countries API database

```bash
docker compose run --rm countries_api bin/rails db:prepare
```

Use the `countries:load` task to populate the database with valid countries.
```bash
docker compose run --rm countries_api bin/rails countries:load
```

End with an example of getting some data out of the system or using it for a little demo.

## Usage <a name = "usage"></a>

Using Docker and docker-compose, just run the following command.

```bash
docker compose up
```

and access the following url in your broswer.

```bash
http://0.0.0.0:3001
```

## Todo <a name = "todo"></a>

- [ ] Create the tests.
- [ ] Improve the authentication feature.
- [ ] Improve the navigation.
- [ ] Create system validations and notifications.
- [ ] Create Not Found Page