import React, { Component } from 'react';

const Results = (props) => {
    let results = 0

    // calculateIncome = () => {
    //     let result = this.props.userIncome * this.props.targetRate;
    //     console.log(result)
    //     results = result
    // }

    return (
        <div>
            <h2>Results</h2>
            <p>You are making: (target currency)</p>
            <p>You surplus/shortage is SUCH'NSUCH</p>
        </div>
    )
}

export default Results;