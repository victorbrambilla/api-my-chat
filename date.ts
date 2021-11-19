let getDateTime=(date: Date)=> {
    let today = new Date()
    let currentDay = today.getDate();
    let currentMonth = today.getMonth() + 1;
    let currentYear = today.getFullYear();
  
    date = new Date(date)
    let userDay = date.getDate();
    let userMonth = date.getMonth() + 1;
    let userYear = date.getFullYear();
  
    let dayMessage
  
    if (userDay == currentDay && userMonth == currentMonth && userYear == currentYear) {
      dayMessage = 'hoje'
    } else if (userDay == currentDay - 1 && userMonth == currentMonth && userYear == currentYear) {
      dayMessage = 'ontem'
    } else {
      dayMessage = `${userDay}/${userMonth}/${userYear}`
    }
  
    let time = {
      hour: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
      msg: dayMessage
    }
  
    return time
  }
  
  export default getDateTime ;  