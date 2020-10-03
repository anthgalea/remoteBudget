import React, { Component } from 'react';
import axios from 'axios';

class Currencies extends Component {
    constructor() {
        super();
        this.state = {
            // these are number values
            baseSymbolVal: '',
            targetSymbolVal: '',

        }
    }


    componentDidMount() {
      // https://api.exchangeratesapi.io/latest?symbols=USD,GBP

			axios({
				url: `https://api.exchangeratesapi.io/latest?symbols=CAD,USD`,
			}).then((res) => {
				console.log(res.data)
				let CAD = res.data.rates.CAD
				let USD = res.data.rates.USD
				this.setState({
					baseSymbolVal: CAD,
					targetSymbolVal: USD,
				})
			})
		}

    render() {
        return (
					<div className="class">
						<h1>{this.props.currentCurrencyCode}</h1>
					</div>
				)
    }
}

export default Currencies;