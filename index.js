
console.log("Лапа помощи — версия 3");

function chooseAnimal(name) {
    alert(
        "Ты выбрал питомца: " + name +
        "\nСпасибо за желание помочь!" +
        "\nСвяжись с нами для подробностей."
    );
}

let currentFilter = "all";

let searchInput = document.getElementById("animal-search");

// Фильтрация по категории
function filterAnimals(type, button) {
    currentFilter = type;

    let buttons = document.querySelectorAll(".filter-btn");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }

    button.classList.add("active");

    showAnimals();
}

// Поиск животных
searchInput.addEventListener("input", function() {
    showAnimals();
});

// Показываем подходящих животных
function showAnimals() {
    let search = searchInput.value.toLowerCase().trim();
    let cards = document.querySelectorAll(".animal-card");
    let found = 0;

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];

        let name = card.querySelector("h3").textContent.toLowerCase();
        let type = card.getAttribute("data-type");

        let nameMatches = name.includes(search);
        let typeMatches = currentFilter === "all" || currentFilter === type;

        if (nameMatches && typeMatches) {
            card.style.display = "block";
            found++;
        } else {
            card.style.display = "none";
        }
    }

    let noResults = document.getElementById("no-results");

    if (found === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }
}

// Выбранная сумма пожертвования
let selectedAmount = 0;

// Выбор суммы кнопкой
function selectAmount(amount, button) {
    selectedAmount = amount;

    let buttons = document.querySelectorAll(".amount-btn");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selected");
    }

    button.classList.add("selected");

    document.getElementById("customAmount").value = "";
}

// Ввод своей суммы
let customAmount = document.getElementById("customAmount");

customAmount.addEventListener("input", function() {
    selectedAmount = 0;

    let buttons = document.querySelectorAll(".amount-btn");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selected");
    }
});

// Отправка формы
let donationForm = document.getElementById("donationForm");

donationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("donorName").value.trim();
    let email = document.getElementById("donorEmail").value.trim();
    let amountInput = customAmount.value.trim();
    let amount = selectedAmount;

    if (amountInput !== "") {
        amount = Number(amountInput);
    }

    let result = document.getElementById("donationResult");

    if (!Number.isSafeInteger(amount) || amount <= 0) {
        result.style.color = "red";
        result.textContent = "Выберите корректную сумму пожертвования!";
        return;
    }

    if (name === "" || email === "") {
        result.style.color = "red";
        result.textContent = "Заполните имя и email!";
        return;
    }

    result.style.color = "#288a57";
    result.textContent =
        "Спасибо, " + name + "! Вы указали " +
        amount.toLocaleString("ru-RU") +
        " ₸. Это демонстрация, оплата не выполнена.";

    donationForm.reset();
    selectedAmount = 0;

    let buttons = document.querySelectorAll(".amount-btn");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selected");
    }
});
