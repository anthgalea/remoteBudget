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
      expensesTotal: 0,
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

  handleChange = (event) => {
    const userSelection = event.target.value;
    // console.log('userSelection:', userSelection)

    // split the userSelection string to an array
    const userSelectionSplitArray= userSelection.split('-')
    // console.log('userSelectionSplitArray:', userSelectionSplitArray)

    // get the currencyCode from the new array & trim to remove white space
    const userSelectionCurrencyCode = userSelectionSplitArray[1].trim()
    // console.log('userSelectionCurrencyCode:', userSelectionCurrencyCode)

    this.setState({
			currentCurrencyCode: userSelectionCurrencyCode,
		})
  }

  render() {
    return (
      <div className="App">
        <select onChange={this.handleChange}>
          {this.state.countryNames.map((country, index) => {
            return (
              <option key={index}>
                {`${country.name} - ${country.currencyCode}`}
              </option>
            )
            })
          }
        </select>
        <Currencies currentCurrencyCode={this.state.currentCurrencyCode} />
      </div>
    );
  };
}

export default App;
