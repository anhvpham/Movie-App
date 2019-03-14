import React from "react"
import { View, ScrollView, StyleSheet, Text } from "react-native"

import Header from "../components/Header"
import Segment from "../components/Segment"
import Result from "../components/Result"
import Search from "../components/Search"


const styles = StyleSheet.create({
	container: {
        display:'flex',
		flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width:'100%',
	},
	mainView: {
		display:'flex',
		flex: 1,
		alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 10,
		marginRight: 10,
	},
	tabStyle: {
		marginTop: 140,
		borderColor: '#13bcd4',
	},
	text: {
		marginTop: 20,
	},
	list: {
		marginTop: 20,
	}
})

//api_key
const apiKey = "8367b1854dccedcfc9001204de735470"

export default class SearchSection extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        search: "",
        segments: ["Movies", "People", "TV Show"],
        selectedIndex: 0
      }
    }
  
    static navigationOptions = ({ navigation }) => {
      return {
        title:'Search',
      }
    }
  
    loadData() {
      switch (this.state.selectedIndex) {
        case 0:
          fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${
              this.state.search
            }&page=1&include_adult=false`
          )
            .then(res => res.json())
            .then(json => this.setState({ data: json.results }))
          break
        case 1:
          fetch(
            `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&language=en-US&query=${
              this.state.search
            }&page=1&include_adult=false`
          )
            .then(res => res.json())
            .then(json => {
              if(json.results.length > 0) {
                this.setState({ data: json.results[0].known_for })
  
              }
            })
          break
        case 2:
          fetch(
            `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&query=${
              this.state.search
            }&page=1`
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
  
    handleInput = text => {
      this.setState({
        search: text
      })
    }
  
    componentDidMount() {}
  
    componentDidUpdate(prevState) {
      if (this.state.search !== prevState.search) {
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
            <Search handleInput={this.handleInput} />
  
            {this.state.selectedIndex == 0 && (
              <Text style={styles.result}>
                Movie results {this.state.search}
              </Text>
            )}
            {this.state.selectedIndex == 1 && (
              <Text style={styles.result}>
                {this.state.search} is in the following movies and Tv shows:
              </Text>
            )}
            {this.state.selectedIndex == 2 && (
              <Text style={styles.result}>
                TV Show results  {this.state.search}
              </Text>
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
                      overview={`${movie.overview.substring(0, 200)}...`}
                    />
                  )
                }
              })}
          </ScrollView>
        </View>
      )
    }
  }

//   export default SearchSection