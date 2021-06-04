const { orderBy } = require("../db/connection");
const knex = require("../db/connection");

function getReservationById(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function create(newTable) {
  return knex("tables")
    .insert(newTable, "*")
    .then((tables) => tables[0]);
}

function read(tableId) {
  return knex("tables").select("*").where({ table_id: tableId }).first();
}

function setReservationToTable(table_id, reservation_id) {
  return knex("tables")
    .update({ reservation_id }, "*")
    .where({ table_id })
    .then((tables) => tables[0]);
}

function removeReservationFromTable(table_id) {
  return knex("tables")
    .update({ reservation_id: null }, "*")
    .where({ table_id })
    .then((tables) => tables[0]);
}

module.exports = {
  getReservationById,
  list,
  create,
  read,
  setReservationToTable,
  removeReservationFromTable,
};