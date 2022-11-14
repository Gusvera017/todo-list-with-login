import LoginOrRegisterUser from './screens/LoginOrRegisterUser';
import Home from './screens/Home';
import ForgotPassword from './screens/ForgotPassword';
import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserContext from './userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator()
export default function App() {
  const [user, setUser] = useState({ email: '' })

  const getUserFromAsyncStorage = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('email')
      return userEmail !== null ? setUser(prev => ({ ...prev, email: userEmail })) : null
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const savedUser = getUserFromAsyncStorage()
    console.log(savedUser);
  }, [])
  return (

    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: 'gray'
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}>

          {user?.email ?
            <Stack.Screen name='Home' component={Home} options={{ title: 'Home' }} />
            :
            <>
              <Stack.Screen name='LoginOrRegisterUser' component={LoginOrRegisterUser} options={{ title: 'Login' }} />
              <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{ title: 'Olvidé mi contraseña' }} />
            </>
          }


        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>

  );
}

