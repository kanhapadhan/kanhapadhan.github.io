const calendar = document.querySelector('.calendar');
const daysContainer = document.querySelector('.days-container');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


//function createCalendar(date = (new Date()).getDate(), month = (new Date()).getMonth() + 1, year = (new Date()).getFullYear()) {
// try creating parameter as object 
function createCalendar(date, month, year) {
  // default values
  let today = new Date()
  
  month = month || today.getMonth() + 1;
  year = year || today.getFullYear();
  
  if (month && month==today.getMonth() + 1) {
    date = date || today.getDate()
  }
  
  month -= 1; // to make it 0-indexed
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayPosition = new Date(year, month, 1).getDay()

  // Remove existing data
  daysContainer.innerHTML = ''

  document.querySelector('#current-month').textContent = monthNames[month] + ' - ' + year
  // in tab2 
  document.querySelector('#current-month2').textContent = monthNames[month] + ' - ' + year
  
  // Create empty placeholders for the days before the first day of the month
  for (let i = 0; i < firstDayPosition; i++) {
    const placeholder = document.createElement('div');
    daysContainer.appendChild(placeholder);
  }

  // Create and populate the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'dayEl'
    //dayElement.style.animationDelay=(day*5)+'ms';
    if (date && day === date) {
      dayElement.classList.add('current-date');
    }
    
    dayElement.textContent = day;
    daysContainer.appendChild(dayElement);
  }
  return {
    date:date,
    month:month+1, // 1-12
    year:year
  }
}

// 0 indexed month
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export default createCalendar;