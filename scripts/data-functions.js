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
  

const containsOnlyZeroOne = data.every(num => num === 0 || num === 1);
const containsOnlyIntegers = data.every((num, index) => Number.isInteger(num) && num > 0);

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
  
  data.forEach((val, i) => {
    dayElems[val - 1].classList.add('passed')
  });
  
  console.log('int');
  passedDays = data.length;
  totalDays = Math.max(...data);
  failedDays = totalDays - passedDays;
  passedPercent = ((passedDays / totalDays) * 100).toFixed(2);
  longestStreak = findLongestConsecutiveLength(data);
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

// dashboard 
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

function findLongestConsecutiveLength(arr) {
    if (arr.length === 0) {
        return 0;
    }
    
    let longestStreak = 0;
    let currentStreak = 1;

    // Sort the array to make sure consecutive integers are adjacent
    arr.sort((a, b) => a - b);

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[i - 1] + 1) {
            currentStreak++;
        } else {
            longestStreak = Math.max(longestStreak, currentStreak);
            currentStreak = 1;
        }
    }

    return Math.max(longestStreak, currentStreak);
}

