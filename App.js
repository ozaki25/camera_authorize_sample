import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Camera from 'react-native-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Camera style={styles.camera} />
      </View>
    );
  }
}
