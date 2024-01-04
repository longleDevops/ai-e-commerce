import { UserButton } from "@clerk/nextjs"

import { MainNav } from "@/components/main-nav"
import StoreSwitcher from "./ui/store-switcher"

const navbar = () => {
  return (
    <div className="border-b">
      <div className="flex items-center p-4 h-16">
        <StoreSwitcher/>
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