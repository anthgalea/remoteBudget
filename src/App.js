import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Currencies from './Currencies';

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
    const incomeInput =  event.target.value
    console.log(incomeInput)
    // change income in state
    this.setState ({
      userIncome: incomeInput
    })
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
          console.log('you suck');
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
						<h2>Enter Your Current Annual Income Status</h2>

						<div className="incomeLabelInput">
							<label htmlFor="incomeAmount">Income Amount:</label>
							<input
								type="text"
								id="incomeAmount"
								value={this.state.userIncome}
								onChange={this.handleIncomeInputChange}
							/>
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
					// calculateResults={this.calculateIncome}
				/>
			</div>
		)
  };
}

export default App;
