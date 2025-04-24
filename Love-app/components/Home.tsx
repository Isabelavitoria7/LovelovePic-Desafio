import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { httpLinkRequest } from '@/constants/httpRequest';


const Home = ({navigation}: {navigation: any}) => {
    const [userName, setUserName] = React.useState("");
    const [nameCasal, setNameCasal] = React.useState("");
    const [showModal, setShowModal] = React.useState(false);
    const [images, setImages] = React.useState([]);

    const [isLoading, setIsLoading] = React.useState(false);

    const handleShowModal = () => {
        if(showModal){
            navigation.navigate('Information');
        }

        if(isLoading){
            return; //evita duplos cliques
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Simula um carregamento de 2 segundos
        setShowModal(prev => !prev);
    };


    const getData = async () => {
            try {
              const storageUser = await AsyncStorage.getItem("user");
              const pasedUser = storageUser ? JSON.parse(storageUser) : null;
              if(pasedUser){
                setUserName(pasedUser.name || "");
                setNameCasal(pasedUser.nameCasal ?? "");
              }
            } catch (e) {
              console.log(e);
            }
          };

    // Executa quando o componente é montado
    React.useEffect(() => {
        getData();
    }, [])


    const exibImages = async () => {
        let userId = "";
        try {
            const storedUser = await AsyncStorage.getItem("user");
            if(storedUser){
                const parsedUser = JSON.parse(storedUser);
                userId = parsedUser.id;
            }
            
            const response = await fetch(`${httpLinkRequest}/api/user-images/${userId}`, {
                method: "GET",
                headers: {
                    'Accept': '*/',
                },
              
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar imagens");
            }

            const data = await response.json();
            setImages(data); // Salva as imagens no estado
        } catch (error) {
            console.error("Erro ao carregar imagens:", error);
        }
    };

    React.useEffect(() => {
        if (nameCasal) {
            exibImages();
        }
    }, [nameCasal]); // Chama a função ao carregar o componente

    return (
        <View style={{flex:1 , backgroundColor: "#FFFFFF", justifyContent: 'center', alignItems: 'center'}}>
            {nameCasal && nameCasal !== "null" ? (              
                <View style={styles.container}>
                    <Text style={{fontSize: 20, marginBottom: 10, fontWeight: 'bold'}}>Bem vindo(a) de volta, {userName}</Text>
                    <Text style={{fontSize: 18, marginBottom: 25, textAlign:'center', gap: 4}}>Essas são as memórias que vocês já criaram juntos.</Text>
                        <View style={styles.containerImg}>
                            {images.length > 0 ? (
                            images.map((img, index) => (
                                <Image style={styles.img}
                                    key={index}
                                    src={`${httpLinkRequest}/${img}`} //imagens estao em um array
                                    alt={`Imagem ${index}`}
                                />
                            ))
                        ) : (
                            <Text>Nenhuma imagem encontrada.</Text>
                        )}
                        </View>
                    
                    <TouchableOpacity
                            onPress={handleShowModal}
                            disabled={isLoading}     
                            style={styles.button}
                            accessibilityLabel="Button submit"
                          >
                            <Text style={{color: '#FFFFFF'}}>Cadastrar mais memórias</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={{alignItems: 'center', justifyContent: 'center', width: '90%'}}>
                    <Text style={{fontSize: 20, marginBottom: 10, fontWeight: 'bold'}}>Olá, {userName}!</Text>
                    <Text style={{fontSize: 18, marginBottom: 25, textAlign:'center', gap: 4, fontWeight: 'bold'}}>Ainda não temos registros de vocês por aqui.</Text>
                    <Text style={{fontSize: 18, marginBottom: 25, textAlign:'center', gap: 4}}>Guarde suas informações e memórias para gerar a surpresa na data do aniversário de vocês.</Text>
                    <TouchableOpacity
                            onPress={handleShowModal}
                            disabled={isLoading}     
                            style={styles.button}
                            accessibilityLabel="Button submit"
                          >
                            <Text style={{color: '#FFFFFF'}}>Guardar informações</Text>
                    </TouchableOpacity> 
                </View>
            )
            
            }

        </View>
    )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    marginHorizontal: "auto",
    alignItems: "center",
    justifyContent: "center",
    width: "90%"
  },

containerImg: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 8
},

img: {
    height: 100,
    width: 100,
    objectFit: "cover",
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0,0,0,0,2)"
    
},
button: {
    backgroundColor: '#D20505',
    padding: 10,
    borderRadius: 10,
    marginTop: 25,
    width: 250,
    alignItems: 'center',
  }
});

export default Home;


