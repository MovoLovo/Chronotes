import * as React from 'react';
import { View, Text, TextInput, TouchableHighlight, Dimensions, StyleSheet } from "react-native";

import PropTypes from "prop-types";

class EditNote extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      text: '',
      id: ''
    }
  }

  static getDerivedStateFromProps(props){
    if(props.route.params){
      return {...props.route.params}
    }
    return null
  }

  render(){
    this.props.route.params = undefined
    return(
      <View style={s.container}>
        <View style={s.titleContainer}>
          <Text style={s.titleText}>Edit Note</Text>
          <View style={{flex: 1}}/>
        </View>
        <View style={s.inputContainer}>
          <TextInput
            style={{...s.input, ...s.titleInput}}
            autoCapitalize='words'
            keyboardAppearance='dark'
            placeholderTextColor='#DDD'
            onChangeText={(title) => { this.setState({title: title}) }}
            defaultValue={this.state.title}
          />
          <TextInput
            style={{...s.input, ...s.textInput}}
            autoCapitalize='sentences'
            keyboardAppearance='dark'
            placeholderTextColor='#DDD'
            multiline
            onChangeText={(text) => { this.setState({text: text}) }}
            defaultValue={this.state.text}
          />
        </View>
        
        <View style={s.buttonContainer}>
          <TouchableHighlight
            style={s.backButton}
            onPress={() => this.props.nav.navigate('NoteListView')}
            underlayColor='#300030'>
            <Text style={s.buttonText}>Cancel</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={s.addButton}
            onPress={() => {
              this.props.nav.navigate('NoteListView', {note: {
                  title: this.state.title,
                  text: this.state.text,
                  id: this.state.id
                }, mode: 'edit'})
            }}
            underlayColor='#300030'
          >
            <Text style={s.buttonText}>Edit</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

EditNote.propTypes = {
  nav: PropTypes.object,
  route: PropTypes.object
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  titleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(20, 20, 20, 1)',
  },
  titleText: {
    flex: 1.25,
    fontSize: Dimensions.get("window").width * .09,
    color: '#FFF',
    textAlign: 'center',
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  backButton: {
    flex: 1,
    backgroundColor: '#480048',
    borderRadius: 10,
    marginHorizontal: 25
  },
  addButton: {
    flex: 1,
    backgroundColor: '#750075',
    borderRadius: 10,
    marginHorizontal: 25
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    paddingVertical: 15,
    fontSize: Dimensions.get("window").width * .05,
  },
  inputContainer: {
    marginVertical: 15
  },
  input: {
    color: '#FFF',
    backgroundColor: '#111',
    borderWidth: 4,
    borderRadius: 10,
    borderColor: '#590059',
    paddingHorizontal: 15
  },
  titleInput: {
    marginBottom: 5,
    fontSize: Dimensions.get("window").width * .06
  },
  textInput: {
    fontSize: Dimensions.get("window").width * .045
  }
})

export default EditNote