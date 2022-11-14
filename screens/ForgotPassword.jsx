import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { View, SafeAreaView, TextInput, Text, TouchableHighlight, Alert } from "react-native";
import { styles } from "../styles/styles";
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
const auth = getAuth()

const ForgotPassword = () => {

  const navigation = useNavigation()
  function handleReset(values) {
    sendPasswordResetEmail(auth, values.email)
      .then(() => Alert.alert(`Enviamos un mensaje a ${values.email}`))
      .catch(() => Alert.alert(`El mail ${values.email} es incorrecto, por favor ingrese un mail válido`))
  }

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={values => handleReset(values)}
    >
      {({
        handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, isSubmitting
      }) => (
        <SafeAreaView style={styles.container}>
          {errors.email && (<Text style={styles.error}>{errors.email}</Text>)}
          <View style={styles.inputWithIcon}>
          <TextInput 
            style={styles.input}
            placeholder='Ingrese su email registrado'
            onChangeText={handleChange('email')}
            name="email"
            value={values.email}
          />
          </View>
          <TouchableHighlight onPress={handleSubmit} style={[styles.button, styles.buttonLogin]} >
            {
              <Text style={[styles.buttonTextLogin]}>Restablecer contraseña</Text>
            }
          </TouchableHighlight>
        </SafeAreaView>

      )}
    </Formik>
  )
}
export default ForgotPassword