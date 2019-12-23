import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

class CustomButton extends Component{
  render() {
		const { text, onPress, style} = this.props;
		return (
		  <TouchableOpacity style={[styles.buttonStyle, {...this.props.style}]}
			onPress={() => onPress()}
		  >
			 <Text style={styles.textStyle}>{text}</Text>
		  </TouchableOpacity>
		);
	}
}

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
};
const styles = StyleSheet.create({
  textStyle: {
    fontSize:20,
  	color: '#ffffff',
  	textAlign: 'center'
  },

  buttonStyle: {
  	padding:20,
  	borderRadius:5,
    marginBottom: 10
  }
});
export default CustomButton;
