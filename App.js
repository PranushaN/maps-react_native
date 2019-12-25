
import * as React from 'react';
import { Text, View, StyleSheet ,Dimensions, Slider} from 'react-native';
import Constants from 'expo-constants';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import { getDistance } from 'geolib';



export default class App extends React.Component {
  
  
state = {
    curLat : 18.52043,
    curLong: 73.856744,
    radius : 5000,
    markers :[{
      latlng:{
        latitude:18.516726,
        longitude:73.856255
      },
      title:'RTO Pune',
      description:'Pune RTO'
    },
    {
      latlng:{
        latitude:18.5204,
        longitude:73.9399
      },
      title:'Amanora',
      description:'Amanora Park Town'
    },
    {
      latlng:{
        latitude:18.4097,
        longitude:73.5066
      },
      title:'Lavasa',
      description:'Lavasa'
    },
    {
      latlng:{
        latitude:18.5758,
        longitude:73.7404
      },
      title:'BlueRidge',
      description:'BlueRidge Hinjewadi'
    },
    {
      latlng:{
        latitude:17.9307,
        longitude:73.6477
      },
      title:'Mahabaleshwar',
      description:'Mahabaleshwar'
    },
    {
      latlng:{
        latitude:18.3292,
        longitude:72.9544
      },
      title:'Murud Beach',
      description:'Murud Beach'
    }
    ]
}

change(radius) {
    this.setState(() => {
      return {
        radius: parseFloat(radius),
        
      };
    });
  }

  getMarkerDist(marker)
  {
    let dist = getDistance({latitude: this.state.curLat, longitude:this.state.curLong},marker.latlng) ; 
    return dist;
  }
  
  render() {
    const markers = this.state.markers;
    const dest = this.getMarkerDist(markers[5]);
    
    const results = markers.filter( marker => this.getMarkerDist(marker) < this.state.radius);
    

    return (
    <View>
        <MapView style={styles.mapStyle} initialRegion={{
      latitude: this.state.curLat,
      longitude: this.state.curLong,
      latitudeDelta: 2,
      longitudeDelta: 2,
    }} >


    {results.map(marker => (
    <Marker
      coordinate={marker.latlng}
      title={marker.title}
      
      image={'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/64/Map-Marker-Ball-Chartreuse-icon.png'}
    />
  ))}


    <Marker
      coordinate={{
     latitude: this.state.curLat,
     longitude: this.state.curLong
   }}
    />
        <MapView.Circle
                key = { (this.state.curLat + this.state.curLong).toString() }
                center = { {
                  latitude: this.state.curLat,
                  longitude: this.state.curLong
                } }
                radius = { this.state.radius }
                strokeWidth = { 1 }
                strokeColor = { '#1a66ff' }
                fillColor = { 'rgba(230,238,255,0.5)' }
                
        />

        <Slider style={styles.sliderStyle}
          step={10}
          minimumValue={5000}
          maximumValue={100000}
          onValueChange={this.change.bind(this)}
          value={this.state.radius}
        />
        <Text style={styles.textStyle}>{Number(this.state.radius/1000)} KM</Text>
      


        </MapView>

        
                
    </View>
    )
       
    
  }
}


const styles = StyleSheet.create({
 
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  sliderStyle:{
    marginTop:Dimensions.get('window').height -100,
    width:Dimensions.get('window').width - 50,
    marginLeft: Dimensions.get('window').width - 350
  },
  textStyle:{
     textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 0,

  }
});

