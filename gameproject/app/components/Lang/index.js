import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';
var styles = require('./styles');

export default class Lang extends Component {

  render() {
    
    const { language, flag } = this.props;
    const langOption = language.map(lang => {
      const selected = lang.name == flag ?
        {
          borderColor: '#1d8ed1',
          borderWidth: 4,
          borderRadius: 5,
        }
        :
        null;
      return (
        <TouchableOpacity
          key={lang.id}
          style={[selected]}
          onPress={() => this.props.changeLanguage(lang.name)}
        >
          <Image
            style={{
              width: 60,
              height: 30,
              resizeMode: 'contain',
              borderRadius: 5,
            }}
            source={lang.img} />
        </TouchableOpacity>
      )
    })

    return (
      <View style={styles.langContainer}>
        {langOption}
      </View>
    )
  }
}
