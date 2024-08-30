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
    accessor: 'area',
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => (
      <span
        className={`px-2 py-[4px] rounded-full text-primary text-xs font-extrabold ${
          value ? 'border-2 border-success' : 'border-2 border-error'
        }`}
      >
        {value ? '🟢Completed' : '🔴Pending'}
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
