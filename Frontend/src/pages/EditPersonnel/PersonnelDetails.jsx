import React from 'react'

const PersonnelDetails = ({personnel}) => {
  return (
    <div className=''>
      <ul>
        <li>{personnel.name}</li>
        <li>{personnel.dept}</li>
        <li>{personnel.phone}</li>
        <li>{personnel.gender}</li>
        <li>{personnel.email}</li>
        <li>{personnel.role}</li>
      </ul>
    </div>
  )
}

export default PersonnelDetails
