export const QUOTES_AVAILABLE = "QUOTES_AVAILABLE";
export const ADD_QUOTE = 'ADD_QUOTE';
export const UPDATE_QUOTE = 'UPDATE_QUOTE';
export const DELETE_QUOTE = 'DELETE_QUOTE';

import { AsyncStorage } from 'react-native';

//add quote - Create (C)
export function addQuote(quote) {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if(quotes!==null) {
                quotes = JSON.parse(quotes);
                quotes.unshift(quote); //add the new quote to the top
                AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
                    dispatch({ type: ADD_QUOTE, quote: quote });
                });
            }
        });
    };
}

//get quote - Read (R)
export function getQuotes() {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if (quotes !== null) {
                dispatch({ type: QUOTES_AVAILABLE, quotes: JSON.parse(quotes) })
            }
        });
    };
}

//update quote - Update (U)
export function updateQuote(quote) {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if (quotes !== null) {
                quotes = JSON.parse(quotes);
                var index = getIndex(quotes, quote.id); //find the index of the quote
                if (index !== -1) {
                    quotes[index]['author'] = quote.author;
                    quotes[index]['quote'] = quote.quote;
                }
                AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
                    dispatch({ type: UPDATE_QUOTE, quote: quote });
                });
            }
        });
    };
}

//Delete Quotes DELETE (D)
export function deleteQuote(id) {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err,  quotes) => {
            if (quotes!==null){
                quotes = JSON.parse(quotes);

                var index = getIndex(quotes, id);// find the index of the quotes with id
                if(index !== -1)quotes.splice(index, 1);
                AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
                    dispatch({ type: DELETE_QUOTE, id:id });
                });
            }
        });
    };
}

function getIndex(data, id) {
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}