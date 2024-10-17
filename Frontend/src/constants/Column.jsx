export const personnelColumns =[
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header:'Phone',
    accessor: 'phone',
  },
  {
    Header:'Email',
    accessor: 'email',
  },
  {
    Header:'Gender',
    accessor: 'gender',
  },
  {
    Header:'Department',
    accessor: 'dept',
  },
  {
    Header:'Role',
    accessor: 'role',
  },
  {
    Header: 'Delete',    
  }
]

export const auditorsColumns =[
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header:'Phone',
    accessor: 'phone',
  },
  {
    Header:'Gender',
    accessor: 'gender',
  },
  {
    Header:'Department',
    accessor: 'dept',
  },
  {
    Header:'Role',
    accessor: 'role',
  },
  {
    Header: 'Assign',    
  }
]

export const assignedauditsColumns = [
  {
    Header: 'Name',
    accessor: 'userId.name',
    Cell:({row})=>{
      return(
        <div>
          {row.original.userId? row.original.userId.name : 'No Name'}
        </div>
      )
    }
  },
  {
    Header: 'Phone',
    accessor: 'userId.phone',
    Cell:({row})=>{
      return(
        <div>
          {row.original.userId? row.original.userId.phone : 'No phone'}
        </div>
      )
    }
  },
  {
    Header: 'Gender',
    accessor: 'userId.gender',
    Cell:({row})=>{
      return(
        <div>
          {row.original.userId? row.original.userId.gender : 'No gender'}
        </div>
      )
    }
  },
  {
    Header: 'Area Assigned',
    accessor: 'area',
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => (
      <span
        className={`px-2 py-[4px] rounded-full text-primary text-xs font-extrabold whitespace-nowrap ${
          value === 'completed' ? 'border-2 border-success' : 'border-2 border-error'
        }`}
      >
        {value === 'completed' ? '🟢Completed' : '🔴Pending'}
      </span>
    ),
  },
  {
    Header: 'DeadLine',
    accessor: 'deadline',
  },
  {
    Header: 'Delete',
  }
];
export const assignedfixesColumns = [
  {
    Header: 'Name',
    accessor: 'fixerId.name',
    Cell:({row})=>{
      return(
        <div>
          {row.original.fixerId? row.original.fixerId.name : 'No Name'}
        </div>
      )
    }
  },
  {
    Header: 'Phone',
    accessor: 'fixerId.phone',
    Cell:({row})=>{
      return(
        <div>
          {row.original.fixerId? row.original.fixerId.phone : 'No phone'}
        </div>
      )
    }
  },
  {
    Header: 'Gender',
    accessor: 'fixerId.gender',
    Cell:({row})=>{
      return(
        <div>
          {row.original.fixerId? row.original.fixerId.gender : 'No gender'}
        </div>
      )
    }
  },
  {
    Header: 'Area Assigned',
    accessor: 'reportId.area', // Access area through reportId
    Cell: ({ row }) => (
      <div>
        {row.original.reportedAreaId ? row.original.reportedAreaId.area : 'No Area'}
      </div>
    ),  
  },
  {
    Header: 'Status',
    accessor: 'status', // Access status through reportId
    Cell: ({ row }) => (
      <span
        className={`px-2 py-[4px] rounded-full text-primary text-xs font-extrabold whitespace-nowrap ${
          row.original.status === 'completed' ? 'border-2 border-success' : 'border-2 border-error'
        }`}
      >
        {row.original.status === 'completed' ? '🟢Completed' : '🔴Pending'}
      </span>
    ),
  },
  {
    Header: 'Damage',
    accessor: 'imagepath', 
    
  },
  {
    Header: 'Deadline',
    accessor: 'fixerDeadline',
  },
  {
    Header: 'Delete',
  },
];


export const auditortasks = [
  {
    Header: 'Name',
    accessor: 'userId.name',
    Cell:({row})=>{
      return(
        <div>
          {row.original.userId? row.original.userId.name : 'No Name'}
        </div>
      )
    }
  },
  {
    Header: 'Area Assigned',
    accessor: 'area',
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => (
      <span
        className={`px-2 py-[4px] rounded-full text-primary text-xs font-extrabold whitespace-nowrap ${
          value === 'completed' ? 'border-2 border-success' : 'border-2 border-error'
        }`}
      >
        {value === 'completed' ? '🟢Completed ' : '🔴Pending '}
      </span>
    ),
  },
  {
    Header: 'Deadline',
    accessor: 'deadline'
  },
  {
    Header:'Report'
  }
]

export const auditorStats = [
  {
    Header: 'Name',
    accessor: '_id.name',
  },
  {
    Header: 'Phone',
    accessor: '_id.phone',
  },
  {
    Header: 'Department',
    accessor: '_id.dept',
  },
  {
    Header: 'Total',
    accessor: 'assignedCount',
  },
  {
    Header: 'Completed',
    accessor: 'completedCount',
  },
  {
    Header: 'Pending',
    accessor: 'pendingCount',
  }  
]

export const fixerStats = [
  {
    Header: 'Name',
    accessor: '_id.name',
  },
  {
    Header: 'Phone',
    accessor: '_id.phone',
  },
  {
    Header: 'Department',
    accessor: '_id.dept',
  },
  {
    Header: 'Total',
    accessor: 'assignedCount',
  },
  {
    Header: 'Completed',
    accessor: 'completedCount',
  },
  {
    Header: 'Pending',
    accessor: 'pendingCount',
  }  
]
