// Helper fn for create trans-obj based on input data
const expence = (id, desc, value, type) => ({
  id,
  desc,
  value,
  type,
  percentage: -1,
});

// Helper fn for create trans-obj based on input data
const income = (id, desc, value, type) => ({ id, desc, value, type });

// App store
const store = {
  allItems: {
    exp: [],
    inc: [],
  },
  totals: {
    exp: 0,
    inc: 0,
  },
  budget: 0,
  percentage: -1,
};

// Create and add new item to app store
export const addItem = (type, desc, value) => {
  let newItem;
  const id = Date.now();

  if (type === 'exp') {
    newItem = expence(id, desc, Math.abs(value), type);
  } else if (type === 'inc') {
    newItem = income(id, desc, value, type);
  }

  store.allItems[type].push(newItem);

  return newItem;
};

// Delete item from store using filtering
export const deleteItem = (itemKey) => {
  const type = itemKey.split('-')[0];
  const id = +itemKey.split('-')[1];

  store.allItems[type] = store.allItems[type].filter((el) => el.id !== id);
};

// Helper fn for addition calc
const getSumm = (type) => {
  store.totals[type] = store.allItems[type].reduce(
    (acc, cur) => acc + cur.value,
    0
  );
};

// Retutrn budget state
export const getBudget = () => ({
  budget: store.budget,
  totalInc: store.totals.inc,
  totalExp: store.totals.exp,
  percentage: store.percentage,
});

// Calc budget based on input data
export const caclBudged = () => {
  // Calc total inc & exp
  getSumm('inc');
  getSumm('exp');
  // Calc the budget
  store.budget = store.totals.inc - store.totals.exp;

  // Calc the percentage of inc
  // eslint-disable-next-line max-len
  store.percentage = store.totals.inc > 0 ? Math.round((store.totals.exp / store.totals.inc) * 100) : -1;
};

// Calculate percentages based on total incomes for each item in array of expenses
export const calcPercentages = () => {
  store.allItems.exp.map((el) =>
    store.totals.inc > 0
      ? (el.percentage = Math.round((el.value / store.totals.inc) * 100))
      : -1
  );
};

// Return array of percentages for all items in array of expenses
export const getPercentage = () => {
  const allPerc = store.allItems.exp.map((el) => el.percentage);
  return allPerc;
};
