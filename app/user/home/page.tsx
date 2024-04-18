import Image from "next/image";
import { getServerSession } from "next-auth";
import { getData } from './model/dbQuery';

export default async function Home() {
  
  const session = await getServerSession();
  const data = await getData(session?.user?.email);

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-sm-3 mb-3 mb-sm-0">
          <div className="card">
            <div className="card-body text-center">
              <i className="bi bi-cash-coin" style={{ fontSize: "3rem" }}></i>
              <p className="card-text" style={{ fontSize: "19pt" }}>Saldo Disponivel</p>
              <h2>R$ {data.wallet ? parseFloat(await data.wallet).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'}</h2>
            </div>
          </div>
        </div>
        <div className="col-sm-3 text-center">
          <div className="card">
            <div className="card-body">
              <i className="bi bi-coin" style={{ fontSize: "3rem" }}></i>
              <p className="card-text" style={{ fontSize: "19pt" }}>Rendimentos Totais</p>
              <h2>R$ {data.balance ? parseFloat(await data.balance).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'}</h2>
            </div>
          </div>
        </div>
        <div className="col-sm-3 text-center">
          <div className="card">
            <div className="card-body">
              <i className="bi bi-box-arrow-in-down" style={{ fontSize: "3rem" }}></i>
              <p className="card-text" style={{ fontSize: "19pt" }}>Saques</p>
              <h2>R$ {data.withdraw ? parseFloat(await data.withdraw).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}