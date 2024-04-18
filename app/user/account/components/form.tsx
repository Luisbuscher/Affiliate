"use client";

import { useEffect, useState } from "react";

export default function FormAccount({ userData }) {

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    cnpj: ""
  });

  const [notification, setNotification] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/user/account/model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        // Exibe uma mensagem de sucesso para o usuário
        console.log("Resposta do servidor:", data.message);

        setNotification({ type: "success", message: data.message });

        // Limpa os campos do formulário
        setFormData({
          nome: "",
          cpf: "",
          cnpj: ""
        });

      } else {
        setNotification({ type: "error", message: data.message });
        // Limpa os campos do formulário
        setFormData({
          nome: "",
          cpf: "",
          cnpj: ""
        });
      }
    } catch (error) {
      console.error("Erro ao enviar solicitação de saque:", error);
      setNotification({ type: "error", message: "Erro ao enviar solicitação de saque" });
      // Limpa os campos do formulário
      setFormData({
        nome: "",
        cpf: "",
        cnpj: ""
      });
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-8 col-xl-7">
            <div className="card bg-light mb-3">
              <div className="card-body">
                <h1 style={{ color: "black" }}>Preencha teus dados fiscais</h1>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <input
                        className="form-control mb-3"
                        type="text"
                        placeholder={userData.name}
                        value={formData.nome}
                        onChange={handleChange}
                        name="nome"
                        aria-label="100"
                        required
                      />
                    </div>
                    <div className="col-6">
                      <input
                        className="form-control mb-3"
                        type="text"
                        placeholder={userData.cpf}
                        value={formData.cpf}
                        onChange={handleChange}
                        name="cpf"
                        aria-label="50"
                        required
                      />
                    </div>
                    <div className="col-6">
                      <input
                        className="form-control mb-3"
                        type="text"
                        placeholder={userData.cnpj}
                        value={formData.cnpj}
                        onChange={handleChange}
                        name="cnpj"
                        aria-label="25"
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="submit"
                        value="Salvar dados"
                        className="btn btn-primary" />
                    </div>
                  </div>
                </form>
                {notification && (
                  <div className={`alert alert-${notification.type}`} role="alert">
                    {notification.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}