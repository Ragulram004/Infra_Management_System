import { useState, useEffect } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { formatDistance } from 'date-fns';
import { AiOutlineAudit } from 'react-icons/ai';
import { TbMessageReport } from "react-icons/tb";
import Pop from '../../../components/Pop';
import io from 'socket.io-client';
import HandymanForm from './HandymanForm';

const AuditorReport = () => {
  const API = import.meta.env.VITE_INFRA_API_REPORT;

  const [showPop, setShowPop] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([]);
  const { user } = useAuthContext();
  const [selectedImage, setSelectedImage] = useState(null); // For image full-screen pop-up
  const [loading, setLoading] = useState(true); // Loading state
  const [socket, setSocket] = useState(null);

  const handleAssignClick = (report) => {
    setSelectedReport(report);
    setShowPop(true);
  }

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(API, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json();
        if (response.ok) {
          console.log(json)
          setReports(json);
        }
      } catch (error) {
        console.log('Fetch Error:', error);
      } finally {
        setLoading(false); // Stop loading once data is fetched or error occurs
      }
    };

    if (user) {
      fetchReports();
      const newSocket = io('https://infra-management-system-server.vercel.app');
      setSocket(newSocket);

      // Clean up socket connection when the component unmounts or user changes
      return () => {
        if (newSocket) newSocket.disconnect();
      };
    }
  }, [user]);

  useEffect(() => {
    if (socket) {
      const handleNewReport = (newReport) => {
        setReports((prevReports) => [newReport, ...prevReports]);
      };
      const handleUpdate = (updatedReport) => {
        setReports((prevReports) =>
         prevReports.filter((report) => report._id !== updatedReport._id)
        );
      };

      // Listen for the 'createdReport' event
      socket.on('createdReport', handleNewReport);
      socket.on('updatedReport', handleUpdate);

      // Clean up the event listener when the component unmounts or socket changes
      return () => {
        socket.off('createdReport', handleNewReport);
        socket.off('updatedReport', handleUpdate);
      };
    }
  }, [socket]);

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

      {/* Display loading message or spinner */}
      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <p className='text-primary font-bold text-xl'>Loading reports...</p>
        </div>
      ) : (
        <div>
          {reports.length === 0 ? (
            <p>No Reports found</p>
          ) : (
            <div className='flex flex-wrap gap-5  justify-center'>
              {reports.map((report) => (
                <div key={report._id} className=' shadow-md  rounded-lg overflow-hidden relative hover:bg-white '>
                  {report.imagepath && (
                    <div className='flex flex-col items-center'>
                      <div className='px-5 py-2 flex items-center gap-2'>
                        <div className='text-[#4169e1]'>
                          <AiOutlineAudit fontSize={20} />
                        </div>
                        <div className='w-56 '>
                          <p className='text-primary text-sm font-bold truncate ' title={report.reportedAreaId.area}>{report.reportedAreaId.area}</p>
                          <p className='text-primary text-xs truncate ' title={`${report.userId.name} · ${report.userId.phone}`}> <span className='font-bold'>Audited By:</span> {report.userId.name} · {report.userId.phone}</p>
                        </div>                      
                      </div>
                      <div className=' px-2 '>
                        <img
                          src={`https://infra-management-system-server.vercel.app/${report.imagepath}`}
                          alt='Report'
                          className=' w-[270px]  h-[200px] object-cover cursor-pointer rounded-md'
                          onClick={() => handleImageClick(`https://infra-management-system-server.vercel.app/${report.imagepath}`)}
                        />
                      </div>
                      <div className='px-5 py-1 text-sm flex  gap-2'>
                        <div className='text-[#FFBF00]'>
                          <TbMessageReport fontSize={18} />
                        </div>
                        <p> Reported  <span className='font-bold'>· {formatDistance(new Date(report.createdAt), new Date(),{addSuffix: true})}</span></p> 
                      </div>
                      <div className=' pb-2 px-2 '>
                        <button 
                          className=' bg-primary text-white text-sm md:text-md font-bold py-2 px-2 rounded-lg'
                          onClick={() => handleAssignClick(report)}
                        >
                          Assign Handyman
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Full-screen image pop-up */}
      {selectedImage && (
        <div className='fixed inset-0 bg-black bg-opacity-65 backdrop-blur-[2px] flex items-center justify-center z-50' onClick={handleCloseImage}>
          <img src={selectedImage} alt='Full Screen' className='max-w-full max-h-full' />
          <button className='absolute top-4 right-4 text-white text-2xl' onClick={handleCloseImage}>×</button>
        </div>
      )}
      <Pop isVisible={showPop} onClose={() => setShowPop(false)}>
        <HandymanForm setShowPop={setShowPop} selectedReport={selectedReport} />
      </Pop>
    </div>
  );
};

export default AuditorReport;
