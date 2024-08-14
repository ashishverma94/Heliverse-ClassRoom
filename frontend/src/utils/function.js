export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
  window.location.href = "/login";
};

export function convertTime(militaryHourStr) {
  const militaryHour = parseInt(militaryHourStr, 10);
  let period = "AM";
  let adjustedHour = militaryHour;

  if (militaryHour >= 12) {
    period = "PM";
    if (militaryHour > 12) {
      adjustedHour = militaryHour - 12;
    }
  }

  if (militaryHour === 12) {
    period = "PM";
  }
  const formattedHour = String(adjustedHour).padStart(2, "0");
  return `${formattedHour} ${period}`;
}

export function isTimeInRange(time, ranges) {
  console.log(time,ranges) ;
  const timeNumber = parseInt(time, 10);

  return ranges.some((range) => {
    const start = parseInt(range.cStartTime, 10);
    const end = parseInt(range.cEndTime, 10);

    const adjustedStart = start - 1;

    return timeNumber >= adjustedStart && timeNumber < end;
  });
}

export function getEndTimes(array, selectedIndex) {
  const selectedElement = array[selectedIndex];
  let index = -1;

  for (let i = 0; i < array.length; i++) {
    if (array[i][1] === selectedIndex) {
      index = i;
      break;
    }
  }
  if (index === -1) {
    return [];
  }

  if (array[index + 1][2] === true) {
    let x = [array[index + 1][0], array[index + 1][1], false];
    return [x];
  }

  let newArray = [];
  for (let i = index + 1; i < array.length - 1; i++) {
    if (array[i][2] === false) {
      newArray.push(array[i]);
      if (array[i + 1][2] === true) {
        let x = [array[i + 1][0], array[i + 1][1], false];
        newArray.push(x);
        return newArray;
      }
    }
  }

  return newArray;
}
