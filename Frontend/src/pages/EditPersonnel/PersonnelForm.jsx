import { useState } from 'react';
import {toast } from 'react-toastify'

import { usePersonnelsContext } from '../../hooks/usePersonnelContext';

const PersonnelForm = ({ setShowPop }) => {
  const API = import.meta.env.VITE_INTRA_API_PERSONNEL

  const { dispatch } = usePersonnelsContext();
  const [name, setName] = useState('');
  const [dept, setDept] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const personnel = { name, phone, email, role, dept, gender };

    const response = await fetch(API, {
      method: 'POST',
      body: JSON.stringify(personnel),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields)
      toast.error(json.error,{
        autoClose:4000,
        theme:"light"
      });
    }
    if (response.ok) {
      setName('');
      setDept('');
      setGender('');
      setPhone('');
      setEmail('');
      setRole('');
      setError(null);
      setEmptyFields([])
      dispatch({ type: 'CREATE_PERSONNEL', payload: json });
      console.log(json);
      setShowPop(false); 
      toast.success('Personnel Added Successfully',{
        autoClose:4000,
      })
    }
  };

  return (
    <div className="flex justify-center items-center " >
      <form className="w-[100%] md:w-auto bg-white p-6 pt-2 lg:pt-6 rounded-lg " onSubmit={handleSubmit}>
        <h2 className="text-3xl font-extrabold text-center mb-6 text-primary underline">Add Personnel</h2>

        <div className="md:flex flex-row gap-10">
          <div className="mb-4">
            <label className="block text-primary text-sm font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              autoComplete="off"
              className={emptyFields.includes('Name')? 'input-field-error' : 'input-field'}
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-primary text-sm font-bold mb-2" htmlFor="department">
              Department:
            </label>
            <input
              autoComplete="off"
              className={emptyFields.includes('Department')? 'input-field-error' : 'input-field'}
              id="department"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              type="text"
              placeholder="Enter department"
            />
          </div>
        </div>

        <div className="md:flex flex-row gap-10">
          <div className="mb-4 w-[100%] md:w-[47%]">
            <label className="block text-primary text-sm font-bold mb-2" htmlFor="gender">
              Gender:
            </label>
            <select
              className={emptyFields.includes('Gender')? 'input-field-error' : 'input-field'}
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="select">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-primary text-sm font-bold mb-2" htmlFor="phone">
              Phone:
            </label>
            <input
              autoComplete="off"
              className={emptyFields.includes('Phone')? 'input-field-error' : 'input-field'}
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              placeholder="Enter phone number"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-primary text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            autoComplete="off"
            className={emptyFields.includes('Email')? 'input-field-error' : 'input-field'}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary text-sm font-bold mb-2" htmlFor="role">
            Role:
          </label>
          <select
            className={emptyFields.includes('Role')? 'input-field-error' : 'input-field'}
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
            type="submit"
          >
            ADD
          </button>
        
        </div>
      </form>
    </div>
  );
};

export default PersonnelForm;
