//Firebase imports
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
const app = initializeApp(firebaseConfig)
const auth = getAuth()
//
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Pressable, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { loginValidationSchema } from '../validation/validationSchema';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { styles } from '../styles/styles';
import { Ionicons } from '@expo/vector-icons';
import UserContext from '../userContext';

const LoginOrRegisterUser = () => {
  const navigation = useNavigation()
  const { user, setUser } = useContext(UserContext)
  const [isVisible, setIsVisible] = useState(true)
  const [isNewUser, setIsNewUser] = useState(false)
  const [initializing, setInitializing] = useState(true)

  //handling user state change 
  const stateChange = (user) => {
    setUser((prev) => prev = user)
    if (initializing) setInitializing(prev => prev = false)
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(stateChange)
    return subscriber //unsubscribe on unmount
  }, [])

  const handleRegister = (values) => {
    Alert.alert(
      "Registro de Usuario",
      `¿Desea registrar el mail: ${values.email} como usuario`,
      [
        {
          text: "Cancel",
        },
        {
          text: "Aceptar", onPress: () => Alert.alert(
            "¡Gracias!",
            `El usuario el mail: ${values.email}, se registó con éxito`,
            [
              {
                text: "Aceptar", onPress: () => createUserWithEmailAndPassword(auth, values.email, values.password)
                  .then(userCredentials => {
                    console.log(userCredentials);
                    setUser(prev => ({ ...prev, email: values.email }))
                    storeUser(values.email)
                  })
                  .catch(err => console.log(err))
              }
            ]
          )
        }
      ]
    )

  }

  const handleLogin = (values) => {
    /* probar aca los alerts */
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(userCredentials => {
        console.log(userCredentials);
        setUser(prev => ({ ...prev, email: values.email }))
        storeUser(values.email)
      })
      .catch(err => console.log(err))

  }
  /* probar aca los alerts */

  const storeUser = async (user) => {
    try {
      const userEmail = JSON.stringify(user)
      AsyncStorage.setItem('email', userEmail)
    } catch (err) {
      console.log(err);
    }
  }


  if (initializing) return <ActivityIndicator />

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginValidationSchema}
      onSubmit={values => { isNewUser ? handleRegister(values) : handleLogin(values) }}
    >
      {({
        handleChange, handleBlur, handleSubmit, values, errors, touched
      }) => (

        <View style={styles.container}>
          {errors.email && touched.email && (<Text style={styles.error}>{errors.email}</Text>)}
          <View style={styles.inputWithIcon}>
            <TextInput style={styles.input}
              placeholder='Ingrese su correo'
              onChangeText={handleChange('email')}
              name="email"
              value={values.email}
              textAlignVertical='bottom'
            />
            <Ionicons name='mail-outline' size={20} />
          </View>

          {errors.password && touched.password && (<Text style={styles.error}>{errors.password}</Text>)}
          <View style={styles.inputWithIcon}>
            <TextInput style={[styles.input]}
              placeholder='Ingrese su contraseña'
              onChangeText={handleChange('password')}
              name='password'
              value={values.password}
              textAlignVertical='bottom'
              secureTextEntry={isVisible}
            />
            <Pressable onPress={() => setIsVisible(!isVisible)}>
              <Ionicons name={isVisible ? "eye-off-outline" : "eye-outline"} size={20} />
            </Pressable>

          </View>
          <TouchableOpacity style={isNewUser ? [styles.button, styles.buttonRegister] : [styles.button, styles.buttonLogin]} onPress={handleSubmit}>
            {isNewUser ?
              <Text style={[styles.buttonTextRegister]}>Crear cuenta</Text>
              :
              <Text style={[styles.buttonTextLogin]}>Ingresar</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button]} onPress={() => setIsNewUser((prev => !prev))
          } >
            {isNewUser ?
              <Text style={styles.buttonText}>Ya tengo una cuenta</Text>
              :
              <Text style={styles.buttonText}>Quiero crear una cuenta</Text>
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={styles.button}>
            {!isNewUser ?
              <Text style={[styles.buttonText/* , styles.textLight */]}>Olvidé mi contraseña</Text> 
              : 
              <Text></Text>
            }
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  )

}

export default LoginOrRegisterUser