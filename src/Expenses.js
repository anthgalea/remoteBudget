import React, { Component } from 'react';
import './App.css';


class Expenses extends Component {
    constructor(){
        super();
        this.state={}
    }

    render() {
        return(
            <div className="expenses">
                <div className="expense">
                    <label htmlFor="">Housing</label>
                    <input type="text" value=""/>
                </div>
                <div className="expense">
                    <label htmlFor="">Bills</label>
                    <input type="text" value="" />
                </div>
                <div className="expense">
                    <label htmlFor="">Food</label>
                    <input type="text" value=""/>
                </div>
                <div className="expense">
                    <label htmlFor="">Transport</label>
                    <input type="text" value=""/>
                </div>
                <div className="expense">
                    <label htmlFor="">Entertainment</label>
                    <input type="text" value=""/>
                </div>
            </div>

        )
    }
}

export default Expenses;