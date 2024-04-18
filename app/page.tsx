import Image from "next/image";

import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession();

  if(!session){
    redirect("/login/signin");
  } else {
    redirect("/user/home");
  }
}