// import { serialize } from "./serialize";
// Базовий клас корабель
class Ship {
  constructor(name, enginePower, displacement, crew, homePort) {
    this.name = name;
    this.enginePower = enginePower;
    this.displacement = displacement;
    this.crew = crew;
    this.homePort = homePort;
  }

  // Метод для видалення корабля
  deleteShip() {
    const shipRow = document.getElementById("row-" + this.name);
    shipRow.remove();
    // Знайти індекс корабля в масиві ships
    const shipIndex = ships.findIndex(ship => ship.name === this.name);
    // Видалити корабель з масиву ships за його індексом
    if (shipIndex !== -1) {
      ships.splice(shipIndex, 1);
    }
  }

  // Метод оновлення корабля
  updateShip(newData) {
    this.name = newData.name;
    this.enginePower = newData.enginePower;
    this.displacement = newData.displacement;
    this.crew = newData.crew;
    this.homePort = newData.homePort;
  }
  

  getShipDetails() {
    return {
      name: this.name,
      enginePower: this.enginePower,
      displacement: this.displacement,
      crew: this.crew,
      homePort: this.homePort,
      type: this.type
    };
  }

 static searchShips(ships, shipType, isEnginePowerInRange, shipPower, isDisplacementInRange, shipDisplacement, peopleCount, PassengerShip, displaySearchResults) {
    const filteredShips = ships.filter(ship => {
      // Фільтруємо за типом корабля
      console.log(shipType);
      if (shipType !== 'all' && !isCorrectShipType(ship, shipType)) {
        return false;
      }

      function isCorrectShipType(ship, shipType) {
        switch (shipType) {
          case 'passenger':
            return ship instanceof PassengerShip;
          case 'cargo':
            return ship instanceof CargoShip;
          default:
            return true;
        }
      }

      // Фільтруємо за потужністю двигуна
      if (shipPower !== 'all' && !isEnginePowerInRange(ship.enginePower, shipPower)) {
        return false;
      }

      // Фільтруємо за водозміщенням
      if (shipDisplacement !== 'all' && !isDisplacementInRange(ship.displacement, shipDisplacement)) {
        return false;
      }

      // Фільтруємо за кількістю людей
      if (peopleCount && ship instanceof PassengerShip && ship.passengerCount < peopleCount) {
        return false;
      }
      return true;
    });

    displaySearchResults(filteredShips);
  }
}

// Пасажирський корабель
class PassengerShip extends Ship {
  constructor(name, enginePower, displacement, crew, homePort, passengerCount, lifeboatsCount, lifeboatCapacity) {
    super(name, enginePower, displacement, crew, homePort);
    this.type = "passenger";
    this.passengerCount = passengerCount;
    this.lifeboatsCount = lifeboatsCount;
    this.lifeboatCapacity = lifeboatCapacity;
  }

  updateShip(newData) {
    super.updateShip(newData);
    this.lifeboatsCount = newData.lifeboatsCount;
    this.lifeboatCapacity = newData.lifeboatCapacity;
    this.passengerCount = newData.passengerCount;
  }

  getShipDetails() {
    const shipDetails = super.getShipDetails();
    shipDetails.lifeboatsCount = this.lifeboatsCount;
    shipDetails.lifeboatCapacity = this.lifeboatCapacity;
    shipDetails.passengerCount = this.passengerCount;
    return shipDetails;
  }

  checkLifeboats() {
    const totalCapacity = this.lifeboatsCount * this.lifeboatCapacity;
    const requiredCapacity = this.passengerCount + this.crew;
    if (totalCapacity >= requiredCapacity) {
      console.log("Кількість шлюпок достатня для пасажирів та членів екіпажу.");
      
      return true;
    } else {
      console.log("Кількість шлюпок недостатня для пасажирів та членів екіпажу.");
      return false;
    }
  }

  increaseLifeboats() {
    const requiredLifeboats = Math.ceil((this.passengerCount + this.crew) / this.lifeboatCapacity);
    const additionalLifeboats = requiredLifeboats - this.lifeboatsCount;
    console.log(additionalLifeboats);
    if (additionalLifeboats > 0) {
      console.log(`Додатково потрібно ${additionalLifeboats} шлюпок.`);

      this.lifeboatsCount += additionalLifeboats; // Оновлення кількості шлюпок
      console.log("Кількість шлюпок була збільшена до мінімально необхідної.");
    } else {
      console.log("Кількість шлюпок вже достатня. Немає потреби в збільшенні.");
    }
  }
}

