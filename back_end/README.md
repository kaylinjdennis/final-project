# Bill Share API

## Setup

Install dependencies with `npm install`.

## Creating The DB

Use the `psql -U development` command to login to the PostgreSQL server with the username `development` and the password `development`.

Create a database with the command `CREATE DATABASE final_development;`.

Copy the `.env.example` file to `.env.development` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

```
PGHOST=localhost
PGUSER=development
PGDATABASE=final_development
PGPASSWORD=development
PGPORT=5432
```

## Seeding

Run a the development server with `npm start` in the Host environment.

Both of these achieve the same result.

- Make a `GET` request to `/api/debug/reset` with `curl http://localhost:8001/api/debug/reset`.
- Use the browser to navigate to `http://localhost:8001/api/debug/reset`.

## Run The Server

Running the server normally

```sh
npm start
```

Running the server so it returns an error when saving/deleting for testing the client's error handling capabilities

```sh
npm run error
```

## Api

### User

`GET /api/user`

Response

```json
{
  "id": 1,
  "name": "Jim Halpert",
  "email": "jim@gmail.com"
}
```

`GET /api/user/:id`

Response

```json
{
  "info": {
    "id": 1,
    "name": "Jim Halpert",
    "email": "jim@gmail.com",
    "avatar": "https://i.imgur.com/okB9WKC.jpg"
  },
  "total_owed": 50,
  "total_due": 72.66,
  "groups": [
    { "id": 1, "name": "Office" },
    { "id": 3, "name": "Friends" }
  ]
}
```

`GET /api/user/friends`

Response

```json
{
  "current_friends": [
    {
      "id": 1,
      "friend_info": {
        "id": 2,
        "name": "Dwight Schrute",
        "email": "dwight@gmail.com",
        "avatar": "https://i.imgur.com/iHq8K8Z.jpg"
      }
    },
    {
      "id": 2,
      "friend_info": {
        "id": 3,
        "name": "Michael Scott",
        "email": "michael@gmail.com",
        "avatar": "https://i.imgur.com/3tVgsra.jpg"
      }
    }
  ],
  "requests_recieved": [],
  "requests_sent": [
    {
      "id": 4,
      "friend_info": {
        "id": 4,
        "name": "Pam",
        "email": "pam@gmail.com",
        "avatar": "https://i.imgur.com/LpaY82x.png"
      }
    }
  ]
}
```

`POST /api/user/friends`

### Bills

`GET /api/bills/:type/:user_id`

Response: type = posted

```json
[
  {
    "cost": 20,
    "created_at": "2021-04-13T06:00:00.000Z",
    "description": "Oscar's Birthday",
    "group_id": 2,
    "payee_id": 2,
    "paid": false
  }
]
```

Response: type = recieved

```json
[
  {
    "cost": 25,
    "created_at": "2021-04-09T06:00:00.000Z",
    "description": "Dinner Friday Night",
    "poster_id": 1,
    "group_id": 1,
    "paid": false
  },
  {
    "cost": 37,
    "created_at": "2021-03-10T07:00:00.000Z",
    "description": "description",
    "poster_id": 2,
    "group_id": 1,
    "paid": false
  }
]
```

`GET /api/bills/:id`

Response

```json
{
  "id": 1,
  "payee_id": 3,
  "invoice_id": 1,
  "paid": false,
  "description": "Dinner Friday Night",
  "cost": 25,
  "created_at": "2021-04-09T06:00:00.000Z",
  "poster_id": 1,
  "group_id": 1
}
```

`POST /api/bills`

`POST /api/bills/:billID`

`DELETE /api/bills/:id`

### Groups

`GET /api/groups`

Response

```json
[
  { "id": 1, "name": "Office" },
  { "id": 3, "name": "Friends" }
]
```

`GET /api/groups/:userID`

Response

```json
[
  { "id": 1, "user_id": 1, "group_id": 1 },
  { "id": 2, "user_id": 2, "group_id": 1 },
  { "id": 3, "user_id": 3, "group_id": 1 }
]
```

`POST /api/groups`
