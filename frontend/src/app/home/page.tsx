'use client';
import { useEffect, useState } from "react";
import ModalInformation from '../../components/ModalInformation';
import { httpLinkRequest } from "@/costants/httpRequest";

export default function Home(){
    const [userName, setUserName] = useState("");
    const [nameCasal, setNameCasal] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showModalOnlyImage, setShowModalOnlyImage] = useState(false);
    const [images, setImages] = useState([]);


    const [isLoading, setIsLoading] = useState(false);

    const handleShowModal = () => {
        if(isLoading){
            return; //evita duplos cliques
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Simula um carregamento de 2 segundos
        setShowModal(prev => !prev);
    };


    useEffect(() =>{
        const storedUser = localStorage.getItem("user");
        if(storedUser){
            const parsedUser = JSON.parse(storedUser); //no localStorage guardam strings então converto para objetos
            setUserName(parsedUser.name || "");
            setNameCasal(parsedUser.nameCasal ?? "");
        }
    }, [])

    useEffect(() => {
        if(nameCasal && nameCasal !== "null"){
            setShowModalOnlyImage(true);
        }
    }, [nameCasal]);


    const exibImages = async () => {
        let userId = "";
        try {
            const storedUser = localStorage.getItem("user");
            if(storedUser){
                const parsedUser = JSON.parse(storedUser);
                userId = parsedUser.id;
            }
            
            const response = await fetch(`${httpLinkRequest}/api/user-images/${userId}`, {
                method: "GET",
                headers: {
                    "ngrok-skip-browser-warning": "false",
                    "Accept": "application/json"
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar imagens");
            }

            const data = await response.json();
            console.log("data", response);
            setImages(data); // Salva as imagens no estado
            console.log(data);
        } catch (error) {
            console.error("Erro ao carregar imagens:", error);
        }
    };

    useEffect(() => {
        if (nameCasal) {
            exibImages();
        }
    }, [nameCasal]); // Chama a função ao carregar o componente



    return(
        <main>
            <div className='flex flex-col items-center justify-center h-screen w-full p-4 bg-gray-200 text-black'>
                <h1 className='text-2xl text-bold mb-4'>Olá, {userName}</h1>
                {userName && !nameCasal ? (
                    <div className='flex flex-col items-center justify-center gap-4'>
                        <h2 className='text-center'>Você ainda não tem um relacionamento cadastrado!</h2>
                    <button
                        className='bg-[#D20505] !rounded-md px-6 py-2 items-center text-white cursor-pointer active:bg-[#000000]'
                        onClick={handleShowModal}
                        disabled={isLoading}
                    >Cadastar novo relacionamento
                    </button>
                    </div>
                    
                ): (
                    <div className='flex flex-col items-center'>
                        {/* vou pegar as imagens do db colocar em um array e reenderizar aqui  */}
                        <h2 className='text-center'>Veja suas fotos já cadastradas!</h2>

                        <div className='grid grid-cols-3 gap-4 mt-4'>
                        {images.length > 0 ? (
                            images.map((img, index) => (
                                <img
                                    key={index}
                                    src={`${httpLinkRequest}/${img}?ngrok-skip-browser-warning=1`} //imagens estao em um array
                                    alt={`Imagem ${index}`}
                                    className="h-32 w-32 object-cover rounded-md shadow-md"

                                />
                            ))
                              
                        ) :  
                            <div className=" flex items-center justify-center col-start-2">
                                <div className="w-10 h-10 border-4 border-t-4 border-gray-300 rounded-full animate-spin border-t-green-500"></div>
                            </div>     
                        }
                    </div>
                    <div className='flex items-center'>
                        <button 
                            onClick={handleShowModal}
                            className='bg-[#D20505] rounded p-2 text-white cursor-pointer mt-5 active:bg-[#000000]'
                            disabled={isLoading}
                            >
                                Adicionar mais fotos
                        </button>
                        </div>
                    </div>
                )}
                
            </div>
            

            {showModal && (
                <ModalInformation
                    onClose={handleShowModal}
                    showOnlyImageUpload={showModalOnlyImage}
                />
            )}
        </main>
    )
}
