# api

- [api](#api)
  - [Run locally](#run-locally)
    - [Execute a command inside the container](#execute-a-command-inside-the-container)
    - [Available commands](#available-commands)
    - [Introduce code changes](#introduce-code-changes)
  - [API reference](#api-reference)
    - [Users endpoints](#users-endpoints)
      - [Get a user](#get-a-user)
      - [Create a user](#create-a-user)
      - [Update a user](#update-a-user)
      - [Delete a user](#delete-a-user)
    - [Shops endpoints](#shops-endpoints)
      - [Get all shops](#get-all-shops)
      - [Get a shop](#get-a-shop)
      - [Get a shop's promotions](#get-a-shops-promotions)
      - [Get a shop's clients](#get-a-shops-clients)
      - [Create a shop](#create-a-shop)
      - [Update a shop](#update-a-shop)
      - [Delete a shop](#delete-a-shop)
    - [Cards endpoints](#cards-endpoints)
      - [Get a card](#get-a-card)
      - [Create a card](#create-a-card)
      - [Update a card](#update-a-card)
      - [Delete a card](#delete-a-card)
    - [Promotions endpoints](#promotions-endpoints)
      - [Get a promotion](#get-a-promotion)
      - [Create a promotion](#create-a-promotion)
      - [Update a promotion](#update-a-promotion)
      - [Delete a promotion](#delete-a-promotion)
    - [Balances endpoints](#balances-endpoints)
      - [Get a balance](#get-a-balance)
      - [Create a balance](#create-a-balance)
      - [Update a balance](#update-a-balance)
      - [Delete a balance](#delete-a-balance)
      - [Checkout a balance](#checkout-a-balance)

## Run locally

```
docker-compose up
```

### Execute a command inside the container

```
docker-compose run --rm web <your-command>
```

### Available commands

- `npm start`
- `npm run build`
- `npm run test`
- `npm run typeorm`
- `npm run lint` (`npm run lint -- --fix` to lint automatically)
- `npm run format`
- `npm run migration:generate <migration_destination>`
  - `<migration_destination>` should be `./src/migrations/<your_migration_name>` (see [Typeorm - Generating migrations](https://typeorm.io/migrations#generating-migrations))
- `npm run migration:run`

### Introduce code changes

Before pushing your changes, you should:

- Lint and format your code:

```
docker-compose run --rm web npm run format
docker-compose run --rm web npm run lint -- --fix
```

- Check that the tests still pass:

```
docker-compose run --rm web npm test
```

- IF the entities have been updated, generate a migration and apply it:

```
docker-compose run --rm web npm run migration:generate ./src/migrations/<your_migration>
docker-compose run --rm web npm run migration:run
```

## API reference

### Users endpoints

#### Get a user

```HTTP
GET /user/:id
```

| Parameters | Type   | In    | Description    |
| :--------- | :----- | :---- | :------------- |
| **id**     | number | query | **[required]** |

##### Request

```HTTP
GET /user/1
```

##### Response

``` HTTP
Status: 200 OK
```

```json
[
  {
    "id": 1,
    "url": "https://example.com",
    "shopId": 1,
    "userId": 1,
    "startAt": "",
    "endAt": "",
    "shop": {
      "companyName": "Bistrot123",
      "activity":"Restauration",
      "siren": "123456789",
      "siret": "12345678901234",
      "email": "bistrot123@gmail.com",
      "zipCode": "12345",
      "lat":"22.366329",
      "long": "-10.137468",
      "phone": "0632547698",
      "address": "12 rue du bistrot",
    },
    "balances": [
      {
        "id": 1,
        "promotionId": 1,
        "cardId": 1,
        "counter": 0,
        "isActive": true
        "promotion": {
          "id": 1,
          "shopId": 1,
          "name": "Promotion",
          "description": "Promotion description",
          "startAt": "2019-05-27",
          "endAt": "2020-05-27",
          "checkoutLimit": 10,
        }
      }
    ]
  },
  {
    "id": 2,
    "url": "https://example2.com",
    "shopId": 2,
    "userId": 1,
    "startAt": "",
    "endAt": "",
    "shop": {
      "companyName": "Coffee Shop",
      "activity":"Restauration",
      "siren": "987654321",
      "siret": "98765432101234",
      "email": "coffeeshop@gmail.com",
      "zipCode": "54321",
      "lat": "18.365229",
      "long": "-11.147119",
      "phone": "0698765432",
      "address": "1 rue du café",
    },
    "balances": [
      {
        "id": 2,
        "promotionId": 2,
        "cardId": 2,
        "counter": 5,
        "isActive": true
        "promotion": {
          "id": 2,
          "shopId": 2,
          "name": "Promotion2",
          "description": "Promotion2 description",
          "startAt": "2019-05-27",
          "endAt": "2020-05-27",
          "checkoutLimit": 20,
        }
      }
    ]
  }
]
```

#### Create a user

```HTTP
POST /user
```

| Parameters   | Type   | In   | Description    |
| :----------- | :----- | :--- | :------------- |
| **username** | string | body | **[required]** |
| **email**    | string | body | **[required]** |

##### Request

```HTTP
POST /user
  {
    "username": "test",
    "email":"test@fidecly.com"
  }
```

##### Response

``` HTTP
Status: 201 CREATED
```

```json
{
  "message": "User created",
}
```

#### Update a user

```HTTP
PUT /user/:id
```

| Parameters   | Type   | In    | Description    |
| :----------- | :----- | :---- | :------------- |
| **id**       | number | query | **[required]** |
| **username** | string | body  | **[optional]** |
| **email**    | string | body  | **[optional]** |

##### Request

```HTTP
PUT /user/1
  {
    "username": "test",
    "email":"test@fidecly.com"
  }
```

##### Response

``` HTTP
Status: 200 OK
```

```json
{
  "message": "User updated",
}

```

#### Delete a user

```HTTP
DELETE /user/:id
```

| Parameters | Type   | In    | Description    |
| :--------- | :----- | :---- | :------------- |
| **id**     | number | query | **[required]** |

##### Request

```HTTP
DELETE /user/1
```

##### Response

``` HTTP
Status: 200 OK
```

```json
{
  "message": "User deleted",
}
```

### Shops endpoints

#### Get all shops

```HTTP
GET /shop/
```

| Parameters   | Type    | In    | Description                       |
| :----------- | :------ | :---- | :-------------------------------- |
| **distance** | number  | query | **[required]** Distance in metres |
| **lat**      | number  | query | **[required]** Latitude           |
| **long**     | number  | query | **[required]** Longitude          |
| **isActive** | boolean | query | **[required]** Active             |

##### Request

```HTTP
GET /shop/?distance=3000&long=2.3690961&lat=48.8573185
```

##### Response

``` HTTP
Status: 200 OK
```

```json
[
  {
    "id": 1,
    "companyName": "Bistrot123",
    "activity":"Restauration",
    "siren": "123456789",
    "siret": "12345678901234",
    "email": "bistrot123@gmail.com",
    "zipCode": "12345",
    "lat": "48.8578461",
    "long": "2.3685758",
    "phone": "0632547698",
    "address": "12 rue du bistrot",
    "isActive": true,
  }
]
```

#### Get a shop

```HTTP
GET /shop/:id
```

| Parameters | Type   | In    | Description    |
| :--------- | :----- | :---- | :------------- |
| **id**     | number | query | **[required]** |

##### Request

```HTTP
GET /shop/1
```

##### Response

``` HTTP
Status: 200 OK
```

```json
{
  "id": 1,
  "companyName": "Bistrot123",
  "activity":"Restauration",
  "siren": "123456789",
  "siret": "12345678901234",
  "email": "bistrot123@gmail.com",
  "zipCode": "12345",
  "lat":"22.366329",
  "long": "-10.137468",
  "phone": "0632547698",
  "address": "12 rue du bistrot",
}
```

#### Get a shop's promotions

```HTTP
GET /shop/:id/promotion
```

| Parameters | Type   | In    | Description    |
| :--------- | :----- | :---- | :------------- |
| **id**     | number | query | **[required]** |

##### Request

```HTTP
GET /shop/1/promotion
```

##### Response

``` HTTP
Status: 200 OK
```

```json
[
  {
      "id": 1,
      "shopId": 1,
      "name": "Promotion",
      "description": "Promotion description",
      "startAt": "2019-05-27",
      "endAt": "2020-05-27",
      "checkoutLimit": 10,
  }
]
```

#### Get a shop's clients

```HTTP
GET /shop/:id/clients
```

| Parameters | Type   | In    | Description    |
| :--------- | :----- | :---- | :------------- |
| **id**     | number | query | **[required]** |

##### Request

```HTTP
GET /shop/1/clients
```

##### Response

``` HTTP
Status: 200 OK
```

```json
[
  {
    "id": 1,
    "url": "https://example.com",
    "isActive": true,
    "shopId": 1,
    "userId": 1,
    "user": {
        "id": 1,
        "username": "test",
        "email": "test@fidecly.com",
        "isActive": true,
    },
    "balances": []
  },
  {
    "id": 2,
    "url": "https://example.com",
    "isActive": true,
    "shopId": 1,
    "userId": 2,
    "user": {
        "id": 2,
        "username": "test2",
        "email": "test2@fidecly.com",
        "isActive": true,
    },
    "balances": []
  }
]
```

#### Create a shop

```HTTP
POST /shop
```

| Parameters      | Type   | In   | Description    |
| :-------------- | :----- | :--- | :------------- |
| **companyName** | string | body | **[required]** |
| **activity**    | string | body | **[required]** |
| **siren**       | string | body | **[required]** |
| **siret**       | string | body | **[required]** |
| **email**       | string | body | **[required]** |
| **zipCode**     | string | body | **[required]** |
| **lat**         | string | body | **[required]** |
| **long**        | string | body | **[required]** |
| **phone**       | string | body | **[required]** |
| **address**     | string | body | **[required]** |

##### Request

```HTTP
POST /shop
  {
    "companyName": "Bistrot123",
    "activity":"Restauration",
    "siren": "123456789",
    "siret": "12345678901234",
    "email": "bistrot123@gmail.com",
    "zipCode": "12345",
    "lat":"22.366329",
    "long": "-10.137468",
    "phone": "0632547698",
    "address": "12 rue du bistrot",
  }
```

##### Response

``` HTTP
Status: 201 CREATED
```

```json
{
  "message": "Shop created",
}
```

#### Update a shop

```HTTP
PUT /shop/:id
```

| Parameters      | Type   | In    | Description    |
| :-------------- | :----- | :---- | :------------- |
| **id**          | number | query | **[required]** |
| **companyName** | string | body  | **[optional]** |
| **activity**    | string | body  | **[optional]** |
| **siren**       | string | body  | **[optional]** |
| **siret**       | string | body  | **[optional]** |
| **email**       | string | body  | **[optional]** |
| **zipCode**     | string | body  | **[optional]** |
| **lat**         | string | body  | **[optional]** |
| **long**        | string | body  | **[optional]** |
| **phone**       | string | body  | **[optional]** |
| **address**     | string | body  | **[optional]** |

##### Request

```HTTP
PUT /shop/1
  {
    "companyName": "Bistrot123",
    "siren": "123456789",
    "siret": "12345678901234",
    "email": "bistrot123@gmail.com",
    "zipCode": "12345",
    "lat":"22.366329",
    "long": "-10.137468",
    "phone": "0632547698",
    "address": "12 rue du bistrot",
  }
```

##### Response

``` HTTP
Status: 200 OK
```

```json
{
  "message": "Shop updated",
}
```

#### Delete a shop

```HTTP
DELETE /shop/:id
```

| Parameters | Type   | In    | Description    |
| :--------- | :----- | :---- | :------------- |
| **id**     | number | query | **[required]** |

##### Request

```HTTP
DELETE /shop/1
```

##### Response

``` HTTP
Status: 200 OK
```

```json
{
  "message": "Shop deleted",
}
```

### Cards endpoints

#### Get a card

```HTTP
GET /card/:id
```

| Parameters | Type   | In    | Description    |
| :--------- | :----- | :---- | :------------- |
| **id**     | number | query | **[required]** |

##### Request

```HTTP
GET /card/1
```

##### Response

``` HTTP
Status: 200 OK
```

```json
{
  "id": 1,
  "url": "https://example.com",
  "shopId": 1,
  "userId": 1,
  "startAt": "",
  "endAt": "",
}
```

#### Create a card

```HTTP
POST /card
```

| Parameters   | Type    | In   | Description    |
| :----------- | :------ | :--- | :------------- |
| **url**      | string  | body | **[required]** |
| **shopId**   | number  | body | **[required]** |
| **userId**   | number  | body | **[required]** |
| **startAt**  | string  | body | **[optional]** |
| **endAt**    | string  | body | **[required]** |
| **isActive** | boolean | body | **[optional]** |

##### Request

```HTTP
POST /card
  {
    "url": "https://example.com",
    "shopId": 1,
    "userId": 1,
    "startAt": "",
    "endAt": "",
  }
```

##### Response

``` HTTP
Status: 201 CREATED
```

```json
{
  "message": "Card created",
}
```

#### Update a card

```HTTP
PUT /card/:id
```

| Parameters   | Type    | In    | Description    |
| :----------- | :------ | :---- | :------------- |
| **id**       | number  | query | **[required]** |
| **url**      | string  | body  | **[optional]** |
| **startAt**  | string  | body  | **[optional]** |
| **endAt**    | string  | body  | **[optional]** |
| **isActive** | boolean | body  | **[optional]** |

##### Request

```HTTP
PUT /card/1
  {
    "url": "https://example2.com",
  }
```

##### Response

``` HTTP
Status: 200 OK
```

```json
{
  "message": "Card updated",
}
```

#### Delete a card

```HTTP
DELETE /card/:id
```

| Parameters | Type   | In    | Description    |
| :--------- | :----- | :---- | :------------- |
| **id**     | number | query | **[required]** |

##### Request

```HTTP
DELETE /card/1
```

##### Response

``` HTTP
Status: 200 OK
```

```json
{
  "message": "Card deleted",
}
```

### Promotions endpoints

#### Get a promotion

```HTTP
GET /promotion/:id
```

| Parameters | Type   | In    | Description    |
| :--------- | :----- | :---- | :------------- |
| **id**     | number | query | **[required]** |

##### Request

```HTTP
GET /promotion/1
```

##### Response

``` HTTP
Status: 200 OK
```

```json
{
  "id": 1,
  "shopId": 1,
  "name": "Promotion",
  "description": "Promotion description",
  "startAt": "2019-05-27",
  "endAt": "2020-05-27",
  "checkoutLimit": 10,
}
```

#### Create a promotion

```HTTP
POST /promotion
```

| Parameters        | Type    | In   | Description    |
| :---------------- | :------ | :--- | :------------- |
| **shopId**        | number  | body | **[required]** |
| **name**          | string  | body | **[required]** |
| **description**   | string  | body | **[optional]** |
| **checkoutLimit** | number  | body | **[required]** |
| **startAt**       | string  | body | **[optional]** |
| **endAt**         | string  | body | **[required]** |
| **isActive**      | boolean | body | **[optional]** |

##### Request

```HTTP
POST /promotion
  {
    "shopId": 1,
    "name": "Promotion",
    "description": "Promotion description",
    "startAt": "2019-05-27",
    "endAt": "2020-05-27",
    "checkoutLimit": 10,
  }
```

##### Response

``` HTTP
Status: 201 CREATED
```

```json
{
  "message": "Promotion created",
}
```

#### Update a promotion

```HTTP
PUT /promotion/:id
```

| Parameters        | Type    | In    | Description    |
| :---------------- | :------ | :---- | :------------- |
| **id**            | number  | query | **[required]** |
| **name**          | string  | body  | **[optional]** |
| **description**   | string  | body  | **[optional]** |
| **checkoutLimit** | number  | body  | **[optional]** |
| **endAt**         | string  | body  | **[optional]** |
| **isActive**      | boolean | body  | **[optional]** |

##### Request

```HTTP
PUT /promotion/1
  {
    "description": "Promotion description",
    "endAt": "2020-05-27",
  }
```

##### Response

``` HTTP
Status: 200 OK
```

```json
{
  "message": "Promotion updated",
}
```

#### Delete a promotion

```HTTP
DELETE /promotion/:id
```

| Parameters | Type   | In    | Description    |
| :--------- | :----- | :---- | :------------- |
| **id**     | number | query | **[required]** |

##### Request

```HTTP
DELETE /promotion/1
```

##### Response

``` HTTP
Status: 200 OK
```

```json
{
  "message": "Promotion deleted",
}
```

### Balances endpoints

#### Get a balance

```HTTP
GET /balance/:id
```

| Parameters | Type   | In    | Description    |
| :--------- | :----- | :---- | :------------- |
| **id**     | number | query | **[required]** |

##### Request

```HTTP
GET /balance/1
```

##### Response

``` HTTP
Status: 200 OK
```

```json
{
  "id": 1,
  "promotionId": 1,
  "cardId": 1,
  "counter": 0,
  "isActive": true
}
```

#### Create a balance

```HTTP
POST /balance
```

| Parameters      | Type    | In   | Description              |
| :-------------- | :------ | :--- | :----------------------- |
| **promotionId** | number  | body | **[required]**           |
| **cardId**      | number  | body | **[required]**           |
| **counter**     | number  | body | **[optional]** Default 0 |
| **isActive**    | boolean | body | **[optional]**           |

##### Request

```HTTP
POST /balance
  {
    "promotionId": 1,
    "cardId": 1,
    "counter": 0,
    "isActive": true
  }
```

##### Response

``` HTTP
Status: 201 CREATED
```

```json
{
  "message": "Balance created",
}
```

#### Update a balance

```HTTP
PUT /balance/:id
```

| Parameters   | Type    | In    | Description    |
| :----------- | :------ | :---- | :------------- |
| **id**       | number  | query | **[required]** |
| **counter**  | number  | body  | **[optional]** |
| **isActive** | boolean | body  | **[optional]** |

##### Request

```HTTP
PUT /balance/1
  {
    "counter": 10,
    "isActive": false
  }
```

##### Response

``` HTTP
Status: 200 OK
```

```json
{
  "message": "Balance updated",
}
```

#### Delete a balance

```HTTP
DELETE /balance/:id
```

| Parameters | Type   | In    | Description    |
| :--------- | :----- | :---- | :------------- |
| **id**     | number | query | **[required]** |

##### Request

```HTTP
DELETE /balance/1
```

##### Response

``` HTTP
Status: 200 OK
```

```json
{
  "message": "Balance deleted",
}
```

#### Checkout a balance

```HTTP
PUT /balance/:id/checkout
```

| Parameters | Type   | In    | Description    |
| :--------- | :----- | :---- | :------------- |
| **id**     | number | query | **[required]** |

##### Request

```HTTP
PUT /balance/1/checkout
```

##### Response

``` HTTP
Status: 200 OK
```

```json
{
  "message": "Balance updated", // increments counter +1
}
```

or

``` HTTP
Status: 200 OK
```

```json
{
  "message": "Promotion limit reached", // Limit is reached, customer gets prize
}
```
