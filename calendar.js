
/**
* Creates a calendar that can be displayed with a div with the id "calendar-widget". The calendar displays the current month and highlights the current day.
*
*/

(function loadCalendar() {
    //Adjust this to your the week days names of your language
    const weekDaysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekDaysNamesShort = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const calendar = document.getElementById("calendar-widget");

    const currentDate = new Date();
    let firstDayOfCurrentMonthDate = new Date();
    firstDayOfCurrentMonthDate.setDate(0);
    const lastDayNumberOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const previousLastDayDate = new Date(firstDayOfCurrentMonthDate.getFullYear(), firstDayOfCurrentMonthDate.getMonth(), 0).getDate();
    const indexOfFirstDayDate = firstDayOfCurrentMonthDate.getDay();
    const indexOfLastDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDay();
    const numberOfDaysInNextMonth = (7 - indexOfLastDayDate);
    let daysOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    let isSunday;
    let isToday;

    //Check if it is a leap year
    if (currentYear % 4 === 0 && (currentYear % 100 !== 0 || currentYear % 400 === 0)) {
        daysOfMonths[1] = 29;
    }

    //Check if calendar is displayed on small windows (tablet/smartphone)
    screenWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    let responsive = screenWidth < 850 ? true : false;
    console.log(screenWidth);

    //Create calendar header
    calendar.insertAdjacentHTML("beforeend", `<div class="calendar-header ">${monthNames[currentMonth].toUpperCase()} </div>`);
    calendar.insertAdjacentHTML("beforeend", `<div class="calendar-header ">${currentDay}.${currentMonth + 1}.${currentYear} </div>`);

    let sundayCounter = 1;
    //Load week days names - Monday to Sunday 
    for (let weekday = 1; weekday < 7; weekday++) {
        if (responsive) {
            calendar.insertAdjacentHTML("beforeend", `<div class="calendar-weekday-name-responsive">${weekDaysNamesShort[weekday]} </div>`);
        }
        else {
            calendar.insertAdjacentHTML("beforeend", `<div class="calendar-weekday-name">${weekDaysNames[weekday]} </div>`);
        }
    }
    if (responsive) {
        calendar.insertAdjacentHTML("beforeend", `<div class="calendar-weekday-name-responsive sunday-header">${weekDaysNamesShort[0]} </div>`);
    } else {
        calendar.insertAdjacentHTML("beforeend", `<div class="calendar-weekday-name sunday-header">${weekDaysNames[0]} </div>`);
    }

    //Load days of the previous month that belong to a running week
    for (let previousDays = indexOfFirstDayDate; previousDays > 0; previousDays--) {
        isSunday = sundayCounter % 7 === 0 ? true : false;
        calendar.insertAdjacentHTML("beforeend", `<div class="calendar-day previous ${isSunday ? "sunday" : ""}" style="color: gray;">${previousLastDayDate - previousDays + 1} </div>`);
        sundayCounter += 1;
    }

    //Load days numbers of current month
    for (let day = 1; day <= daysOfMonths[currentMonth]; day++) {
        isSunday = sundayCounter % 7 === 0 ? true : false;
        isToday = currentDay === day ? true : false;
        calendar.insertAdjacentHTML("beforeend", `<div class="calendar-day ${isSunday ? "sunday" : ""} ${isToday ? "today" : ""}">${day} </div>`);
        sundayCounter += 1;
    }

    //Load days of the next month that belong to a running week
    for (let nextDay = 1; nextDay <= numberOfDaysInNextMonth; nextDay++) {
        isSunday = sundayCounter % 7 === 0 ? true : false;
        calendar.insertAdjacentHTML("beforeend", `<div class="calendar-day ${isSunday ? "sunday" : ""}" style="color: gray;">${nextDay} </div>`);
        sundayCounter += 1;
    }

}());