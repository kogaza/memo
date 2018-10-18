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

const NAME_FIELD_KEY = 'NAME_FIELD_KEY'


export default class ModalName extends Component {
  render() {
    const { modalVisible, playerName } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.container} >
          <Text style={{ color: 'white', fontSize: 20 }}>What's your name?</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Your name'
            placeholderTextColor='rgba(138, 252, 214, 0.5)'
            selectionColor='#8afcd6'
            value={playerName}
            onChangeText={(name) => this.props.changeModalText(name)}
            // onSubmitEditing={async () => {
            //   try {
            //     await AsyncStorage.setItem(NAME_FIELD_KEY, playerName);
            //   } catch (e) { }
            // }}
          />
          <TouchableHighlight
            style={{ marginTop: 10 }}
            onPress={() => {
              this.props.setModalVisible(!modalVisible);
            }}>
            <View style={styles.saveName}>
              <Text style={styles.saveText}>Save</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ marginTop: 50 }}
            onPress={() => {
              this.props.exitModal();
            }}>
            <View style={styles.exitName}>
              <Text style={styles.exitText}>exit</Text>
            </View>
          </TouchableHighlight>
        </View>
      </Modal>
    );
  }
}