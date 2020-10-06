import React, { Component } from 'react';
import axios from 'axios';
import { app } from 'firebase';

class Currencies extends Component {
  constructor() {
    super();
    this.state = {
      housing: 0,
      bills: 0,
      entertainment: 0,
      food: 0,
      transport: 0,
      convertedIncome: 0,
      convertedExpenses: 0,
      surplusShortage: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (evt) => {
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  calculateIncome = () => {
    // result is the userIncome in the new currency.
    let result = this.props.userIncome * this.props.targetRate;
    console.log(result)
    this.setState({
      convertedIncome: result.toFixed(2)
    })
  }


  calculateSurplusShortage = () => {
    // get the annual expenses in the new currency
    let annualExpenses = this.state.convertedExpenses * 12
    console.log('annualExpenses:', annualExpenses)

    let newSurplusShortage = this.state.convertedIncome - annualExpenses
    console.log('newSurplusShortage:', newSurplusShortage)

    this.setState({
      surplusShortage: newSurplusShortage
    })
  }


  calculateTotalExpenses = () => {
    // array to store all the string values from the state
    let expensesArray = [
      this.state.food,
      this.state.housing,
      this.state.bills,
      this.state.transport,
      this.state.entertainment
    ]



    // converting to array of numbers to use later in the calculation
    let newExpensesArray = expensesArray.map(number => {
      console.log(number)
      return parseFloat(number)
    })

    console.log('numArray:', newExpensesArray)

    // building the calculation
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    // takes the number array and uses the reducer to calculate the total
    let newTotal = newExpensesArray.reduce(reducer);

    // convert the expenses to the target currency
    let newConvertedExpenses = newTotal * this.props.targetRate
    console.log('newTotal:', newConvertedExpenses)

    this.setState({
      convertedExpenses: newConvertedExpenses.toFixed(2),
    }, () => {
      this.calculateIncome()
      // .then(() => this.calculateSurplusShortage());
    })

  }



    render() {
      return (
        <div>
          <div className="expenses">
            <div className="wrapper">
              <div className="expense">
                <label htmlFor="">Housing</label>
                <input
                  name="housing"
                  type="text"
                  id="housing"
                  onChange={this.handleChange}
                  value={this.state.expensesArray}
                />
              </div>
              <div className="expense">
                <label htmlFor="">Bills</label>
                <input
                  name="bills"
                  type="text"
                  id="bills"
                  onChange={this.handleChange}
                  value={this.state.expensesArray}
                />
              </div>
              <div className="expense">
                <label htmlFor="">Food</label>
                <input
                  name="food"
                  type="text"
                  id="food"
                  onChange={this.handleChange}
                  value={this.state.expensesArray}
                />
              </div>
              <div className="expense">
                <label htmlFor="">Transport</label>
                <input
                  name="transport"
                  type="text"
                  id="transport"
                  onChange={this.handleChange}
                  value={this.state.expensesArray}
                />
              </div>
              <div className="expense">
                <label htmlFor="">Entertainment</label>
                <input
                  name="entertainment"
                  type="text"
                  id="entertainment"
                  onChange={this.handleChange}
                  value={this.state.expensesArray}
                />
              </div>

              <div className="totalExpenses">
                <button
                  className="calculateTotal"
                  onClick={this.calculateTotalExpenses}
                >
                  Calculate Total
                </button>
                {/* use conditional statement to display */}
                <p>Total: ${this.state.totalExpenses}</p>
              </div>
            </div>
          </div>

          <div className="results">
            <div className="wrapper">
              <h2>
                Your <span className="lineOne">Future</span> Financial Status
              </h2>
              <p>
                You are making:
                <span className="resultStyle">
                  ${this.state.convertedIncome}
                </span>
                in (country code or name?)
              </p>
              <p>
                Your surplus/shortage is:
                <span className="resultStyle">${this.state.surplusShortage}</span>
              </p>
            </div>
          </div>
        </div>
      )
    }
}

export default Currencies;