import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Currencies from './Currencies';
import Expenses from './Expenses';

class App extends Component {
  constructor() {
    super();
    this.state = {
      countryNames: [],
      currentCurrencyCode: '',
      targetCurrencyCode: '',
      expensesTotal: 0,
      userInputIncomeAmount: 0
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
          // THIS IS WHAT WE USE TO TARGET THE OTHER API FOR THE $$ AMT
          // console.log(code, name);
          // if code == code from currencies.js, return that $$ from currencies state
        })
        // console.log(newCountries)
      })
    })
  }

  handleIncomeInputChange = (event) => {
    const incomeInput =  event.target.value 
    console.log(incomeInput)
    this.setState ({
      userInputIncomeAmount: incomeInput
    })
  } 
  

  handleCurrentChange = (event) => {
    const userSelection = event.target.value;
    // console.log('userSelection:', userSelection)

    // split the userSelection string to an array
    const userSelectionSplitArray= userSelection.split('-')
    // console.log('userSelectionSplitArray:', userSelectionSplitArray)

    // get the currencyCode from the new array & trim to remove white space
    const userSelectionCurrencyCode = userSelectionSplitArray[1]
    // console.log('userSelectionCurrencyCode:', userSelectionCurrencyCode)
    userSelectionCurrencyCode.trim()

    this.setState({
			currentCurrencyCode: userSelectionCurrencyCode,
    })
  }



  handleTargetChange = (event) => {
    const targetSelection = event.target.value;
    // console.log('userSelection:', userSelection)

    // split the userSelection string to an array
    const targetSelectionSplitArray= targetSelection.split('-')
    // console.log('userSelectionSplitArray:', userSelectionSplitArray)

    // get the currencyCode from the new array & trim to remove white space
    const targetSelectionCurrencyCode = targetSelectionSplitArray[1]
    // console.log('userSelectionCurrencyCode:', userSelectionCurrencyCode)
    targetSelectionCurrencyCode.trim()

    this.setState({
			targetCurrencyCode: targetSelectionCurrencyCode,
    })
  }


  render() {
    return (
      <div className="App">

        <div className="burgundy"></div>
        <div className="orange"></div>
        
        <h1>Remote Work Budget</h1>
        <div className="userIncomeSection wrapper">

          <h2 className="lineOne">First,</h2>
          <h2>Select Your Current Income Status</h2>

          <div>
            <label htmlFor="incomeAmount">Income Amount:</label>
            <input 
              type="text" id="incomeAmount" 
              value={this.state.userInputIncomeAmount}
              onChange={this.handleIncomeInputChange}
            />
          </div>

          <div className="incomeDrop">
            <select onChange={this.handleCurrentChange}>
              {this.state.countryNames.map((country, index) => {
                return (
                  <option key={index}>
                    {`${country.name} - ${country.currencyCode}`}
                  </option>
                )
                })
              }
            </select>
          </div>
        </div>

        <section className="target wrapper">
          <h2 className="lineOne">Next,</h2>
          <h2>Select Your Projected Expenses in your New Destination:</h2>
          <Expenses />
          <select onChange={this.handleTargetChange}>
            {this.state.countryNames.map((country, index) => {
              return (
                <option key={index}>
                  {`${country.name} - ${country.currencyCode}`}
                </option>
              )
              })
            }
          </select>

        </section>

        <Currencies currentCurrencyCode={this.state.currentCurrencyCode} />
      </div>
    );
  };
}

export default App;
