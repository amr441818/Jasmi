import useGetColumns from '@/hooks/useGetColumns'
import { DataTable } from '@/components/customTable/data-table'
import { payments } from '@/components/customTable/data'
import { useQuery } from '@tanstack/react-query'
import apiServiceCall from '@/lib/apiServiceCall'

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const Clients = () => {
    const {data} = useQuery({
        queryKey:['client'],
        queryFn:()=> apiServiceCall({url:'customers', headers:{
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMzkyMjhjYS04YWMxLTQ5OTMtYmY4Ni1kMDFhYWU5NWFmYmYiLCJlbWFpbCI6ImFkbWluQGFsamFzbWkuY29tIiwiaWF0IjoxNzQ2MTIwODE3LCJleHAiOjE3NDg3MTI4MTd9.-kstHER7OI-_SHhMcmv2Ph0hlcCbgweYhEneHkdng6w`
        }}),

    })
console.log(data)
const columns = useGetColumns<Payment>({
    record: data?.data?.items[0] ,
    sortableColumns: ["email"],
})



  console.log(data?.data?.items)
  return (
    <div className=" mx-auto py-10">
      <DataTable addButton buttonText='Add Client' linkUrl="/clients/add" columns={columns} data={data?.data?.items||[]} />
    </div>
  )
}

export default Clients
