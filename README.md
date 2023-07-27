# api

- [api](#api)
  - [Run locally](#run-locally)
    - [Execute a command inside the container](#execute-a-command-inside-the-container)
    - [Available commands](#available-commands)
    - [Introduce code changes](#introduce-code-changes)
  - [API reference](#api-reference)
    - [Authentication endpoints](#authentication-endpoints)
      - [Register](#register)
        - [Request](#request)
        - [Response](#response)
      - [Login](#login)
        - [Request](#request-1)
        - [Response](#response-1)
    - [Users endpoints](#users-endpoints)
      - [Get a user](#get-a-user)
        - [Request](#request-2)
        - [Response](#response-2)
      - [Update a user](#update-a-user)
        - [Request](#request-3)
        - [Response](#response-3)
      - [Delete a user](#delete-a-user)
        - [Request](#request-4)
        - [Response](#response-4)
    - [Shops endpoints](#shops-endpoints)
      - [Get all shops](#get-all-shops)
        - [Request](#request-5)
        - [Response](#response-5)
      - [Get a shop](#get-a-shop)
        - [Request](#request-6)
        - [Response](#response-6)
      - [Get a shop's promotions](#get-a-shops-promotions)
        - [Request](#request-7)
        - [Response](#response-7)
      - [Get a shop's cards](#get-a-shops-cards)
        - [Request](#request-8)
        - [Response](#response-8)
      - [Get a shop's campaigns](#get-a-shops-campaigns)
        - [Request](#request-9)
        - [Response](#response-9)
      - [Create a shop](#create-a-shop)
        - [Request](#request-10)
        - [Response](#response-10)
      - [Update a shop](#update-a-shop)
        - [Request](#request-11)
        - [Response](#response-11)
      - [Delete a shop](#delete-a-shop)
        - [Request](#request-12)
        - [Response](#response-12)
    - [Cards endpoints](#cards-endpoints)
      - [Get a card](#get-a-card)
        - [Request](#request-13)
        - [Response](#response-13)
      - [Get user's cards](#get-users-cards)
        - [Request](#request-14)
        - [Response](#response-14)
      - [Create a card](#create-a-card)
        - [Request](#request-15)
        - [Response](#response-15)
      - [Update a card](#update-a-card)
        - [Request](#request-16)
        - [Response](#response-16)
      - [Delete a card](#delete-a-card)
        - [Request](#request-17)
        - [Response](#response-17)
    - [Promotions endpoints](#promotions-endpoints)
      - [Get a promotion](#get-a-promotion)
        - [Request](#request-18)
        - [Response](#response-18)
      - [Create a promotion](#create-a-promotion)
        - [Request](#request-19)
        - [Response](#response-19)
      - [Update a promotion](#update-a-promotion)
        - [Request](#request-20)
        - [Response](#response-20)
      - [Delete a promotion](#delete-a-promotion)
        - [Request](#request-21)
        - [Response](#response-21)
    - [Balances endpoints](#balances-endpoints)
      - [Get a balance](#get-a-balance)
        - [Request](#request-22)
        - [Response](#response-22)
      - [Create a balance](#create-a-balance)
        - [Request](#request-23)
        - [Response](#response-23)
      - [Update a balance](#update-a-balance)
        - [Request](#request-24)
        - [Response](#response-24)
      - [Delete a balance](#delete-a-balance)
        - [Request](#request-25)
        - [Response](#response-25)
    - [Checkout endpoint](#checkout-endpoint)
        - [Request](#request-26)
        - [Response](#response-26)
    - [Campaigns endpoints](#campaigns-endpoints)
      - [Get a campaign](#get-a-campaign)
        - [Request](#request-27)
        - [Response](#response-27)
      - [Create a campaign](#create-a-campaign)
        - [Request](#request-28)
        - [Response](#response-28)
      - [Send a campaign](#send-a-campaign)
        - [Request](#request-29)
        - [Response](#response-29)
      - [Update a campaign](#update-a-campaign)
        - [Request](#request-30)
        - [Response](#response-30)
      - [Delete a campaign](#delete-a-campaign)
        - [Request](#request-31)
        - [Response](#response-31)
    - [Analytics endpoints](#analytics-endpoints)
      - [Get a shop's affluence](#get-a-shops-affluence)
        - [Request](#request-32)
        - [Response](#response-32)
      - [Get a shop's clients count](#get-a-shops-clients-count)
        - [Request](#request-33)
        - [Response](#response-33)
      - [Get a shop's promotion ranking](#get-a-shops-promotion-ranking)
        - [Request](#request-34)
        - [Response](#response-34)
      - [Get a shop's promotion checkout count](#get-a-shops-promotion-checkout-count)
        - [Request](#request-35)
        - [Response](#response-35)

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
- `npm run lint` (`npm run lint -- --fix` to lint automatically)
- `npm run format`

### Introduce code changes

Before pushing your changes, you should:

- Lint and format your code:

```
npm run format
npm run lint -- --fix
```

- Check that the tests still pass:

```
npm run test:e2e
```

## API reference

> ---
>
> ⚠️ **Warning**
>
> **All endpoints except authentication endpoints are protected and require authentication.**
>
> ---

### Authentication endpoints

#### Register

```HTTP
POST /auth/register
```

| Parameters   | Type   | In   | Description    |
| :----------- | :----- | :--- | :------------- |
| **email**    | string | body | **[required]** |
| **password** | string | body | **[required]** |
| **role**     | string | body | **[required]** |

##### Request

```HTTP
POST /auth/register
  {
    "email":"test@fidecly.com",
    "password":"12345678",
    "role":"User"
  }
```

##### Response

```HTTP
Status: 201 CREATED
```

```json
{
  "id": 1,
  "uuid": "some-uuid",
  "username": "test",
  "email":"test@fidecly.com"
  "isActive": true,
  "cards": []
}

```

#### Login

```HTTP
PUT /auth/login
```

| Parameters   | Type   | In   | Description    |
| :----------- | :----- | :--- | :------------- |
| **email**    | string | body | **[required]** |
| **password** | string | body | **[required]** |

##### Request

```HTTP
PUT /auth/login
  {
    "email":"test@fidecly.com"
    "password":"12345678"
  }
```

##### Response

```HTTP
Status: 200 OK
```

```json
{
  "status": 200,
  "token": "some-jwt-token"
}
```

### Users endpoints

#### Get a user

```HTTP
GET /user/:uuid
```

| Parameters | Type   | In    | Description    |
| :--------- | :----- | :---- | :------------- |
| **uuid**   | string | query | **[required]** |

##### Request

```HTTP
GET /user/some-uuid
```

##### Response

```HTTP
Status: 200 OK
```

```json
{
  "id": 1,
  "username": "test",
  "email": "test@fidecly.com",
  "isActive": true,
  "cards":
  [
    {
      "id": 1,
      "shopId": 1,
      "userId": 1,
      "startAt": "",
      "endAt": "",
      "isActive": true,
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
        "city": "Paris"
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
      "shopId": 2,
      "userId": 1,
      "startAt": "",
      "endAt": "",
      "isActive": true,
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
        "city": "Paris"
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
| **birthday** | string | body  | **[optional]** |
| **sexe**     | string | body  | **[optional]** |

##### Request

```HTTP
PUT /user/1
  {
    "username": "test",
    "email":"test@fidecly.com"
  }
```

##### Response

```HTTP
Status: 200 OK
```

```json
{
  "id": 1,
  "username": "test",
  "email":"test@fidecly.com"
  "isActive": true,
  "cards": []
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

```HTTP
Status: 200 OK
```

```json
{
  "message": "User deleted"
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

```HTTP
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
    "city": "Paris"
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

```HTTP
Status: 200 OK
```

```json
{
  "id": 1,
  "companyName": "Bistrot123",
  "activity": "Restauration",
  "siren": "123456789",
  "siret": "12345678901234",
  "email": "bistrot123@gmail.com",
  "zipCode": "12345",
  "lat": "22.366329",
  "long": "-10.137468",
  "phone": "0632547698",
  "address": "12 rue du bistrot",
  "city": "Paris",
  "isActive": true
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

```HTTP
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
    "isActive": true
  }
]
```

#### Get a shop's cards

```HTTP
GET /shop/:id/cards
```

| Parameters | Type   | In    | Description    |
| :--------- | :----- | :---- | :------------- |
| **id**     | number | query | **[required]** |

##### Request

```HTTP
GET /shop/1/cards
```

##### Response

```HTTP
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
      "isActive": true
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
      "isActive": true
    },
    "balances": []
  }
]
```

#### Get a shop's campaigns

```HTTP
GET /shop/:id/campaigns
```

| Parameters | Type   | In    | Description    |
| :--------- | :----- | :---- | :------------- |
| **id**     | number | query | **[required]** |

##### Request

```HTTP
GET /shop/1/campaigns
```

##### Response

```HTTP
Status: 200 OK
```

```json
[
  {
    "id": 1,
    "promotionId": 1,
    "shopId": 1,
    "subject": "Hello",
    "textData": "New promotion available at your store!",
    "isActive": true
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

```HTTP
Status: 201 CREATED
```

```json
{
  "message": "Shop created"
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

```HTTP
Status: 200 OK
```

```json
{
  "message": "Shop updated"
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

```HTTP
Status: 200 OK
```

```json
{
  "message": "Shop deleted"
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

```HTTP
Status: 200 OK
```

```json
{
  "id": 1,
  "shopId": 1,
  "userId": 1
}
```


#### Get user's cards

```HTTP
GET /card
```

| Parameters | Type   | In    | Description    |
| :--------- | :----- | :---- | :------------- |
|            |        |       |                |

##### Request

```HTTP
GET /card
```

##### Response

```HTTP
Status: 200 OK
```

```json
[
  {
    "id": 1,
    "shopId": 1,
    "userId": 1
  },
  {
    "id": 2,
    "shopId": 2,
    "userId": 1
  },
  {
    "id": 3,
    "shopId": 3,
    "userId": 1
  }
]
```

#### Create a card

```HTTP
POST /card
```

| Parameters   | Type    | In   | Description                                                           |
| :----------- | :------ | :--- | :-------------------------------------------------------------------- |
| **shopId**   | number  | body | **[required]**                                                        |
| **userId**   | number  | body | **[optional]** Need to be specified if the card is created by a Fider |
| **isActive** | boolean | body | **[optional]**                                                        |

##### Request

```HTTP
POST /card
  {
    "shopId": 1,
  }
```

##### Response

```HTTP
Status: 201 CREATED
```

```json
{
  "message": "Card created"
}
```

#### Update a card

```HTTP
PUT /card/:id
```

| Parameters   | Type    | In    | Description    |
| :----------- | :------ | :---- | :------------- |
| **id**       | number  | query | **[required]** |
| **isActive** | boolean | body  | **[optional]** |

##### Request

```HTTP
PUT /card/1
  {
    "isActive": false,
  }
```

##### Response

```HTTP
Status: 200 OK
```

```json
{
  "message": "Card updated"
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

```HTTP
Status: 200 OK
```

```json
{
  "message": "Card deleted"
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

```HTTP
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
  "checkoutLimit": 10
}
```

#### Create a promotion

```HTTP
POST /promotion
```

| Parameters        | Type    | In   | Description    |
| :---------------- | :------ | :--- | :------------- |
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
    "name": "Promotion",
    "description": "Promotion description",
    "startAt": "2019-05-27",
    "endAt": "2020-05-27",
    "checkoutLimit": 10,
  }
```

##### Response

```HTTP
Status: 201 CREATED
```

```json
{
  "message": "Promotion created"
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

```HTTP
Status: 200 OK
```

```json
{
  "message": "Promotion updated"
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

```HTTP
Status: 200 OK
```

```json
{
  "message": "Promotion deleted"
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

```HTTP
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

```HTTP
Status: 201 CREATED
```

```json
{
  "message": "Balance created"
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

```HTTP
Status: 200 OK
```

```json
{
  "message": "Balance updated"
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

```HTTP
Status: 200 OK
```

```json
{
  "message": "Balance deleted"
}
```

### Checkout endpoint

```HTTP
PUT /checkout
```

| Parameters      | Type   | In   | Description                                        |
| :-------------- | :----- | :--- | :------------------------------------------------- |
| **uuid**        | string | body | **[required]** uuid of user (scanned from QR code) |
| **promotionId** | number | body | **[required]** promotion id to apply               |

##### Request

```HTTP
PUT /checkout
  {
    "promotionId": 1,
    "uuid": some-uuid
  }

```

##### Response

```HTTP
Status: 200 OK
```

```json
{
  "message": "Balance updated" // increments counter +1
}
```

or

```HTTP
Status: 200 OK
```

```json
{
  "message": "Promotion limit reached" // Limit is reached, customer gets prize
}
```

### Campaigns endpoints

#### Get a campaign

```HTTP
GET /campaign/:id
```

| Parameters | Type   | In    | Description    |
| :--------- | :----- | :---- | :------------- |
| **id**     | number | query | **[required]** |

##### Request

```HTTP
GET /campaign/1
```

##### Response

```HTTP
Status: 200 OK
```

```json
{
  "id": 1,
  "promotionId": 1,
  "shopId": 1,
  "subject": "Hello",
  "textData": "New promotion available at your store!",
  "isActive": true
}
```

#### Create a campaign

```HTTP
POST /balance
```

| Parameters      | Type   | In   | Description                                                                |
| :-------------- | :----- | :--- | :------------------------------------------------------------------------- |
| **promotionId** | number | body | **[optional]**                                                             |
| **subject**     | string | body | **[required]**                                                             |
| **textData**    | string | body | **[optional]** One of `textData`, `htmlData` and `templateUrl` is required |
| **htmlData**    | string | body | **[optional]** One of `textData`, `htmlData` and `templateUrl` is required |
| **templateUrl** | string | body | **[optional]** One of `textData`, `htmlData` and `templateUrl` is required |

##### Request

```HTTP
POST /campaign
  {
    "promotionId": 1,
    "subject": "Hello",
    "textData": "New promotion available at your store!",
    "isActive": true
  }
```

##### Response

```HTTP
Status: 201 CREATED
```

```json
{
  "message": "Campaign created"
}
```

#### Send a campaign

This feature sends the campaign immediatly to the customers.
You can choose to send a new campaign by filling the parameters or send an existing one by only providing an `id`.

```HTTP
POST /campaign/send
```

| Parameters      | Type   | In   | Description                                                                                               |
| :-------------- | :----- | :--- | :-------------------------------------------------------------------------------------------------------- |
| **id**          | number | body | **[optional]** If `id` is specified, the other parameters should be absent                                |
| **promotionId** | number | body | **[optional]** Only if `id` is not specified                                                              |
| **subject**     | string | body | **[required]** Only if `id` is not specified                                                              |
| **textData**    | string | body | **[optional]** Only if `id` is not specified. One of `textData`, `htmlData` and `templateUrl` is required |
| **htmlData**    | string | body | **[optional]** Only if `id` is not specified. One of `textData`, `htmlData` and `templateUrl` is required |
| **templateUrl** | string | body | **[optional]** Only if `id` is not specified. One of `textData`, `htmlData` and `templateUrl` is required |

##### Request

```HTTP
POST /campaign/send
  {
    "id": 1,
  }
```

OR

```HTTP
POST /campaign/send
  {
    "subject": "Hello",
    "textData": "New promotion available at your store!",
    "isActive": true
  }
```

##### Response

```HTTP
Status: 200 Ok
```

```json
{
  "status": 200
}
```

#### Update a campaign

```HTTP
PUT /campaign/:id
```

| Parameters      | Type   | In    | Description    |
| :-------------- | :----- | :---- | :------------- |
| **id**          | number | query | **[required]** |
| **promotionId** | number | body  | **[optional]** |
| **subject**     | string | body  | **[optional]** |
| **textData**    | string | body  | **[optional]** |
| **htmlData**    | string | body  | **[optional]** |
| **templateUrl** | string | body  | **[optional]** |

##### Request

```HTTP
PUT /campaign/1
  {
    "counter": 10,
    "isActive": false
  }
```

##### Response

```HTTP
Status: 200 OK
```

```json
{
  "message": "Campaign updated"
}
```

#### Delete a campaign

```HTTP
DELETE /campaign/:id
```

| Parameters | Type   | In    | Description    |
| :--------- | :----- | :---- | :------------- |
| **id**     | number | query | **[required]** |

##### Request

```HTTP
DELETE /campaign/1
```

##### Response

```HTTP
Status: 200 OK
```

```json
{
  "message": "Campaign deleted"
}
```

### Analytics endpoints

#### Get a shop's affluence

```HTTP
GET /analytics/affluence?start_date=xxx&end_date=yyy
```

| Parameters     | Type   | In    | Description                     |
| :------------- | :----- | :---- | :------------------------------ |
| **start_date** | string | query | **[required]** DateString (ISO) |
| **end_date**   | string | query | **[required]** DateString (ISO) |

##### Request

```HTTP
GET /analytics/affluence?start_date=2022-06-23&end_date=2023-06-23
```

##### Response

```HTTP
Status: 200 OK
```

```json
{
  "status": 200,
  "value": 20
}
```

#### Get a shop's clients count

```HTTP
GET /analytics/clients-count?start_date=xxx&end_date=yyy
```

| Parameters     | Type   | In    | Description                     |
| :------------- | :----- | :---- | :------------------------------ |
| **start_date** | string | query | **[required]** DateString (ISO) |
| **end_date**   | string | query | **[required]** DateString (ISO) |

##### Request

```HTTP
GET /analytics/clients-count?start_date=2022-06-23&end_date=2023-06-23
```

##### Response

```HTTP
Status: 200 OK
```

```json
{
  "status": 200,
  "value": 20
}
```

#### Get a shop's promotion ranking

```HTTP
GET /analytics/promotions-ranking?start_date=xxx&end_date=yyy
```

| Parameters     | Type   | In    | Description                     |
| :------------- | :----- | :---- | :------------------------------ |
| **start_date** | string | query | **[required]** DateString (ISO) |
| **end_date**   | string | query | **[required]** DateString (ISO) |

##### Request

```HTTP
GET /analytics/promotions-ranking?start_date=2022-06-23&end_date=2023-06-23
```

##### Response

```HTTP
Status: 200 OK
```

```json
{
  "status": 200,
  "promotionNames": ["best promotion", "second best promotion"],
  "values": [55, 24]
}
```

#### Get a shop's promotion checkout count

```HTTP
GET /analytics/promotion-checkout-count/:id?start_date=xxx&end_date=yyy
```

| Parameters     | Type   | In    | Description                     |
| :------------- | :----- | :---- | :------------------------------ |
| **id**         | string | query | **[required]** Promotion id     |
| **start_date** | string | query | **[required]** DateString (ISO) |
| **end_date**   | string | query | **[required]** DateString (ISO) |

##### Request

```HTTP
GET /analytics/promotion-checkout-count/1?start_date=2022-06-23&end_date=2023-06-23
```

##### Response

```HTTP
Status: 200 OK
```

```json
{
  "status": 200,
  "values": 55
}
```
