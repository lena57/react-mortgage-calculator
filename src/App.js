import './App.css';
import React from 'react';

export default function App() {
  const [loanAmount, setLoanAmount] = React.useState(0);
  const [annualInterest, setAnnualInterest] = React.useState(0);
  const [loanTerm, setLoanTerm] = React.useState(0);
  const [monthlyPay, setMonthlyPay] = React.useState(0);
  const [totalPayment, setTotalPayment] = React.useState(0);
  const [totalInterest, setTotalInterest] = React.useState(0);

  const handleSubmit = () => {
    if(!Number.isFinite(loanAmount) || !Number.isFinite(annualInterest) || !Number.isFinite(loanTerm)){
      alert('Provide valid value')
      return
    }
    const monthlyInterest = annualInterest/1200;
    const numberOfPayments = loanTerm * 12
    const monthlyPay = loanAmount*(monthlyInterest*(1+monthlyInterest)**numberOfPayments)/
    ((1+monthlyInterest)**numberOfPayments-1)
    const totalPayment = monthlyPay*numberOfPayments
    const totalInterest = totalPayment - loanAmount
    setMonthlyPay(+monthlyPay.toFixed(2)) 
    setTotalPayment(+totalPayment.toFixed(2))
    setTotalInterest(+totalInterest.toFixed(2))
  }

  const submit = (e) => {
    e.preventDefault();
    handleSubmit();

  }
  const clear = () => {    
    setLoanAmount(0);
    setAnnualInterest(0);
    setLoanTerm(0);
    setMonthlyPay(0);
    setTotalPayment(0);
    setTotalInterest(0);

  }

  return (
    <>
    <h3>Mortgage Calculator</h3>
    <form className='form' onSubmit={submit}>
      <div>
      <label htmlFor='loanAmount'>Loan Amount in USD</label>
      <input id='loanAmount' type="number" placeholder='Loan Amount in USD' value={loanAmount}
        onChange={(e)=>setLoanAmount(+e.target.value)}
      />
      </div>
      <div>
      <label htmlFor='annualInterest'>APR in %</label>
      <input id='annualInterest' type="number" placeholder='APR in %' value={annualInterest}
        onChange={(e)=>setAnnualInterest(+e.target.value)}
      />
      </div>
      <div>
      <label htmlFor='loanTerm'>Loan Term in years</label>
      <input id='loanTerm' type="number" placeholder='Loan Term in years' value={loanTerm}
        onChange={(e)=>setLoanTerm(+e.target.value)}
      />
      </div>
      <div>
      <button type='submit'>Calculate</button>
      </div>
      <div>
      <button onClick={clear}>Clear</button>
      </div>
      <div>Monthly payment, $: {monthlyPay ? monthlyPay : 0}</div>
      <div>Total payment, $: {totalPayment ? totalPayment : 0}</div>
      <div>Total interest, $: {totalInterest ? totalInterest : 0}</div>
    </form>
    </>
  );
}
