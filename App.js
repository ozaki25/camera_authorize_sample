import React, { Component } from 'react';
import { PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native';
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
    if (Platform.OS === 'ios') {
      const checkAuthorization = Camera.checkDeviceAuthorizationStatus;
      if (checkAuthorization) {
        const isAuthorized = await checkAuthorization();
        this.setState({ isAuthorized, isAuthorizationChecked: true });
      }
    } else if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      this.setState({
        isAuthorized: granted === PermissionsAndroid.RESULTS.GRANTED,
        isAuthorizationChecked: true,
      });
    } else {
      this.setState({ isAuthorized: true, isAuthorizationChecked: true });
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
      return <Text style={styles.emphasis}>権限チェック処理中</Text>;
    }
    return <Text style={styles.emphasis}>カメラの使用が許可されていません</Text>;
  }

  render() {
    return <View style={styles.container}>{this.renderCameraArea()}</View>;
  }
}
