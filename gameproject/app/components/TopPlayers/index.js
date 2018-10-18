import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
var styles = require('./styles');

export default class TopPlayers extends Component {
  state = {
    level: 2,
    buttons: [false, true, false]
  }

  changeLevel = (indexButton) => {
    const array = [false, false, false];
    const buttons = array.map((el, i) => (i == indexButton) ? true : false);
    this.setState({ buttons })
  }

  render() {
    const { top5level1, top5level2, top5level3, texts } = this.props;
    const level1 = top5level1.map((el, i) => {
      return (
        <Text style={styles.text} key={i}>{i + 1}. {el.playerName} {el.finishAttempts}</Text>
      )
    })
    const level2 = top5level2.map((el, i) => {
      return (
        <Text style={styles.text} key={i}>{i + 1}. {el.playerName} {el.finishAttempts}</Text>
      )
    })
    const level3 = top5level3.map((el, i) => {
      return (
        <Text style={styles.text} key={i}>{i + 1}. {el.playerName} {el.finishAttempts}</Text>
      )
    })
    let topPlayers;
    switch (this.state.buttons.indexOf(true)) {
      case 0:
        topPlayers = level1;
        break;
      case 1:
        topPlayers = level2;
        break;
      case 2:
        topPlayers = level3;
        break;
      default:
        break;
    }

    const buttons = this.state.buttons.map((el, i) => {
      const selected = el ?
        {
          backgroundColor: '#1d8ed1',
          color: 'white',
          opacity: 1
        }
        : null;
      return (
        <TouchableOpacity
          style={styles.button}
          key={i}
          onPress={() => this.changeLevel(i)}
        >
          <Text style={[styles.text, styles.level, selected]}> {texts[i + 7]} </Text>
        </TouchableOpacity>
      )
    })
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          {buttons}
        </View>
        <View style={styles.topPlayersContainer}>
          {topPlayers}
        </View>
      </View>
    );
  }
}
