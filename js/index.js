'use strict';
let btnStart = document.querySelector('#start');
let btnAddIncome = document.getElementsByTagName('button')[0];
let btnAddExpenses = document.getElementsByTagName('button')[1];
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItems = document.querySelectorAll('.additional_income-item');
let resultValue = document.querySelectorAll('.result-total[class$=-value]');
let salaryAmount = document.querySelector('.salary-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
let expensesTitle = document.querySelectorAll('input.expenses-title');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let incomeItems = document.querySelectorAll('.income-items');
let incomeAmounts = document.querySelectorAll('input.income-amount');



let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
    budget: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function () {
        salaryAmount = document.querySelector('.salary-amount');
         incomeAmounts = document.querySelectorAll('input.income-amount');
        appData.testEmptyInput(salaryAmount, appData.testNumber);
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.getIncomeMonth();
        appData.showResult();

        //  appData.getInfoDeposit();
    },
    changeSalaryValue: function (){
        appData.budget = +salaryAmount.value;
    },
    showResult: function () {
        resultValue[0].value = appData.budgetMonth;
        resultValue[1].value = appData.budgetDay;
        resultValue[2].value = appData.expensesMonth;
        resultValue[4].value = appData.addExpenses.join(', ');
        resultValue[3].value = appData.addIncome.join(',');
        resultValue[6].value = Math.ceil(appData.getTargetMonth());
        resultValue[5].value = appData.calcSavedMoney();
        periodSelect.addEventListener('input', changeValueIncome)
    },
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        let parentIncome = incomeItems[0].parentNode;
        parentIncome.insertBefore(cloneIncomeItem, btnAddIncome);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            btnAddIncome.style.display = 'none';
        }
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        let parentExpenses = expensesItems[0].parentNode;
        parentExpenses.insertBefore(cloneExpensesItem, btnAddExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            btnAddExpenses.style.display = 'none';
        }
    },
    getExpenses: function () {
        expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        })
    },
    getIncome: function () {
        incomeItems = document.querySelectorAll('.income-items');
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== 0) {
                appData.income[itemIncome] = +cashIncome;
            }
        })
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        additionalIncomeItems.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        })
    },
    //     appData.deposit = confirm('???????? ???? ?? ?????? ?????????????? ?? ???????????');
    // },
    getExpensesMonth: function () {
        let sum = 0;
        for (let key in appData.expenses) {
            const value = appData.expenses[key];
            sum += +value;
        }
        appData.expensesMonth = sum;
    },
    getIncomeMonth: function () {
        let sum = 0;
        for (let key in appData.income) {
            const value = appData.income[key];
            sum += +value;
        }
        appData.incomeMonth = sum + appData.budget;
    },
    getBudget: function () {
        appData.budgetMonth = appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return targetAmount.value / appData.budgetMonth;
    },
    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            return ('?? ?????? ?????????????? ?????????????? ????????????');
        } else if ((appData.budgetDay >= 600) && (appData.budgetDay < 1200)) {
            return ('?? ?????? ?????????????? ?????????????? ????????????');
        } else if ((appData.budgetDay > 0) && (appData.budgetDay < 600)) {
            return ('?? ?????????????????? ?? ?????? ?????????????? ???????????? ???????? ????????????????');
        } else {
            return ('??????-???? ?????????? ???? ??????');
        }
    },
    // getInfoDeposit: function () {
    //     if (appData.deposit) {
    //         do {
    //             appData.percentDeposit = prompt('?????????? ?????????????? ?????????????? ?????????????????', '10')
    //         }
    //         while (!isNumber(appData.percentDeposit) || appData.percentDeposit > 99)
    //         do {
    //             appData.moneyDeposit = +prompt('?????????? ?????????? ?????????????????', '10000');
    //         }
    //         while (!isNumber(appData.moneyDeposit))
    //     }
    // },
    calcSavedMoney: function () {
        return appData.budgetMonth * periodSelect.value;
    },
    testEmptyInput: function (input, callback) {
        if (input.value.trim() === '') {
            input.style.borderColor = 'blue';
            input.placeholder = '???????? ???? ???????????? ???????? ????????????';
            input.focus();
        } else {
            input.style.borderColor = '';
            callback(input);
        }
    },
    testNumber: function (input){
    if (!isNumber(input.value.trim())) {
            input.style.borderColor = 'green';
            input.value = '';
            input.placeholder = '???????? ???? ???????????? ?????????????????? ????????';
            input.focus();
    } else {
        input.style.borderColor = '';
    }
    },
    testString:function (input){
            if (isNumber(input.value.trim())) {
                input.style.borderColor = 'green';
                input.value = '';
                input.placeholder = '???????? ???? ???????????? ?????????????????? ????????';
                input.focus();
            } else {
                input.style.borderColor = '';
            }
    }
};


function changeValue() {
    let periodAmount = document.querySelector('.period-amount');
    periodAmount.innerText = periodSelect.value
}

function changeValueIncome() {
    resultValue[5].value = appData.calcSavedMoney();
}

salaryAmount.addEventListener('input',appData.changeSalaryValue)

btnStart.addEventListener('click', appData.start);

btnAddExpenses.addEventListener('click', appData.addExpensesBlock);

btnAddIncome.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', changeValue)

//let words = appData.addExpenses;

// function format() {
//     let newWords = '';
//     for (let i = 0; i < words.length; i++) {
//         newWords += words[i].charAt(0).toUpperCase() + words[i].substr(1) + ', ';
//     }
//     console.log(newWords);
// }
// console.log(resultValue)
// format();

// console.log('???????? ?????????????? ???? ??????????:' + appData.expensesMonth);
//
// if (appData.period > 0) {
//     console.log('???????? ?????????? ???????????????????? ??????????:' + appData.period);
// } else {
//     console.log('???????? ???? ?????????? ????????????????????');
// }
// console.log(appData.getStatusIncome());
// console.log('???????? ?????????????????? ???????????????? ?? ???????? ????????????: ');
// for (let key in appData) {
//     console.log(key + ': ' + appData[key]);
// }

