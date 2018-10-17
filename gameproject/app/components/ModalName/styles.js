var React = require('react-native');

var myStyles = React.StyleSheet.create({
  container: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(24, 125, 188,0.95)',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
    borderRadius: 20
  },
  textInput: {
    padding: 10,
    width: 200,
    color: '#8afcd6',
    fontSize: 20,
    marginTop: 10,
  },
  saveName: {
    backgroundColor: '#0e4466',
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  saveText: {
    fontSize: 20,
    color: 'white',
  },
  exitName: {
    backgroundColor: '#0e4466',
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitText: {
    fontSize: 14,
    color: 'white',
  }
})

module.exports = myStyles;