import Image from "next/image";
import { getServerSession } from "next-auth";
import { getData } from './model/dbQuery';

export default async function Creatives() {
  const session = await getServerSession();
  const data = await getData(session?.user?.email);
  
  return (
    <div className="maincontainer">
      <div className="container text-center">
        <div className="row">
          {data.title.map((title, index) => (
            <div className="col" key={index}>
              <h1>{title}</h1>
              <iframe
                height="315"
                src={data.link[index]}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}