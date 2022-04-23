import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
  ToastAndroid,
  Vibration,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import firebase from "../utils/firebase";
import Loading from "../components/Loading";

export default function Reportes() {
  const [aspecto, setAspecto] = useState(null);
  const [descripcion, setDescripcion] = useState(null);
  const [clasificacion, setClasificacion] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [loadingText, setLoadingText] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagen, setImagen] = useState("https://via.placeholder.com/200");
  const [uri, setUri] = useState("https://via.placeholder.com/200");

  useEffect(() => {
    // console.log("ASPECTO " + aspecto);
    // console.log("DESCRIP " + descripcion);
    // console.log("CLASIFI " + clasificacion);
    // console.log("UBI " + ubicacion);
  }, [aspecto, descripcion, clasificacion, ubicacion]);

  //ALERTS
  const createTwoButtonAlert = () =>
    Alert.alert("Algo salió mal", "Intentelo mas tarde...", [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  //CAMARA FUNCTIONS
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
      // aspecto &&
      // descripcion &&
      // clasificacion &&
      // ubicacion &&
      uri != "https://via.placeholder.com/200"
    ) {
      const id = firebase.db.collection("reportes").doc;
      console.log("ID = " + id);
      console.log("ASPECTO = " + aspecto);
      console.log("DESCRIPCIÓN = " + descripcion);
      console.log("CLASIFICACIÓN = " + clasificacion);
      console.log("UBICACIÓN = " + ubicacion);
      console.log("URI RECIBIDA = " + uri);
      //--------SHOW LOADING AND TEXT ------------
      setLoading(true);
      setLoadingText("Cargando reporte...");
      //Enviando datos a firebase
      await firebase.db
        .collection("reportes")
        .add({
          aspecto: aspecto,
          clasificacion: clasificacion,
          descripcion: descripcion,
          estatus: "En proceso",
          foto: uri,
          ubicacion: ubicacion,
        })
        .then(() => {
          setLoading(false);
          cleanForm();
          toast();
        })
        .catch(() => {
          setLoading(false);
          ToastAndroid.show(
            "Error al enviar el reporte !!",
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
    setAspecto(null);
    setDescripcion(null);
    setClasificacion(null);
    setUbicacion(null);
    setImagen("https://via.placeholder.com/200");
  };
  //----------T O A S T--------------
  const toast = () => {
    ToastAndroid.showWithGravity(
      "Reporte enviado con exito !!",
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  };

  //onValueChange={(e) => setAspecto(e.nativeEvent.text)}
  return (
    <SafeAreaView>
      <ScrollView>
        <Loading isVisible={loading} text={loadingText} />
        <View>
          <Text style={styles.title}>Registrar Incidencia</Text>
        </View>
        <View style={styles.container}>
          <View>
            <Text style={styles.textAspecto}>Sucursal:</Text>
          </View>
          <View>
            <RNPickerSelect
              style={pickerSelectStyles}
              value={aspecto}
              placeholder={{ label: "Selecciona la sucursal...", value: null }}
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => setAspecto(value)}
              items={[
                { label: "Cuernavaca", value: "cuernavaca" },
                { label: "Temixco", value: "temixco" },
                { label: "Xochitepec", value: "xochitepec" },
                { label: "Jiutepec", value: "jiutepec" },
              ]}
            />
          </View>
        </View>
        <View style={styles.container1}>
          <View>
            <Text style={styles.textDesc}>Descripción:</Text>
          </View>
          <View>
            <TextInput
              placeholder="Describe el problema..."
              style={styles.inputDescripcion}
              multiline={true}
              value={descripcion}
              onChange={(value) => setDescripcion(value.nativeEvent.text)}
            />
          </View>
        </View>
        <View style={styles.container}>
          <View>
            <Text style={styles.textClasificacion}>Clasificación:</Text>
          </View>
          <View>
            <RNPickerSelect
              style={pickerSelectStyles}
              value={clasificacion}
              placeholder={{
                label: "Nivel de urgencia...",
                value: null,
                color: "grey",
                fontSize: 15,
              }}
              useNativeAndroidPickerStyle={false}
              onValueChange={(value) => setClasificacion(value)}
              items={[
                { label: "Normal", value: "Normal", color: "green" },
                {
                  label: "Urgente",
                  value: "Urgente",
                  color: "orange",
                },
                { label: "Emergencia", value: "Emergencia", color: "red" },
              ]}
            />
          </View>
        </View>
        <View style={styles.container1}>
          <View>
            <Text style={styles.textDesc}>Ubicación:</Text>
          </View>
          <View>
            <TextInput
              value={ubicacion}
              placeholder="Lugar de la incidencia..."
              style={styles.inputDescripcion}
              multiline={true}
              onChange={(value) => setUbicacion(value.nativeEvent.text)}
            />
          </View>
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
              Enviar
            </Text>
          </TouchableOpacity>
        </View>
        {/* <Imagen aspecto={aspecto} descripcion={descripcion} /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  toastMessage: {
    margin: 10,
    marginBottom: 5,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: "7%",
  },
  container1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "7%",
    marginTop: 20,
  },
  textAspecto: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 25,
    fontWeight: "bold",
    marginLeft: 10,
  },
  textClasificacion: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
    marginRight: 20,
  },
  textDesc: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  inputDescripcion: {
    backgroundColor: "#fff",
    padding: 4,
    maxWidth: "80%",
    width: 250,
    maxHeight: "60%",
    height: 60,
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 0.5,
    marginLeft: 10,
    fontSize: 16,
    color: "#1b3258",
  },
  title: {
    backgroundColor: "#1b3258",
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    padding: 5,
    marginBottom: 20,
  },
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
    marginBottom:60
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#fff",
    marginLeft: -5,
    marginRight: -5,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: "#1b3258",
    borderRadius: 10,
    color: "#1b3258",
    width: 215,
    backgroundColor: "#fff",
    textAlign: "left",
    marginTop: 7,
  },
});
