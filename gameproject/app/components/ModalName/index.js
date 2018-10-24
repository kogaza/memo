import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  TextInput,
} from 'react-native';
var styles = require('./styles');

export default class ModalName extends Component {
  render() {
    const { modalVisible, playerName, texts } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.container} >
          <Text style={{ color: 'white', fontSize: 20 }}>{texts[19]}</Text>
          <TextInput
            style={styles.textInput}
            placeholder={texts[21]}
            placeholderTextColor='rgba(138, 252, 214, 0.5)'
            selectionColor='#8afcd6'
            value={playerName}
            onChangeText={(name) => this.props.changeModalText(name)}
          />
          <TouchableHighlight
            style={{ marginTop: 10 }}
            onPress={() => {
              this.props.setModalVisible(!modalVisible);
            }}>
            <View style={styles.saveName}>
              <Text style={styles.saveText}>{texts[6]}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ marginTop: 50 }}
            onPress={() => {
              this.props.exitModal();
            }}>
            <View style={styles.exitName}>
              <Text style={styles.exitText}>{texts[20]}</Text>
            </View>
          </TouchableHighlight>
        </View>
      </Modal>
    );
  }
}