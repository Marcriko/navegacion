import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { Button, Icon, Input } from "react-native-elements";
import { isEmpty } from "lodash";
import { validateEmail } from "../../utils/validations";
import Loading from "../Loading";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";
import { Divider } from "react-native-elements";

export default function LoginForm(props) {
  const { toastRef } = props;
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues());
  const [loading, setLoading] = useState(false);

  const capturarDatos = (type, e) => {
    // console.log(type);
    // console.log(e.nativeEvent.text);
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    //console.log(formData)
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      //console.log("TODOS LOS CAMPOS SON OBLIGATORIOS")
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      //console.log("CORREO INCORRECTO")
      toastRef.current.show("Correo incorrecto");
    } else {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
          setLoading(false);
          console.log(response);
        })
        .catch((err) => {
          setLoading(false);
          toastRef.current.show("Correo y/o contraseña incorrectos");
        });
    }
  };

  return (
    <View style={styles.formContainer}>
      <Input
        onChange={(e) => capturarDatos("email", e)}
        placeholder="Correo Electrónico"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
      />
      <Input
        onChange={(e) => capturarDatos("password", e)}
        placeholder="Contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPass ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPass ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => setShowPass(!showPass)}
          />
        }
      />
      <Button
        title="Iniciar Sesión"
        containerStyle={styles.containerBtn}
        buttonStyle={styles.btnLogin}
        onPress={() => onSubmit()}
      />
      <Loading isVisible={loading} text="Iniciando Sesión" />
    </View>
  );
}

function defaultFormValues() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    marginTop: 20,
  },
  icon: {
    color: "#c1c1c1",
  },
  containerBtn: {
    width: "50%",
  },
  btnLogin: {
    backgroundColor: "#1B3258",
    marginTop: 40,
  },
  divider: {
    backgroundColor: "#1B3258",
    height: 20,
    marginTop: 10,
  },
});