// Грузовий корабель
class CargoShip extends Ship {
  constructor(name, enginePower, displacement, crew, homePort, cargoCapacity) {
    super(name, enginePower, displacement, crew, homePort);
    this.type = "cargo";
    this.cargoCapacity = cargoCapacity;
  }

  updateShip(newData) {
    super.updateShip(newData);
    this.cargoCapacity = newData.cargoCapacity;
  }

  getShipDetails() {
    const shipDetails = super.getShipDetails();
    shipDetails.cargoCapacity = this.cargoCapacity;
    return shipDetails;
  }
}

// Зберігання замовлених кораблів
let ships = [
  new PassengerShip("Срібний океан", 2000, 10000, 40, "Порт Одеса", 500, 10, 50),
  new PassengerShip("Гармонія моря", 3000, 15000, 60, "Порт Южний", 800, 12, 60),
  new PassengerShip("Сонячний круїз", 2500, 12000, 45, "Порт Одеса", 600, 15, 70),
  new CargoShip("Морський вовк", 4000, 20000, 15, "Порт Одеса", 50000),
  new CargoShip("Морська фортеця", 3500, 18000, 14, "Порт Чорноморськ", 40000),
  new CargoShip("Грузовий Титан", 4500, 22000, 19, "Порт Южний", 60000),
  new PassengerShip("Срібний вітер", 1800, 22000, 30, "Порт Одеса", 400, 8, 40),
  new PassengerShip("Морська перлина", 3200, 16000, 55, "Порт Южний", 700, 10, 55),
  new PassengerShip("Зоряний круїз", 2700, 13000, 50, "Порт Одеса", 550, 13, 65),
  new PassengerShip("Атлантичний лайнер", 3800, 19000, 65, "Порт Чорноморськ", 900, 15, 70),
  new PassengerShip("Розкішний шляхетний", 2500, 12000, 40, "Порт Южний", 600, 12, 60),
  new CargoShip("Морська ведмедиця", 5000, 24000, 20, "Порт Одеса", 70000),
  new CargoShip("Трансатлантичний грузовик", 4200, 21000, 18, "Порт Чорноморськ", 55000),
  new CargoShip("Логістичний велетень", 4800, 23000, 25, "Порт Южний", 60000),
  new CargoShip("Морська велетенська", 5500, 26000, 22, "Порт Одеса", 80000),
  new CargoShip("Гірська троянда", 4300, 22000, 19, "Порт Чорноморськ", 50000),
  new PassengerShip("Сонячний бриз", 1500, 18000, 35, "Порт Одеса", 300, 6, 30),
  new PassengerShip("Перлина Карибів", 2500, 22000, 60, "Порт Южний", 700, 9, 45),
  new PassengerShip("Романтичний круїз", 1800, 15000, 45, "Порт Одеса", 500, 10, 50),
  new PassengerShip("Адріатичний сон", 1200, 20000, 25, "Порт Чорноморськ", 400, 8, 40),
  new PassengerShip("Егейське пригода", 2100, 17000, 50, "Порт Южний", 600, 12, 60),
  new CargoShip("Містеріозний громадянин", 3000, 30000, 30, "Порт Одеса", 100000),
  new CargoShip("Атласний трейдер", 2000, 28000, 25, "Порт Чорноморськ", 80000),
  new CargoShip("Карго Експрес", 1800, 25000, 20, "Порт Южний", 70000),
  new CargoShip("Бриліантова доставка", 2800, 32000, 35, "Порт Одеса", 120000),
  new CargoShip("Чорноморський гігант", 2500, 29000, 28, "Порт Чорноморськ", 90000)
];


