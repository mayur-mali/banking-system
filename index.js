function Bank(name) {
  this.name = name;
  let customers = [];
  let total = 1000;
  let initialBalanceOfBank;

  // this function is for opening account its accept customer as parameter
  function createAccount(customer) {
    customers.push(customer);
  }

  // this function is for deposit money in bank
  // this accept customer as parameter
  function deposit(customer) {
    const { user, amount } = customer;
    if (amount < 1) console.log("you need more moneny for deposite");
    user.accountBalance = user.accountBalance + amount;
    initialBalanceOfBank = user.accountBalance;
  }

  // this function is for withdra money from bank
  // this accept customer as parameter

  function withdrawal(customer) {
    const { user, amount } = customer;
    if (amount < 1) console.log("you can not withdrawal with this amount");
    user.accountBalance = user.accountBalance - amount;
    initialBalanceOfBank = user.accountBalance;
  }

  // this is for customer balance check
  // this accept customer as parameter

  function checkBalance(customer) {
    console.log("Your Account Balance Is", customer.accountBalance);
  }

  // this function for displayListOfCustomers
  // this function accept type paramater with help of you can sort the user

  function displayCustomerList(type) {
    return customers.filter((customer) => customer.accountType == type);
  }
  // this function is for applying loan and its accept following parameters
  // user, loanAmount, monthForLoanNeeded, typeOfLoan
  function applyForLoan(customer) {
    const { user, loanAmount, monthForLoanNeeded, typeOfLoan } = customer;

    if (initialBalanceOfBank < loanAmount) {
      console.log("you can not apply for loan");
    } else {
      let rateOfInterest;
      let totalPaybleAmount;
      let emi;
      let interest;
      switch (typeOfLoan) {
        case "home":
          rateOfInterest = 7.8;
          interest =
            (loanAmount * (rateOfInterest * 0.01)) / monthForLoanNeeded;
          emi = (loanAmount / monthForLoanNeeded + interest).toFixed(2);
          totalPaybleAmount = emi * monthForLoanNeeded;
          user.loan = {
            applyForLoan: true,
            emi: emi,
            isLoanApproved: "approved",
            totalPaybleAmount,
          };

          user.accountBalance = user.accountBalance + loanAmount;

          break;
        case "personal":
          rateOfInterest = 8.1;
          interest =
            (loanAmount * (rateOfInterest * 0.01)) / monthForLoanNeeded;
          emi = (loanAmount / monthForLoanNeeded + interest).toFixed(2);
          totalPaybleAmount = emi * monthForLoanNeeded;
          user.loan = {
            applyForLoan: true,
            emi: emi,
            isLoanApproved: "approved",
            totalPaybleAmount,
          };

          user.accountBalance = user.accountBalance + loanAmount;

          console.log("Your Monthly Emi Is", emi);

          break;

        default:
          rateOfInterest = 6.5;
          interest =
            (loanAmount * (rateOfInterest * 0.01)) / monthForLoanNeeded;
          emi = (loanAmount / monthForLoanNeeded + interest).toFixed(2);
          totalPaybleAmount = emi * monthForLoanNeeded;
          user.accountBalance = user.accountBalance + loanAmount;

          user.loan = {
            applyForLoan: true,
            emi: emi,
            isLoanApproved: "approved",
            totalPaybleAmount,
          };
          break;
      }
    }
  }
  // this function calculate total balance of bank
  function bankTotalBalance() {
    initialBalanceOfBank = customers
      .map((customer) => customer.accountBalance)
      .reduce((a, b) => a + b);

    return initialBalanceOfBank + total;
  }

  return {
    bankTotalBalance,
    createAccount,
    displayCustomerList,
    deposit,
    withdrawal,
    checkBalance,
    applyForLoan,
  };
}

function Customer(options) {
  const { name, income, documents, accountType } = options;
  this.name = name;
  this.income = income;
  this.documents = documents;
  this.accountType = accountType;
  this.accountBalance = 0;
  this.loan = {
    applyForLoan: false,
    income: income,
    emi: null,
    documents,
    isLoanApproved: null,
    totalPaybleAmount: null,
  };
}

// here we create new bank
const SBI = new Bank({ name: "SBI" });

// here we create one customer
const Sani = new Customer({
  name: "sani",
  income: 1000,
  documents: { adharCardNumber: 123, panCardNumber: 456 },
  accountType: "checking",
});

// here we create account in following bank
SBI.createAccount(Sani);

// here we deposit money into bank
SBI.deposit({ user: Sani, amount: 1500 });

// here we check balance of bank after depisit
console.log(SBI.bankTotalBalance());
SBI.withdrawal({ user: Sani, amount: 500 });

// here we check balance of bank after withdrawal
console.log(SBI.bankTotalBalance());
