# TestTask

## Description
Node.js API server

## Technical requirements

### App requirements
- The application has Banks, Transactions, and Transaction Categories.
(Category).
- You can add new banks and transaction categories in the application.
- Transactions are sent to a separate Webhook.
- A transaction can have more than one category.
- Banks and categories can be deleted only if there are no transactions in them.
- Transactions can be deleted.
- The bank balance must be recalculated when adding or deleting
transactions are added or deleted.

### API endpoints requirements
- Bank: create, delete, get one, get all, edit
- Transaction: create (webhook), delete, get all
  - To get all transactions, you need to implement pagination
  - For webhook add api key authorization
- Category: create, delete, get one, get all, edit
- Method for getting statistics
  - Accepts categoryIds, fromPeriod, toPeriod
  - Returns an object in the format: `{ category name: balance }`

## Installation

1. Go to the `backend` folder and create a new `.env` file
2. Copy the contents of the `.env.local` file into the `.env` file
3. Go back to the root of the project and run the command:
```sh
docker-compose up -d
```

## Swagger documentation

- Swagger documentation is available after the launch of the project at http://localhost:4000/api#/
(The port can change depending on the project setup. By default `APP_PORT=4000`)
- Api key for webhook request `APP_API_KEY=121ab2c3d4e5f61ab2c3d4e4r4`
