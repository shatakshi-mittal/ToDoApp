import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  ImageBackground,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]); // Added filteredTasks state

  const getCurrentDate = () => {
    const date = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    setCurrentDate(getCurrentDate());
  }, []);

  const addTask = () => {
    if (task.trim() === '') return;
    const taskWithDate = `${task} (${currentDate})`;
    setTasks([...tasks, taskWithDate]);
    setTask('');
  };

  const removeTask = taskToRemove => {
    setTasks(tasks.filter(t => t !== taskToRemove));
  };

  const handleSearch = text => {
    setSearchQuery(text);

    // Filter tasks based on the searchQuery
    const filteredTasks = tasks.filter(item => item.includes(text));
    setFilteredTasks(filteredTasks);
  };

  return (
    <ImageBackground
      source={require('./src/images/bgs.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>ToDo App</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks"
          placeholderTextColor="white"
          value={searchQuery}
          onChangeText={text => handleSearch(text)}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.taskInput}
            placeholder="Add a task"
            placeholderTextColor="white"
            value={task}
            onChangeText={text => setTask(text)}
          />
          <Button
            title="Add"
            onPress={addTask}
            color="blue"
          />
        </View>
        <FlatList
          style={styles.taskList}
          data={filteredTasks} // Use filteredTasks here
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskText}>
                {item.split('(')[0]}{' '}
                <Text style={styles.dateText}>({item.split('(')[1]})</Text>
              </Text>
              <Button
                title="Remove"
                onPress={() => removeTask(item)}
                color="green"
              />
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 54,
    marginBottom: 20,
    marginLeft: 60,
    color: 'white',
    fontStyle: 'italic',
  },
  searchInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  taskInput: {
    flex: 1,
    height: 40,
    marginRight: 10,
    borderColor: 'black',
    borderWidth: 1,
    color: 'white',
  },
  taskList: {
    marginTop: 20,
    marginBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  taskText: {
    flex: 1,
    marginBottom: 20,
    fontSize: 20,
    color: 'white',
  },
  dateText: {
    fontSize: 14,
    color: 'black',
  },
});
