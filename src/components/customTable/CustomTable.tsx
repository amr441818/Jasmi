import React from 'react'

import { DataTable } from './data-table'
import { columns } from './columns'
import { payments } from './data'

const CustomTable = () => {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={payments} />
    </div>

  )
}

export default CustomTable