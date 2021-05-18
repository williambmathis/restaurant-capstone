import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import formatReservationDate from "../utils/format-reservation-date";
import ErrorAlert from "../layout/ErrorAlert";

function NewReservation() {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  });

  function validateDate() {
    const reserveDate = new Date(`${formData.reservation_date}T${formData.reservation_time}:00.000`);

    const todaysDate = new Date();

    const foundErrors = [];

    if (reserveDate < todaysDate) {
      foundErrors.push({ message: "Reservations cannot be made in the past" });
    }

    if (reserveDate.getDay() === 2) {
      foundErrors.push({
        message:
          "Reservations cannot be made on a Tuesday (Restaurant is closed).",
      });
    }

    if(reserveDate.getHours() < 10 || (reserveDate.getHours() === 10 && reserveDate.getMinutes() < 30)){
      foundErrors.push({message: "Reservation cannot be made: Restaurant is not open until 10:30AM"});
    }

    else if(reserveDate.getHours() > 22 || (reserveDate.getHours() === 22 && reserveDate.getMinutes() >= 30)){
      foundErrors.push({message: "Reservations cannot be made: Restaurant is closed after 10:30PM."});
    }

    else if(reserveDate.getHours() > 21 || (reserveDate.getHours() === 21 && reserveDate.getMinutes() > 30)){
      foundErrors.push({message: "Reservation cannot be made: Reservation must be made at least an hour before closing."})
    }

    setErrors(foundErrors);

    if(foundErrors.length > 0){
      return false;
    }
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateDate() && validateFields(foundErrors)) {
      history.push(
        `/dashboard?date=${formData.reservation_date}`
      );
    }
    setErrors(foundErrors);
  }


  function validateFields(foundErrors) {
    for(const field in formData) {
      if(formData[field] === "") {
        foundErrors.push({ message: `${field.split("_").join(" ")} cannot be left blank.`})
      }
    }
  
    if(formData.people <= 0) {
      foundErrors.push({ message: "Party must be a size of at least 1." })
    }
  
    if(foundErrors.length > 0) {
      return false;
    }
    return true;
  }


  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  const errorsJSX = () => {
    return errors.map((error, index) => <ErrorAlert key={index} error={error} />)
  }

  return (
    <main>
      <div>
        <form>
          {errorsJSX()}
          <div>
            <label htmlFor="first_name">First Name:&nbsp;</label>
            <input
              name="first_name"
              id="first_name"
              type="text"
              onChange={handleChange}
              value={formData.first_name}
              placeholder="First name"
              required
            />
          </div>
          <div>
            <label htmlFor="last_name">Last Name:&nbsp;</label>
            <input
              name="last_name"
              id="last_name"
              type="text"
              onChange={handleChange}
              value={formData.last_name}
              placeholder="Last name"
              required
            />
          </div>
          <div>
            <label htmlFor="mobile_number">Mobile Number:&nbsp;</label>
            <input
              value={formData.mobile_number}
              id="mobile_number"
              onChange={handleChange}
              type="tel"
              name="mobile_number"
              required
            />
          </div>
          <div>
            <label htmlFor="reservation_date">Reservation Date:&nbsp;</label>
            <input
              id="reservation_date"
              value={formData.reservation_date}
              onChange={handleChange}
              type="date"
              name="reservation_date"
              required
            />
          </div>
          <div>
            <label htmlFor="reservation_time">Reservation Time:&nbsp;</label>
            <input
              id="reservation_time"
              value={formData.reservation_time}
              onChange={handleChange}
              type="time"
              name="reservation_time"
              required
            />
          </div>
          <div>
            <label htmlFor="people">Number of people:&nbsp;</label>
            <input
              if="people"
              value={formData.people}
              onChange={handleChange}
              type="number"
              name="people"
              required
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
          <button type="button" onClick={history.goBack}>
            Cancel
          </button>
        </form>
      </div>
      hello there, this will one day house a new reservation form
    </main>
  );
}

export default NewReservation;
