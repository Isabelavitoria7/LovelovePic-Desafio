import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';


const Start = ({navigation} :{navigation:any}) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(252, 200, 234, 0.8)', '#FFFFFF']}
                style={styles.background}
                start={{x: 0.5, y: 1}}
                end={{x: 0.5, y:0.1}}     
            />
            <View  style={{backgroundColor: '#FFFFFF', flex: 1, width: '95%', justifyContent: 'space-around', alignItems: 'center'}}>
                <Image source={require('../assets/images/LovelovePic.png')} style={{width: 200, height: 30, alignItems: 'center', marginTop: 20}}/>
                <Image  source={require('../assets/images/img-start.png')} style={{width: 290, height: 350, alignItems: 'center'}}/>
            </View>

            <View style={{backgroundColor: '#FFFFFF', flex:1, width: '95%', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 40}}>Guarde seus momentos com carinho.</Text>
                <Text style={{fontSize:18,  textAlign: 'center', marginTop: 30}}>Cadastre fotos especiais e surpreenda quem você ama no aniversário de vocês.</Text>
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>Começar</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default Start;

const styles = StyleSheet.create({
    container : {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    button: {
        backgroundColor: '#D20505',
        padding: 20,
        borderRadius: 20,
        marginTop: 60,
        width: 250,
        alignItems: 'center',
      },
      background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 1200,
      },
})

