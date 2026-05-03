import React from "react";
import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isLoanPaid: true,
  deposit: 150,
  withdrow: 50,
  requestLoan: 500,
  payLoan: null,
  isActive: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "open":
      return {
        ...state,
        balance: 500,
        isActive: true,
      };

    case "deposit":
      return {
        ...state,
        balance: state.balance + 150,
      };
    case "withdraw":
      return {
        ...state,
        balance: state.balance - 50 < 0 ? 0 : state.balance - 50,
      };

    case "requestLoan":
      return {
        ...state,
        loan: state.isLoanPaid ? state.loan + 5000 : state.loan,
        balance: state.isLoanPaid ? state.balance + 5000 : state.balance,
        isLoanPaid: false,
      };

    case "payloan":
      return {
        ...state,
        balance:
          state.balance - state.loan < 0 ? 0 : state.balance - state.loan,
        loan: 0,
        isLoanPaid: true,
      };

    case "close": {
      if (state.balance === 0 && state.loan === 0) return initialState;
      return state;
    }
    default:
      throw new Error("unknown action");
  }
};

const Challenge = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { balance, loan, isLoanPaid, isActive } = state;

  return (
    <div style={{ textAlign: "center", fontSize: "24px" }}>
      <div className="App" style={{}}>
        <h1>useReducer Bank Account</h1>
        <p>Balance: {balance}</p>
        <p>Loan: {loan}</p>

        <p>
          <button
            onClick={() => dispatch({ type: "open" })}
            disabled={isActive}
          >
            Open account
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: "deposit" })}
            disabled={!isActive}
          >
            Deposit 150
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: "withdraw" })}
            disabled={!isActive}
          >
            Withdraw 50
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: "requestLoan" })}
            disabled={!isActive || !isLoanPaid}
          >
            Request a loan of 5000
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: "payloan" })}
            disabled={!isActive}
          >
            Pay loan
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: "close" })}
            disabled={!isActive}
          >
            Close account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Challenge;
