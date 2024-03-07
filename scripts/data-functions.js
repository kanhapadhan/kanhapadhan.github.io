//import monthlyData from '/data.js';

export function findMonthlyDataArr(dataArr, month, year) {
  for (let i = 0; i < dataArr.length; i++) {
    if (dataArr[i].month === month && dataArr[i].year === year) {
      return dataArr[i].data;
    }
  }
  return null;
}

//let decemberData = findMonthlyDataArr(12, 2023);
//console.log(decemberData); // Output: [0, 1, 0, 1, 0]



export function loadDataToCalender(data = []) {
  // if data not found, 
  // if (!data) return;
  if (!data) {
    console.warn('data not found!')
    return;
  }

  let dayElems = document.querySelectorAll('.dayEl')
//window.loadDataToCalender = loadDataToCalender  

const containsOnlyZeroOne = data.every(num => num === 0 || num === 1);
const containsOnlyIntegers = data.every((num, index) => Number.isInteger(num) && num!==0);

let passedDays, failedDays, totalDays, passedPercent, longestStreak;

if (containsOnlyZeroOne) {
  
  data.forEach((val, i) => {
    dayElems[i].classList.add(val ? 'passed' : 'failed')
  });
  
  console.log('0 & 1');
  passedDays = data.filter((element) => element === 1).length;
  failedDays = data.filter((element) => element === 0).length;
  totalDays = data.length;
  passedPercent = ((passedDays / totalDays) * 100).toFixed(2);
  longestStreak = findLongestStreak(data);
} else if (containsOnlyIntegers) {
  
  
  console.log('int');
  totalDays = data.length;
  let passed_days = data.filter(n=>n>0)
  let failed_days = data.filter(v=>v<0)
  //another way: failedDays = totalDays - passedDays
  passedDays = passed_days.length
  failedDays = failed_days.length
  passedPercent = ((passedDays / totalDays) * 100).toFixed(2);
  longestStreak = longestConsecutivePositive(data);
  
  passed_days.forEach((val, i) => {
    dayElems[val - 1].classList.add('passed')
  });
  failed_days.forEach((val, i) => {
    dayElems[Math.abs(val) - 1].classList.add('failed')
  });
} else {
  console.log('err')
}


  function setData(selector, textContent) {
    document.querySelector(selector).textContent = textContent || 0
  }
  setData('#passedPercent', passedPercent)
  setData('#passedDays', passedDays)
  setData("#failedDays", failedDays)
  setData('#totalDays', totalDays)
  setData('#longestStreak', longestStreak)

  setData('#passed_days', passedDays)
  setData('#passed_percent', passedPercent + '%')
  setData('#failed_days', failedDays)
  setData('#longest_streak', longestStreak)
}

function findLongestStreak(arr) {
  let maxCount = 0;
  let currentCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 1) {
      currentCount++;
      maxCount = Math.max(maxCount, currentCount);
    } else {
      currentCount = 0;
    }
  }

  return maxCount;
}

function longestConsecutivePositive(arr) {
    let maxCount = 0;
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 0 && (i === 0 || arr[i] === arr[i - 1] + 1)) {
            count++;
            maxCount = Math.max(maxCount, count);
        } else {
            count = 0;
        }
    }

    return maxCount;
}

