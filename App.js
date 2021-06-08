import React from 'react';
import {
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import Login from './components/Login';

const App = () => {
  return (
    <ThemeProvider>
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
        <Login />
      </ScrollView>
    </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;
