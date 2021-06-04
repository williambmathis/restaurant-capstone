const knex = require("../db/connection");

const list = (date) => {
  if (date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date: date })
      .orderBy("reservation_time")
      .then((reservations) =>
        reservations.filter((reservation) => reservation.status !== "finished")
      );
  }

  return knex("reservations")
    .select("*")
    .orderBy("reservation_time")
    .then((reservations) =>
      reservations.filter((reservation) => reservation.status !== "finished")
    );
};

const create = (newReservation) => {
  return knex("reservations")
    .insert(newReservation, "*")
    .then((reservations) => reservations[0]);
};

const read = (reservation_id) => {
  return knex("reservations").select("*").where({ reservation_id }).first();
};

const updateReservationStatus = (reservation_id, status) => {
  return knex("reservations")
    .update({ status }, "*")
    .where({ reservation_id })
    .then((reservations) => reservations[0]);
};

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function update(reservation_id, updateData) {
  return knex("reservations")
    .update(updateData, "*")
    .where({ reservation_id })
    .then((reservations) => reservations[0]);
}

module.exports = {
  list,
  create,
  read,
  updateReservationStatus,
  search,
  update,
};