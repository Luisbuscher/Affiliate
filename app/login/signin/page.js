"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginForm() {
function login(e) {
  e.preventDefault()
  const formData = new FormData(e.currentTarget);

  const data = {
    typePost: "login",
    email: formData.get("email"),
    password: formData.get("password")
  };

  signIn("credentials", {
    ...data,
    callbackUrl: "/user/home",
    redirect: false, // Impede o redirecionamento automático
  }).then((result) => {
    if (!result.error) {
      // Autenticação bem-sucedida, redirecione manualmente ou atualize a UI conforme necessário
      window.location.href = result.url || "/user/home?error='Erro ao efetuar Login'";
    } else {
      console.error("Erro de autenticação:", result.error);
    }
  });
}

  return (
    <section className="h-100">
      <div className="container h-100">
        <div className="row justify-content-sm-center h-100">
          <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
            <div className="text-center my-5">
              <Image src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="logo" width={100} height={100} />
            </div>
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                <form onSubmit={login}>
                  <div className="mb-3">
                    <label className="mb-2 text-muted" htmlFor="email">Endereço de email</label>
                    <input id="email" type="email" className="form-control" name="email" required autoFocus />
                    <div className="invalid-feedback">
                      Email inválido
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="mb-2 w-100">
                      <label className="text-muted" htmlFor="password">Senha</label>
                    </div>
                    <input id="password" type="password" className="form-control" name="password" required />
                    <div className="invalid-feedback">
                      Senha inválida
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary ms-auto">
                    Entrar
                  </button>
                </form>
              </div>
              <div className="card-footer py-3 border-0">
                <div className="text-center">
                  Não tem uma conta? <a href="/signup" className="text-dark">Criar Uma</a>
                </div>
              </div>
            </div>
            <div className="text-center mt-5 text-muted">
              Copyright &copy; 2024-2026 &mdash; FABULOSO
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}