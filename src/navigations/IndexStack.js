import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Index from "../screens/Index"
import Register from "../screens/Register";
import Reportes from "../screens/Reportes";


const Stack = createStackNavigator();

export default function IndexStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="index"
                component={Index}
                options={{
                    title:'Inicio',
                    headerTitleAlign: 'center'}}
            />
            <Stack.Screen 
                name="register"
                component={Register}
                options={{
                    title:'Registrate',}}
            />
              <Stack.Screen 
                name="reportes"
                component={Reportes}
                options={{
                    title:'Reporte',}}
            />
        </Stack.Navigator>
    )
}