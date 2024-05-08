import createCalendar from '/scripts/calendarBuilder.js';
import { monthlyData_M, exerciseData } from './data.js';
import { findMonthlyDataArr, loadDataToCalender } from './data-functions.js';

//let monthlyData = monthlyData_M;
let monthlyData = exerciseData.kanha;


const $ = document.querySelector.bind(document);


const prevBtn = $('#prevBtn')
const nextBtn = $('#nextBtn')
//createCalendar(22,8,2023)
let _data = createCalendar()
//console.log(_data);

let currentMonthData = findMonthlyDataArr(monthlyData, _data.month, _data.year)
loadDataToCalender(currentMonthData)

// or try reset classes (.passed and .failed) of calendar 

console.time('timer')

function changeUser(monthly_data) {
  monthlyData = monthly_data
  _data = createCalendar(undefined, _data.month, _data.year)
  let currentMonthData = findMonthlyDataArr(monthlyData, _data.month, _data.year)
  loadDataToCalender(currentMonthData)
}
window.changeUser = changeUser
//changeUser(monthlyData_M)
console.timeEnd('timer')

let user_data = document.querySelector('#user_data')
let radio_bar = document.querySelector('.radio-toolbar')

radio_bar.addEventListener('input', () => {
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

/*
console.time('bb')
let dayEls = document.querySelectorAll('.dayEl')
dayEls.forEach(v=>{
  if (v.classList.contains('failed')) {
    v.classList.remove('failed')
  } else if (v.classList.contains('passed')) {
    v.classList.remove('passed')
  }
})
monthlyData = monthlyData_M
  
  currentMonthData = findMonthlyDataArr(monthlyData, _data.month, _data.year)
  loadDataToCalender(currentMonthData)
console.timeEnd('bb')
*/

nextBtn.addEventListener('click', (ev) => {
  document.documentElement.style.setProperty('--anim', '25px');
  let nextMonth = _data.month + 1;
  let nextYear = _data.year;

  if (nextMonth > 12) {
    nextMonth = 1;
    nextYear += 1;
  }

  _data = createCalendar(undefined, nextMonth, nextYear);
  let currentMonthData = findMonthlyDataArr(monthlyData, _data.month, _data.year)
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
  let currentMonthData = findMonthlyDataArr(monthlyData, _data.month, _data.year)
  loadDataToCalender(currentMonthData)
});




// hue slider
let hueSlider = document.querySelector('#hue')
let hueDisplay = document.querySelector('#hueDisplay')
/*
hueSlider.addEventListener('input', () => {
  hueSlider
})
*/
export function changeHue(hue = 300) {
  document.documentElement.style.setProperty('--hue', hue);
  hueDisplay.innerHTML = hue;
}
window.changeHue = changeHue

let saturationSlider = document.querySelector('#saturation')
let saturationDisplay = document.querySelector('#saturationDisplay')
export function changeSaturation(sat = 70) {
  document.documentElement.style.setProperty('--sat', sat + '%');
  saturationDisplay.innerHTML = sat;
}
window.changeSaturation = changeSaturation

/*saturationSlider.addEventListener('input', () => {
  let saturation = saturationSlider.value
  changeSaturation(saturation)
})*/

// open/change tab 
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

document.querySelector('#go_btn').addEventListener('click', () => {
  document.querySelectorAll('.bottom-navigation-wrapper>.nav-item')[1].click()
})

/*
let palette =  ["#fff1fa", "#ffe3f4", "#ffd5ef", "#ffc7ea", "#ffb8e4", "#ffa9df", "#ff9ad9", "#ff8ad4", "#ff79cf", "#ff67c9", "#c1008d", "#b1007f", "#a00071", "#900063", "#7f0054", "#6f0047", "#5f003a", "#50002e", "#400022", "#330016"]
palette.forEach((v,i)=>{
  document.documentElement.style.setProperty('--P'+(i+1), v);
})
*/