import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import Lang from "../Lang";
var styles = require('./styles');

export default class Options extends Component {
  render() {
    const {
      icons,
      imagesType,
      numberOfFields,
      levels,
      language,
      flag,
      texts
    } = this.props;
    const iconsOption = icons.map(icon => {
      const selected = icon.name == imagesType ?
        {
          borderColor: '#1d8ed1',
          borderWidth: 4,
          borderRadius: 5,
        }
        :
        null;
      return (
        <TouchableOpacity
          key={icon.id}
          style={selected}
          onPress={() => this.props.changeImages(icon.name)}>
          <Image
            style={{
              width: 60,
              height: 60,
              resizeMode: 'contain',
              borderRadius: 5,
            }}
            source={icon.img} />
        </TouchableOpacity>
      )
    })
    const levelOption = levels.map(level => {
      const selected = level.numberOfFields == numberOfFields ?
        {
          borderColor: '#1d8ed1',
          borderWidth: 4,
          backgroundColor: '#54a3c4',
        }
        :
        null;
      const selectedColor = level.numberOfFields == numberOfFields ?
        {
          color: 'white'
        }
        :
        null;
      return (
        <TouchableOpacity
          key={level.id}
          style={[styles.level, selected]}
          onPress={() => this.props.changeLevel(level.numberOfFields)}
        >
          <Text style={[styles.levelText, selectedColor]}>
            {level.name}
          </Text>

        </TouchableOpacity>
      )
    })

    return (
      <View style={styles.container}>
        <View style={styles.choicePictures}>
          <View style={styles.question}>
            <Text style={styles.questionText}>
              {texts[0]}
            </Text>
          </View>
          <View style={styles.icons}>
            {iconsOption}
          </View>
        </View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: "#1d8ed1" }}></View>
        <View style={styles.choiceLevel}>
          <View style={styles.question}>
            <Text style={styles.questionText}>
            {texts[1]}
            </Text>
          </View>
          <View style={styles.levelContainer}>
            {levelOption}
          </View>
        </View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: "#1d8ed1" }}></View>
        <View style={styles.choiceLang}>
          <View style={styles.question}>
            <Text style={styles.questionText}>
            {texts[2]}
            </Text>
          </View>

          <Lang
            language={language}
            flag={flag}
            changeLanguage={(lang) => this.props.changeLanguage(lang)}

          />
        </View>
      </View>
    );
  }
}