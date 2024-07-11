const trackerList = JSON.parse(localStorage.getItem('exp1')) || [];

let totalIncome = 0;
let totalExpense = 0;
let balance = 0;

function calculateTotals() {
  totalIncome = 0;
  totalExpense = 0;
  for (const item of trackerList) {
    totalIncome += item.income;
    totalExpense += item.expense;
  }
  balance = totalIncome - totalExpense;
}

function renderTrackerList() {

  let trackerListHTML = "";
  for (let i = 0; i < trackerList.length; i++) {
    const trackerObject = trackerList[i];
    const { income, expense, description } = trackerObject;
    const html = `
      <div>${income}</div>
      <div>${expense}</div>
      <div>${description}</div>
      <button onclick="
        trackerList.splice(${i},1);
        calculateTotals(); // Recalculate after deletion
        localStorage.setItem('exp1',JSON.stringify(trackerList));
        renderTrackerList();
      " class="delete-tracker">Delete</button>`;
    trackerListHTML += html;
  }

  document.querySelector('.js-tracker').innerHTML = trackerListHTML;
}

function addTodo() {
  let incomeElement = document.querySelector('.js-income');
  let income = Number(incomeElement.value);
  totalIncome += income;

  let expenseElement = document.querySelector('.js-expense');
  let expense = Number(expenseElement.value);

  totalExpense += expense;

  balance = totalIncome - totalExpense;


  document.querySelector('.total-income').innerHTML = totalIncome;
  document.querySelector('.total-expense').innerHTML = totalExpense;
  document.querySelector('.current-balance').innerHTML = balance;

  let descElement = document.querySelector('.js-desc');
  let description = descElement.value;

  if (income !== "" || expense !== "" && description !== "") {

    trackerList.push({
      income,
      expense,
      description,
    });
    console.log(trackerList);

    localStorage.setItem('exp1', JSON.stringify(trackerList));

    renderTrackerList();
  
    incomeElement.value = '';
    expenseElement.value = '';
    descElement.value = '';
  }
}

// Call calculateTotals on initial load to ensure accurate display
calculateTotals();
renderTrackerList();