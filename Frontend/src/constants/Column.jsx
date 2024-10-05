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
    accessor: 'name',
  },
  {
    Header: 'Phone',
    accessor: 'phone',
  },
  {
    Header: 'Gender',
    accessor: 'gender',
  },
  {
    Header: 'Area Assigned',
    accessor: 'reportId.area', // Access area through reportId
    Cell: ({ row }) => (
      <div>
        {row.original.reportId ? row.original.reportId.area : 'No Area'}
      </div>
    ),  
  },
  {
    Header: 'Status',
    accessor: 'reportId.status', // Access status through reportId
    Cell: ({ row }) => (
      <span
        className={`px-2 py-[4px] rounded-full text-primary text-xs font-extrabold whitespace-nowrap ${
          row.original.reportId?.status === 'completed' ? 'border-2 border-success' : 'border-2 border-error'
        }`}
      >
        {row.original.reportId?.status === 'completed' ? '🟢Completed' : '🔴Pending'}
      </span>
    ),
  },
  {
    Header: 'Image',
    accessor: 'reportId.imagepath', // Access imagepath through reportId
    Cell: ({ row }) => (
      row.original.reportId?.imagepath ? (
        <img
          src={`http://localhost:4500${row.original.reportId.imagepath}`}
          alt='Report Image'
          className='w-[100px] h-[100px] object-cover rounded-md'
        />
      ) : (
        'No Image'
      )
    ),
  },
  {
    Header: 'Deadline',
    accessor: 'deadline',
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
