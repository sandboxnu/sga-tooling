export const createDateString = (date: Date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const month = months[date.getMonth()];
  const dayOfWeek = days[date.getDay()];
  const fulldate = date.getDate();
  const year = date.getFullYear();

  return {
    month,
    dayOfWeek,
    fulldate,
    year,
  };
};
