import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './screens/home';
import Rate from './screens/dictionary';
import Play from './screens/play';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Rate" component={Rate} />
        <Stack.Screen name="Play" component={Play} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
