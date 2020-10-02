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
        axios({
            url: 'https://api.exchangeratesapi.io/latest',
        }).then((res) => {
            // console.log(res.data);
            let CAD = res.data.rates.CAD;
            let USD = res.data.rates.USD;
            this.setState({
                baseSymbolVal: CAD,
                targetSymbolVal: USD,
            })
        })
    }

    render() {
        return (
            <div className="class">

            </div>
        )
    }
}

export default Currencies;