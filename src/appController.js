import {
  addItem,
  caclBudged,
  getBudget,
  deleteItem,
  calcPercentages,
  getPercentage,
} from './budgetController';
import {
  getInput,
  DOMstrings,
  addListItem,
  clearInputs,
  displayBudget,
  deleteListItem,
  displayPercentages,
  displayDate,
  showModal,
  hideTransInfo,
} from './UIController';

const updateBudget = () => {
  // Calculate the budget
  caclBudged();
  // Return the budget
  const budget = getBudget();

  // Hide trans amount info block
  hideTransInfo();

  // Display the budget UI
  displayBudget(budget);
};

const updatePercentages = () => {
  // Calc the percentages
  calcPercentages();
  // Read percentages from the budget controller
  const percentages = getPercentage();
  // Update the UI with the new percentages
  displayPercentages(percentages);
};

const addItemHandler = (e) => {
  // Prevent default form behavior
  e.preventDefault();
  // Get input value
  const { transDesc, transType, transValue } = getInput();
  // Check if data are valid
  if (!transDesc || !transValue)
    return showModal('Input error!', 'Fields are required!');

  if (transDesc.length > 30)
    return showModal(
      'Input error!',
      'Max length should be less than 30 symbols!'
    );

  // Add item to store
  const newItem = addItem(transType, transDesc, transValue);

  // Add item to UI
  addListItem(newItem);
  // Clear fileds
  clearInputs();
  // Update budget
  updateBudget();
  // Calc and update percentages
  updatePercentages();
};

const deleteItemHandler = ({ target }) => {
  // Using event delegation in order to detect delete button

  if (
    target.parentElement.parentElement.classList.contains(
      'c-transaction__del-btn'
    )
  ) {
    // Get delete item id
    const itemKey = target.closest(DOMstrings.actionEl).dataset.id;

    // Delete item form store
    deleteItem(itemKey);
    // Delete item form UI
    deleteListItem(itemKey);
    // Update budget
    updateBudget();
    // Calc and update percentages
    updatePercentages();
  }
};

const setupEventListeners = () => {
  document
    .querySelector(DOMstrings.addTransForm)
    .addEventListener('submit', (e) => addItemHandler(e));

  document
    .querySelector(DOMstrings.transContainerEl)
    .addEventListener('click', (e) => deleteItemHandler(e));
};

const initApp = () => {
  setupEventListeners();
  displayBudget({
    budget: 0,
    totalInc: 0,
    totalExp: 0,
    percentage: -1,
  });
  displayDate();
};
initApp();
