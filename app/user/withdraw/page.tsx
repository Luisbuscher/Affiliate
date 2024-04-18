"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Withdraw() {
  const [formData, setFormData] = useState({
    pixKey: "",
    value: "",
    name: ""
  });

  const [notification, setNotification] = useState(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/user/withdraw/model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        const data = await response.json();
        // Exibe uma mensagem de sucesso para o usuário
        console.log("Resposta do servidor:", data.message);

        setNotification({ type: "success", message: data.message });

        // Limpa os campos do formulário
        setFormData({
          pixKey: "",
          value: "",
          name: ""
        });

      } else {
        setNotification({ type: "error", message: data.message });
        // Limpa os campos do formulário
        setFormData({
          pixKey: "",
          value: "",
          name: ""
        });
      }
    } catch (error) {
      console.error("Erro ao enviar solicitação de saque:", error);
      setNotification({ type: "error", message: "Erro ao enviar solicitação de saque" });
      // Limpa os campos do formulário
      setFormData({
        pixKey: "",
        value: "",
        name: ""
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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-8 col-xl-7">
          <h1 style={{ color: "black" }}>Solicite teu saque abaixo</h1>
          <form onSubmit={handleSubmit}>
            <fieldset className="form-group">
              <legend className="form-label">
                Saques são permitidos apenas com chave pix cpf/cnpj vinculado
                ao cadastro do afiliado.
              </legend>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="pixKey"
                  placeholder="CHAVE PIX CPF/CNPJ"
                  aria-label="Input"
                  value={formData.pixKey}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="value"
                  placeholder="ex: R$250.00"
                  aria-label="Input"
                  value={formData.value}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Digite seu nome"
                  aria-label="Input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Solicitar Saque
              </button>
            </fieldset>
          </form>
          {notification && (
            <div className={`alert alert-${notification.type}`} role="alert">
              {notification.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}