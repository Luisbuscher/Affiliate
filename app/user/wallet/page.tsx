import Image from "next/image";
import { getServerSession } from "next-auth";

import { getData } from './model/dbQuery';

export default async function Wallet() {

  const session = await getServerSession();
  const data = await getData(session?.user?.email);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-8 col-xl-7">
          <div className="card bg-light mb-3">
            <div className="card-body">
              <h1 style={{color: "black"}}>Carteira</h1>
              <div>Seu saldo atual é de R${data.wallet}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <a href="/user/withdraw" className="btn btn-primary btn-block">Solicitar Saque</a>
            </div>
            <div className="col-md-6">
              <a href="/user/payments" className="btn btn-primary btn-block">Ver Meus Pagamentos</a>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}