import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image,ToastAndroid,Vibration } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import firebase from "../utils/firebase";
import Loading from "../components/Loading";

export default function AgregarNoticia() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [imagen, setImagen] = useState("https://via.placeholder.com/200");
  const [uri, setUri] = useState("https://via.placeholder.com/200");
  const [titulo, setTitulo] = useState(null)
  const [noticia, setNoticia] = useState(null)

  const takePic = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
    });
    // setImagen(`data:image/jpg;base64,${pickerResult.base64}`);
    const foto = pickerResult.uri;
    setImagen(pickerResult.uri);
    setUri(foto);
    console.log("URI FOTO = " + foto);
  };
  const selectImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
    });
    const foto = pickerResult.uri;
    setImagen(pickerResult.uri);
    setUri(foto);
    console.log("URI FOTO = " + foto);
  };
  //FUNCTION SEND DATA
  const enviarDatos = async () => {
    if (
      titulo && noticia &&
      uri != "https://via.placeholder.com/200"
    ) {
      const id = firebase.db.collection("noticias").doc().path
      console.log("ID = " + id);
      console.log("TITULO = "+titulo)
      console.log("NOTICIA = "+noticia)
      console.log("URI RECIBIDA = " + uri);
      //--------SHOW LOADING AND TEXT ------------
      setLoading(true);
      setLoadingText("Cargando noticia...");
      //Enviando datos a firebase
      await firebase.db
        .collection("noticias")
        .add({
          titulo: titulo,
          noticia: noticia,
          foto: uri
        })
        .then(() => {
          setLoading(false);
          cleanForm();
          toast();
        })
        .catch(() => {
          setLoading(false);
          ToastAndroid.show(
            "Error al agregar la noticia!!",
            ToastAndroid.SHORT
          );
        });
    } else {
      ToastAndroid.show(
        "Debes de llenar todos los campos !!",
        ToastAndroid.SHORT
      );
      vibrar();
    }
  };
  const vibrar = () => Vibration.vibrate();
  const cleanForm = () => {
   setTitulo(null)
   setNoticia(null)
   setImagen("https://via.placeholder.com/200");
   setUri("https://via.placeholder.com/200")
  };
  //----------T O A S T--------------
  const toast = () => {
    ToastAndroid.showWithGravity(
      "Noticia agregada con exito !!",
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  };
  return <View>
    <View style={styles.containerGral}>
    <Loading isVisible={loading} text={loadingText} />
      <Text style={styles.texts}>Platillo:</Text>
      <TextInput placeholder="Título del platillo" style={styles.inputs}
      multiline={true}
      value={titulo}
      onChange={(value) => setTitulo(value.nativeEvent.text)}
      />
    </View>
    <View style={styles.containerGral}>
      <Text style={styles.texts}>Detalles:</Text>
      <TextInput placeholder="Descripción del platillo" style={styles.inputs} multiline={true}
      value={noticia}
      onChange={(value) => setNoticia(value.nativeEvent.text)}
      />
    </View>
    <View style={styles.containerBtnsCamara}>
          <TouchableOpacity style={styles.btnTomarFoto} onPress={takePic}>
            <Text style={styles.textBtnTomarFoto}>Tomar Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnTomarFoto} onPress={selectImage}>
            <Text style={styles.textBtnTomarFoto}>Seleccionar Imagen</Text>
          </TouchableOpacity>
          <Image
            style={{
              alignSelf: "center",
              height: 150,
              width: 150,
              marginTop: 5,
            }}
            source={{ uri: imagen }}
          />
          <TouchableOpacity style={styles.btnEnviar}>
            <Text style={styles.textBtnEnviar} onPress={enviarDatos}>
              Agregar al menú
            </Text>
          </TouchableOpacity>
        </View>
  </View>;
}

const styles = StyleSheet.create({
  containerGral:{
    flexDirection:"row",
    justifyContent:"space-evenly",
    marginTop:10
  },
  inputs:{
    borderWidth:1,
    borderColor:"black",
    padding:5,
    borderRadius:10,
    width:"80%",
    color:"#1b3258",
    fontSize:16
  },
  texts:{
    marginTop:5,
    fontSize:18,
    fontWeight:"bold"
  },
  containerBtnsCamara: {
    alignItems: "center",
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
  btnEnviar: {
    backgroundColor: "#1cac84",
    padding: 10,
    borderRadius: 10,
    marginTop: 25,
    borderWidth: 1,
    borderColor: "black",
  },
  textBtnEnviar: {
    color: "#fff",
    fontSize: 17,
  },
});
