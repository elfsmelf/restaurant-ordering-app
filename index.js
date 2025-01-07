import { menuArray } from "./data.js";

const menuItems = document.getElementById("menu-items");
const orderSection = document.getElementById("your-order");
const thanks = document.getElementById("thanks");

let orderArr = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.item) {
    addOrder(e.target.dataset.item, e.target.dataset.price);
  } else if (e.target.classList.contains("remove-button")) {
    removeOrder(e.target.dataset.orderIndex);
  } else if (e.target.classList.contains("complete-order-button")) {
    openModal();
  } else if (e.target.classList.contains("pay-button")) {
    closeModal();
    displayThanks();
  }
});

function displayMenuItems() {
  let menuItemsHtml = menuArray
    .map(function (item) {
      return `<section>
          <div class="item-container">
            <div class="menu-item">
              <div class="left-content">
                <div class="menu-emoji">${item.emoji}</div>
                <div class="menu-content">
                  <h3 class="menu-title">${item.name}</h3>
                  <p class="menu-ingredients">${item.ingredients}</p>
                  <p class="menu-price">$${item.price}</p>
                </div>
              </div>
              <button class="plus-button" data-item="${item.name}" data-price="${item.price}">+</button>
            </div>
            <hr class="divider" />
          </div>
        </section>
      `;
    })
    .join("");

  menuItems.innerHTML = menuItemsHtml;
}

displayMenuItems();

function addOrder(item, price) {
  let order = {};
  order.item = item;
  order.price = price;
  orderArr.push(order);
  console.log(orderArr);
  renderOrder(orderArr);
}

function removeOrder(index) {
  orderArr.splice(index, 1);
  renderOrder(orderArr);
}

function openModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

function renderOrder(orderArr) {
  //calulate the order total

  const orderTotal = orderArr.reduce(function (total, currentItem) {
    return total + Number(currentItem.price);
  }, 0);

  console.log(orderTotal);

  let orderHtml = `<h2 class="order-title">Your order</h2>`;

  let orderItemsHtml = orderArr
    .map(function (order, index) {
      return `<div class="order-container">
        <div class="order-item">
            <div class="left-content">
                <h3 class="order-item-title">${order.item}</h3>
                <button class="remove-button" data-order-index="${index}">Remove</button>
            </div>
        
        <p class="order-price">$${order.price}</p>
    </div>`;
    })
    .join("");

  orderHtml += orderItemsHtml;

  orderHtml += `<hr class="order-divider">

  <div class="order-container">
      <div class="order-item">
          <div class="left-content">
              <h3>Total Price</h3>
          </div>
      
      <p class="order-price">$${orderTotal}</p>
  </div>
  
  <div class="complete-order-button-container">
      <button class="complete-order-button">Complete Order</button>
  </div>`;

  orderSection.innerHTML = orderHtml;
}

function displayThanks() {
  let thanksHtml = `<div class="order-notification">
    <h2 class="order-notification-text">
      Thanks, Richard! Your order is on its way!
    </h2>
  </div>`;

  thanks.innerHTML = thanksHtml;
}