document.addEventListener("DOMContentLoaded", function() {
  const shipForm = document.getElementById("filter-form");
  const shipList = document.getElementById("ship-list");
  const orderedShipsList = document.getElementById("ordered-ships");
  const orderButton = document.getElementById('order-ship');

  shipForm.addEventListener("submit", function(event) {
    event.preventDefault();
    shipList.innerHTML = ""; // Очищення списку кораблів перед новим пошуком
    const shipType = document.getElementById('ship-type').value;
    const shipPower = document.getElementById('ship-power').value;
    const shipDisplacement = document.getElementById('ship-displacement').value;
    const inputElement = document.getElementById('people-count');
    const peopleCount =  Number(inputElement.value);
    
    
    function isEnginePowerInRange(enginePower, range) {
      switch (range) {
        case 'low':
          return enginePower <= 2000;
        case 'medium':
          return enginePower > 2000 && enginePower <= 4000;
        case 'high':
          return enginePower > 4000;
        default:
          return true;
      }
    }
    
    function isDisplacementInRange(displacement, range) {
      switch (range) {
        case 'small':
          return displacement <= 10000;
        case 'medium':
          return displacement > 10000 && displacement <= 20000;
        case 'large':
          return displacement > 20000;
        default:
          return true;
      }
    }
    
    function displaySearchResults(ships) {
      const resultsContainer = document.getElementById('ship-list');
      resultsContainer.innerHTML = '';
    
      if (ships.length === 0) {
        resultsContainer.textContent = 'Не знайдено жодного корабля за обраними критеріями.';
        return;
      }
      
      const shipList = document.createElement('ul');
      ships.forEach(ship => {
        const shipItem = document.createElement('li');
        shipItem.textContent = ship.name;
        // Створити кнопку з галочкою
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'select-ship';
        // Додати галочку до елементу списку
        shipItem.appendChild(checkbox);
        shipList.appendChild(shipItem);
      });

      const orderButton = document.getElementById("search-results");;
      // orderButton.textContent = 'Замовити';
      // orderButton.id = 'search-results';

      resultsContainer.appendChild(shipList);
      // resultsContainer.appendChild(orderButton);

    }

    Ship.searchShips(ships, shipType, isEnginePowerInRange, shipPower, isDisplacementInRange, shipDisplacement, peopleCount, PassengerShip, displaySearchResults);
    
    // Додавання обробника події на натискання кнопки "Фільтрувати"
    orderButton.addEventListener('click', function() {
      event.preventDefault();
      
      // Знаходження всіх елементів списку з чекбоксами
      const checkboxes = document.querySelectorAll('#ship-list input[type="checkbox"]');

      // Очищення всіх чекбоксів
      // checkboxes.forEach(checkbox => {
      //   checkbox.checked = false;
      // });

      
      checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          const shipName = checkbox.parentNode.textContent;

          addOrderedShip(shipName);
          checkbox.checked = false;
         }
      });

      

  });

  // let passengerCount;
  function addOrderedShip(shipName) {
    // Перевірити, чи вже існує елемент списку з такою назвою корабля
  const shipAlreadyExists = Array.from(orderedShipsList.querySelectorAll('li span')).some(
    (span) => span.textContent === shipName
  );
  if (shipAlreadyExists) {
    // Якщо елемент списку вже існує, то не додавати новий елемент
    return;
  }
    // Знайти корабель за назвою
    const myShip = ships.find(ship => ship.name === shipName);
    const shipItem = document.createElement('li');
  
    // Створити контейнер для кнопки та назви корабля
    const shipContainer = document.createElement('div');
  
    // Створити елемент для відображення назви корабля
    const shipNameElement = document.createElement('span');
    shipNameElement.textContent = shipName;
  
    // Додати елемент з назвою корабля до контейнера
    shipContainer.appendChild(shipNameElement);
  
    // Перевірити, чи корабель є пасажирським
    if (myShip.type === 'passenger') {
      // Створити кнопку
      const addButton = document.createElement('button');
      addButton.textContent = 'Додати пасажирів';
  
      // Додати обробник події на натискання кнопки "Додати пасажирів"
      addButton.addEventListener('click', function () {
        // Відобразити модальне вікно для введення кількості пасажирів
        const passengerCount = parseInt(prompt('Введіть кількість пасажирів:'), 10);
        console.log(passengerCount);
        // myShip.passengerCount = passengerCount;
        // Перевірити шлюпки та збільшити їх, якщо необхідно
        checkAndIncreaseLifeboats(passengerCount, myShip);
      });
  
      // Додати кнопку до контейнера
      shipContainer.appendChild(addButton);
    }
  
    // Додати контейнер з кнопкою та назвою корабля до елементу списку
    shipItem.appendChild(shipContainer);
  
    // Додати елемент списку до списку замовлених кораблів
    orderedShipsList.appendChild(shipItem);
  }
  
  // console.log(passengerCount)

 function checkAndIncreaseLifeboats(passengerCount, myShip) {
   console.log(passengerCount);
   if (passengerCount > myShip.passengerCount+150) {
    console.log("Кількість пасажирів перевищує максимальну місткість корабля.");
    return;
   }
   myShip.passengerCount = passengerCount;
   if (myShip.checkLifeboats()) {
    console.log("Перевіра успішна");
   } else {
    console.log("Потрібно збільшити кількість шлюпок");
    myShip.increaseLifeboats();
    }
  }
  

});

