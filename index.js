
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
