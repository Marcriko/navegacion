import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Profile";
import ListReportes from "../screens/ListReportes";
import AgregarNoticia from "../screens/AgregarNoticia";

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{
          title: "Profile",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="listReportes"
        component={ListReportes}
        options={{
          title: "Reportes",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="agregarNoticia"
        component={AgregarNoticia}
        options={{
          title: "Agregar Noticia",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