document.getElementById("openModal").addEventListener("click", function() {
  document.getElementById("modal").style.display = "block";
});

document.querySelector(".close").addEventListener("click", function() {
  document.getElementById("modal").style.display = "none";
});

function handleTypeChange() {
  // Отримайте значення вибраного типу корабля
  var selectedType = this.value;
  // Отримайте елемент контейнера для шлюпок
  var lifeboatsContainer = document.getElementById("lifeboatsContainer");
  var cargoCapacityContainer = document.getElementById("cargoCapacityContainer");
  console.log( "jjj")
  // Змініть стиль елемента контейнера залежно від вибраного типу корабля
  if (selectedType === "passenger") {
    lifeboatsContainer.style.display = "block";
    cargoCapacityContainer.style.display = "none";
  } else if (selectedType === "cargo"){
    lifeboatsContainer.style.display = "none";
    cargoCapacityContainer.style.display = "block";
  } else {
    lifeboatsContainer.style.display = "none";
    cargoCapacityContainer.style.display = "none";
  }
}

// Додайте обробник події "change" з використанням назви функції
document.getElementById("type").addEventListener("change", handleTypeChange);

document.getElementById("buttonSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  
  // Отримуємо значення полів форми
  var name = document.getElementById('name').value;
  var type = document.getElementById('type').value;
  var passengerCount = document.getElementById('passengers').value;
  var lifeboatsCount = document.getElementById('lifeboatsCount').value;
  var lifeboatCapacity = document.getElementById('lifeboatCapacity').value;
  var cargoCapacity = document.getElementById('cargoCapacity').value;
  var enginePower = document.getElementById('enginePower').value;
  var displacement = document.getElementById('displacement').value;
  var crew = document.getElementById('crew').value;
  var homePort = document.getElementById('homePort').value;

  // Check if all fields are filled in
  if (!name || !type || !enginePower || !displacement || !crew || !homePort) {
    alert("Please fill in all fields");
    return;
  } 

  // Створюємо новий корабель з отриманими значеннями
  if (type === 'passenger') {
    if (!passengerCount || !lifeboatsCount || !lifeboatCapacity) {
      alert("Please fill in all fields");
      return;
    }
    if (enginePower <= 0 || displacement <= 0 || crew <= 0 || lifeboatsCount <= 0 || passengerCount <= 0 || lifeboatCapacity <= 0 ) {
      alert("Please enter values greater than 0");
      return;
    }
    const newShip = new PassengerShip(name, enginePower, displacement, crew, homePort, lifeboatsCount, lifeboatCapacity, passengerCount);
    // newShip.createNewPassengerShip(name, enginePower, displacement, crew, homePort, lifeboatsCount, lifeboatCapacity, passengerCount);
    console.log(newShip.getShipDetails());
    addShipToTable(newShip);
  } else if (type === 'cargo') {
    if (!cargoCapacity) {
      alert("Please fill in all fields");
      return;
    }
    if (enginePower <= 0 || displacement <= 0 || crew <= 0 || cargoCapacity <= 0) {
      alert("Please enter values greater than 0");
      return;
    }
    console.log(cargoCapacity);
    const newShip = new CargoShip(name, enginePower, displacement, crew, homePort, cargoCapacity);
    
    // newShip.createNewCargoShip(name, enginePower, displacement, crew, homePort, cargoCapacity);
    console.log(newShip.getShipDetails());
    console.log(newShip.cargoCapacity);
    addShipToTable(newShip);
  } else {
    // Виведіть повідомлення про помилку або виконайте додаткові дії, які ви хочете
    console.log('Невідомий тип корабля');
  }
  
  // Скидання значень полів форми
  document.getElementById("shipForm").reset();

  document.getElementById("modal").style.display = "none";
});

