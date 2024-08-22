import React from 'react'

const PersonnelForm = () => {
  return (
    <form >
      <div className="flex justify-center items-center">
        <form className="w-[100%] md:w-auto bg-white p-6 rounded-lg ">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-primary ">Add Personnel</h2>

          <div className='md:flex flex-row gap-10'>
            <div className="mb-4">
              <label className="block text-primary  text-sm font-bold mb-2" htmlFor="name">
                Name:
              </label>
              <input
                autocomplete="off"
                className=" input-field"
                id="name"
                type="text"
                placeholder="Enter name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-primary text-sm font-bold mb-2" htmlFor="department">
                Department:
              </label>
              <input
                autocomplete="off"
                className="input-field"
                id="department"
                type="text"
                placeholder="Enter department"
              />
            </div>
          </div>

          <div className='md:flex flex-row gap-10'>
            <div className="mb-4 w-[100%] md:w-[47%]">
              <label className="block text-primary text-sm font-bold mb-2 " htmlFor="gender">
                Gender:
              </label>
              <select
              className="input-field"
              id="gender"
              >
                <option className="hover:bg-primary text-gray-700 py-2" value="select">Select</option>
                <option className="hover:bg-primary text-gray-700 py-2" value="admin">Male</option>
                <option className="hover:bg-primary text-gray-700 py-2" value="auditor">Women</option>
                <option className="hover:bg-primary text-gray-700 py-2" value="handyman">Others</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-primary text-sm font-bold mb-2" htmlFor="phone">
                Phone:
              </label>
              <input
                autocomplete="off"
                className="input-field"
                id="phone"
                type="text"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-primary text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              autocomplete="off"
              className="input-field"
              id="email"
              type="email"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-primary text-sm font-bold mb-2" htmlFor="role">
              Position:
            </label>
            <select
              className="input-field"
              id="role"
            >
              <option value="select">Select</option>
              <option value="admin">Admin</option>
              <option value="auditor">Auditor</option>
              <option value="handyman">Handyman</option>
            </select>
          </div>


          <div className="flex items-center justify-center">
            <button
              className="bg-primary hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </form>
  )
}

export default PersonnelForm
