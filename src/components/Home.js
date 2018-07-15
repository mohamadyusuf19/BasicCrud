import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    ActivityIndicator, 
    TouchableOpacity,
    TouchableHighlight, 
    Image,
    Alert,
    ActionSheetIOS
} from 'react-native';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as ReduxActions from '../actions'; //Import your actions

import {Actions} from 'react-native-router-flux'

const editIcon = require('../assets/edit.png')
const deleteIcon = require('../assets/delete.png')

//Buttons for Action Sheet
const BUTTONS = [
    "Edit",
    "Delete",
    'Cancel',
];

const CANCEL_INDEX = 2;

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.renderItem = this.renderItem.bind(this);
        this.editQuote = this.editQuote.bind(this);
        this.deleteQuote = this.deleteQuote.bind(this);
        // this.showOptions = this.showOptions.bind(this);
    }

    componentDidMount() {
        this.props.getQuotes(); //call our action
    }

    // showOptions(quote) {
        
        // ActionSheetIOS.showActionSheetWithOptions({
        //         options: BUTTONS,
        //         cancelButtonIndex: CANCEL_INDEX,
        //         destructiveButtonIndex: 1,
        //     },
        //     (buttonIndex) => {
        //         if (buttonIndex === 0) Actions.new_quote({quote: quote, edit: true, title:"Edit Quote"})
        //         else if (buttonIndex === 1) this.props.deleteQuote(quote.id)
        //     });
    // }

    editQuote(quote) {
        Actions.new_quote({quote: quote, edit: true, title:"Edit Quote"})
    }

    deleteQuote(hapus) {
        Alert.alert(
            'Delete Post',
            'Are you ready to delete your post ?',
            [              
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => this.props.deleteQuote(hapus.id)},
            ],
            { cancelable: false }
        )
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        ref='listRef'
                        data={this.props.quotes}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}/>


                    <TouchableHighlight style={styles.addButton}
                                        underlayColor='#ff7043' onPress={() => Actions.new_quote()}>
                        <Text style={{fontSize: 25, color: 'white'}}>+</Text>
                    </TouchableHighlight>
                </View>
            );
        }
    }

    renderItem({item, index}) {
        return (
            <View style={styles.line}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.quote}>
                        {item.quote}
                    </Text>
                    <Text style={styles.author}>
                        {item.author}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.editQuote(item)}>
                        <Image source={editIcon} style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.deleteQuote(item)}>
                        <Image source={deleteIcon} style={styles.icon}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
};



// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        quotes: state.dataReducer.quotes
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: '#F5F5F5'
    },

    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    line: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10 
    },
    row:{
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10
    },

    author: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 8 * 2
    },

    quote: {
        marginTop: 5,
        fontSize: 14,
    },

    addButton: {
        backgroundColor: '#ff5722',
        borderColor: '#ff5722',
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    icon: {
        height: 22,
        width: 22,
        margin: 3
    }
});