const shipTable = document.getElementById('shipTable');

function addShipToTable(ship) {

  // Створення рядка таблиці з ідентифікатором
  const row = shipTable.insertRow(-1);
  row.setAttribute("id", "row-" + ship.name);

  // const row = shipTable.insertRow(-1);
  const nameCell = row.insertCell(0);
  const typeCell = row.insertCell(1);
  const lifeboatsCell = row.insertCell(2);
  const lifeboatCapacityCell = row.insertCell(3);
  const cargoCapacityCell = row.insertCell(4);
  const enginePowerCell = row.insertCell(5);
  const displacementCell = row.insertCell(6);
  const crewCell = row.insertCell(7);
  const homePortCell = row.insertCell(8);
  const maxPassengersCell = row.insertCell(9);

  nameCell.textContent = ship.name;
  typeCell.textContent = ship.type;
  lifeboatsCell.textContent = ship.lifeboatsCount;
  lifeboatCapacityCell.textContent = ship.lifeboatCapacity;
  cargoCapacityCell.textContent = ship.cargoCapacity;
  enginePowerCell.textContent = ship.enginePower;
  displacementCell.textContent = ship.displacement;
  crewCell.textContent = ship.crew;
  homePortCell.textContent = ship.homePort;
  maxPassengersCell.textContent = ship.passengerCount;
  
  // console.log('ship.passengerCount');
  // console.log(ship.passengerCount);
  // console.log(ship.lifeboatsCount);
  // console.log(lifeboatsCell);
  // console.log(ship.type);

 // Створення комірки з кнопкою "Видалити"
 const deleteCell = document.createElement("td");
 const deleteButton = document.createElement("button");
 deleteButton.innerHTML = "Видалити";
 deleteButton.setAttribute("data-ship-name", ship.name);
 deleteButton.addEventListener("click", function() {
   ship.deleteShip();
 });
 deleteCell.appendChild(deleteButton);
 row.appendChild(deleteCell);

 // Створення комірки з кнопкою "Модифікувати"
 const modifyCell = document.createElement("td");
 const modifyButton = document.createElement("button");
 modifyButton.innerHTML = "Модифікувати";
 modifyButton.setAttribute("data-ship-name", ship.name);
 modifyButton.addEventListener("click", function() {
   
   openEditModal(ship);
 });
 modifyCell.appendChild(modifyButton);
 row.appendChild(modifyCell);
}

// Додайте початкові кораблі до таблиці
ships.forEach(ship => {
  addShipToTable(ship);
});

