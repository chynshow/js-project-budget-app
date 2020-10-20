export const DOMstrings = {
  transDesc: '[data-trans-desc]',
  transValue: '[data-trans-value]',
  addTransForm: '[data-add-trans-from]',
  addTransBtn: '[data-add-trans-btn]',
  actionEl: '.c-transaction',
  incomeList: '[data-income-list]',
  expensesList: '[data-expenses-list]',
  budgetLabel: '[data-budget-label]',
  totalIncLabel: '[data-total-inc-label]',
  totalExpLabel: '[data-total-exp-label]',
  percentageLabel: '[data-percentage-label]',
  transContainerEl: '[data-trans-container]',
  expensesPercLabel: '[data-perc-label]',
  dateLabel: '[data-budget-date]',
  modal: '[data-modal]',
  modalTitle: '[data-modal-title]',
  modalMsg: '[data-modal-msg]',
  modalCloseBtn: '[data-modal-close-btn]',
  overlay: '[data-overlay]',
  transInfo: '[data-transactions-info]'
};
const formatNumber = (num, type) => {
  let numSplit; let int; let sign;

  // eslint-disable-next-line no-param-reassign
  num = Math.abs(num).toFixed(2);
  // eslint-disable-next-line prefer-const
  numSplit = num.split('.');
  // eslint-disable-next-line prefer-destructuring
  int = numSplit[0];

  if (int.length > 3) {
    int = `${int.substr(0, int.length - 3)},${int.substr(int.length - 3, int.length)}`;
  }

  const dec = numSplit[1];

  // eslint-disable-next-line no-unused-expressions
  type === 'exp' ? (sign = '-') : (sign = '+');

  return `${sign} ${int}.${dec}`;
};

export const displayDate = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  document.querySelector(
    DOMstrings.dateLabel
  ).textContent = `Available Budget in ${months[month]} ${year}`;
};

export const closeModal = () => {
  const modal = document.querySelector(DOMstrings.modal);
  const overlay = document.querySelector(DOMstrings.overlay);
  modal.classList.remove('c-modal--active');
  overlay.classList.remove('c-overlay--active');
  overlay.removeEventListener('click', closeModal);
  document.querySelector(DOMstrings.modalCloseBtn).removeEventListener('click', closeModal);
};

export const hideTransInfo = () => {
  const transactionList = document.querySelector(DOMstrings.transContainerEl);
  if (transactionList.children.length > 1) {
    document.querySelector(DOMstrings.transInfo).classList.add('c-budget-transactions__info--hide');
  } else {
    document.querySelector(DOMstrings.transInfo).classList.remove('c-budget-transactions__info--hide');
  }
};

export const showModal = (title, msg) => {
  const modal = document.querySelector(DOMstrings.modal);
  const overlay = document.querySelector(DOMstrings.overlay);
  document.querySelector(DOMstrings.modalTitle).textContent = title;
  document.querySelector(DOMstrings.modalMsg).textContent = msg;
  document.querySelector(DOMstrings.modalCloseBtn).addEventListener('click', closeModal);
  modal.classList.add('c-modal--active');
  overlay.classList.add('c-overlay--active');
  overlay.addEventListener('click', closeModal);
};

export const getInput = () => ({
  // Select elems and get the values
  transDesc: document.querySelector(DOMstrings.transDesc).value,
  // Convert prop "value" to a number
  transValue: +document.querySelector(DOMstrings.transValue).value,
  transType: document.querySelector(DOMstrings.transValue).value.startsWith('-') ? 'exp' : 'inc',
});

export const addListItem = ({ id, type, desc, value }) => {
  const transactionList = document.querySelector(DOMstrings.transContainerEl);

  // Create element and set necessary attrs
  const elem = document.createElement('div');
  elem.setAttribute(
    'class',
    `${type === 'exp' ? 'c-transaction c-transaction--exp' : 'c-transaction'}`
  );
  elem.setAttribute('data-id', `${type}-${id}`);

  // Add elem structure with data
  elem.innerHTML = `
  <div class="c-transaction__desc">${desc}</div>
  <div class="l-transaction-container">
  <div class="c-transaction__value">${formatNumber(value, type)}
  ${type === 'exp' ? '<span class="c-transaction__perc" data-perc-label></span>' : ''}
  </div>
  <button class="c-btn c-transaction__del-btn">
  <svg
  aria-hidden="true"
  focusable="false"
  data-prefix="fas"
  data-icon="trash"
  class="svg-inline--fa fa-trash fa-w-14"
  role="img"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 448 512"
>
  <path
    d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
  ></path>
</svg>
  </button>
  `;

  document
    .querySelector(DOMstrings.budgetLabel)
    .classList.add('c-budget-header__total--active');

  setTimeout(() => {
    document
      .querySelector(DOMstrings.budgetLabel)
      .classList.remove('c-budget-header__total--active');
  }, 500);

  // Render trans element
  transactionList.append(elem);
};

export const deleteListItem = (id) =>
  // Select needed elems and remove
  document.querySelector(`[data-id="${id}"]`).remove();

export const clearInputs = () => {
  // Get inputs
  const inputs = document.querySelectorAll(
    `${DOMstrings.transDesc}, ${DOMstrings.transValue}`
  );
  // Set prop 'value' to empty string
  // eslint-disable-next-line no-return-assign
  inputs.forEach((e) => (e.value = ''));
  // Return focus back
  inputs[0].focus();
};

export const displayBudget = ({ budget, percentage, totalInc, totalExp }) => {
  const type = budget > 0 ? 'inc' : 'exp';
  // Get DOM's El and set curren value
  document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(
    budget,
    type
  );
  document.querySelector(DOMstrings.percentageLabel).textContent = `${
    percentage > 0 ? percentage : '---'
  } %`;
  document.querySelector(DOMstrings.totalIncLabel).textContent = formatNumber(
    totalInc,
    'inc'
  );
  document.querySelector(DOMstrings.totalExpLabel).textContent = formatNumber(
    totalExp,
    'exp'
  );
};

export const displayPercentages = (percentages) => {
  // Select  expence-perc-label elem's & add new value
  const fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
  fields.forEach((el, idx) => (el.textContent = `${percentages[idx] > 0 ? percentages[idx] : '---'} %`));
};
