import useGetColumns from '@/hooks/useGetColumns'
import { DataTable } from '@/components/customTable/data-table'
import { payments } from '@/components/customTable/data'

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const Clients = () => {
  const columns = useGetColumns<Payment>({
    record: payments[0],
    sortableColumns: ["email", "amount"],
  })

  return (
    <div className=" mx-auto py-10">
      <DataTable columns={columns} data={payments} />
    </div>
  )
}

export default Clients