function openEditModal(ship) {
  const currentShip = ship;
  // Заповнення полів модального вікна з властивостями корабля
  document.getElementById("editName").value = currentShip.name;
  document.getElementById("editEnginePower").value = currentShip.enginePower;
  document.getElementById("editDisplacement").value = currentShip.displacement;
  document.getElementById("editCrew").value = currentShip.crew;
  document.getElementById("editHomePort").value = currentShip.homePort;

  // Приховування всіх додаткових полів
  const passengerFields = document.getElementById("editPassengerShipFields");
  const cargoFields = document.getElementById("editCargoShipFields");
  passengerFields.style.display = "none";
  cargoFields.style.display = "none";

  if (currentShip instanceof PassengerShip) {
    // Показати додаткові поля для пасажирського корабля
    passengerFields.style.display = "block";
    document.getElementById("editLifeboatsCount").value = currentShip.lifeboatsCount;
    document.getElementById("editLifeboatCapacity").value = currentShip.lifeboatCapacity;
    document.getElementById("editPassengerCount").value = currentShip.passengerCount;
    console.log('пасаж');
  } else if (currentShip instanceof CargoShip) {
    // Показати додаткові поля для вантажного корабля
    cargoFields.style.display = "block";
    document.getElementById("editCargoCapacity").value = currentShip.cargoCapacity;
  }

  // Показати модальне вікно
  document.getElementById("modal2").style.display = "block";

  document.querySelector(".close2").addEventListener("click", function() {
    document.getElementById("modal2").style.display = "none";
  });

  // Додати обробник події submit для форми
  const form = document.getElementById("editShipForm");
  console.log('lll');
  const myButton = document.getElementById("myButton");

  document.getElementById("myButton").addEventListener("click", function(event) {
    event.preventDefault();
    console.log('lll2');
    //Отримати значення змінених полів
    const newData = {
      name: document.getElementById("editName").value,
      enginePower: document.getElementById("editEnginePower").value,
      displacement: document.getElementById("editDisplacement").value,
      crew: document.getElementById("editCrew").value,
      homePort: document.getElementById("editHomePort").value
    }; 

    if (currentShip instanceof PassengerShip) {
      newData.lifeboatsCount = document.getElementById("editLifeboatsCount").value;
      newData.lifeboatCapacity = document.getElementById("editLifeboatCapacity").value;
      newData.passengerCount = document.getElementById("editPassengerCount").value;
      console.log('hjh')
    } else if (currentShip instanceof CargoShip) {
      newData.cargoCapacity = document.getElementById("editCargoCapacity").value;
    }
    // if (!name || !type || !enginePower || !displacement || !crew || !homePort || !cargoCapacity) {
    //   alert("Please fill in all fields");
    //   return;
    // } 

    // if (enginePower <= 0 || displacement <= 0 || crew <= 0 || cargoCapacity <= 0|| lifeboatsCount <= 0 || passengerCount <= 0 || lifeboatCapacity <= 0 ) {
    //   alert("Please enter values greater than 0");
    //   return;
    // }
  
  // Оновити значення комірок таблиці
  const shipRow = document.getElementById("row-" + currentShip.name);
  // Оновити ідентифікатор рядка
  shipRow.id = "row-" + newData.name;
  if (shipRow) {
    shipRow.cells[0].innerHTML = newData.name;
    // Решта коду оновлення комірок таблиці
    // ...
    console.log("Елемент з ідентифікатором 'row-" + currentShip.name + "' знайдений у таблиці.");
  } else {
    console.error("Елемент з ідентифікатором 'row-" + currentShip.name + "' не знайдений у таблиці.");
  }

  shipRow.cells[0].innerHTML = newData.name;
    shipRow.cells[5].innerHTML = newData.enginePower;
    shipRow.cells[6].innerHTML = newData.displacement;
    shipRow.cells[7].innerHTML = newData.crew;
    shipRow.cells[8].innerHTML = newData.homePort;

    if (currentShip instanceof PassengerShip) {
      shipRow.cells[2].innerHTML = newData.lifeboatsCount;
      shipRow.cells[3].innerHTML = newData.lifeboatCapacity;
      shipRow.cells[9].innerHTML = newData.passengerCount;
    } else if (currentShip instanceof CargoShip) {
      const cargoShip = currentShip;
      cargoShip.cargoCapacity = newData.cargoCapacity;
      shipRow.cells[4].innerHTML = newData.cargoCapacity;
    }

  // Оновити корабель
  currentShip.updateShip(newData);
  
  // Закрити модальне вікно
  document.getElementById("modal2").style.display = "none";
  });

}

const swiper = new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },

  slidesPerView: 3,
  // spaceBetween: 25,
  centerSlides:true,
  loop: true,
  speed: 700,
  // effect: 'coverflow',
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    780: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    }
  },
});

});

const swiper = new Swiper('.image-slider', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },

  slidesPerView: 3,
  // spaceBetween: 25,
  centerSlides:true,
  loop: true,
  speed: 700,
  // effect: 'coverflow',
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    780: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    }
  },

  // scrollbar: {
  //   el: '.swiper-scrollbar',
  //   draggable: true
  // }
});

// const swiper = new Swiper('.swiper', {
//   // Optional parameters
//   direction: 'vertical',
//   loop: true,

//   // If we need pagination
//   pagination: {
//     el: '.swiper-pagination',
//   },

//   // Navigation arrows
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },

//   // And if we need scrollbar
//   scrollbar: {
//     el: '.swiper-scrollbar',
//   },
// });