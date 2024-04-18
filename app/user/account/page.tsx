
import FormAccount from "./components/form";

import { getServerSession } from "next-auth";
import { getData } from './model/dbQuery';

export default async function Account() {

  const session = await getServerSession();
  const data = await getData(session?.user?.email);

  return (
    <>
      <FormAccount userData={data} userId={session?.user?.email} />
    </>
  );
}