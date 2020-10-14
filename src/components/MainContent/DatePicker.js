import React from "react";
import { useApp } from "../../context";
import { getMonthDetails } from "../../functions/datePickerInit";

const DatePicker = () => {
  const { state, dispatch } = useApp();
  const { arrivalDate, departureDate } = state.search;
  const { focusBlock } = state.states;
  const {
    weekDaysList,
    monthsList,
    year,
    month,
    initialYear,
    initialMonth,
    todayTimestamp,
    monthDetails,
  } = state.datePicker;

  // Change selectedDay depending on which field is focused (arrival or departure)
  let selectedDay = focusBlock === "arrivalDate" ? arrivalDate : departureDate;

  // Get the month name
  const getMonthStr = (month) =>
    monthsList[Math.max(Math.min(11, month), 0)] || "Month";

  // Day styling (current day and selected day)
  const isCurrentDay = (day) => {
    return day.timestamp === todayTimestamp;
  };
  const isSelectedDay = (day) => {
    return day.timestamp === selectedDay;
  };

  // Set Selected date as Departure Date or Arrival Date depending on which input is focused. If date from previous month, change active month
  const onDateClick = (day) => {
    return (
      dispatch({
        type: "SELECT_DATE",
        payload: {
          key: focusBlock,
          value: day.timestamp,
        },
      }),
      (month !== 0 || year !== day.year) && setMonth(day.month)
    );
  };

  // Change current month
  const setMonth = (offset) => {
    let newYear = year;
    let newMonth = month + offset;
    if (newMonth === -1) {
      newMonth = 11;
      newYear--;
    } else if (newMonth === 12) {
      newMonth = 0;
      newYear++;
    }

    return dispatch({
      type: "CHANGE_MONTH_YEAR",
      payload: {
        month: newMonth,
        year: newYear,
        monthDetails: getMonthDetails(newYear, newMonth),
      },
    });
  };

  // Render calendar and avoid to set a date in the past
  const renderCalendar = () => {
    let days = monthDetails.map((day, index) => {
      return (
        <div
          className={
            "day-container " +
            (day.timestamp <
            (focusBlock === "arrivalDate" ? departureDate : todayTimestamp)
              ? " disabled"
              : "") +
            (isCurrentDay(day) ? " highlight" : "") +
            (isSelectedDay(day) ? " daySelected" : "")
          }
          onClick={() => onDateClick(day)}
          key={index}
        >
          <div className="dayItem">
            <span>{day.date}</span>
          </div>
        </div>
      );
    });

    return (
      <div>
        <div className="weekdaysTopBar">
          {weekDaysList.map((d, i) => (
            <div key={i} className="weekday">
              {d}
            </div>
          ))}
        </div>
        <div className="daysTableBody">{days}</div>
      </div>
    );
  };

  return (
    <div>
      <div className="datePickerContainer">
        <div className="head">
          {month > initialMonth || year > initialYear ? (
            <div className="left-arrow" onClick={() => setMonth(-1)}></div>
          ) : (
            <div></div>
          )}
          {getMonthStr(month) + " " + year}{" "}
          <div className="right-arrow" onClick={() => setMonth(1)}></div>
        </div>
      </div>
      <div className="datePickerBody">{renderCalendar()}</div>
    </div>
  );
};

export default DatePicker;
