import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { Input, Button } from "react-native-elements";
import firebase from "firebase";

export default function ChangeDisplayNameForm(props) {
  const { displayName, setShowModal, toastRef } = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  //   console.log(props);
  const onSubmit = () => {
    if (!newDisplayName) {
      setError("Es necesario llenar el campo");
    } else if (displayName === newDisplayName) {
      setError("Los nombres deben ser diferentes");
    } else {
      const update = {
        displayName: newDisplayName,
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          console.log("ok");
          setShowModal(false);
          ToastAndroid.show("Nombre actualizado", 4000);
        })
        .catch(() => {
          setError("Error al actualizar el nombre!!");
        });
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre y apellidos"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
        errorMessage={error}
        defaultValue={displayName || ""}
      />
      <Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnStyle}
        onPress={() => onSubmit()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: { alignItems: "center", paddingTop: 10, paddingBottom: 10 },
  input: { marginBottom: 10 },
  btnContainer: { marginTop: 20, width: "95%" },
  btnStyle: {
    backgroundColor: "#1b3258",
  },
});
