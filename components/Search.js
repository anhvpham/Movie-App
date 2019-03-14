import React from 'react';
import { Item, Input } from 'native-base';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    input: {
      textAlign: 'center',
      width: '100%',
    }
  });

const Search = (props) => {
  return (
    <Item>
      <Input 
      style={styles.input} 
      placeholder="Please type your search here" 
      onChangeText={(text) => props.handleInput(text)}
      />
    </Item>
  )
}




export default Search