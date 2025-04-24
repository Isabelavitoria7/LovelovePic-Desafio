'use client';
import {useState} from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { httpLinkRequest } from '@/costants/httpRequest';

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter(); // se registro der certo, redireciona para login
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
       setIsLoading(true);
        e.preventDefault();
        if(isLoading){
          return; //evita duplos cliques ao enviar
      }
      setIsLoading(true);
      setTimeout(() => {
          setIsLoading(false);
      }, 2000); // Simula um carregamento de 2 segundos


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
                router.push("/login");
            } else {
                alert(data.message || "Erro ao registrar");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao conectar com o servidor.");
        }finally{
            setIsLoading(false);
        }
    };

    return (
        <main
        className="flex flex-col items-center justify-center h-screen w-full p-4 bg-cover bg-center text-black"
        style={{ backgroundImage: "url('/bg-login-register.svg')" }}
      >
        <div className="flex flex-col items-center justify-center p-9 md:p-10 bg-white rounded w-[90%] md:w-[40%]">
          <img src="/LovelovePic.png" alt="logo" className="w-60 h-15" />
          <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center p-4 gap-3 w-full">
            <h1 className="text-1xl font-bold mt-4 w-full text-left">Criar Conta</h1>
      
            <label htmlFor="name"></label>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              className="p-3 bg-gray-100 rounded w-full"
              onChange={handleChange}
            />
      
            <label htmlFor="email"></label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-3 bg-gray-100 rounded w-full"
              onChange={handleChange}
            />
      
            <label htmlFor="password"></label>
            <input
              type="password"
              name="password"
              placeholder="Senha"
              className="p-3 bg-gray-100 rounded w-full"
              onChange={handleChange}
            />
      
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              placeholder="Confirmar Senha"
              className="p-3 bg-gray-100 rounded w-full"
              onChange={handleChange}
              required
            />
      
      {isLoading ? (
              <button className="bg-[#D20505] rounded-md px-21 py-2 mt-3 items-center text-white cursor-pointer active:bg-[#000000]">
                  <div className="w-4 h-4 border-4 border-t-4 border-gray-300 rounded-full animate-spin border-t-green-500"></div>
              </button>         
                ) : (
                  <button
                    type="submit"
                    className="bg-[#D20505] rounded-md px-21 py-2 mt-3 items-center text-white cursor-pointer active:bg-[#000000]"
                    disabled={isLoading}
                    >
                      Cadastrar
                    </button>
                      )
                    }
            <p className="text-sm md:text-md mt-2">
              Já tem uma conta?{" "}
              <Link className="text-blue-700 cursor-pointer" href="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </main>      
      
    );
  }