import React from 'react';
import {StyleSheet, TextInput, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { httpLinkRequest } from '@/constants/httpRequest';

const LoginInput = ({navigation}: {navigation: any}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
});


const onChangeEmail = (email:string) =>{
  setFormData({...formData, email: email});
}

const onChangePassword = (password:string) =>{
  setFormData({...formData, password: password});
}

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log(formData)
    try {

        const response = await fetch(`${httpLinkRequest}/api/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData),
        })

        const data = await response.json();


        if(response.ok){
            const {user} = data; 

            // Armazena o objeto no localStorage
              const storeData = async (user: any) => {
                try {
                  await AsyncStorage.setItem("user", JSON.stringify({ name: user.name, nameCasal: user.nameCasal, id: user.id }));;
                } catch (e) {
                  console.log(e);
                }
              };
              storeData(user);

              //response ok vai para home
              navigation.navigate('Home');
          }else{
            alert('Login ou senha incorretos');
          }
    }catch(error){
        console.log(error);
    }finally{
        setIsLoading(false);
    }
  }

  return (
    <View style={{flex:1,  backgroundColor: "#FFFFFF", justifyContent: 'center', alignItems: 'center', backgroundImage:'url(../assets/images/bg-login-register.svg)'}}>
        <Image style = {{width: 200, height: 70, alignItems: 'center', marginBottom:30}}
        source={require('../assets/images/LovelovePic.png')}
      />
        
    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Fazer Login</Text>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={formData.email}
          placeholder="email"
          placeholderTextColor={"#888"}
          keyboardType="email-address"
        />

<       TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={onChangePassword}
          value={formData.password}
          placeholder="Senha"
          placeholderTextColor={"#888"}
          keyboardType="default"
        />

        <Text style={{marginTop: 10}}>Ainda não tem uma conta?
          <Text 
            style={{color:"#841584", textDecorationColor:'underline'}}
            onPress={() => navigation.navigate('Register')}
          > Cadastre-se</Text>    
        </Text>
      </SafeAreaView>

      <TouchableOpacity
        onPress={handleSubmit}
        accessibilityLabel="Button submit"
        style={styles.button}
      >
        {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={{color: '#FFFFFF'}}>Login</Text>
              )}
      </TouchableOpacity>

      <Text style={{marginTop:30}}>________Ou conecte-se com________</Text>

      <View style={{marginTop: 20, flexDirection: 'row', gap: 20}}>
        <TouchableOpacity style={{marginTop: 20, width: 80, height: 45, backgroundColor: '#3A5CA5', borderRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          <Image source={require('../assets/images/facebook.png')}/>
          <Text style={{color: '#FFFFFF'}}></Text>

        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: 20, width: 80, height: 45, backgroundColor: '#f8f8f8', borderRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          <Image source={require('../assets/images/google.png')} style={{width: 20, height:20}}/>
          <Text style={{color: '#FFFFFF'}}></Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
  button: {
    backgroundColor: '#D20505',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: 250,
    alignItems: 'center',
  }
});


export default LoginInput;