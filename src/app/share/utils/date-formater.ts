 export function millisecondsToFormattedString(milliseconds: number) {
  const dateObj = new Date(milliseconds);
  
  // Get the date components
  const day = String(dateObj.getDate()).padStart(2, '0');
  const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const month = monthNames[dateObj.getMonth()];
  
  // Get the time components
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}hs - ${day}/${month}`;
}