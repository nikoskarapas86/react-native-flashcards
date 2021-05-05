import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { purple } from '../utils/colors';

export default function TextButton ({ children,  disabled = false, onPress, style = {} }) {
    return(
        <TouchableOpacity   disabled={disabled} onPress={onPress}>
           <Text style={[styles.reset, style]}>{children}</Text> 
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    reset: {
      textAlign: 'center',
      color: purple,
    },
   
  })