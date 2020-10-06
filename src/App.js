import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Currencies from './Currencies';
import Swal from "sweetalert2";
import { fadeInDown, fadeOutUp } from 'animate.css';
import { withFormsy } from 'formsy-react';


class App extends Component {
  constructor() {
    super();
    this.state = {
      countryNames: [],
      currentCurrencyCode: '',
      targetCurrencyCode: '',
      userIncome: 0,
      totalExpenses: 0,
      targetRate: 0,
      isIncomeValid: false
    }
  }


  componentDidMount() {
    // Create an axios call to retrieve data from each country
    axios({
      url: 'https://restcountries.eu/rest/v2/all',
    }).then(res => {
      // With results, create a variable to store data
      const countries = res.data;

      // Create an empty array
      const newCountries = [];
      // Loop through each country's data
      countries.forEach(country => {
        // For each country, store the country name in a variable
        const name = country.name;

        const countryCurrencies = country.currencies;
        countryCurrencies.forEach(currency => {
          let currencyCode = currency.code;

          newCountries.push({name: name, currencyCode: currencyCode});
          // console.log(currencyCode);

          this.setState({
            countryNames: newCountries,
            currentCurrencyCode: currencyCode

          })

        })
      })
    })
  }

  handleIncomeInputChange = (event) => {
    const incomeInput = event.target.value
    console.log(incomeInput)
    // const errorMsg = 'Please enter a valid input (number with no spaces or punctuation)'
    
    // if income input is not a number, set state to true, which displays error message
    if (isNaN(incomeInput)) {
      this.setState({
        isIncomeValid: true
        
      })
      // if income input is an empty string, still display error message
    } else if (incomeInput === '') {
      this.setState({
        isIncomeValid: true,
        userIncome: incomeInput
      })
      // otherwise, if user input is a number, remove error message
    } else {
      this.setState({
        userIncome: incomeInput,
        isIncomeValid: false
      })
    }
  }


  handleCurrentChange = (event) => {
    // look at the value attribute on the dropdown option
    const userSelection = event.target.value;
    // send it to state
    this.setState({
			currentCurrencyCode: userSelection,
    })
  }



  handleTargetChange = (event) => {
    // look at the value attribute on the dropdown option
    const targetSelection = event.target.value;
    // send it to state
    this.setState({
      targetCurrencyCode: targetSelection,
      // THEN (callback function),
    }, () => {
      // IF state on both has been set.
      if (this.state.currentCurrencyCode) {
        // >> run this axios call
        axios({
          // using custom endpoint built with pieces of state
          url: `https://api.exchangeratesapi.io/latest?base=${this.state.currentCurrencyCode}&symbols=${this.state.targetCurrencyCode}`,
        }).then((res) => {
          console.log('here we are');
          console.log(res);
          // this gives us the target currency CODE
          let conversionCode = this.state.targetCurrencyCode;
          // this is the rate of conversion
          let convertedRate = res.data.rates[conversionCode];
          console.log(convertedRate)

          this.setState({
            targetRate: convertedRate,
          })
        }).catch(error => {
          Swal.fire({
            title: `Sorry, looks we don't have this currency in our database yet, but we're working on it.`,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
          //alert
        })
      }
    })
  }

  callbackFunction = (childData) => {
    this.setState({
      totalExpenses: childData,
    })
  }


  render() {
    return (
			<div className="App">
				<div className="burgundy"></div>
				<div className="orange"></div>

				<h1>Remote Work Budget</h1>
				<div className="userIncomeSection">
					<div className="wrapper">
						<h2 className="lineOne">First,</h2>
						<h2>Enter Your Current Monthly Income</h2>

						<div className="incomeLabelInput">
							<label htmlFor="incomeAmount">Income Amount:</label>
							<input
                type="number"
								id="incomeAmount"
								value={this.state.userIncome}
								onChange={this.handleIncomeInputChange}
                // required
							/>
              {this.state.isIncomeValid ? <p>Please enter a number value.</p> : null }
						</div>
            
						<div className="incomeDrop">
							<select onChange={this.handleCurrentChange}>
								{this.state.countryNames.map((country, index) => {
									return (
										<option value={country.currencyCode} key={index}>
											{`${country.name} - ${country.currencyCode}`}
										</option>
									)
								})}
							</select>
						</div>
					</div>
				</div>

				<section className="target">
					<div className="wrapper">
						<h2 className="lineOne">Next,</h2>
						<h2>Enter Your Projected Monthly Budget in your New Destination</h2>

						<select onChange={this.handleTargetChange}>
							{this.state.countryNames.map((country, index) => {
								return (
									<option value={country.currencyCode} key={index}>
										{`${country.name} - ${country.currencyCode}`}
									</option>
								)
							})}
						</select>
					</div>
				</section>

				<Currencies
					currentCurrencyCode={this.state.currentCurrencyCode}
					parentCallback={this.callbackFunction}
					targetRate={this.state.targetRate}
          userIncome={this.state.userIncome}
          targetCurrencyCode={this.state.targetCurrencyCode}
					// calculateResults={this.calculateIncome}
				/>
			</div>
		)
  };
}

export default App;
