
  
  // function to format a timestamp, accepts the timestamp and an `options` object as parameters
  module.exports = (
    timestamp,
    { monthLength = 'short', dateSuffix = true } = {}
  ) => {
    // create month object
    const months = {
      0: monthLength === 'short' ? '01' : 'January',
      1: monthLength === 'short' ? '02' : 'February',
      2: monthLength === 'short' ? '03' : 'March',
      3: monthLength === 'short' ? '04' : 'April',
      4: monthLength === 'short' ? '05' : 'May',
      5: monthLength === 'short' ? '06' : 'June',
      6: monthLength === 'short' ? '07' : 'July',
      7: monthLength === 'short' ? '08' : 'August',
      8: monthLength === 'short' ? '09' : 'September',
      9: monthLength === 'short' ? '10' : 'October',
      10: monthLength === 'short' ? '11' : 'November',
      11: monthLength === 'short' ? '12' : 'December'
    };
  
    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];
  
    const dayOfMonth = dateObj.getDate();
  
    const year = dateObj.getFullYear();
    let hour =
      dateObj.getHours() > 12
        ? Math.floor(dateObj.getHours() / 2)
        : dateObj.getHours();
  
    // if hour is 0 (12:00am), change it to 12
    if (hour === 0) {
      hour = 12;
    }
    const formattedTimeStamp = `${formattedMonth}/${dayOfMonth}/${year}`;
  
    return formattedTimeStamp;
  };
  