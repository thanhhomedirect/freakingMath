import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './screens/home';
import Rate from './screens/rate';
import Play from './screens/play';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen name="Rate" component={Rate} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Play"
          component={Play}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
