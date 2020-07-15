import React from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import { Icon, } from "native-base";
export default class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    )
  }

  async componentDidMount() {
    const data = await this.performTimeConsumingTask();
    console.log("didmount")
    if (data !== null) {
      this.props.navigation.navigate("landing")
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.viewStyles}>
        <View style={{ height: 100, width: 100, backgroundColor: 'white', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
          <Icon type="FontAwesome" name="money" style={{ color: '#f36341', fontSize: 40, }} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f36341'
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  }
}


