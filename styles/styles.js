import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTask: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  input: {
    fontSize: 18,
    width: 350,
    marginEnd: -30,
  },
  inputWithIcon: {
    width: 350,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  button: {
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    width: 350,
  },
  buttonRegister: {
    backgroundColor: 'white',
    borderColor: 'tomato',
    borderWidth: 2,
  },
  buttonLogin: {
    backgroundColor: 'tomato',
    borderColor: 'white',
    borderWidth: 2,
  },
  textLight: {
    color: 'snow'
  },
  buttonText: {
    fontSize: 18,
  },
  buttonTextLogin: {
    fontSize: 18,
    color: 'white',
  },
  buttonTextRegister: {
    fontSize: 18,
    color: 'tomato',
  },
  error: {
    color: 'red',
    alignSelf: 'center'
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: 'lightblue',
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 5,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputTask: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#000',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
  },
  addText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logout: {
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonLogout: {
    backgroundColor: 'tomato',
    padding: 20,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
  },
  textLogout: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
