import React, { Component } from 'react';
import axios from 'axios';
import { app } from 'firebase';

class Currencies extends Component {
    constructor() {
        super();
        this.state = {
          ratesObj: {},
          baseSymbolVal: '',
          targetSymbolVal: '',
          totalExpenses: 0,
          housing: 0,
          bills: 0,
          entertainment: 0,
          food: 0,
          transport: 0
        }
      this.handleChange = this.handleChange.bind(this);
    }

  handleChange = (evt) => {
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    this.setState({
      [evt.target.name]: evt.target.value
    });
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
    console.log('newTotal:', newTotal)

    this.setState({
      totalExpenses: newTotal,
    }, () => {
      this.sendData();
    })

  }

  sendData = () => {
    this.props.parentCallback(this.state.totalExpenses)
  }

    render() {
        return (
			<div className="class">

				{/* <p>{this.props.currentCurrencyCode}</p>
				<p>{this.props.targetCurrencyCode}</p> */}

				<div className="expenses wrapper">
          <div className="expense">
              <label htmlFor="">Housing</label>
              <input name="housing" type="text" id="housing" onChange={this.handleChange} value={this.state.expensesArray} />
          </div>
          <div className="expense">
              <label htmlFor="">Bills</label>
              <input name="bills" type="text" id="bills" onChange={this.handleChange} value={this.state.expensesArray} />
          </div>
          <div className="expense">
              <label htmlFor="">Food</label>
              <input name="food" type="text" id="food" onChange={this.handleChange} value={this.state.expensesArray} />
          </div>
          <div className="expense">
              <label htmlFor="">Transport</label>
              <input name="transport" type="text" id="transport" onChange={this.handleChange} value={this.state.expensesArray} />
          </div>
          <div className="expense">
              <label htmlFor="">Entertainment</label>
              <input name="entertainment"type="text" id="entertainment" onChange={this.handleChange} value={this.state.expensesArray} />
          </div>


          <div className="totalExpenses">
            <button className="calculateTotal" onClick={this.calculateTotalExpenses}>
            Calculate Total
            </button>
              {/* use conditional statement to display */}
            <p>Total: ${this.state.totalExpenses}</p>
          </div>

        </div>

			</div>
		)
    }
}

export default Currencies;