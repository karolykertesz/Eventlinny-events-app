export const formater = (start) => {
  const TIMEOFFSET = "+02:00";
  const date = new Date(start);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

  let event = new Date(Date.parse(newDateTime));

  let startDate = event;
  let endDate = new Date(
    new Date(startDate).setHours(startDate.getHours() + 2)
  );
  return {
    startIso: startDate,
    endIso: endDate,
  };
};
