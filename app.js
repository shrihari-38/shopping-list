const form = document.querySelector('form');
const itemInput = document.querySelector('#item');
const priceInput = document.querySelector('#price');
const vendorInput = document.querySelector('#vendor');
const ul = document.querySelector('ul');

// Load the items from local storage when the page is loaded
window.addEventListener('load', () => {
  const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
  for (const item of items) {
    addItemToDOM(item);
  }
});

// Add an item to the shopping list
function addItem(event) {
  event.preventDefault();
  const item = {
    text: itemInput.value.trim(),
    price: priceInput.value.trim(),
    vendor: vendorInput.value.trim()
  };
  if (item.text !== '') {
    addItemToDOM(item);
    addItemToLocalStorage(item);
    itemInput.value = '';
    priceInput.value = '';
    vendorInput.value = '';
    itemInput.focus();
  }
}

// Add an item to the DOM
function addItemToDOM(item) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const priceSpan = document.createElement('span');
  const vendorSpan = document.createElement('span');
  const button = document.createElement('button');
  span.textContent = item.text;
  priceSpan.textContent = item.price;
  vendorSpan.textContent = item.vendor;
  button.textContent = 'Remove';
  li.appendChild(span);
  li.appendChild(priceSpan);
  li.appendChild(vendorSpan);
  li.appendChild(button);
  ul.appendChild(li);
  button.addEventListener('click', () => {
    removeItemFromDOM(li);
    removeItemFromLocalStorage(item);
  });
}

// Remove an item from the DOM
function removeItemFromDOM(li) {
  ul.removeChild(li);
}

// Add an item to local storage
function addItemToLocalStorage(item) {
  const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
  items.push(item);
  localStorage.setItem('shoppingList', JSON.stringify(items));
}

// Remove an item from local storage
function removeItemFromLocalStorage(item) {
  const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
  const filteredItems = items.filter(i => i.text !== item.text || i.price !== item.price || i.vendor !== item.vendor);
  localStorage.setItem('shoppingList', JSON.stringify(filteredItems));
}

// Add an event listener to the form
form.addEventListener('submit', addItem);
