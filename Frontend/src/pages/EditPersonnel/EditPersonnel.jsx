import React, { useEffect, useState } from 'react';

const EditPersonnel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/personnel');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        data.map((personnel) => (
          <div key={personnel.id}>
            <p>{personnel.name}</p>
          </div>
        ))
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default EditPersonnel;