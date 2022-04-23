import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Input, Icon, Button } from "react-native-elements";
import { isEmpty, size } from "lodash";
import { validateEmail } from "../../utils/validations";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";

export default function RegisterForm(props) {
  //console.log(props)
  const navigation = useNavigation();
  const { toastRef } = props;
  const [showPass, setShowPass] = useState(false);
  const [showPassRepeat, setShowPassRepeat] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues());
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    //console.log(formData)
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.passwordRepeat)
    ) {
      //console.log("TODOS LOS CAMPOS SON OBLIGATORIOS")
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      //console.log("CORREO INCORRECTO")
      toastRef.current.show("Correo incorrecto");
    } else if (size(formData.password) < 6) {
      //console.log("DEBEN SER AL MENOS 6 CARACTERES")
      toastRef.current.show("Deben ser al menos 6 caracteres");
    } else if (formData.password !== formData.passwordRepeat) {
      //console.log("LAS CONTRASEÑAS DEBEN SER IGUALES")
      toastRef.current.show("Las contraseñas deben ser iguales");
    } else {
      //console.log("OK")
      //toastRef.current.show("Ok")
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
          //console.log(response);
          setLoading(false);
          navigation.navigate("index");
        })
        .catch((err) => {
          //console.log(err)
          setLoading(false);
          toastRef.current.show("Email ya existente");
        });
    }
  };

  const capturarDatos = (e, type) => {
    //console.log(e.nativeEvent.text)
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.formContainer}>
      <Input
        onChange={(e) => capturarDatos(e, "email")}
        placeholder="Correo Electrónico"
        containerStyle={styles.inputForm}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
      />
      <Input
        onChange={(e) => capturarDatos(e, "password")}
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
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
      <Input
        style={styles.inputContainer}
        onChange={(e) => capturarDatos(e, "passwordRepeat")}
        placeholder="Repetir Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showPassRepeat ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassRepeat ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => setShowPassRepeat(!showPassRepeat)}
          />
        }
      />
      <Button
        title="Registrar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnRegister}
        onPress={() => onSubmit()}
      />
      <Loading isVisible={loading} text="Creando cuenta" />
    </View>
  );
}

function defaultFormValues(params) {
  return {
    email: "",
    password: "",
    passwordRepeat: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputForm: {
    width: "100%",
    marginTop: 30,
  },
  icon: {
    color: "#c1c1c1",
  },
  btnContainer: {
    marginTop: 20,
    width: "80%",
  },
  btnRegister: {
    backgroundColor: "#1b3258",
    borderRadius: 10,
    marginTop: 40,
  },
});
