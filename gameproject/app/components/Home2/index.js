import React, { Component } from 'react'
import { Text, View } from 'react-native'
var styles = require('./styles');


export default class index extends Component {
  render() {
    return (
      <View>
        <Text style={styles.textElement}> textInComponent </Text>
      </View>
    )
  }
}