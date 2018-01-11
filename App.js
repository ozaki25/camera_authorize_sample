import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Camera from 'react-native-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  camera: {
    flex: 1,
  },
  emphasis: {
    fontSize: 36,
    color: 'red',
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
      isAuthorizationChecked: false,
    };
  }

  componentWillMount() {
    this.cameraAuthorize();
  }

  async cameraAuthorize() {
    const checkAuthorization = Camera.checkDeviceAuthorizationStatus;
    if (checkAuthorization) {
      const isAuthorized = await checkAuthorization();
      this.setState({ isAuthorized, isAuthorizationChecked: true });
    }
  }

  renderCameraArea() {
    if (this.state.isAuthorized) {
      return (
        <Camera style={styles.camera}>
          <Text style={styles.emphasis}>カメラ撮影中</Text>
        </Camera>
      );
    }
    if (!this.state.isAuthorizationChecked) {
      return <Text style={styles.emphasis}>初回チェック中</Text>;
    }
    return <Text style={styles.emphasis}>カメラの使用が許可されていません</Text>;
  }

  render() {
    return <View style={styles.container}>{this.renderCameraArea()}</View>;
  }
}
