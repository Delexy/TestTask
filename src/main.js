const firstDays = [];
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
];
const daysAmount = [];
const bookedDays = [];

function getFirstDays() {
  const date = new Date();
  const year = date.getFullYear();

  for (let i = 0; i < 12; i++) {
    firstDays.push(new Date(year, i, 1).getDay()); // 0 - вс, 6 - сб
    daysAmount.push(new Date(year, i + 1, 0).getDate());
  }
}

function showModalWindow (text) {
    const modal = document.querySelector('.modal');
    const backdrop = document.querySelector('.backdrop');
    modal.style.display = "block";
    backdrop.style.display = "block";
    
    modal.textContent = text;

    setTimeout(() => {
        modal.classList.add('active');
        backdrop.classList.add('active');
    }, 25);

    setTimeout(closeModalWindow, 1500);
}

function closeModalWindow () {
    const modal = document.querySelector('.modal');
    const backdrop = document.querySelector('.backdrop');
    modal.classList.remove('active');
    backdrop.classList.remove('active');

    setTimeout(() => {
        modal.style.display = "";
        backdrop.style.display = "";
    }, 510);
}

function showBookedDays() {
  if (localStorage.getItem("days")) {
    bookedDays.push(...JSON.parse(localStorage.days));
    for (let i = 0; i < bookedDays.length; i++) {
      document.getElementById(bookedDays[i]).classList.add("active");
    }
  }
}

function renderDesktopPage() {
  getFirstDays();

  const container = document.querySelector(".main__container");
  const monthTemplate = document.getElementById("template");
  const modal = document.querySelector('.modal');
  const backdrop = document.querySelector('.backdrop');
  const reserveBtn = document.querySelector('.reserv__submit');
  const unreservBtn = document.querySelector('.unreserv');
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();

  for (let i = currentMonth; i < 12; i++) {
    const element = document.importNode(monthTemplate.content, true);
    const elementMonth = element.querySelector(".element__month");
    const elementDays = element.querySelector(".element__numbers");

    elementMonth.textContent = months[i];

    for (let j = 0; j < firstDays[i] - 1; j++) {
      // Пропуски до нужного дня недели
      const emptyDay = document.createElement("div");
      emptyDay.classList.add("days__empty-day", "day");
      elementDays.append(emptyDay);
    }

    for (let j = 0; j < daysAmount[i]; j++) {
      const day = document.createElement("div");
      day.classList.add("days__day", "day");
      day.id = "month_" + (i + 1) + "|" + "day_" + (j + 1);
      day.textContent = j + 1;
      elementDays.append(day);
    }

    container.append(element);
  }

  container.addEventListener("click", event => {
    if (
      event.target.classList.contains("days__day") &&
      !bookedDays.find(d => d === event.target.id)
    ) {
      bookedDays.push(event.target.id);
      event.target.classList.toggle("active");
    } else if (
      event.target.classList.contains("days__day") &&
      !!bookedDays.find(d => d === event.target.id)
    ) {
      bookedDays.splice(
        bookedDays.findIndex(d => d === event.target.id),
        1
      );
      event.target.classList.toggle("active");
    }
  });

  container.querySelector(".element__numbers").querySelectorAll('.days__day').forEach((day, index) => {
    if(index + 1 < currentDay){
        day.classList.remove('days__day');
        day.classList.add('days__past');
    }
  });

  modal.addEventListener('click', closeModalWindow);
  backdrop.addEventListener('click', closeModalWindow);
  reserveBtn.addEventListener('click', reserveDays);
  unreservBtn.addEventListener('click', () => {
    localStorage.removeItem("days");
    container.querySelectorAll(".days__day.active").forEach(day => {
        day.classList.remove('active');
    });
    showModalWindow("Бронирование отменено");
  });
}


function reserveDays () {
    const validInput = () => {
        const userInput = document.querySelector('.reserv__tel').value;
        const regexp = new RegExp(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/);
        return regexp.test(userInput);
    };

    if(bookedDays.length && validInput()){
        localStorage.days = JSON.stringify(bookedDays);
        showModalWindow("Дни успешно забронированы!");
    } else if (bookedDays.length === 0) {
        showModalWindow("Вы не отметили ни одного дня");
    } else if (validInput) {
        showModalWindow("Неправильно введен номер");
        document.querySelector('.reserv__tel').focus();
    }
}

renderDesktopPage();
showBookedDays();