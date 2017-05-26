/**
 * InstaTest - just an API call experiment in React Native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

class ImageGrid extends Component {
  
  constructor(props) {
    super(props);
    
    if (props.name) {
      fetch(`https://www.instagram.com/${props.name}/media`)
      .then( result => result.json() )
      .then( result => {
        console.log(result);
        this.setState({ 
          error: null,
          images: result.items.map(item => item.images.low_resolution)
        });
      }, reject => {
        console.log("Epic fail", reject);
        this.setState({ images: [], error: reject });  
      });
    }
  }

  render() {
    if (this.state && this.state.images && this.state.images.length > 0) {
      let imgs = this.state.images.map(img => 
          <Image source={{ uri: img.url }} style={styles.image} key={img.url} />
      );
      return (
          <View style={styles.imageGrid}>
            {imgs}
          </View>
      );
    } else {
      return ( 
        <Text style={styles.text}>No images or no username.</Text>
      );
    }
    
  }
}

export default class InstaTest extends Component {
  constructor() {
    super();
  }

  editUser() {
    console.log("Meemid");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text onclick={this.editUser} style={styles.text}>{this.state ? this.state.name : "punanekleeps"}</Text>
        <ImageGrid name={this.state ? this.state.name : "punanekleeps"} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#121212',
    paddingTop: 18
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  text: {
    color: '#FDFDFD',
    height: 35,
    lineHeight: 35
  },

  image: {
    margin: 5,
    width: 75,
    height: 75
  }
});

AppRegistry.registerComponent('InstaTest', () => InstaTest);
