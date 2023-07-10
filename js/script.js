"use strict";

const products = {
  fridge: [
    {
      name: "Холодильник Samsung",
      price: 1000,
    },
    {
      name: "Холодильник LG",
      price: 1200,
    },
  ],
  stove: [
    {
      name: "Плита Samsung",
      price: 500,
    },
    {
      name: "Плита LG",
      price: 600,
    },
  ],
  microwave: [
    {
      name: "Мікрохвильова піч Samsung",
      price: 300,
    },
    {
      name: "Мікрохвильова піч LG",
      price: 400,
    },
  ],
};

function showProducts(category) {
  const productsContainer = document.querySelector("#products");
  productsContainer.innerHTML = "<h2>Товари</h2>";

  const categoryProducts = products[category];
  for (let i = 0; i < categoryProducts.length; i++) {
    const product = categoryProducts[i];
    const productElement = document.createElement("div");
    productElement.className = "product";
    productElement.textContent = product.name;
    productElement.onclick = showProductDetails.bind(null, product);
    productsContainer.appendChild(productElement);
    productElement.className = "block";
  }
}

function showProductDetails(product) {
  const productDetailsContainer = document.querySelector("#product-details");
  productDetailsContainer.innerHTML = "<h2>Інформація про товар</h2>";

  const productNameElement = document.createElement("p");
  productNameElement.textContent = "Назва товару: " + product.name;

  const productPriceElement = document.createElement("p");
  productPriceElement.textContent = "Ціна: " + product.price + " грн";

  const buyButton = document.createElement("button");
  buyButton.textContent = "Купити";
  buyButton.className = "buy-button";
  buyButton.onclick = showOrderForm.bind(null, product);

  productDetailsContainer.appendChild(productNameElement);
  productDetailsContainer.appendChild(productPriceElement);
  productDetailsContainer.appendChild(buyButton);
}

function showOrderForm(product) {
  const productDetailsContainer = document.querySelector("#product-details");
  productDetailsContainer.innerHTML = "";

  const orderForm = document.createElement("form");
  orderForm.id = "order-form";

  const fullNameInput = document.createElement("input");
  fullNameInput.type = "text";
  fullNameInput.placeholder = "Введіть ім'я";
  fullNameInput.required = true;
  fullNameInput.name = "full-name";
  fullNameInput.className = "form";

  const fullLastNameInput = document.createElement("input");
  fullLastNameInput.type = "text";
  fullLastNameInput.placeholder = "Прізвище";
  fullLastNameInput.required = true;
  fullLastNameInput.name = "full-LastName";
  fullLastNameInput.className = "form";

  const fullParentNameInput = document.createElement("input");
  fullParentNameInput.type = "text";
  fullParentNameInput.placeholder = "По батькові";
  fullParentNameInput.required = true;
  fullParentNameInput.name = "full-ParentName";
  fullParentNameInput.className = "form";

  const citySelect = document.createElement("select");
  citySelect.name = "city";
  citySelect.required = true;
  const cities = [
    "Київ",
    "Харків",
    "Одеса",
    "Дніпро",
    "Донецьк",
    "Запоріжжя",
    "Львів",
    "Кривий Ріг",
    "Миколаїв",
    "Маріуполь",
    "Луганськ",
    "Вінниця",
    "Макіївка",
    "Севастополь",
    "Сімферополь",
    "Херсон",
    "Полтава",
    "Чернігів",
    "Черкаси",
    "Хмельницький",
    "Чернівці",
  ];
  for (let i = 0; i < cities.length; i++) {
    const cityOption = document.createElement("option");
    cityOption.value = cities[i];
    cityOption.textContent = cities[i];
    citySelect.appendChild(cityOption);
    citySelect.className = "form";
  }

  const novaPoshtaSelect = document.createElement("select");
  novaPoshtaSelect.name = "nova-poshta";
  novaPoshtaSelect.required = true;
  novaPoshtaSelect.className = "form";

  const branches = [
    "Відділення 1",
    "Відділення 2",
    "Відділення 3",
  ];

  branches.forEach((branch) => {
    const branchOption = document.createElement("option");
    branchOption.value = branch;
    branchOption.textContent = branch;
    novaPoshtaSelect.appendChild(branchOption);
  });

  const paymentMethodSelect = document.createElement("select");
  paymentMethodSelect.name = "payment-method";
  paymentMethodSelect.required = true;
  const paymentMethods = ["Карта", "Післяплата", "Готівка самовивіз"];
  for (let i = 0; i < paymentMethods.length; i++) {
    const paymentMethodOption = document.createElement("option");
    paymentMethodOption.value = paymentMethods[i];
    paymentMethodOption.textContent = paymentMethods[i];
    paymentMethodSelect.appendChild(paymentMethodOption);
    paymentMethodSelect.className = "form";
  }

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.placeholder = "Введіть кількість";
  quantityInput.required = true;
  quantityInput.name = "quantity";
  quantityInput.className = "form";

  const commentInput = document.createElement("textarea");
  commentInput.placeholder = "Введіть коментарій";
  commentInput.name = "comment";
  commentInput.className = "form";

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.value = "Замовити";
  submitButton.textContent = "Замовити";
  submitButton.className = "buy-button";

  orderForm.appendChild(fullNameInput);
  orderForm.appendChild(fullLastNameInput);
  orderForm.appendChild(fullParentNameInput);
  orderForm.appendChild(citySelect);
  orderForm.appendChild(novaPoshtaSelect);
  orderForm.appendChild(paymentMethodSelect);
  orderForm.appendChild(quantityInput);
  orderForm.appendChild(commentInput);
  orderForm.appendChild(submitButton);

  orderForm.addEventListener("submit", submitOrder.bind(null, product));

  productDetailsContainer.appendChild(orderForm);
}

function submitOrder(product, event) {
  event.preventDefault();

  const fullName = event.target.elements["full-name"].value;
  const fullLastName = event.target.elements["full-LastName"].value;
  const fullParentName = event.target.elements["full-ParentName"].value;
  const city = event.target.elements["city"].value;
  const novaPoshta = event.target.elements["nova-poshta"].value;
  const paymentMethod = event.target.elements["payment-method"].value;
  const quantity = event.target.elements["quantity"].value;
  const comment = event.target.elements["comment"].value;


  const orderInfo = document.createElement("div");
  orderInfo.innerHTML = "<h2>Інформація про замовлення</h2>";
  orderInfo.innerHTML += "<p>Назва товару: " + product.name + "</p>";
  orderInfo.innerHTML += "<p>Ім'я: " + fullName + "</p>";
  orderInfo.innerHTML += "<p>Прізвище: " + fullLastName + "</p>";
  orderInfo.innerHTML += "<p>По батькові: " + fullParentName + "</p>";
  orderInfo.innerHTML += "<p>Місто: " + city + "</p>";
  orderInfo.innerHTML += "<p>Склад: " + novaPoshta + "</p>";
  orderInfo.innerHTML += "<p>Спосіб оплати: " + paymentMethod + "</p>";
  orderInfo.innerHTML += "<p>Кількість: " + quantity + "</p>";
  orderInfo.innerHTML += "<p>Коментарь: " + comment + "</p>";

  const productDetailsContainer = document.querySelector("#product-details");
  productDetailsContainer.appendChild(orderInfo);

  const orderForm = document.querySelector("#order-form");
  orderForm.style.display = "none";
}

const fridgeButton = document.querySelector("#fridge-button");
const stoveButton = document.querySelector("#stove-button");
const microwaveButton = document.querySelector("#microwave-button");

showProducts("fridge");
