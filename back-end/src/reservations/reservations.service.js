//const { today } = require("../../../front-end/src/utils/date-time");
const { today } = require("../../../front-end/src/utils/date-time");
const knex = require("../db/connection");

async function list(){
    return knex("reservations").select("first_name", "reservation_date").where({reservation_date: today()})
    
    
}


module.exports = {
    list
}