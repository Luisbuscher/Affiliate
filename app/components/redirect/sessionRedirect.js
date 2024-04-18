import Image from "next/image";

import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';

// Redirecionamento caso o usuário não esteja logado.
export default async function VerificationSession() {
  const session = await getServerSession();

  if(!session){
    redirect("/login/signin");
  } else {
    redirect("/user/home");
  }
}