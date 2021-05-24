import React from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import ReservationRow from "./ReservationRow";
import TableRow from "./TableRow";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, reservations, tables, reservationsError, tablesError }) {
  const history = useHistory();

 
  
  const reservationsJSX = () => {
    return reservations.map((reservation) => 
      <ReservationRow key={reservation.reservation_id} reservation={reservation} />)
    
  }
  
  const tablesJSX = () => {
    return tables.map((table) => 
      <TableRow key={table.table_id} table={table} />);
  };

  return (
    
    <main>
		<h1>Dashboard</h1>

		<h4 className="mb-0">Reservations for {date}</h4>
			
		<ErrorAlert error={reservationsError} />

		{ /* although i'm not caring too much right now about what the table looks like, i'm still utilizing some of the classes from Bootstrap to format it in a nice way. */ }
		<table className="table">
			{ /* "thead" is the table header, meant for the column labels */ }
			<thead className="thead-light">
				{ /* "tr" means table row */ }
				<tr>
					{// "th" is a table heading. they all have a scope="col", which is used primarily for Bootstrap. (it will basically <strong> it)
}
					<th scope="col">ID</th>
					<th scope="col">First Name</th>
					<th scope="col">Last Name</th>
					<th scope="col">Mobile Number</th>
					<th scope="col">Time</th>
					<th scope="col">People</th>
					<th scope="col">Status</th>
					<th scope="col">Edit</th>
					<th scope="col">Cancel</th>
					<th scope="col">Seat</th>
				</tr>
			</thead>
			
			{ /* "tbody" is the table body. */ }
			<tbody>
				{reservationsJSX()}
			</tbody>
		</table>
      
      		{ /* using the same principles as the code up above, we can make a section for the tables as well: */ }
		<h4 className="mb-0">Tables</h4>

		<ErrorAlert error={tablesError} />

		<table className="table">
			<thead className="thead-light">
				<tr>
					<th scope="col">ID</th>
					<th scope="col">Table Name</th>
					<th scope="col">Capacity</th>
					<th scope="col">Status</th>
					<th scope="col">Finish</th>
				</tr>
			</thead>
				
			<tbody>
				{tablesJSX()}
			</tbody>
		</table>
		
		<button type="button" onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous</button>
		<button type="button" onClick={() => history.push(`/dashboard`)}>Today</button>
		<button type="button" onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next</button>
    </main>
    
  );
}

export default Dashboard;
