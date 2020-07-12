import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Body, Right, Title,Input,Item ,Badge} from "native-base";
import AsyncStorage from '@react-native-community/async-storage';

export default function Search({navigation}) {
// 
    const [location,Setlocation] = useState("");
    const [city,Setcity] = useState([]);

    const btnClick= async () =>{
      await AsyncStorage.setItem("newCity",location)
      navigation.navigate("Home",{
              location:location
            }
      )}

    return (
      <>
        <SafeAreaView>
          <Header style={{ backgroundColor: "lightskyblue" }}>
          
            <Body>
    <Title style={{ color: "white", fontSize: 24 }}>Loc - {location}</Title>
            </Body>
           
          </Header>

          <Item rounded style={{ margin: 10 }}>
            <Input placeholder="Search city"
            onChangeText={(text) => Setlocation(text)}
            />
          </Item>

          <Badge
            style={{
              backgroundColor: "lightskyblue",
              marginLeft: Dimensions.get("screen").width / 2 - 30,
              height:40
            //   marginRight: Dimensions.get("screen").width / 2,
            }}
          >
            <TouchableOpacity
            onPress={() => btnClick()}
            >
            <Text style={{ color: "white",fontSize:24 }}>Search</Text>
            </TouchableOpacity>
          </Badge>

        </SafeAreaView>
      </>
    );
}