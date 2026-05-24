window.addEventListener("scroll", () => {
	const header = document.querySelector(".main-header");
	if (window.scrollY > 20) {
		header.classList.add("scrolled");
	} else {
		header.classList.remove("scrolled");
	}
});
document.addEventListener("DOMContentLoaded", () => {
	const aboutSection = document.querySelector(".about");
	const aboutImg = document.querySelector(".about-img");
	const aboutText = document.querySelector(".about-text");

	// 1. Анимация появления при скролле
	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					aboutImg.classList.add("active");
					aboutText.classList.add("active");
				}
			});
		},
		{ threshold: 0.2 },
	);

	// Добавляем класс для анимации
	aboutImg.classList.add("reveal");
	aboutText.classList.add("reveal");
	observer.observe(aboutSection);

	// 2. Легкий параллакс эффект за мышкой
	aboutSection.addEventListener("mousemove", e => {
		const { clientX, clientY } = e;
		const xPos = (clientX / window.innerWidth - 0.5) * 20;
		const yPos = (clientY / window.innerHeight - 0.5) * 20;

		aboutImg.style.transform = `translate(${xPos}px, ${yPos}px)`;
	});

	// Сброс позиции при уходе мышки
	aboutSection.addEventListener("mouseleave", () => {
		aboutImg.style.transform = `translate(0, 0)`;
	});
});
const dbURL = "https://finishwb9-default-rtdb.firebaseio.com/";
const projectID = "Karina";
const btn = document.querySelector(".like-button");
const countHeart = document.getElementById("count-heart");

// Функция для загрузки лайков при старте страницы
async function loadLikes() {
	try {
		const response = await fetch(`${dbURL}/results/${projectID}/likes.json`);
		const currentLikes = (await response.json()) || 0;
		countHeart.innerHTML = currentLikes;
	} catch (error) {
		console.error("Ошибка загрузки лайков:", error);
	}
}

// Запускаем загрузку лайков сразу
loadLikes();

if (localStorage.getItem("voted" + projectID)) {
	btn.classList.add("active-voted");
}

btn.addEventListener("click", async function () {
	if (localStorage.getItem("voted" + projectID)) {
		alert("Вы уже проголосовали!");
		return;
	}

	btn.disabled = true; // Защита от спам-кликов во время запроса

	try {
		const response = await fetch(`${dbURL}/results/${projectID}/likes.json`);
		let currentLikes = (await response.json()) || 0;
		let newLikes = currentLikes + 1;

		await fetch(`${dbURL}/results/${projectID}.json`, {
			method: "PATCH",
			body: JSON.stringify({
				likes: newLikes,
				name: "Карина Кошевая",
			}),
		});

		localStorage.setItem("voted" + projectID, "true");
		btn.classList.add("active-voted");
		countHeart.innerHTML = newLikes;
	} catch (error) {
		alert("Произошла ошибка при отправке голоса.");
		console.error(error);
	} finally {
		btn.disabled = false;
	}
});
// Оборачиваем в самовызывающуюся функцию (IIFE) для 100% защиты от конфликтов имен переменных
(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", () => {
		// Находим элементы строго по нашим уникальным префиксам
		const foodCardsCollection = document.querySelectorAll(".food-app-card");
		const foodModalOverlay = document.getElementById("food-app-modal-overlay");
		const foodModalCloseBtn = document.querySelector(
			".food-app-modal-close-trigger",
		);

		const foodModalTitleNode = document.getElementById(
			"food-app-modal-header-title",
		);
		const foodModalWeightNode = document.getElementById(
			"food-app-modal-header-weight",
		);
		const foodModalIngredientsNode = document.getElementById(
			"food-app-modal-ingredients-content",
		);
		const foodModalRecipeNode = document.getElementById(
			"food-app-modal-recipe-content",
		);

		// Функция закрытия окна
		const closeFoodModal = () => {
			foodModalOverlay.classList.add("food-app-modal-hidden");
		};

		// Вешаем событие КЛИКА на каждую карточку еды
		foodCardsCollection.forEach(cardItem => {
			cardItem.addEventListener("click", () => {
				// Извлекаем кулинарные данные из data-атрибутов
				const titleData = cardItem.getAttribute("data-food-title");
				const weightData = cardItem.getAttribute("data-food-weight");
				const ingredientsData = cardItem.getAttribute("data-food-ingredients");
				const recipeData = cardItem.getAttribute("data-food-recipe");

				// Наполняем разметку модального окна контентом
				foodModalTitleNode.innerHTML = titleData;
				foodModalWeightNode.innerHTML = weightData;
				foodModalIngredientsNode.innerHTML = ingredientsData;
				foodModalRecipeNode.innerHTML = recipeData;

				// Показываем окно, убирая скрывающий CSS-класс
				foodModalOverlay.classList.remove("food-app-modal-hidden");
			});
		});

		// Обработчик для клика на крестик
		foodModalCloseBtn.addEventListener("click", closeFoodModal);

		// Обработчик для клика по серой области вокруг контента окна
		foodModalOverlay.addEventListener("click", event => {
			if (event.target === foodModalOverlay) {
				closeFoodModal();
			}
		});
	});
})();
// IIFE — защита от пересечения имен в глобальной области видимости
(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", () => {
		// Используем уникальные внутренние идентификаторы Symbol для кэширования элементов
		const keys = {
			modal: Symbol("modal"),
			title: Symbol("title"),
			calories: Symbol("calories"),
			exercises: Symbol("exercises"),
			plan: Symbol("plan"),
		};

		const elements = {
			[keys.modal]: document.getElementById("id892-workout-modal-overlay"),
			[keys.title]: document.getElementById("id892-modal-text-title"),
			[keys.calories]: document.getElementById("id892-modal-text-calories"),
			[keys.exercises]: document.getElementById("id892-modal-text-exercises"),
			[keys.plan]: document.getElementById("id892-modal-text-plan"),
		};

		const closeBtn = document.querySelector(".id892-modal-close-trigger");
		const cards = document.querySelectorAll(".cardso");

		// Функция скрытия окна
		const hideModal = () => {
			elements[keys.modal].classList.add("id892-modal-hidden");
		};

		// Навешиваем обработчик КЛИКА на каждую карточку
		cards.forEach(card => {
			card.addEventListener("click", () => {
				// Заполняем данными из безопасных дата-атрибутов
				elements[keys.title].innerHTML = card.getAttribute("data-id892-title");
				elements[keys.calories].innerHTML = card.getAttribute(
					"data-id892-calories",
				);
				elements[keys.exercises].innerHTML = card.getAttribute(
					"data-id892-exercises",
				);
				elements[keys.plan].innerHTML = card.getAttribute("data-id892-plan");

				// Открываем модальное окно
				elements[keys.modal].classList.remove("id892-modal-hidden");
			});
		});

		// Событие клика на крестик
		closeBtn.addEventListener("click", hideModal);

		// Событие клика по фону вне окна
		elements[keys.modal].addEventListener("click", e => {
			if (e.target === elements[keys.modal]) {
				hideModal();
			}
		});
	});
})();

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links a");

// Открытие/закрытие меню по клику на гамбургер
menuToggle.addEventListener("click", () => {
	menuToggle.classList.toggle("active");
	navLinks.classList.toggle("active");
});

// Автоматическое закрытие меню при клике на любую ссылку (переход к секции)
links.forEach(link => {
	link.addEventListener("click", () => {
		menuToggle.classList.remove("active");
		navLinks.classList.remove("active");
	});
});
