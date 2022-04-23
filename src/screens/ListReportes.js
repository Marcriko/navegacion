import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import firebase from "../utils/firebase";

export default function ListReportes() {
  const [modalVisible, setModalVisible] = useState(false);
  const [contenidoModal, setContenidoModal] = useState(null);
  const [reportes, setReportes] = useState(null);

  async function cargarDatos() {
    try {
      const reportes = await firebase.db.collection("reportes").get();
      console.log("REPORTES ID----->" + reportes.docs);
      setReportes(reportes.docs);
    } catch (e) {
      console.log("Error al traer los datos de la colección, ERROR:" + e);
    }
  }
  useEffect(() => {
    cargarDatos();
  }, []);
  // --------Datos que se visualiza en el rectangulo azul Aspecto y nivel del reporte así como los botones
  const Item = ({
    aspecto,
    descripcion,
    clasificacion,
    ubicacion,
    foto,
    estatus,
  }) => (
    <View style={styles.item}>
      <Image
        style={{
          height: 150,
          width: 250,
          borderRadius: 10,
          marginHorizontal: 15,
        }}
        source={
          foto ? { uri: foto } : { uri: "https://via.placeholder.com/200" }
        }
      />
      <View style={styles.containerText}>
        <Text style={styles.aspecto}>Aspecto:</Text>
        <Text style={styles.aspecto}>{aspecto}</Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.aspecto}>Nivel:</Text>
        <Text style={styles.aspecto}>{clasificacion}</Text>
      </View>

      <TouchableOpacity
        style={styles.btnVer}
        onPress={() =>
          abrirModal({
            aspecto,
            descripcion,
            clasificacion,
            ubicacion,
            foto,
            estatus,
          })
        }
      >
        <Text style={styles.textBtnVer}>Ver</Text>
      </TouchableOpacity>
    </View>
  );

  const abrirModal = ({
    aspecto,
    descripcion,
    clasificacion,
    ubicacion,
    foto,
    estatus,
  }) => {
    setModalVisible(true);
    console.log("ABRIR MODAL ()");
    console.log("ASPECTO = " + aspecto);
    console.log("DESCRIPCIÓN = " + descripcion);
    console.log("CLASIFICACIÓN = " + clasificacion);
    console.log("ESTATUS = " + estatus);
    console.log("UBICACIÓN = " + ubicacion);
    console.log("FOTO = " + foto);
    console.log("REPORTES------>" + reportes);

    setContenidoModal(
      <View>
        <View style={styles.containerTextAspectos}>
          <Text style={styles.textModal}>Aspecto:</Text>
          <Text style={styles.textModalReporte}>{aspecto}</Text>
        </View>
        <View style={styles.containerTextAspectos}>
          <Text style={styles.textModal}>Descripcion:</Text>
          <Text style={styles.textModalReporte}>{descripcion}</Text>
        </View>
        <View style={styles.containerTextAspectos}>
          <Text style={styles.textModal}>Clasificacion:</Text>
          <Text style={styles.textModalReporte}>{clasificacion}</Text>
        </View>
        <View style={styles.containerTextAspectos}>
          <Text style={styles.textModal}>Ubicacion:</Text>
          <Text style={styles.textModalReporte}>{ubicacion}</Text>
        </View>
        <View style={styles.containerTextAspectos}>
          <Text style={styles.textModal}>Estatus:</Text>
          <Text style={styles.textModalReporte}>{estatus}</Text>
        </View>
        <Image
          style={{ alignSelf: "center", height: 150, width: 150, marginTop: 5 }}
          source={
            foto ? { uri: foto } : { uri: "https://via.placeholder.com/200" }
          }
        />
      </View>
    );
  };

  //mostrar lista de reportes en FlatList
  const renderItem = ({ item }) => (
    <Item
      aspecto={item.data().aspecto}
      clasificacion={item.data().clasificacion}
      descripcion={item.data().descripcion}
      estatus={item.data().estatus}
      ubicacion={item.data().ubicacion}
      foto={item.data().foto}
    />
  );
  //------   M   O  D  A   L   -----------------
  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <ScrollView>
        <FlatList
          data={reportes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Reporte</Text>
                {contenidoModal}

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Regresar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  aspecto: {
    fontSize: 16,
    color: "#fff",
    marginRight: 10,
  },
  item: {
    backgroundColor: "#1b3258",
    padding: 15,
    marginVertical: 5,
    marginHorizontal: "10%",
    borderRadius: 10,
  },
  textBtnEditar: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  btnEditar: {
    backgroundColor: "#1cac84",
    maxWidth: "20%",
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10,
    padding: 5,
  },
  textBtnVer: {
    color: "#1b3258",
    textAlign: "center",
    fontSize: 16,
  },
  btnVer: {
    backgroundColor: "#fff",
    maxWidth: "50%",
    borderRadius: 10,
    padding: 5,
    marginHorizontal:"33%",
    marginTop:10
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  containerText: {
    flexDirection: "row",
    marginLeft: 15,
  },
  //-------M  O  D  A  L ---------
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(27, 50, 88, 0.80)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    maxHeight: "85%",
    maxWidth: "100%",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "orange",
  },
  buttonClose: {
    backgroundColor: "#1cac84",
    marginTop: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    marginHorizontal: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  containerTextAspectos: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textModal: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
    color: "#1b3258",
  },
  textModalReporte: {
    fontSize: 20,
    marginTop: 7,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    borderColor: "#1b3258",
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
