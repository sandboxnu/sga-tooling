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

// format Date objects from the Attendance Change Requests to the format that the db uses
export const formatDate = (date: Date, includeYear: boolean) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because getMonth() returns 0-based month
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return includeYear
    ? `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    : `${hours}:${minutes}:${seconds}`;
};
