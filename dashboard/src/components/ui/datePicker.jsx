// import React, { useState } from 'react';
// import DateTimePicker from 'react-datetime-picker';
// import 'react-datetime-picker/dist/DateTimePicker.css';
// import 'react-calendar/dist/Calendar.css';
// import 'react-clock/dist/Clock.css';

// function DatePicker() {
//   const [value, setValue] = useState(new Date());

//   return (
//     <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md max-w-xs mx-auto">
//       <label className="mb-2 text-lg font-semibold text-gray-700">Select Date</label>
//       <DateTimePicker
//         onChange={setValue}
//         value={value}
//         disableClock={true}
//         className="border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//         calendarClassName="border border-gray-300 rounded-md shadow-lg"
//       />
//     </div>
//   );
// }

// export default DatePicker;


export default function DatePicker() {
    return (
        <div>
            <input type="date" />
        </div>
    );
}
