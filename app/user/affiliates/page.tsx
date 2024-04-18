import Image from "next/image";
import { getServerSession } from "next-auth";

import { getData } from './model/dbQuery';

export default async function MyAffiliates() {

  const session = await getServerSession();
  const data = await getData(session?.user?.email);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-8 col-xl-7">
          <h2>Afiliados</h2>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">ID do Afiliado</th>
                  <th scope="col">Nome do Afiliado</th>
                  <th scope="col">Rendimentos do Afiliado</th>
                </tr>
              </thead>
              <tbody>
                {data.userId.map((userId, index) => (
                  <tr key={userId}>
                    <td>{userId}</td>
                    <td>{data.username[index]}</td>
                    <td>{data.withdrawal[index]}</td>
                  </tr>
                ))}
                {data.userId.length === 0 && (
                  <tr>
                    <td colSpan="3">Não há afiliados cadastrados.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  );
}