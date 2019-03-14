import React from 'react';

import { Button, Segment, Text } from 'native-base';
import { View, StyleSheet, Image, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
      display: 'flex',  
      flex: 1,
      flexDirection: 'row',
      margin: 20,
      width: win - 20,
    },
    image: {
      width: 200,
      height: 200,
      resizeMode: 'cover',
    }, 
    text: {
      flex: 1,
      maxWidth: win - 210,
      paddingLeft: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: '800',
  
    },
    para: {
      fontSize: 16,
      marginTop: 10,
    }
  });

const win = Dimensions.get('window')

const Result = (props) => {
  const { img, name, overview } = props
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: img }}
        style={styles.image}
      />
      <View style={styles.text}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.para}>{overview}</Text>
      </View>
    </View>
  )
}



export default Result