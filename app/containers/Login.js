import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import { Button, Touchable } from '../components'

import { createAction, NavigationActions } from '../utils'

@connect(({ app, loading }) => ({
  ...app,
  loading: loading.effects['app/login'],
}))
class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  }

  onLogin = () => {
    this.props.dispatch(createAction('app/login')())
  }

  onClose = () => {
    this.props.dispatch(NavigationActions.back())
  }

  render() {
    const { loading } = this.props
    return (
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button text="Login" onPress={this.onLogin} />
        )}
        {!loading && (
          <Touchable style={styles.close} text="Close" onPress={this.onClose}>
            <Text>Close</Text>
          </Touchable>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 40,
  },
})

export default Login
