import { monthlyData_M, exerciseData } from './data.js';
import {findMonthlyDataArr,loadDataToCalender} from './data-functions.js';

let monthlyData = exerciseData.kanha;

const $ = document.querySelector.bind(document);

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
  
  // Create empty placeholders for the days before the first day of the month
  for (let i = 0; i < firstDayPosition; i++) {
    const placeholder = document.createElement('div');
    daysContainer.appendChild(placeholder);
  }

  // Create and populate the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'dayEl'
    //dayElement.style.animationDelay=(day*4)+'ms';
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


const prevBtn = $('#prevBtn')
const nextBtn = $('#nextBtn')
//createCalendar(22,8,2023)
let _data = createCalendar()
//console.log(_data);



function changeUser(monthly_data) {
  monthlyData = monthly_data
  _data = createCalendar(undefined,_data.month,_data.year)
  let currentMonthData = findMonthlyDataArr(monthlyData, _data.month, _data.year)
  loadDataToCalender(currentMonthData)
}
//window.changeUser = changeUser

let radio_bar = document.querySelector('.radio-toolbar')

radio_bar.addEventListener('input',()=>{
  //changeUser(exerciseData[user_data.value])
  let userdata;
  switch (radio_bar.querySelector('input[type=radio]:checked').value) {
    case 'atal':
      userdata = exerciseData.atal
      break;
    case 'kanha':
      userdata = exerciseData.kanha
      break;
    case 'data_m':
      userdata = monthlyData_M
    break;  
    default:
      userdata = exerciseData.kanha;
  }
  changeUser(userdata)
})


nextBtn.addEventListener('click', (ev) => {
  document.documentElement.style.setProperty('--anim', '25px');
    let nextMonth = _data.month + 1;
    let nextYear = _data.year;

    if (nextMonth > 12) {
        nextMonth = 1;
        nextYear += 1;
    }

    _data = createCalendar(undefined, nextMonth, nextYear);
    let currentMonthData = findMonthlyDataArr(monthlyData,_data.month, _data.year)
    loadDataToCalender(currentMonthData)
    
});

prevBtn.addEventListener('click', (ev) => {
  document.documentElement.style.setProperty('--anim', '-25px');
    let prevMonth = _data.month - 1;
    let prevYear = _data.year;

    if (prevMonth < 1) {
        prevMonth = 12;
        prevYear -= 1;
    }

    _data = createCalendar(undefined, prevMonth, prevYear);
    let currentMonthData = findMonthlyDataArr(monthlyData,_data.month,_data.year)
    loadDataToCalender(currentMonthData)
});

let currentMonthData = findMonthlyDataArr(monthlyData,_data.month, _data.year)

loadDataToCalender(currentMonthData)


// hue slider
let hueSlider = document.querySelector('#hue')
let hueDisplay = document.querySelector('#hueDisplay')
hueSlider.addEventListener('input',()=>{
  hueSlider
})
export function changeHue(hue=100) {
  document.documentElement.style.setProperty('--hue', hue);
  hueDisplay.innerHTML = hue;
}
window.changeHue = changeHue;

export function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove('active');
  }
  tablinks = document.getElementsByClassName("nav-item");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove('active');
  }
  document.getElementById(tabName).classList.add('active');
  evt.currentTarget.classList.add('active');
}

window.openTab = openTab;

document.querySelector('#go_btn').addEventListener('click',()=>{
  document.querySelectorAll('.bottom-navigation-wrapper>.nav-item')[1].click()
})
