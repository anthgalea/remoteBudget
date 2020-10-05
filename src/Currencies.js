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
    })
  }

	// take the props from app.js as symbols, use them in our symbol endpoint which returns
	// an object with them side by side
// loop over res.data.rates array (all curr sym with $$val)
  // if this.props.currentCurrencyCode == res.data.rates[i] >> return that value
  // do same for target
  // multiply current by target

  // componentDidMount() {
  //     https://api.exchangeratesapi.io/latest?symbols=USD,GBP
	// 	axios({
	// 		url: `https://api.exchangeratesapi.io/latest${this.props.currentSymbol},${this.props.targetSymbol}`,
	// 	}).then((res) => {
	// 		let newRates = res.data.rates;
	// 		console.log(newRates); // object with {SYM: $$} objs
	// 		this.setState({
	// 			ratesObj: newRates,
	// 		})
	// 	})
	// }

	// for (let rate in rates) {
	// 	if (rate == this.props.currentCurrencyCode) {
	// 		currencyOne = rate;
	// 		console.log(currencyOne);
	// 	} else if (rate == this.props.targetCurrencyCode) {
	// 		currencyTwo = rate;
	// 	}
	// }

	// handleClick = (event) => {
	// 	this.setState({
	// 		value:
	// 	})
	// }

	// handleChange=(i, event) => {
	// 	// console.log("new value", event.target.value);

	// 	const {name, value} = event.target;
	// 	this.setState(prevState => {
	// 		let values = [...prevState.values];
	// 		values[i] =  {...values[i], [name]: value};
	// 		console.log(this.state.values)
	// 		return { values };
	// 	})
	// }




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