# Introduction

This is a nodejs backend for a todo app. This projects allows users to create and manage their accounts and to create and manage todos.

## Getting Started

clone this github repository using:

1. **Clone project**

- ssh: <<git@github.com>:almamarie/nodejs-react-todo.git>
- http: <https://github.com/almamarie/nodejs-react-todo.git>

2. **Installing Node and NPM**
   This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (the download includes NPM) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).

3. **Installing project dependencies**
   This project uses NPM to manage software dependencies. NPM Relies on the package.json file located in the directory of this repository. After cloning, open your terminal, move into the project directory, and run:

```bash
npm install
```

> _tip_: `npm i` is shorthand for `npm install``

Base URL: At present this app can only be run locally and is not hosted as a base URL. The backend app is hosted at the default, [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

- **Base URL:** [http://127.0.0.1:5000/api/v0](http://127.0.0.1:5000/api/v0)

## CORS

CORS has been set up for this application. the following HTTP methods are the only ones that can be performed on the server:

1. GET
2. POST
3. DELETE
4. PATCH

## Error Handling

Errors are returned as JSON objects in the following format:

```json
{
  "success": false,
  "message": "bad request"
}
```

The API will return the following error types when requests fail:

400: Bad Request
401: unauthorised
404: Resource Not Found
405: Method Not Allowed
500: Server Error

## Endpoints

=================================================================

### GET '/'

The route is used to check if the system is properly configured

#### Request Arguments: None

Returns: A hard coded object with 2 keys, success, and message.
success is either True or False
message always containg the string "successfully configured system"

category_string key:value pairs.

#### Response format

The enpoint returns data in the following format:

```json
{
  "success": true,
  "message": "successfully configured system"
}
```

### GET '/all-hrs-situations'

Fetches a list of new and archived human rights situations

#### Request Arguments: None

Returns: An object with 3 keys, success, newSituations, and archive.
success is either True or False
newSituations and Archive both constain an object with the following structure:

#### The endpoint expects form-data in the following format

```json
{
  "files": {},
  "data": {
    "anonimity": "false",
    "specialMechanism": "Indigenous Populations/Communities And Minorities",
    "identityOfReporter": "Victim",
    "numberOfVictims": "6",
    "nameOfVictim": "Akua Zuri"
  }
}
```

category_string key:value pairs.

#### Response format

The endpoint returns data in the following format:

#### If the report is by the Victim

```json
{
  "success": true,
  "ageOfVictim": 25,
  "anonimity": true
}
```

#### If the application is by a state

```json
{
  "anonimity": "false",
  "specialMechanism": "Indigenous Populations/Communities And Minorities",
  "identityOfReporter": "State Actor",
  "nameOfStateSubmittingForm": "Algeria",
  "nameOfPersonSubmittingForm": "Kolima Nduga",
  "addressOfPersonSubmittingForm": "Azibiri Street, House 11",
  "emailOfPersonSubmittingForm": "knduga@gmail.com"
}
```

#### If by representative of victim

```json
{
  "anonimity": "false",
  "specialMechanism": "Indigenous Populations/Communities And Minorities",
  "identityOfReporter": "Representative Of Victim",
  "nameOfRepresentativeOfVictim": "Louis ",
  "addressOfRepresentativeOfVictim": "Azibiri Street, House 11",
  "emailOfRepresentativeOfVictim": "lorepre@gmail.com",
  "phoneNumberOfRepresentativeOfVictim": "23344556332",
  "numberOfVictims": "6",
  "nameOfVictim": "Akua Zuri",
  "sexOfVictim": "male"
}
```

#### If by a Witness

```json
{
  "anonimity": "false",
  "specialMechanism": "Indigenous Populations/Communities And Minorities",
  "identityOfReporter": "Witness",
  "nameOfWitness": "Louis",
  "addressOfWitness": "Azibiri Street, House 11",
  "emailOfWitness": "email@example.com",
  "phoneNumberOfWitness": "220383632",
  "numberOfVictims": "6"
}
```
