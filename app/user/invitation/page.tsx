import Image from "next/image";
import { getServerSession } from "next-auth";
import { getData } from './model/dbQuery';

export default async function Invitation() {

  const session = await getServerSession();
  const data = await getData(session?.user?.email);

  return (
    <div className="maincontainer">
      <div className="input-group mb-3">
        <input type="text" className="form-control" aria-label="Example text with button addon" aria-describedby="button-addon1" defaultValue={data.url} />
        <button className="btn btn-outline-secondary i bi-paperclip" type="button" id="button-addon3"></button>
      </div>
      <h1 style={{ color: "black" }}>
        INDIQUE UM AFILIADO E GANHE 10% POR CADASTRO ATIVO
      </h1>
      <p>
        Com esse link você pode convidar um parceiro para se tornar afiliado e ganhar 10% através dele. EX: Se seu indicado fizer R$1.000 REAIS você automaticamente ganha R$100 REAIS por ter convidado ele.
      </p>
    </div>
  );
}