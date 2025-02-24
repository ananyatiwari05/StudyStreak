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
    dayDiv.classList.add("cal-dates");
    calendarDates.appendChild(dayDiv);
    dayDiv.dataset.date = `${day}-${currentMonth + 1}-${currentYear}`;
    // var today=currentDate.getDate();
  }
  inDate();
}
calendar();
function inDate() {
  document.querySelectorAll(".cal-dates").forEach(date => {
    date.addEventListener("click", function (event) {
      // Ensure click happened on the text node, not the div
      if (event.target !== this) return;
      // Remove any existing popup
      document.querySelectorAll(".dropdown-menu").forEach(popup => popup.remove());

      let selectedDate = this.dataset.date;
      const popup = document.createElement("div");
      popup.innerHTML = `
        <div class="dropdown-menu d-block position-absolute border-0 pt-1 pl-1 mx-0 rounded-3 shadow overflow-hidden w-280px" data-bs-theme="dark">
          <div><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-x cross" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg><span id="date">${selectedDate}</span></div>
          <ul class="list-unstyled mb-0">
            <li><a class="dropdown-item d-flex align-items-center gap-2 py-2" href="#"><span class="d-inline-block bg-success rounded-circle p-1"></span> Action</a></li>
            <li><a class="dropdown-item d-flex align-items-center gap-2 py-2" href="#"><span class="d-inline-block bg-primary rounded-circle p-1"></span> Another action</a></li>
            <li><a class="dropdown-item d-flex align-items-center gap-2 py-2" href="#"><span class="d-inline-block bg-danger rounded-circle p-1"></span> Something else here</a></li>
            <li><a class="dropdown-item d-flex align-items-center gap-2 py-2" href="#"><span class="d-inline-block bg-info rounded-circle p-1"></span> Separated link</a></li>
          </ul>
        </div>
      `;
      popup.classList.add("dropdown-menu");
      // document.getElementById("date").textContent=selectedDate;
      popup.style.position = "absolute";
      popup.style.display = "block";
      popup.style.zIndex = "2";
      const rect = this.getBoundingClientRect();
      popup.style.left = rect.left + "px";
      popup.style.top = rect.top + "px";
      popup.style.width = rect.width + "px";
      popup.style.height = rect.height + "px";
      // popup.style.left = event.pageX - 50 + "px";
      // popup.style.top = event.pageY - 100 + "px";
      document.body.appendChild(popup);
      setTimeout(() => {
        document.addEventListener("click", function closePopup(e) {
          if (!popup.contains(e.target) && !e.target.closest(".cal-dates")) {
            popup.remove();
            document.removeEventListener("click", closePopup);
          }
        });
      });
      popup.querySelector(".cross").addEventListener("click", () => popup.remove());
    });
  });
}
inDate();
function monthDropDown() {
  let currentYear = new Date().getFullYear();
  document.getElementById("curr-month").addEventListener("click", function (event) {
    const existingDropDown = document.querySelector(".dropdown-container");
    if (existingDropDown) existingDropDown.remove();
    const monthDrop = document.createElement("div");
    monthDrop.innerHTML = `
      <div class="month-dropdown">
        <div class="currentYear">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle prv-year"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/></svg>
          <span id="year-text">${currentYear}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle nxt-year"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/></svg>
        </div>
        <div class="month">
          <div>January</div>
          <div>February</div>
          <div>March</div>
          <div>April</div>
          <div>May</div>
          <div>June</div>
          <div>July</div>
          <div>August</div>
          <div>September</div>
          <div>October</div>
          <div>November</div>
          <div>December</div>
        </div>
      </div>
    `;
    monthDrop.style.position = "absolute";
    monthDrop.style.display = "block";
    monthDrop.style.zIndex = "3";
    
    const rect = this.getBoundingClientRect();
    monthDrop.style.left = rect.left -40 + "px";
    monthDrop.style.top = rect.top -10 + "px";
    
    monthDrop.classList.add("dropdown-container");
    document.body.appendChild(monthDrop);
    const yearText = monthDrop.querySelector("#year-text");
    monthDrop.querySelector(".prv-year").addEventListener("click", function () {
      currentYear--;
      yearText.textContent = currentYear;
    });
    monthDrop.querySelector(".nxt-year").addEventListener("click", function () {
      currentYear++;
      yearText.textContent = currentYear;
    });
    setTimeout(() => {
      document.addEventListener("click", function closeDropdown(e) {
        if (!monthDrop.contains(e.target) && e.target !== event.target) {
          console.log("Dropdown closed!"); 
          monthDrop.remove();
          document.removeEventListener("click", closeDropdown);
        }
      }, { once: true });
    }, 10);
  });
}
monthDropDown();
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
function todayDate(){
  var today=currentDate.getDate();
  if(document.getElementsByClassName("cal-dates").textContent===today){

  }
}