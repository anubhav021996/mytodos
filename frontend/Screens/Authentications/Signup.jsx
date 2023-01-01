import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { wp } from "../../Utilis/Scale";

const initialData = {
  name: "",
  email: "",
  password: "",
};

export const Signup = () => {
  const [data, setData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Signup</Text>
      <TextInput
        style={styles.input}
        name="name"
        placeholder="Enter your name"
        onChange={handleChange}
      />
      <TextInput
        style={styles.input}
        name="email"
        placeholder="Enter your email"
        onChange={handleChange}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        name="password"
        type="password"
        placeholder="Enter your password"
        onChange={handleChange}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: "auto",
    textAlign: "center",
    marginTop: 50,
    gap: 20,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    padding: 50,
  },
  heading: {
    fontSize: "xx-large",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: wp(100) < 425 ? 200 : 400,
    borderWidth: 1,
    padding: 10,
    margin: "auto",
  },
});