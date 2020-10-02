import Axios from 'axios';
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
    axios({
      url: 'https://restcountries.eu/rest/v2/all',
    }).then(res => {
      const countries = res.data;

      const newCountries = [];
      countries.forEach(country => {
        const name = country.name;
        newCountries.push(name);

        this.setState({
          countryNames: newCountries,
        })

        const countryCurrencies = country.currencies;
        countryCurrencies.forEach(currency => {
          let code = currency.code;

          // THIS IS WHAT WE USE TO TARGET THE OTHER API FOR THE $$ AMT
          console.log(code, name);
          // if code == code from currencies.js, return that $$ from currencies state
        })
      })
    })
  }

  

  render() {
    return (
      <div className="App">
        <select>
          {this.state.countryNames.map(name => {
            return (
              <option key={name} value={name}>
                {name}
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
