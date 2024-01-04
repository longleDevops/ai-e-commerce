import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default async function SetupLayout({children}:{children:React.ReactNode}) {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId
    }
  })

  //If there exists a store, redirect to dashboard 
  if (store) {
    redirect(`/${store.id}`)
  }

  return (
    <>
      {children}
    </>
  )
}