import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useAuthContext } from '../hooks/useAuthContext';

const BarChartComponent = () => {
  const API = import.meta.env.VITE_INFRA_API_ALLREPORT;
  const [reports, setReports] = useState([]);
  const [data, setData] = useState([]);
  const { user } = useAuthContext();

  const areas = [
    "Main Auditorium Stage",
    "Learning Centre Backside Restroom",
    "Football Playground Restroom",
    "SF Block VIP Lounge",
    "Vedanayagam Auditorium VIP Lounge",
    "Indoor Stadium",
    "Main Parking Restrooms",
    "Hostel Canteen Premises",
    "Chairman's Room and Chief Executive Room - Old Mech Seminar Hall",
    "New Store Room",
    "Tennis Ground",
    "Quarters",
    "Board Room - SF Block (First Floor)"
  ];

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
  }, [API, user]);

  // Process data to count reports per area
  useEffect(() => {
    if (reports.length > 0) {
      const areaCount = areas.map(area => ({
        area,
        count: reports.filter(report => report.reportedAreaId?.area === area).length
      }));
      setData(areaCount);
    }
  }, [reports]);

  // Function to add shadow effect on each bar
  const renderBackground = (props) => {
    const { x, y, width, height } = props;
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height || 1} // Ensure height is at least 1 when count is 0
        fill="rgba(0, 0, 0, 0.02)" 
        rx={0} 
      />
    );
  };

  // Dynamically calculate max Y value (rounded up to the nearest 5)
  const maxValue = Math.ceil(Math.max(...data.map(d => d.count)) / 5) * 5;

  // Generate ticks for Y axis in steps of 5
  const yTicks = [];
  for (let i = 0; i <= maxValue; i += 5) {
    yTicks.push(i);
  }

  return (
    <ResponsiveContainer width="100%" height={270} >
      <BarChart 
        data={data}
        margin={{ top: 5, right: 10, left: -30, bottom: 10 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="0" />
        <XAxis dataKey="area" hide={true} />
        <YAxis 
          ticks={yTicks} // Custom ticks in increments of 5
          domain={[0, maxValue]}
        />
        <Tooltip formatter={(value, name, props) => [value, props.payload.area]} />
        <Bar 
          dataKey="count" 
          fill="#313E50" 
          background={renderBackground} // Adding shadow to each bar
          barSize={40} 
          radius={[7, 7, 7, 7]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
