import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "../utils/firebase";
import Loading from "../components/Loading";

export default function Smart() {
  const [foto, setFoto] = useState("https://via.placeholder.com/200");
  const [noticias, setNoticias] = useState(null);
  const [loadingText, setLoadingText] = useState("");
  const [loading, setLoading] = useState(false);
  

  async function cargarDatos() {
    setLoading(true);
    setLoadingText("Cargando noticias...")
    try {
      const noticias = await firebase.db.collection("noticias").get();
      console.log("NOTICIAS ID----->" + noticias.docs);
      setNoticias(noticias.docs);
      setLoading(false)
    } catch (e) {
      console.log("Error al traer los datos de la colección, ERROR:" + e);
    }
  }
  useEffect(() => {
    cargarDatos()
  }, []);
  const Item = ({ titulo, noticia, foto }) => (
    <View style={styles.containerNoticia}>
      <Image
        style={{ height: 150, width: 150,borderRadius:10 }}
        source={
          foto ? { uri: foto } : { uri: "https://via.placeholder.com/200" }
        }
        
      />
      <View style={styles.containerTextNoticia}>
        <Text style={styles.textTituloNoticia}>{titulo}</Text>
        <Text style={styles.textNoticia}>{noticia}</Text>
      </View>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item
      titulo={item.data().titulo}
      noticia={item.data().noticia}
      foto={item.data().foto}
    />
  );
  return (
    <View>
         <Loading isVisible={loading} text={loadingText}/>
      <ScrollView>
        <TouchableOpacity style={styles.btnActualizar} onPress={cargarDatos}>
          <Text style={styles.textBtnActualizar}>Actualizar</Text>
        </TouchableOpacity>
        <FlatList
          data={noticias}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerNoticia: {
    borderWidth: 1,
    borderColor: "#1b3258",
    flexDirection:"row",
    marginHorizontal:15,
    marginTop:15,
    justifyContent:"center",
    borderRadius:10,
    backgroundColor:"#1b3258",
    padding:7
  },
  containerTextNoticia:{
    width:"55%",
    backgroundColor:"#1b3258",
    borderRadius:10
  },
  textTituloNoticia:{
    color:"#fff",
    fontSize:18,
    fontWeight:"bold",
    textAlign:"center",
    borderWidth:1,
    borderColor:"#1cac84",
    width:"90%",
    marginHorizontal:10,
    marginTop:5,
    borderRadius:10
  },
  textNoticia:{
    color:"#fff",
    fontSize:14,
    justifyContent:"center",
    textAlign:"center",
    marginTop:5,
    borderWidth:1,
    borderColor:"#1cac84",
    padding:5,
    marginHorizontal:5,
    borderRadius:10
  },
  btnActualizar:{
    backgroundColor:"#1cac84",
    marginHorizontal:"35%",
    marginTop:10,
    borderRadius:10
  },
  textBtnActualizar:{
    color:"#fff",
    fontSize:16,
    textAlign:"center",
    padding:5,
  }
});
