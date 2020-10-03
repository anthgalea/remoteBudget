import React, { Component } from 'react';
import './App.css';


class Expenses extends Component {
    constructor(){
        super();
        this.state={}
    }

    render() {
        return(
            <div>
                <label htmlFor="">Food</label>
                <input type="text" value=""/>
                <label htmlFor="">Transport</label>
                <input type="text" value=""/>
                <label htmlFor="">Entertainment</label>
                <input type="text" value=""/>
                <label htmlFor="">Housing</label>
                <input type="text" value=""/>
            </div>

        )
    }
}

export default Expenses;