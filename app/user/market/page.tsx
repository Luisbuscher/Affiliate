import Image from "next/image";
import "./style.css";
import { getServerSession } from "next-auth";

import { getData } from './model/dbQuery';

export default async function Market() {

  const session = await getServerSession();
  const data = await getData(session?.user?.email);

  return (
    <div className="maincontainer">
      <div className="container text-center">
        <p>Selecione o seu Código de Afiliação:</p>
        <div className="row">
          <div className="col-8">
            <select className="form-select" aria-label="Default select example">
              <option defaultValue={0}>Visualizar códigos</option>
              {data.codes.map((titleCode, index) => (
                <option key={index} value={data.codes[index]}>{titleCode}</option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <button className="btn btn-primary" type="button">CRIAR NOVO CÓDIGO DE AFILIAÇÃO</button>
          </div>
        </div>
      </div>
      <div className="container text-center div-card">
        <div className="row">
          {data.gameTitle.map((title, index) => (
            <div key={index} className="col-sm card-item">
              <h3>{title}</h3>
              <br />
              <p>Divulgue o joguinho que relembra infância e ganhe por cadastro!</p>
              <br />
              <p>CPA: {data.cpa[index]}</p>
              <br />
              <div className="input-group mb-3">
                <input type="text" className="form-control" aria-label="Example text with button addon" aria-describedby="button-addon1" value={data.gameLink[index]+"?utm_source="+session?.user?.email} readOnly />
                <button className="btn btn-outline-secondary i bi-paperclip" type="button" id={`button-addon${index + 1}`}></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}