import { useEffect } from 'react';
import { Calendar } from 'react-date-range';
import { format } from 'date-fns';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const DatePicker = ({ setDeadLine , setOpenCalender }) => {
  useEffect(() => {
    const formattedDate = format(new Date(), 'dd/MM/yyyy'); 
    setDeadLine(formattedDate);
  }, [setDeadLine]);

  const handleSelect = (date) => {
    const formattedDate = format(date, 'dd/MM/yyyy');
    setDeadLine(formattedDate);
    setOpenCalender(false);
  };

  return (
    <div className="relative inline-block">
      <Calendar
        date={new Date()}
        onChange={(date) => handleSelect(date)}
        className="absolute left-[9rem] top-[60%] translate-x-[-50%] border border-border rounded-lg"
      />
    </div>
  );
};

export default DatePicker;
