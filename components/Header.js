import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Title, Subtitle } from 'native-base';
import { StyleSheet } from 'react-native';
export default class HeaderSection extends Component {
  render() {
    return (
        <Header>
          <Left />
          <Body>
            <Title>Movie Application</Title>
            <Subtitle>{this.props.subtitle}</Subtitle>
          </Body>
          <Right />
        </Header>
    );
  }
}