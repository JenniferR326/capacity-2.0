import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { SignUpLogin } from "./styles";
import { connect } from "react-redux";
import { loginUser } from "../store/user";

function LoginScreen({ navigation, loginUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("SignUp");
  };

  const onLoginPress = () => {
    loginUser(email, password);
    navigation.navigate('Capacity');
  };

  return (
    <SafeAreaView>
      <View
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <TextInput
          style={SignUpLogin.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={SignUpLogin.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[SignUpLogin.button]}
          onPress={() => {
            onLoginPress()
            setEmail('')
            setPassword('')
          }}
        >
          <Text>Log in</Text>
        </TouchableOpacity>
        <View>
          <Text style={SignUpLogin.footerText}>
            No account?{" "}
            <Text onPress={onFooterLinkPress} style={SignUpLogin.footerLink}>
              Sign up!
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const mapDispatch = (dispatch) => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
});           

export default connect(null, mapDispatch)(LoginScreen);
