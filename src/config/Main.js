import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Home from '../components/Home';
import NewQuote from '../components/NewQuote';
import Data from './quotes.json';
import { connect } from 'react-redux';
import { getQuotes } from '../actions';

class Main extends Component {
    componentDidMount() {
        var _this = this;
        //check if any data exist
        AsyncStorage.getItem('data', (err, data) => {
            //if it doesn't exist, extract from json file
            //save the initial data in Async
            if (data == null) {
                AsyncStorage.setItem('data', JSON.stringify(Data.quotes));
                _this.props.getQuotes();
            }
        });
    }
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key='home' component={Home} title="Home" initial/>
                    <Scene key='new_quote' component={NewQuote} title="New Quotes"/>
                </Scene>
            </Router>
        )
    }
}

//connect everything
export default connect(null, {getQuotes})(Main)