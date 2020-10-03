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
        }
    }

	// take the props from app.js as symbols, use them in our symbol endpoint which returns 
	// an object with them side by side
// loop over res.data.rates array (all curr sym with $$val) 
  // if this.props.currentCurrencyCode == res.data.rates[i] >> return that value
  // do same for target
  // multiply current by target

    componentDidMount() {
      // https://api.exchangeratesapi.io/latest?symbols=USD,GBP
		axios({
			url: `https://api.exchangeratesapi.io/latest`,
		}).then((res) => {
			let newRates = res.data.rates;
			console.log(newRates); // object with {SYM: $$} objs
			this.setState({
				ratesObj: newRates,
			})
		})
	}
	
	
	// for (let rate in rates) {
	// 	if (rate == this.props.currentCurrencyCode) {
	// 		currencyOne = rate;
	// 		console.log(currencyOne);
	// 	} else if (rate == this.props.targetCurrencyCode) {
	// 		currencyTwo = rate;
	// 	}
	// }


    render() {
        return (
			<div className="class">
				<p>{this.props.currentCurrencyCode}</p>
				<p>{this.props.targetCurrencyCode}</p>
			</div>
		)
    }
}

export default Currencies;