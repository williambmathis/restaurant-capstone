const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");


async function list(req, res, next) {
    const data = await service.list();
    res.json({data});
}

async function seatReservation(req, res, next) {
    const {reservation_id} = req.body.data;
    const {table} = res.locals;
    const data = await service.setReservationToTable(table.table_id, Number(reservation_id));
    await reservationsService.updateReservationAfterTableReset(Number(reservation_id), "seated");
    res.json({data});
}

async function create(req, res, next) {
    const newTable = res.locals.newTable;
    const data = await service.create(newTable);
    res.status(201).json({data});
}
async function resetTable(req, res, next) {
    const table = res.locals.table;
    const reservation_id = table.reservation_id;
    await service.resetReservationStatusOfTable(table.table_id);
    const data = await reservationsService.updateReservationAfterTableReset(
        Number(reservation_id),
        "finished"
    );

    res.json({data});
}


/*********** Middleware functions *******************/

async function isNewTableValid(req, res, next) {
    const table = req.body.data;
    const requiredFields = [
        "table_name",
        "capacity",
    ]

    if (!req.body.data) {
        return next({
            status: 400,
            message: "Request body must have a 'data' property.",
        });
    } else {
        for (let field of requiredFields) {
            if (!req.body.data[field]) {
                return next({
                    status: 400,
                    message: `${field} is required`
                })
            } else {
                if (Number(table.capacity) < 1) {
                    return next({
                        status: 400,
                        message: "capacity must be 1 or greater",
                    });
                }
                if (table.table_name.length < 2) {
                    return next({
                        status: 400,
                        message: "table_name needs to be at least 2 characters long",
                    });
                }
            }
        }
    }
    res.locals.newTable = table;
    next();
}

async function doesTableExists(req, res, next) {
    const {tableId} = req.params;
    const foundTable = await service.read(Number(tableId));
    if (!foundTable) {
        return next({
            status: 404,
            message: `Table ${tableId} not found.`,
        });
    }
    res.locals.table = foundTable;
    next();
}

function isTableInUse(req, res, next) {
    const table = res.locals.table;
    if (table.reservation_id === null) {
        return next({
            status: 400,
            message: `Table is not occupied.`,
        });
    }
    next();
}

async function checkReservationRequirements(req, res, next) {
    const {table} = res.locals;
    const {reservation_id} = req.body.data;
    const foundReservation = await service.getReservationById(Number(reservation_id));

    if (!foundReservation) {
        return next({
            status: 404,
            message: `Reservation for id ${reservation_id} not found.`,
        });
    } else {
        if (table.reservation_id) {
            return next({
                status: 400,
                message: "Table is already occupied.",
            });
        }

        if (foundReservation.people > table.capacity) {
            return next({
                status: 400,
                message: "Party size exceeds table capacity.",
            });
        }

        if (foundReservation.status === "seated") {
            return next({
                status: 400,
                message: "Party has already been seated",
            });
        }
    }
    next()
}

async function isSeatReservationValid(req, res, next) {
    if (req.body.data === undefined) {
        return next({
            status: 400,
            message: "Request body must have a 'data' property.",
        });
    } else {
        if (req.body.data.reservation_id === undefined) {
            return next({
                status: 400,
                message: "Request body must have a 'reservation_id' property.",
            });
        }
    }
    next();
}




module.exports = {
    list: [asyncErrorBoundary(list)],
    create: [isNewTableValid, asyncErrorBoundary(create)],
    seatReservation: [
        asyncErrorBoundary(doesTableExists),
        asyncErrorBoundary(isSeatReservationValid),
        asyncErrorBoundary(checkReservationRequirements),
        asyncErrorBoundary(seatReservation),
    ],
    resetTable: [asyncErrorBoundary(doesTableExists), isTableInUse, asyncErrorBoundary(resetTable)],
};