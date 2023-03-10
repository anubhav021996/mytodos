import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { wp } from "../Utilis/Scale";
import { BASE_URL } from "@env";
import { TodoTable } from "../Components/TodoTable";

export const Todo = ({ navigation }) => {
  const { token, user } = useSelector((store) => store);
  const [todos, setTodos] = useState([]);
  const [isUpload, setIsUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    setIsUpload(true);
    axios
      .post(
        `${BASE_URL}/todo`,
        { title },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => getTodos())
      .catch((e) => {
        if (e.response.data.errors)
          return wp(100) < 425
            ? Alert.alert(e.response.data.errors[0].msg)
            : alert(e.response.data.errors[0].msg);
        wp(100) < 425 ? Alert.alert(e.response.data) : alert(e.response.data);
      })
      .finally(() => setIsUpload(false));
  };

  const getTodos = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/todo`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setTodos(res.data);
        setLoading(false);
      });
  };

  const toggleTodo = (id) => {
    axios
      .patch(
        `${BASE_URL}/todo/${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => getTodos());
  };

  const deleteTodo = (id) => {
    axios
      .delete(`${BASE_URL}/todo/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => getTodos());
  };

  useEffect(() => {
    if (!token) return navigation.navigate("login");
    getTodos();
  }, [token]);

  if (!user) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <View>
      <Text style={styles.heading}>{`Welcome ${user?.name}!`}</Text>
      <View style={styles.add}>
        <TextInput
          style={styles.input}
          placeholder="Enter your task"
          onChangeText={(text) => setTitle(text)}
        />
        <Button title="Add New Task" disabled={isUpload} onPress={handleAdd} />
      </View>

      {loading ? (
        <Text style={styles.loading}>Loading Task...</Text>
      ) : (
        <View>
          {!todos.length ? (
            <Text style={styles.notask}>Start adding your task</Text>
          ) : (
            <TodoTable
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
              todos={todos}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 20,
  },
  add: {
    flexDirection: "row",
    alignSelf: "center",
  },
  input: {
    width: wp(100) < 425 ? 200 : 400,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  notask: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 100,
    textAlign: "center",
  },
  loading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },
});
