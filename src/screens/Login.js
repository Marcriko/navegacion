import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useRef } from "react";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "../components/account/LoginForm";
import Toast from "react-native-easy-toast";

export default function Login() {
  const toastRef = useRef();
  return (
    <ScrollView>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={{
          uri: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/restaurant-logo-design-template-d00dce767b5416ddd01c4ed9149cee77_screen.jpg?ts=1613119208",
        }}
      />
      <Text style={styles.title}>Restaurante Recupera :)</Text>

      {/* <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("../../assets/cecadec.jpg")}
      /> */}
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} />
        <CrearCuenta />
      </View>
      {/* <Divider style={styles.divider} /> */}
      <Toast ref={toastRef} style={{ marginTop: 100 }} opacity={0.9} />
    </ScrollView>
  );
}

function CrearCuenta() {
  const navegacion = useNavigation();
  return (
    <>
      <Divider style={styles.divider} />
      <Text style={styles.textRegister}>
        Para registrar una incidencia debes tener una cuenta{" "}
        <Text
          onPress={() => navegacion.navigate("register")}
          style={styles.btnRegister}
        >
          Registrate
        </Text>
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 200,
    alignSelf: "center",
    marginTop: 5,
  },
  viewContainer: {
    marginHorizontal: 40,
  },
  divider: {
    backgroundColor: "#1B3258",
    marginTop: 30,
    height: 1,
  },
  textRegister: {
    marginTop: 15,
    marginHorizontal: 10,
  },
  btnRegister: {
    color: "#1cac84",
    fontWeight: "bold",
    fontSize: 15,
    paddingHorizontal:"33%"
  },
  title: {
    fontSize: 20,
    marginLeft: "27%",
    marginTop: 15,
    color: "black",
  },
  title2: {
    fontSize: 17,
    marginLeft: "30%",
    color: "black",
  },
  redes: {
    marginTop: 50,
    marginLeft: 5,
  },
});
