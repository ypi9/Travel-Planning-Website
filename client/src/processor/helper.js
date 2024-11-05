
export const degreeC = (degreeK) => {
    return parseInt(degreeK - 273.15)
}
export const degreeF = (degreeK) => {
    return parseInt(1.8 * (degreeK - 273.15) + 32)
}
export const getDate = (timeOffset) => {
    const currentUtcTime = new Date();
    const d = new Date(currentUtcTime.getTime() + timeOffset * 1000);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let date = d.getDate();
    return day + ". " + month + ". " + date + " " + year;
}

export const convertTimeStringToMinutes = (timeString) => {
  const match = timeString.match(/(\d+)h (\d+)m/);

  if (!match) {
    return 0;
  }

  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);

  return hours * 60 + minutes;
};
export default { degreeC, degreeF, getDate, convertTimeStringToMinutes};