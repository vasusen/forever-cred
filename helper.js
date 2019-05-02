export const NAME_CHAR_LIMIT = 100;
export const DESCRIPTION_CHAR_LIMIT = 400;

export function fieldsAreValid(fields) {
  let { id, recipientName, courseName, courseDescription, issuerName, instructorName, issuedOn } = fields;
  let day, month, year;
  [month, day, year] = (fields.issuedOn).split("-");
  // check date format is mm-dd-yyyy
  if ( !(parseInt(day) < 32 && parseInt(month) < 13 && parseInt(year) < 9999 && year.length == 4) ) {
    return 'Date format is: mm-dd-yyyy';
    // return false;
  }
  // Check all fields are filled out
  if (!(id && recipientName && courseName && courseDescription && issuerName && instructorName && issuedOn)) {
    return 'Make sure all fields are filled out';
    // return false;
  }

  // Check recipient and instructor names are under n chars
  if (!(recipientName.length < NAME_CHAR_LIMIT && instructorName.length < NAME_CHAR_LIMIT)) {
    return 'Make sure recipient or instructor name is under 100 characters';
    // return false;
  }
  // Check description and course names are under n chars
  if (!(courseDescription.length < DESCRIPTION_CHAR_LIMIT && courseName.length < DESCRIPTION_CHAR_LIMIT)) {
    return 'Make sure your course description and course name are under 400 characters';
    // return false;
  }

  return ''; 
}



// String to UTC EPOCH
export function dateToEpoch(date) {
  let day, month, year;
  [day, month, year] = (date).split("-");
  const dateEpoch = Date.UTC(year, month-1, day);
  return dateEpoch;
}

export function epochToDate(numString) {
  const date = new Date(parseInt(numString));
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dateString = `${months[month]} ${day}, ${year}`;
  return dateString;
}