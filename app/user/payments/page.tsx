import Image from "next/image";
import { getServerSession } from "next-auth";
import { getData } from './model/dbQuery';

export default async function Payments() {
  const session = await getServerSession();
  const data = await getData(session?.user?.email);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-8 col-xl-7">
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Valor</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Comprovante</th>
                </tr>
              </thead>
              <tbody>
                {data.map(withdraw => (
                  <tr key="1">
                    <td>{withdraw.value}</td>
                    <td>{formatDate(withdraw.date)}</td>
                    <td>{withdraw.status}</td>
                    <td>
                      <a href="#" className="btn btn-primary view-comprovante" data-src={withdraw.comprovante}>
                        Ver Comprovante
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

// Função para formatar a data
function formatDate(date) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}
