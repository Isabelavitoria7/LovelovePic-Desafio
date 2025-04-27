'use client';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react';
import { httpLinkRequest } from '@/costants/httpRequest';

//Os next espera page.tsx completas como rotas mesmo sem depender de props, por isso separei em um componente separado

export interface ModalInformationProps {
    onClose: () => void; 
    showOnlyImageUpload?: boolean; //vai aparecer somente o campo de colocar mais fotos quando já tiver dados dos casal cadastrado
}


export default function ModalInformation({
    onClose,
    showOnlyImageUpload,
  }: ModalInformationProps) {


    //para exibir as imagens selecionadas
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const filesArray = Array.from(event.target.files);
        setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
      }

    };

    const [userId, setUserId] = useState("");
    const [formData, setFormData] = useState({
            nameCasal: '',
            tempo: '',
            text: ''
        });
    
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
    
            // Formatação para o campo "tempo" (data)
            if (name === 'tempo') {
                // Remove caracteres não numéricos
                let formattedValue = value.replace(/\D/g, '');
    
                // Adiciona as barras (/) automaticamente
                if (formattedValue.length > 2 && formattedValue.length <= 4) {
                    formattedValue = formattedValue.replace(/(\d{2})(\d+)/, '$1/$2');
                } else if (formattedValue.length > 4) {
                    formattedValue = formattedValue.replace(/(\d{2})(\d{2})(\d+)/, '$1/$2/$3');
                }
    
                // Atualiza o estado com o valor formatado
                setFormData({ ...formData, [name]: formattedValue });
            } else {
                // Atualiza o estado para outros campos normalmente
                setFormData({ ...formData, [name]: value });
            }
        };


         useEffect(() =>{
                const storedUser = localStorage.getItem("user");
                if(storedUser){
                    const parsedUser = JSON.parse(storedUser); //no localStorage guardam strings então converto para objetos
                    setUserId(parsedUser.id || "");
                }
            }, [])


            const handleSubmit = async (e: React.FormEvent) => {
                e.preventDefault();
                if (isLoading) return; // Evita duplos cliques
              
                setIsLoading(true);
              
                try {
                  // Prepara o formDataImg
                  const fileInput = document.querySelector<HTMLInputElement>('input[name="arquivo"]');
                  if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
                    alert("Selecione uma imagem");
                    return;
                  }
              
                  const formDataImg = new FormData();
                  formDataImg.append("user_id", userId);
                  Array.from(fileInput.files).forEach((file) => {
                    formDataImg.append(`images[]`, file);
                  });
              
                  // Função para converter a data
                  function convertToISODate(dateStr: string): string {
                    const [day, month, year] = dateStr.split('/');
                    if (!day || !month || !year) return "";
                    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                  }
              
                  const requestData = {
                    user_id: userId,
                    nameCasal: formData.nameCasal,
                    tempo: convertToISODate(formData.tempo),
                    text: formData.text
                  };
              
                  // Primeiro request: PUT das informações do casal
                  const response1 = await fetch(`${httpLinkRequest}/api/dataRelationship`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json"
                    },
                    body: JSON.stringify(requestData)
                  });
              
                  // Segundo request: POST das imagens
                  const response2 = await fetch(`${httpLinkRequest}/api/upload-image`, {
                    method: "POST",
                    headers: {
                      "Accept": "application/json"
                    },
                    body: formDataImg
                  });
              
                  // Se os dois forem OK
                  if (response1.ok && response2.ok) {
                    // Atualiza o localStorage
                    const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : {};
                    storedUser.nameCasal = requestData.nameCasal;
                    localStorage.setItem("user", JSON.stringify(storedUser));
              
                    // Fecha o modal (caso exista) e redireciona
                    onClose && onClose();
              
                    setTimeout(() => {
                      window.location.href = '/home'; // Volta pra Home
                    }, 500);
              
                  } else {
                    // Trata erro
                    const responseData = await response2.json();
                    if (!responseData.ok) {
                      alert(responseData.message);
                    } else {
                      alert("Erro ao salvar as informações do casal!");
                    }
              
                    onClose && onClose();
                    setTimeout(() => {
                      window.location.href = '/home';
                    }, 500);
                  }
              
                } catch (error) {
                  console.error(error);
                  alert("Erro ao conectar com o servidor");
                } finally {
                  setIsLoading(false);
                }
              };
              

        const handleSubmitOnlyImg = async (e: React.FormEvent) => {
            setIsLoading(true);
            e.preventDefault();
            if(isLoading){
                return; //evita duplos cliques
            }
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000); // Simula um carregamento de 2 segundos

            //para lidar com imagens
            const fileInput = document.querySelector<HTMLInputElement>('input[name = "arquivo"]');

            if(!fileInput || !fileInput.files || fileInput.files.length === 0){
                alert ("Selecione apenas uma imagem");
                return;
            }

            //crio um formData

            const formDataImg = new FormData();
            formDataImg.append("user_id", userId); 

            //Array.from transforma objeto em array
            Array.from(fileInput.files).forEach((file) => {
                formDataImg.append(`images[]`, file);
            })


            try{
                const response2 = await fetch(`${httpLinkRequest}/api/upload-image`, {
                    method: "POST",
                    body: formDataImg
                })

                if(!response2.ok){
                    alert("Erro ao enviar as imagens");
                    return;
                }

                alert("Imagens enviadas com sucesso!");


                // Fecha o modal
                onClose();
                

                // Atualiza a página
                setTimeout(() => {
                    window.location.reload();
                }, 500); // Pequeno delay para garantir que o modal fechou antes do reload
                
            }catch(error){
                console.error("Erro:", error);
                alert("Erro ao conectar com o servidor");
            }finally{
                setIsLoading(false);
            }    
            }


  return (
    <>
    <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>{showOnlyImageUpload ? "Mais fotos para uma montagem completa!" : "Digite as informações sobre vocês!"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form method="POST" encType='multipart/form-data' onSubmit={handleSubmit} className='d-flex flex-column gap-4'>
            {!showOnlyImageUpload && (
                        <>
                            <input
                                type="text"
                                name="nameCasal"
                                placeholder="Nome do Casal:"
                                autoComplete="off"
                                onChange={handleChange}
                                value={formData.nameCasal}
                                className="form-control"
                            />
                            <input
                                type="text"
                                name="tempo"
                                placeholder="Data início do relacionamento (DD/MM/AAAA):"
                                autoComplete="off"
                                onChange={handleChange}
                                value={formData.tempo}
                                maxLength={10}
                                className="form-control"
                            />
                            <input 
                                type="text"
                                name='text'
                                placeholder='Texto a ser enviado:' 
                                autoComplete="off"
                                onChange={handleChange}
                                value={formData.text}
                                maxLength={104}
                                className="form-control"
                            />
                        </>
                    )}

                <h2>Adicione fotos de vocês</h2>
                <label htmlFor="arquivo" className="flex items-center border-dashed gap-2 border-1 p-2 rounded cursor-pointer hover:bg-blue-200 w-40">
                    <img src="/camera.png" alt="image-camera" className='w-10 md:w-15 items-center'/>
                    <p className='mt-1'>Selecionar Imagens</p>
                </label>            
                <input type="file" id='arquivo' name='arquivo' multiple onChange={handleImageChange} className='hidden'/>

                <div className="flex flex-wrap gap-2 mt-4">
                    {selectedImages.map((image, index) => (
                    <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`preview-${index}`}
                        className="h-20 w-20 object-cover rounded-md shadow-md"
                    />
                    ))}
                </div>
                
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
                Fechar
            </Button>
            {isLoading ? (
                <Button style={{backgroundColor: '#D20505'}} disabled={isLoading}>
                        <div className="w-4 h-4 border-4 border-t-4 border-gray-300 rounded-full animate-spin border-t-green-500"></div>
                </Button>
                    ) : (
                        <Button style={{backgroundColor: '#D20505'}} onClick={!showOnlyImageUpload ? handleSubmit : handleSubmitOnlyImg} disabled={isLoading}>
                            Salvar
                        </Button>
                    )   
            }
            
        </Modal.Footer>
    </Modal>
</>
  );
}