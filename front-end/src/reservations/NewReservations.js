import React, { useEffect, useState } from "react";

function NewReservation() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [partySize, setPartySize] = useState("");

  function handleSubmit(event) {
      event.preventDefault();
      if(partySize < 1){
          alert("There should be at least one person")
      }
  }

  return (
    <main>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              type="text"
              name="firstName"
              required
            />
          </div>
          <div>
              <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder = "Last name"
              type = "text"
              name="lastName"
              required
              />
          </div>
          <div>
              <input
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder = "Mobile number"
              type = "text"
              name ="mobileNumber"
              required
              />
          </div>
          <div>
              <input
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              type="date"
              name="reservationDate"
              required
              />
          </div>
          <div>
              <input
              value={reservationTime}
              onChange={(e) => setReservationTime(e.target.value)}
              type="time"
              name="reservationTime"
              required
              />
          </div>
          <div>
              <input 
              value={partySize}
              onChange={(e) => setPartySize(e.target.value)}
              type="number"
              name="partySize"
              placeholder="1"
              required
              />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      hello there, this will one day house a new reservation form
    </main>
  );
}

export default NewReservation;
