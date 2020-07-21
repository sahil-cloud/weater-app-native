import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView,FlatList, ScrollView, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Title, Image, Thumbnail ,Card,CardItem} from "native-base";
import AsyncStorage from '@react-native-community/async-storage';

export default function Home({route}) {

    const {location} = route.params;

  const [data,Setdata] = useState({
    name:"",
    temp: "",
    humid: "",
    icon: "https://images.unsplash.com/photo-1569428034239-f9565e32e224?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    des:"",
    wind:"",
    time:""
  })
  useEffect(() => {
    let city;
    AsyncStorage.getItem("newCity").then((res) => {
      console.log(res);
      city = res;
    });
      if (!city) {
        city = "indore";
      }
    fetch(
      `http://api.weatherstack.com/current?access_key=&query=${city}`
    )
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        Setdata({
          name: result.request.query,
          temp: result.current.temperature,
          humid: result.current.humidity,
          icon: result.current.weather_icons[0],
          des: result.current.weather_descriptions[0],
          wind: result.current.wind_speed,
          time: result.location.localtime,
        });
      })
      .catch((err) => {
        // console.log(err);
        Alert.alert("Some error occured");
      });
  }, [])

    const fetchWeather = () =>{
      // console.log("yugyusgty");

        fetch(
          `http://api.weatherstack.com/current?access_key=0&query=${location}`
        )
          .then((res) => res.json())
          .then((result) => {
            // console.log(result);
            Setdata({
              name: result.request.query,
              temp: result.current.temperature,
              humid: result.current.humidity,
              icon: result.current.weather_icons[0],
              des: result.current.weather_descriptions[0],
              wind: result.current.wind_speed,
              time: result.location.localtime,
            })

          })
          .catch((err) => {
            // console.log(err);
            Alert.alert('Some error occured');
          });

        }
        
        if(route.params.location != 'indore'){
          fetchWeather()
        }

    return (
      <>
        <SafeAreaView >
          <Header style={{backgroundColor:"lightskyblue"}}>
            <Left />
            <Body>
              <Title style={{color:"white",fontSize:24}}>weather</Title>
            </Body>
            <Right />
          </Header>
          <View>
          <Text style={{marginTop:10,fontSize:20,fontWeight:"bold",marginLeft:100}}> {data.name} </Text>
          <Thumbnail 
          style={{width:140,height:140,marginLeft:90,marginTop:15}}
          source={{
            uri:`${data.icon}`
          }}
          />
          </View>
          <View style={[styles.listContainer, { backgroundColor: "lightskyblue" }]}>
              <Text style={styles.listtitle} numberOfLines={1}>Tempreture -  {data.temp}</Text>

            <View>
              <View >
                  <Text style={styles.count}>Humidity - {data.humid}</Text>
                  <Text style={styles.count}>Forecast - {data.des}</Text>
              </View>
              <View >
                  <Text style={styles.count}> Wind Speed - {data.wind}</Text>
                  <Text style={styles.count}>Localtime - {data.time}</Text>
              </View>
            </View>

          </View>
        </SafeAreaView>
      </>
    );
}



const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    borderRadius: 8,
    width: 350,
    margin:10,
    marginTop:30
  },
  listtitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 18
  },
  count: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    margin: 10
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  }

})
