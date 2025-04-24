'use client';
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { httpLinkRequest } from "@/costants/httpRequest";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const router = useRouter();

    console.log(formData)
    const handleSubmit = async (e: React.FormEvent) => {
        setIsLoading(true);
        setIsLoading(true);
        e.preventDefault();
        if(isLoading){
            return; //evita duplos cliques
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Simula um carregamento de 2 segundos

        try {
            const response = await fetch(`${httpLinkRequest}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log(data, "data")

            if (response.ok) {
                alert("Login bem-sucedido!");
                const {user} = data;      
                console.log(user)

                // Armazena o objeto no localStorage
                localStorage.setItem("user", JSON.stringify({ name: user.name, nameCasal: user.nameCasal, id: user.id }));
                

                router.push("/home");
            } else {
                alert(data.message || "Erro ao logar"); 
            }
        } catch (error) {
            console.log(error);
            alert("Erro ao conectar com o servidor."); 
        }finally{
            setIsLoading(false);
        }
    };

return (
    <main className="flex flex-col items-center justify-center h-screen w-full p-4 bg-cover bg-center text-black"
        style = {{backgroundImage: "url('/bg-login-register.svg')"}}
    >
        <div className="flex flex-col items-center justify-center p-9 md:p-10 bg-white rounded w-[90%] md:w-[40%]">
            <img src="/LovelovePic.png" alt="logo" className="w-60 h-15"/>
            <form
                className="flex flex-col items-center p-4 justify-center gap-3"
                onSubmit={handleSubmit}
            >
                <h1 className="text-1xl font-bold mt-4 w-full text-left">Realizar Login</h1>
                <label htmlFor="email"></label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="p-3 bg-gray-100 rounded"
                    onChange={handleChange}
                />
                <label htmlFor="password"></label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="p-3 bg-gray-100 rounded"
                    onChange={handleChange}
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
                                Login
                            </button>
                        )
                    }
                
                <p className="text-sm md:text-md mt-2">
                    Não tem uma conta?{" "}
                    <Link className="text-blue-700 cursor-pointer" href="/register">
                        Cadastre-se
                    </Link>
                </p>
            </form>
        </div>
    </main>
);
}
