import React, {useState} from 'react';
import {StyleSheet, TextInput, Text, View, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { httpLinkRequest } from '@/constants/httpRequest';

const Information = ({navigation}: {navigation: any}) => {
  const [userId, setUserId] = React.useState("");
  const [nameCasal, setNameCasal] = React.useState("");
  const [images, setImages] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  //crio um formData
  const formDataImg = new FormData();
  formDataImg.append("user_id", userId); 

  images.forEach((image, index) => {
    const file = {
      uri: image.uri,
      name: image.fileName,
      type: image.mimeType
    }
    formDataImg.append(`images[]`, file as any);
  });

  
  const [formData, setFormData] = React.useState({
        user_id: '',
        nameCasal: '',
        tempo: '',
        text: ''
  });


  const getData = async () => {
    try {
      const storageUser = await AsyncStorage.getItem("user");
      const parsedUser = storageUser ? JSON.parse(storageUser) : null;
      if(parsedUser){
        setUserId(parsedUser.id || "");
        setNameCasal(parsedUser.nameCasal || "null");
      }

      setFormData({...formData, user_id: parsedUser.id})
    } catch (e) {
      console.log(e);
    }
  };

  // Executa quando o componente é montado para pegar user_id atual
  React.useEffect(() => {
    getData();
  }, [])

  const onChangeNameCasal = (nameCasal: string) => {
    setFormData({...formData, nameCasal:nameCasal})
  }

  const onChangeTempo = (tempo: string) => {
    // Remove caracteres não numéricos
    let formattedValue = tempo.replace(/\D/g, '');

    // Adiciona as barras (/) automaticamente
    if (formattedValue.length > 2 && formattedValue.length <= 4) {
      formattedValue = formattedValue.replace(/(\d{2})(\d+)/, '$1/$2');

    } else if (formattedValue.length > 4) {
      formattedValue = formattedValue.replace(/(\d{2})(\d{2})(\d+)/, '$1/$2/$3');
    }
    setFormData({...formData, tempo:formattedValue})
  }

  const onChangeText = (text: string) => {
    setFormData({...formData, text:text})
  }

  function convertToISODate(dateStr: string): string {
    const [day, month, year] = dateStr.split('/');
    if (!day || !month || !year) return ""; // tratamento de erro básico
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}  // converte para 'YYYY-MM-DD' que é o aceito no mysql


//função para pegar imagem
  const ImagePickerFunction = () =>{
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImages(prevState => [...prevState, ...result.assets]);
      }
    
    };
    pickImage();
  }

 
  
  const handleSubmit = async () => {
    setIsLoading(true);
    console.log(isLoading, 'isLoading');

    try {
      const requestData = {
        user_id: userId,
        nameCasal: formData.nameCasal,
        tempo: convertToISODate(formData.tempo),
        text: formData.text
      }

        const response1 = await fetch(`${httpLinkRequest}/api/dataRelationship`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(requestData),
        })

        const response2 = await fetch(`${httpLinkRequest}/api/upload-image`, {
            method: "POST",
            headers: {
              "Accept": "application/json"
          },
            body: formDataImg
        })


        if(response1.ok && response2.ok){
          // Armazena nameCasal no localStorage salva as informações do casal 
          const storeData = async (nameCasal: any) => {
            const storageUser = await AsyncStorage.getItem("user");
            const parsedUser = storageUser ? JSON.parse(storageUser) : null;
            try {
              await AsyncStorage.setItem("user", JSON.stringify({...parsedUser, nameCasal: nameCasal }));
            } catch (e) {
              console.log(e);
            }
          };
          storeData(formData.nameCasal); // salva o formaData pq o que o usuario digita esta sendo guardado em formData e não diretamente no nameCasal

          //manda para home     
          setTimeout(() => {
            navigation.navigate('Home');
          }, 500); // Pequeno delay para garantir que o modal fechou antes do reload

        }else{
          const responseData = await response2.json();
          if(!responseData.ok){
            alert(responseData.message);
          }else{
            alert("Erro ao salvar as informações do casal!");
          }
          setTimeout(() => {
            navigation.navigate('Home');
          }, 500); // Pequeno delay para garantir que o modal fechou antes do reload
          return;
        }
     
    }catch(error){
        console.log(error);
    }finally{
      setIsLoading(false);
    }
  }

  const handleSubmitOnlyImage = async () => {
    setIsLoading(true);
    try {
        const response2 = await fetch(`${httpLinkRequest}/api/upload-image`, {
          method: "POST",
          headers: {
            "Accept": "application/json"
          },
          body: formDataImg
      })

      if(!response2.ok){
          const responseData = await response2.json();
          alert(responseData.message);
          navigation.navigate('Home');
          return;
      }
      alert("Imagens enviadas com sucesso!");  
      // Atualiza a página
      setTimeout(() => {
        navigation.navigate('Home');
      }, 500); 
    }catch(error){
      console.log(error);
    }finally{
      setIsLoading(false);
      console.log(isLoading, 'isLoading');
    }
  }

  return(

    <View style={{flex: 1, backgroundColor:"#FFFFFF", alignItems: 'center', justifyContent: 'center'}}>
    {nameCasal && nameCasal === "null" ? (
      <View style={{flex: 1, backgroundColor:"#FFFFFF", alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cadastrar informações do relacionamento</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNameCasal}
            value={formData.nameCasal}
            placeholder="Nome do Casal"
            placeholderTextColor={"#888"}
            keyboardType="email-address"
          />

  <       TextInput
            style={styles.input}
            onChangeText={onChangeTempo}
            value={formData.tempo}
            placeholder="Data Inicio do relacionamento: (dd/mm/aaaa)"
            placeholderTextColor={"#888"}
            keyboardType="default"
          />

  <        TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={formData.text}
            placeholder="Texto para imagem:"
            placeholderTextColor={"#888"}
            keyboardType="default"
          />

          <View style={{marginLeft: 15, marginTop: 10}}>
            <Text>Selecione imagens do casal:</Text>
            <TouchableOpacity
              onPress = {ImagePickerFunction}
            >
                <Image
                source={require('../assets/images/camera.png')}
                style={styles.border}
              ></Image>
            </TouchableOpacity>

            <View style={styles.containerImages}>
              {images && images.map((image: any, index) => (
                <Image key={index} source={{ uri: image.uri }} style={styles.image} />
              ))}
            </View>
          </View>
          
        </SafeAreaView>

        <TouchableOpacity
        onPress={handleSubmit}
        accessibilityLabel="Button submit"
          style={styles.button}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={{color: '#FFFFFF'}}>Salvar informações</Text>
        )}
      </TouchableOpacity>

      </View>
    ) : 
      <View style={{flex: 1, backgroundColor:"#FFFFFF", alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Adicione mais fotos de vocês!</Text>
        <SafeAreaView>
          <View style={{marginTop: 10, alignItems: 'flex-start'}}>
            <Text>Selecione imagens do casal:</Text>
            <TouchableOpacity
              onPress = {ImagePickerFunction}
            >
              <Image
                source={require('../assets/images/camera.png')}
                style={styles.border}
              ></Image>
            </TouchableOpacity>

            <View style={styles.containerImages}>
              {images && images.map((image: any, index) => (
                <Image key={index} source={{ uri: image.uri }} style={styles.image} />
              ))}
            </View>
          </View>       
        </SafeAreaView>
        <TouchableOpacity
          onPress={handleSubmitOnlyImage}
          accessibilityLabel="Button submit"
            style={styles.button}
        >
          {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={{color: '#FFFFFF'}}>Salvar Imagens</Text>
        )}
      </TouchableOpacity>
      </View>
    }       

    </View>
  )
  
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    width: 300,
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
  },
  containerImages: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:5,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  image: {
    marginTop:10,
    width: 90,
    height: 80,
  },
  border:{
    width: 80, 
    height: 70, 
    marginTop: 10, 
    padding: 4, 
    borderWidth: 1, 
    borderColor: "#000000",
    borderStyle: "dashed"
  }
});

export default Information;