import {
  Button,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function Imagen() {
  const [imagen, setImagen] = useState("https://via.placeholder.com/200");
 
  const enviarDatos = () => {


  };
  const reset = () => {

  };

  const takePic = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
    });

    setImagen(`data:image/jpg;base64,${pickerResult.base64}`);
  };

  const selectImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
    });

    setImagen(`data:image/jpg;base64,${pickerResult.base64}`);
  };

  return (
    <View style={styles.containerBtnsCamara}>
      <TouchableOpacity style={styles.btnTomarFoto} onPress={takePic}>
        <Text style={styles.textBtnTomarFoto}>Tomar Foto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnTomarFoto} onPress={selectImage}>
        <Text style={styles.textBtnTomarFoto}>Seleccionar Imagen</Text>
      </TouchableOpacity>
      <Image
        style={{ alignSelf: "center", height: 150, width: 150, marginTop: 5 }}
        source={{ uri: imagen }}
      />
      <TouchableOpacity style={styles.btnEnviar}>
        <Text style={styles.textBtnEnviar} onPress={enviarDatos}>
          Enviar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerBtnsCamara: {
    alignItems: "center",
  },
  btnEnviar: {
    backgroundColor: "#1cac84",
    padding: 10,
    borderRadius: 10,
    marginTop: 25,
    borderWidth: 1,
    borderColor: "black",
  },
  btnUbicacion: {
    backgroundColor: "#1b3258",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  textBtnEnviar: {
    color: "#fff",
    fontSize: 17,
  },
  textBtnUbicacion: {
    color: "#fff",
    fontSize: 17,
  },
  btnPhoto: {
    backgroundColor: "#1b3258",
    padding: 7,
    marginBottom: 5,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 17,
    padding: 5,
  },
  btnTomarFoto: {
    backgroundColor: "#1b3258",
    padding: 7,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  textBtnTomarFoto: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 10,
  },
});
