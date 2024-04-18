import Image from "next/image";
import { getServerSession } from "next-auth";

import { getData } from './model/dbQuery';

export default async function Traffic() {

  const session = await getServerSession();
  const data = await getData(session?.user?.email);

  let totalDeposit = 0;
  let totalCadastros = 0;

  data.forEach(row => {
    totalDeposit += parseFloat(row.Deposit);
    totalCadastros++;
  });

  const totalGanhos = totalDeposit * 22;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-8 col-xl-7">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Cadastros</th>
                <th>Depósitos</th>
                <th>Ganhos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{totalCadastros}</td>
                <td>{totalDeposit}</td>
                <td>R$ {totalGanhos}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}