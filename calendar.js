var currentDate = new Date();
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getFullYear();
function calendar() {
  var monthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  document.getElementById("curr-month").textContent =monthNames[currentMonth] + " " + currentYear;
  const firstDay=new Date(currentYear,currentMonth,1);
  const lastDay=new Date(currentYear,currentMonth+1,0);
  const firstWeekDay=firstDay.getDay();
  const totalDays=lastDay.getDate();
  const calendarDates=document.getElementById("calendar-dates");
  calendarDates.innerHTML="";
  for(let i=0;i<firstWeekDay;i++)
  {
    const emptyDiv=document.createElement("div");
    emptyDiv.classList.add("empty-day");
    calendarDates.appendChild(emptyDiv);
  }
  for(let day=1;day<=totalDays;day++)
  {
    const dayDiv=document.createElement("div");
    dayDiv.textContent=day;
    calendarDates.appendChild(dayDiv);
  }
}
calendar();
document.getElementById("prv-month").addEventListener("click", function () {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear = currentYear - 1;
  } else {
    currentMonth = currentMonth - 1;
  }
  calendar();
});
document.getElementById("next-month").addEventListener("click", function () {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear = currentYear + 1;
  } else {
    currentMonth = currentMonth + 1;
  }
  calendar();
});
