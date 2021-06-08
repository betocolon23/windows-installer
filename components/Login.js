import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, ThemeProvider, Input } from 'react-native-elements';
import login from '../utils/Cachengo';

const theme = {
    Button: {
      raised: true,
      titleStyle: {
        color: 'white',
      },
    },
};

const Login = () => {
  const [username, setUsername] = useState({username: ""})
  const [password, setPassword] = useState({password: ""})
    

  const handleChangeUsername = name => event => {
    setUsername({  
      [name]: event.target.value })
  }

  const handleChangePassword = name => event => {
    setPassword({
      [name]: event.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(username, password)
  }

  return (
    <ThemeProvider theme={theme}>
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={{alignItems: "center"}}>
          <Text style={{ fontSize: 20 }}>Welcome to Cachengo CLI Installer</Text>
          <Input
            placeholder='Username'
            style={{width: "50%"}}
            value={username}
            onChangeText={handleChangeUsername('username')}
            required={true}
          />
          <Input
            placeholder='Password'
            value={password}
            onChangeText={handleChangePassword('password')}
            secureTextEntry={true}
            required={true}
          />
          <Button 
            title="Sign In"
            buttonStyle={{
              backgroundColor: "#FC5001",
              width: "75%",
            }}
            type="submit"
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Login;
