/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/scripts";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const firstDays = [];\r\nconst months = [\r\n  \"Январь\",\r\n  \"Февраль\",\r\n  \"Март\",\r\n  \"Апрель\",\r\n  \"Май\",\r\n  \"Июнь\",\r\n  \"Июль\",\r\n  \"Август\",\r\n  \"Сентябрь\",\r\n  \"Октябрь\",\r\n  \"Ноябрь\",\r\n  \"Декабрь\"\r\n];\r\nconst daysAmount = [];\r\nconst bookedDays = [];\r\n\r\nfunction getFirstDays() {\r\n  const date = new Date();\r\n  const year = date.getFullYear();\r\n\r\n  for (let i = 0; i < 12; i++) {\r\n    firstDays.push(new Date(year, i, 1).getDay()); // 0 - вс, 6 - сб\r\n    daysAmount.push(new Date(year, i + 1, 0).getDate());\r\n  }\r\n}\r\n\r\nfunction showModalWindow (text) {\r\n    const modal = document.querySelector('.modal');\r\n    const backdrop = document.querySelector('.backdrop');\r\n    modal.style.display = \"block\";\r\n    backdrop.style.display = \"block\";\r\n    \r\n    modal.textContent = text;\r\n\r\n    setTimeout(() => {\r\n        modal.classList.add('active');\r\n        backdrop.classList.add('active');\r\n    }, 25);\r\n\r\n    setTimeout(closeModalWindow, 1500);\r\n}\r\n\r\nfunction closeModalWindow () {\r\n    const modal = document.querySelector('.modal');\r\n    const backdrop = document.querySelector('.backdrop');\r\n    modal.classList.remove('active');\r\n    backdrop.classList.remove('active');\r\n\r\n    setTimeout(() => {\r\n        modal.style.display = \"\";\r\n        backdrop.style.display = \"\";\r\n    }, 510);\r\n}\r\n\r\nfunction showBookedDays() {\r\n  if (localStorage.getItem(\"days\")) {\r\n    bookedDays.push(...JSON.parse(localStorage.days));\r\n    for (let i = 0; i < bookedDays.length; i++) {\r\n      document.getElementById(bookedDays[i]).classList.add(\"active\");\r\n    }\r\n  }\r\n}\r\n\r\nfunction renderDesktopPage() {\r\n  getFirstDays();\r\n\r\n  const container = document.querySelector(\".main__container\");\r\n  const monthTemplate = document.getElementById(\"template\");\r\n  const modal = document.querySelector('.modal');\r\n  const backdrop = document.querySelector('.backdrop');\r\n  const reserveBtn = document.querySelector('.reserv__submit');\r\n  const unreservBtn = document.querySelector('.unreserv');\r\n  const currentMonth = new Date().getMonth();\r\n  const currentDay = new Date().getDate();\r\n\r\n  for (let i = currentMonth; i < 12; i++) {\r\n    const element = document.importNode(monthTemplate.content, true);\r\n    const elementMonth = element.querySelector(\".element__month\");\r\n    const elementDays = element.querySelector(\".element__numbers\");\r\n\r\n    elementMonth.textContent = months[i];\r\n\r\n    for (let j = 0; j < firstDays[i] - 1; j++) {\r\n      // Пропуски до нужного дня недели\r\n      const emptyDay = document.createElement(\"div\");\r\n      emptyDay.classList.add(\"days__empty-day\", \"day\");\r\n      elementDays.append(emptyDay);\r\n    }\r\n\r\n    for (let j = 0; j < daysAmount[i]; j++) {\r\n      const day = document.createElement(\"div\");\r\n      day.classList.add(\"days__day\", \"day\");\r\n      day.id = \"month_\" + (i + 1) + \"|\" + \"day_\" + (j + 1);\r\n      day.textContent = j + 1;\r\n      elementDays.append(day);\r\n    }\r\n\r\n    container.append(element);\r\n  }\r\n\r\n  container.addEventListener(\"click\", event => {\r\n    if (\r\n      event.target.classList.contains(\"days__day\") &&\r\n      !bookedDays.find(d => d === event.target.id)\r\n    ) {\r\n      bookedDays.push(event.target.id);\r\n      event.target.classList.toggle(\"active\");\r\n    } else if (\r\n      event.target.classList.contains(\"days__day\") &&\r\n      !!bookedDays.find(d => d === event.target.id)\r\n    ) {\r\n      bookedDays.splice(\r\n        bookedDays.findIndex(d => d === event.target.id),\r\n        1\r\n      );\r\n      event.target.classList.toggle(\"active\");\r\n    }\r\n  });\r\n\r\n  container.querySelector(\".element__numbers\").querySelectorAll('.days__day').forEach((day, index) => {\r\n    if(index + 1 < currentDay){\r\n        day.classList.remove('days__day');\r\n        day.classList.add('days__past');\r\n    }\r\n  });\r\n\r\n  modal.addEventListener('click', closeModalWindow);\r\n  backdrop.addEventListener('click', closeModalWindow);\r\n  reserveBtn.addEventListener('click', reserveDays);\r\n  unreservBtn.addEventListener('click', () => {\r\n    localStorage.removeItem(\"days\");\r\n    container.querySelectorAll(\".days__day.active\").forEach(day => {\r\n        day.classList.remove('active');\r\n    });\r\n    showModalWindow(\"Бронирование отменено\");\r\n  });\r\n}\r\n\r\n\r\nfunction reserveDays () {\r\n    const validInput = () => {\r\n        const userInput = document.querySelector('.reserv__tel').value;\r\n        const regexp = new RegExp(/^(\\+7|7|8)?[\\s\\-]?\\(?[489][0-9]{2}\\)?[\\s\\-]?[0-9]{3}[\\s\\-]?[0-9]{2}[\\s\\-]?[0-9]{2}$/);\r\n        return regexp.test(userInput);\r\n    };\r\n\r\n    if(bookedDays.length && validInput()){\r\n        localStorage.days = JSON.stringify(bookedDays);\r\n        showModalWindow(\"Дни успешно забронированы!\");\r\n    } else if (bookedDays.length === 0) {\r\n        showModalWindow(\"Вы не отметили ни одного дня\");\r\n    } else if (validInput) {\r\n        showModalWindow(\"Неправильно введен номер\");\r\n        document.querySelector('.reserv__tel').focus();\r\n    }\r\n}\r\n\r\nrenderDesktopPage();\r\nshowBookedDays();\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });