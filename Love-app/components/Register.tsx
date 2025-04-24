import React from 'react';
import {StyleSheet, TextInput, View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { httpLinkRequest } from '@/constants/httpRequest';


const RegisterInput = ({navigation}: {navigation: any}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

const onChangeName = (name:string) =>{
  setFormData({...formData, name: name});
}
const onChangeEmail = (email:string) =>{
  setFormData({...formData, email: email});
}
const onChangePassword = (password:string) =>{
  setFormData({...formData, password: password});
}
const onChangePasswordConfimation = (password_confirmation:string) =>{
  setFormData({...formData, password_confirmation: password_confirmation});
}

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${httpLinkRequest}/api/register`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify(formData)
      });


      const data = await response.json();
      if (response.ok) {
          alert("Registro bem-sucedido!");
          navigation.navigate('Login')
      } else {
          alert(data.message || "Erro ao registrar");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor.");
    }finally{
      setIsLoading(false);
    }
  }


  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center'}}>
        <Image style = {{width: 200, height: 70, alignItems: 'center', marginBottom:30}}
        source={require('../assets/images/LovelovePic.png')}
      />
        
    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Criar registro</Text>
      <SafeAreaView>
      <TextInput 
          style={styles.input}
          onChangeText={onChangeName}
          value={formData.name}
          placeholder="Nome"
          placeholderTextColor={"#888"}
          keyboardType="default"
        />

        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={formData.email}
          placeholder="email"
          placeholderTextColor={"#888"}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={formData.password}
          placeholder="Senha"
          secureTextEntry={true}
          placeholderTextColor={"#888"}
          keyboardType="default"
        />

        <TextInput
          style={styles.input}
          onChangeText={onChangePasswordConfimation}
          value={formData.password_confirmation}
          secureTextEntry={true}
          placeholder="Confirme sua senha"
          placeholderTextColor={"#888"}
          keyboardType="default"
        />

        <Text style={{marginTop: 10}}>Ainda não tem uma conta? 
          <Text 
          style={{color:"#841584"}}
          onPress={()=> navigation.navigate('Login')}
          >     Fazer login
          </Text>
        
        </Text>
      </SafeAreaView>

      <TouchableOpacity
        onPress={handleSubmit}     
        style={styles.button}
        accessibilityLabel="Button submit"
      >
        {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={{color: '#FFFFFF'}}>Cadastre-se</Text>
            )}
      </TouchableOpacity>   
        
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: 250,
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


export default RegisterInput;