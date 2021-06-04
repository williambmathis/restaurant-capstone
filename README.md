## Installation

1. Fork and clone this repository.
2. Run `npm install` to install project dependencies.
3. Create a `.env` file in the `backend` directory.
4. Modify `.env` with the following:</br>
   <code>
   &nbsp;DATABASE*URL=\_productionURL*</br>
   &nbsp;DATABASE*URL_DEVELOPMENT=\_developmentURL*</br>
   &nbsp;DATABASE*URL_TEST=\_testURL*</br>
   &nbsp;DATABASE*URL_PREVIEW=\_previewURL*</br>
   &nbsp;LOG_LEVEL=info</br>
   </code>
5. Replace "productionURL" with the URL to your production database.
6. Repeat step 5 for the remaining fields, but using the corresponding database URL.
7. Create a `.env` file in the `frontend` directory.
8. Modify `.env` with the following:</br>
   <code>REACT_APP_API_BASE_URL=http://localhost:5000<br/></code>
9. From inside the backend directory, run `npx knex migrate:latest`.
10. Run `npx knex seed:run`.
11. Finally, go back to the root of the main directory and run `npm run start:dev` to run the application locally.

## API

| Endpoint                               | Method | Description                                                                                           |
| -------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| `/reservations`                        | GET    | Gets all of the reservations. If 'date' query parameter exists, then gets reservations for that date. |
| `/reservations`                        | POST   | Creates a new reservation.                                                                            |
| `/reservations/:reservation_id`        | GET    | Gets the reservation corresponding to 'reservation_id'.                                               |
| `/reservations/:reservation_id`        | PUT    | Updates the reservation corresponding to 'reservation_id'.                                            |
| `/reservations/:reservation_id/status` | PUT    | Updates the reservation status.                                                                       |
| `/tables`                              | GET    | Gets all of the tables.                                                                               |
| `/tables`                              | POST   | Creates a table.                                                                                      |
| `/tables/:tableId/seat`                | PUT    | Assigns a reservation to a table.                                                                     |
| `/tables/:tableId/seat`                | DELETE | Frees a table for future reservations.                                                                |
