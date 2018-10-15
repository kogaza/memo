import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';
var styles = require('./styles');

export default class Sidebar extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={{
              width: 100,
              height: 40,
              resizeMode: 'contain',
              transform: [{scaleX: -1}]
            }}
            source={require('../../images/stars3.png')}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.props.backToStart()}
        >
          <Image
            style={{ width: 100, height: 40 }}
            source={require('../../images/memoo-logo.png')}
          />
        </TouchableOpacity>
        <View>
          <Image
            style={{
              width: 100,
              height: 40,
              resizeMode: 'contain',
            }} source={require('../../images/stars3.png')}
          />
        </View>
      </View>
    );
  }
}
