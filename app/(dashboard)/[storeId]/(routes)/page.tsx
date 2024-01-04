import prismadb from "@/lib/prismadb"


interface DashboardPageProps {
  params: { storeId: string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
  }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  })

  return (
    <div>
      {/*? is optional chaining to avoid the null case*/}
      Active store: {store?.name} 
    </div>
  )
}

export default DashboardPage