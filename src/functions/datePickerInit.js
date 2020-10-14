const weekDaysList = ["lu", "ma", "me", "je", "ve", "sa", "di"];
const monthsList = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

export const datePickerInit = () => {
  let todayTimestamp =
    Date.now() -
    (Date.now() % (60 * 60 * 24 * 1000)) +
    new Date().getTimezoneOffset() * 1000 * 60;
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();

  let monthDetails = getMonthDetails(year, month);
  return {
    todayTimestamp,
    date,
    year,
    month,
    monthDetails,
    weekDaysList,
    monthsList,
  };
};

export const getNumberOfDays = (year, month) => {
  return 40 - new Date(year, month, 40).getDate();
};

export const getDayDetails = (args) => {
  let date = args.index - args.firstDay;
  let day = args.index % 7;
  let prevMonth = args.month - 1;
  let prevYear = args.year;
  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear--;
  }
  let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
  let _date =
    date < 0
      ? prevMonthNumberOfDays + date + 1
      : (date % args.numberOfDays) + 1;
  let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
  let timestamp = new Date(args.year, args.month + month, _date).getTime();
  return {
    date: _date,
    day,
    month,
    timestamp,
    dayString: weekDaysList[day],
  };
};

export const getMonthDetails = (year, month) => {
  let firstDay = new Date(year, month).getDay();
  let numberOfDays = getNumberOfDays(year, month);
  let monthArray = [];
  let rows = 6;
  let currentDay = null;
  let index = 0;
  let cols = 7;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      currentDay = getDayDetails({
        index,
        numberOfDays,
        firstDay,
        year,
        month,
      });
      monthArray.push(currentDay);
      index++;
    }
  }
  return monthArray;
};

// SET DATE FORMAT
export const setDate = (date) => {
  return date === ""
    ? ""
    : new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        weekday: "short",
      }).format(date);
};
