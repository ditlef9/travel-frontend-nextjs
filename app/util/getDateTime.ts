// app/util/getDateTime.ts

/**
 * Utility function to get various date and time formats.
 * @returns An object containing formatted date and time values.
 */
function getDateTime() {
    // Current date and time
    const date = new Date();
  
    // ISO string
    const dateIsoString = date.toISOString();
  
    // Locale string
    const dateLocaleString = date.toLocaleString();
  
    // Custom formatted date and time
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
  
    const dateTimeSaying = `${day}.${month}.${year} ${hour}:${minute}`;
  
    // Timezone offset
    const timezoneOffset = -date.getTimezoneOffset();
    const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
    const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');
    const timezoneSign = timezoneOffset >= 0 ? '+' : '-';
    const timezoneString = `UTC${timezoneSign}${offsetHours}:${offsetMinutes}`;
  
    return {
      day,
      month,
      year,
      hour,
      minute,
      dateTimeSaying,
      dateIsoString,
      dateLocaleString,
      timezoneString,
    };
  }
  
  export default getDateTime;
  