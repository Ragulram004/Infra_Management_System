import { useState, useEffect } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';

const AuditorReport = () => {
  const API = import.meta.env.VITE_INFRA_API_AUDITREPORT;
  const [reports, setReports] = useState([]);
  const { user } = useAuthContext();
  const [selectedImage, setSelectedImage] = useState(null); // For image full-screen pop-up

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(API, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json();
        if (response.ok) {
          setReports(json);
        }
      } catch (error) {
        console.log('Fetch Error:', error);
      }
    };
    if (user) fetchReports();
  }, [user]);

  const handleImageClick = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className='relative'>
      <div className='p-3'>
        <h1 className='text-[20px] md:text-3xl text-primary font-[900]'>Audit Reports</h1>
      </div>

      <div>
        {reports.length === 0 ? (
          <p>No Reports found</p>
        ) : (
          <div className='flex flex-wrap gap-5 items-center justify-center'>
            {reports.map((report) => (
              <div key={report._id} className='bg-white shadow-lg rounded-lg overflow-hidden relative'>
                {report.imagepath && (
                  <div className='flex flex-col'>
                    <div className='px-5 py-1 w-60'>
                      <div className=''>
                        <p className='text-primary text-sm font-bold truncate ' title={report.area}>{report.area}</p>
                        <p className='text-primary text-xs '> <span className='font-bold'>Auditor Name:</span> {report.name}</p>
                      </div>                      
                    </div>
                    <img
                      src={`http://localhost:4500${report.imagepath}`}
                      alt='Report'
                      className='w-[270px] px-2 h-[200px] cursor-pointer rounded-sm'
                      onClick={() => handleImageClick(`http://localhost:4500${report.imagepath}`)}
                    />
                    <div className='px-5 py-1 text-sm'>
                      <p> Reported  <span className='font-bold'>· 2d ago</span></p> 
                    </div>
                    <div className='text-center'>
                      <h2 className='text-xl font-semibold'>{report.auditorName}</h2>
                      <button className='mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-secondary'>
                        Assign
                      </button>
                    </div>
                  </div>
                )}
                
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full-screen image pop-up */}
      {selectedImage && (
        <div className='fixed inset-0 bg-black bg-opacity-80 backdrop-blur-[2px] flex items-center justify-center z-50' onClick={handleCloseImage}>
          <img src={selectedImage} alt='Full Screen' className='max-w-full max-h-full' />
          <button className='absolute top-4 right-4 text-white text-2xl' onClick={handleCloseImage}>×</button>
        </div>
      )}
    </div>
  );
};

export default AuditorReport;
