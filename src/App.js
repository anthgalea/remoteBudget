import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Currencies from './Currencies';

class App extends Component {
  constructor() {
    super();
    this.state = {
      countryNames: [],
      currentSymbol: '',
      targetSymbol: '',
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
          let symbol = currency.code;

          newCountries.push({name: name, symbol: symbol});

          this.setState({
            countryNames: newCountries,
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
    console.log(userSelection)
    // this.setState({
    //   currentSymbol: userSelection,
    // })
  }

  render() {
    return (
      <div className="App">
        <select onChange={this.handleChange}>
          {this.state.countryNames.map((country, index) => {
            return (
              <option key={index}>
                {`${country.name} - ${country.symbol}`}
              </option>
            )
            })
          }
        </select>
        <Currencies />
      </div>
    );
  };
}

export default App;
