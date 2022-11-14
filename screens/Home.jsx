import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useContext, useState } from 'react';
import UserContext from '../userContext';
import { getAuth } from 'firebase/auth';
import { styles } from '../styles/styles';
import { Task } from '../components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
const auth = getAuth()

const Home = () => {
    const { user, setUser } = useContext(UserContext);
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);

    const handleAddTask = () => {
        setTaskItems([...taskItems, task])
        setTask(null);
    }

    const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);
    }

    const logout = () => {
        auth.signOut()
            .then(() => {
                setUser({ email: '' })
                deleteUserFromAsyncStorage('email')
            })
            .catch(err => console.log(err))
    }

    const deleteUserFromAsyncStorage = async (key) => {
        try {
            await AsyncStorage.removeItem(key)
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <View style={styles.containerTask}>
            <ScrollView style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>Tareas a Realizar</Text>
                <View style={styles.items}>
                    {
                        taskItems.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        Alert.alert(
                                            "¡Atención!",
                                            "¿Desea marcar esta tarea como realizada?",
                                            [
                                                {
                                                    text: "Cancel",
                                                },
                                                { text: "Aceptar", onPress: () => completeTask(index) }
                                            ]
                                        )
                                    }}
                                >
                                    <Task text={item} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
            <View style={styles.writeTaskWrapper}>
                <TextInput
                    style={styles.inputTask}
                    placeholder={'Ingresar una Tarea'}
                    value={task}
                    onChangeText={text => setTask(text)}
                />
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            "¡Atención!",
                            "¿Desea agregar la tarea?",
                            [
                                {
                                    text: "Cancel",
                                },
                                { text: "Aceptar", onPress: () => handleAddTask() }
                            ]
                        )
                    }}
                >
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.logout}>
                <TouchableOpacity
                    onPress={logout}
                >
                    <View style={styles.buttonLogout}>
                        <Text style={styles.textLogout}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home