import React from "react"
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import { Dimensions } from "react-native"


import Header from "../components/Header"

const win = Dimensions.get("window")
const IMG_WIDTH = 500
const IMG_HEIGHT = 756
const ratio = win.width / IMG_WIDTH

const styles = StyleSheet.create({
    container: {
       display:'flex', 
      flex: 1,
      backgroundColor: "lightblue"
    },
    image: {
      width: win.width - 100,
      height: IMG_HEIGHT * ratio - 100,
      resizeMode: "contain",
      marginLeft: "auto",
      marginRight: "auto"
    },
    title: {
      fontSize: 32,
      fontWeight: "800",
      textAlign: "center",
      paddingLeft: 20,
      paddingRight: 20,
      
    },
    subtitle: {
      fontSize: 20,
      fontWeight: "300",
      textAlign: "center",
      paddingLeft: 20,
      paddingRight: 20,
    },
      
    para: {
      fontSize: 18,
      paddingLeft: 20,
      paddingRight: 20,
      textAlign: "center",
      marginTop: 20
    },
  })



export default class NowPlaying extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      img: "https://www.movieposters4u.com/images/o/OnTheBasisOfSex.jpg",
      title: "On The Basis of Sex",
      popularity: 74,
      release_on: "2019-03-13",
      overview:
        "Sample review is here"
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      
        title: 'Now Playing',
      
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=8367b1854dccedcfc9001204de735470`
    )
      .then(response => response.json())
      .then(json => {
        const random = Math.floor(Math.random() * 11)
        this.setState({
          img: `https://image.tmdb.org/t/p/w500/${
            json.results[random].poster_path
          }`,
          title: json.results[random].title,
          popularity: json.results[random].popularity,
          release_date: json.results[random].release_date,
          overview: json.results[random].overview
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={{
                uri: this.state.img
              }}
              style={styles.image}
            />
            <Text style={styles.title}>Movie Title:{this.state.title}</Text>
            <Text style={styles.subtitle}>Popularity: {this.state.popularity}</Text>
            <Text style={styles.subtitle}>Release On: {this.state.release_on}</Text>
            <Text style={styles.para}>Overview: {this.state.overview}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

// export default NowPlaying