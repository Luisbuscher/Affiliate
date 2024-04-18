"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function SignUpForm() {
function register(e) {
  e.preventDefault()
  const formData = new FormData(e.currentTarget);

  const data = {
    typePost: "register",
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    password: formData.get("password"),
    repeat: formData.get("repeat")
  };

  signIn("credentials", {
    ...data,
    callbackUrl: "/user/home",
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
                <h1 className="fs-4 card-title fw-bold mb-4">Registro de Usuário</h1>
                <form onSubmit={register}>
                  <div className="mb-3">
                    <label className="mb-2 text-muted" htmlFor="name">Nome de Usuário</label>
                    <input id="name" type="name" className="form-control" name="name" required autoFocus />
                    <div className="invalid-feedback">
                      Nome inválido
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="mb-2 w-100">
                      <label className="text-muted" htmlFor="phone">Celular</label>
                    </div>
                    <input id="phone" type="phone" className="form-control" name="phone" required />
                    <div className="invalid-feedback">
                      Senha inválida
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="mb-2 w-100">
                      <label className="text-muted" htmlFor="email">E-mail</label>
                    </div>
                    <input id="email" type="email" className="form-control" name="email" required />
                    <div className="invalid-feedback">
                      Senha inválida
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

                  <div className="mb-3">
                    <div className="mb-2 w-100">
                      <label className="text-muted" htmlFor="repeat">Repetir Senha</label>
                    </div>
                    <input id="repeat" type="repeat" className="form-control" name="repeat" required />
                    <div className="invalid-feedback">
                      Senha inválida
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary ms-auto">
                    Cadastrar
                  </button>
                </form>
              </div>
              <div className="card-footer py-3 border-0">
                <div className="text-center">
                  Já tem uma conta? <a href="/login" className="text-dark">Entrar</a>
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