import { useState } from "react";
import * as XLSX from "xlsx";

const ExcelImport = () => {
  const [students, setStudents] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const studentData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Assuming the Excel file has columns: REG NO, FULL NAME, INDEX NO, EMAIL, CONTACT, YEAR JOINED, FACULTY, COURSE
      const students = studentData.slice(1).map((row) => ({
        regNo: row[0],
        fullName: row[1],
        indexNo: row[2],
        email: row[3],
        contact: row[4],
        yearJoined: row[5],
        faculty: row[6],
        course: row[7],
      }));

      setStudents(students);
    };

    reader.readAsArrayBuffer(file);
  };

  console.log(students)

  return (
    <div className='w-full'>
      <div className='flex gap-3 justify-end items-center mb-4'>
        <h6 className="my-auto">Import Student from Excel:</h6>
        <input type='file' onChange={handleFileChange} className='' />
      </div>
      <section className='w-full overflow-x-auto'>
        <table className='w-max border border-gray-400'>
          <thead className="" >
            <tr className='bg-gray-200'>
              <th className='border border-gray-400 p-2'>REG NO</th>
              <th className='border border-gray-400 p-2'>FULL NAME</th>
              <th className='border border-gray-400 p-2'>INDEX NO</th>
              <th className='border border-gray-400 p-2'>EMAIL</th>
              <th className='border border-gray-400 p-2'>CONTACT</th>
              <th className='border border-gray-400 p-2'>YEAR JOINED</th>
              <th className='border border-gray-400 p-2'>FACULTY</th>
              <th className='border border-gray-400 p-2'>COURSE</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td className='border border-gray-400 p-2'>{student.regNo}</td>
                <td className='border border-gray-400 p-2'>
                  {student.fullName}
                </td>
                <td className='border border-gray-400 p-2'>
                  {student.indexNo}
                </td>
                <td className='border border-gray-400 p-2'>{student.email}</td>
                <td className='border border-gray-400 p-2'>
                  {student.contact}
                </td>
                <td className='border border-gray-400 p-2'>
                  {student.yearJoined}
                </td>
                <td className='border border-gray-400 p-2'>
                  {student.faculty}
                </td>
                <td className='border border-gray-400 p-2'>{student.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ExcelImport;
