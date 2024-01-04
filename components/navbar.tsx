import { UserButton, auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { MainNav } from "@/components/main-nav"
import StoreSwitcher from "./ui/store-switcher"
import prismadb from "@/lib/prismadb"

const navbar = async () => {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  // return an array of stores with findMany method
  const stores = await prismadb.store.findMany({
    where: {
      userId
    }
  })

  return (
    <div className="border-b">
      <div className="flex items-center p-4 h-16">
        <StoreSwitcher items={stores}/>
        <MainNav className="mx-6"/>
        {/* ml-auto will push everything to the right */}
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/"/>
        </div>
      </div>
    </div>
  )
}

export default navbar