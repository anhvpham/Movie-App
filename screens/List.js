import React from "react"
import {View, ScrollView, StyleSheet, Text} from "react-native"

import Header from "../components/Header"
import Segment from "../components/Segment"
import Result from "../components/Result"


const styles = StyleSheet.create({
    container: {
      display:'flex',  
      flex: 1
    },
    result: {
      paddingLeft: 20,
      paddingTop: 20,
    },
    scrollcontainer: {
      display:'flex',   
      flex: 0
    }
  })

// api_key
const apiKey = "8367b1854dccedcfc9001204de735470"



export default class List extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        segments: ["Popular", "Top Rated", "Upcoming"],
        selectedIndex: 0
      }
    }
  
    static navigationOptions = ({ navigation }) => {
      return {
       

        title: 'Lists',
      }
    }
  
    loadData() {
      switch (this.state.selectedIndex) {
        case 0:
          fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
          )
            .then(res => res.json())
            .then(json => this.setState({ data: json.results }))
          break
        case 1:
          fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1`
          )
            .then(res => res.json())
            .then(json => this.setState({ data: json.results }))
          break
        case 2:
          fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&primary_release_year=2019`
          )
            .then(res => res.json())
            .then(json => this.setState({ data: json.results }))
          break
        default:
          break
      }
    }
  
    selectTabs = index => {
      this.setState({
        selectedIndex: index
      })
    }
  
    componentDidMount() {
      this.loadData()
    }
  
    componentDidUpdate(prevState) {
      if (this.state.selectedIndex !== prevState.selectedIndex) {
        this.loadData()
        return true
      }
      return false
    }
  
    render() {
      return (
        <View style={styles.container}>
          <View>
            <Segment
              segments={this.state.segments}
              selectedIndex={this.state.selectedIndex}
              selectedTabs={this.selectTabs}
            />
  
            {this.state.selectedIndex == 0 && (
              <Text style={styles.result}>Popular List</Text>
            )}
            {this.state.selectedIndex == 1 && (
              <Text style={styles.result}>Top Rate List</Text>
            )}
            {this.state.selectedIndex == 2 && (
              <Text style={styles.result}>Upcoming List </Text>
            )}
          </View>
          <ScrollView
            style={styles.scrollcontainer}
            contentContainerStyle={styles.scrollcontainer}
          >
            {this.state.data &&
              this.state.data.map((movie, index) => {
                if (index < 10) {
                  return (
                    <Result
                      key={index}
                      img={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      name={movie.title}
                      overview={`${movie.overview.substring(0, 100)}...`} 
                    />
                  )
                }
              })}
          </ScrollView>
        </View>
      )
    }
  }
  
// export default List  


