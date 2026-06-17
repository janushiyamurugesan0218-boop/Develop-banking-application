// BANKING APPLICATION LOGIC

// 1. Initial Application State
let currentBalance = 1000.00;
const transactions = [];

// 2. DOM Elements Selection
const balanceDisplay = document.getElementById('balance');
const amountInput = document.getElementById('amount');
const depositButton = document.getElementById('depositBtn');
const withdrawButton = document.getElementById('withdrawBtn');
const transactionList = document.getElementById('transactionList');
const emptyStateText = document.getElementById('emptyState');

// 3. Update Balance Dashboard UI
function updateBalanceUI() {
    // Formats numbers neatly into currency formats (e.g., $1,000.00)
    balanceDisplay.textContent = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(currentBalance);
}

// 4. Render Transaction History List
function addTransactionToHistory(type, amount) {
    // Remove the "No recent transactions" text on the first activity
    if (emptyStateText) {
        emptyStateText.remove();
    }

    const listItem = document.createElement('li');
    listItem.classList.add('transaction-item');

    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);

    // Set structure depending on Deposit or Withdrawal processing
    if (type === 'deposit') {
        listItem.innerHTML = `
            <span>Deposited Funds</span>
            <span class="type-deposit">+ ${formattedAmount}</span>
        `;
    } else {
        listItem.innerHTML = `
            <span>Withdrew Funds</span>
            <span class="type-withdraw">- ${formattedAmount}</span>
        `;
    }

    // Insert new transactions right at the top of the history list
    transactionList.insertBefore(listItem, transactionList.firstChild);
}

// 5. Transaction Handlers
function handleDeposit() {
    const amount = parseFloat(amountInput.value);

    // Form Validation Checks
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount greater than $0.');
        return;
    }

    // Process Transaction Business Logic
    currentBalance += amount;
    
    // Synchronize UI Updates
    updateBalanceUI();
    addTransactionToHistory('deposit', amount);
    
    // Clear Input Box
    amountInput.value = '';
}

function handleWithdraw() {
    const amount = parseFloat(amountInput.value);

    // Form Validation Checks
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount greater than $0.');
        return;
    }

    if (amount > currentBalance) {
        alert('Transaction Denied: Insufficient funds available.');
        return;
    }

    // Process Transaction Business Logic
    currentBalance -= amount;

    // Synchronize UI Updates
    updateBalanceUI();
    addTransactionToHistory('withdraw', amount);

    // Clear Input Box
    amountInput.value = '';
}

// 6. Application Event Listeners
depositButton.addEventListener('click', handleDeposit);
withdrawButton.addEventListener('click', handleWithdraw);