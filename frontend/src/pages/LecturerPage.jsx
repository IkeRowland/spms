import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, importLecturers, listLecturers } from "../redux/actions/userActions";
import CloseIcon from "@mui/icons-material/Close";

const LecturerPage = () => {
  const dispatch = useDispatch();
  const [lecturers, setLecturers] = useState([]);
  const [file, setFile] = useState("");
  const [successImport, setSuccessImport] = useState(null);

  const {loading, lecturers: lecturersList, error, deleted} = useSelector((state) => state.user);

  const importFromExcel = () => {
    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const LecturerData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const obj = LecturerData.slice(1).map((row) => ({
        staff_no: row[0],
        full_name: row[1],
        email: row[2],
        contact: row[3],
        user_type: "lecturer",
      }));

      setLecturers(obj);

        dispatch(importLecturers(lecturers))
    };

    reader.readAsArrayBuffer(file);
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDeleteUser = (userId) => {
    alert("Are you sure you want to delete the user?");
    dispatch(deleteUser(userId));
  }

  useEffect(() => {
    if (lecturersList.length > 0){
      console.log(lecturersList)
      setSuccessImport("All data has been uploaded successfully!")
    }
  }, [lecturersList])

  useEffect(() => {
    dispatch(listLecturers())
  }, [dispatch])

  useEffect(() => {
    if (deleted){
      dispatch(listLecturers())
    }
  }, [dispatch, deleted])

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-semibold'>Lecturers</h2>
        <div className='flex gap-3'>
          <input
            type='file'
            onChange={handleFileChange}
            className='border focus:outline-gray-900 px-4 py-1 rounded'
          />
          <button
            className='bg-gray-900 text-white px-4 py-2 rounded'
            onClick={importFromExcel}
          >
            Read Excel File
          </button>
        </div>
      </div>
      <section className='w-full overflow-x-auto'>
        {loading && <p>Loading...</p>}
        {error && (
          <p className='bg-red-500 p-4 rounded text-oranger-500'>{error}</p>
        )}
        {successImport && (
          <span className='flex items-center justify-between my-1 bg-green-100 w-full py-2 px-4 rounded border border-green-400 text-green-700'>
            <p>{successImport}</p>
            <button onClick={() => setSuccessImport(null)}>
              <CloseIcon />
            </button>
          </span>
        )}
        <table className='w-full border border-gray-400'>
          <thead className=''>
            <tr className='bg-gray-200'>
              <th className='border border-gray-400 p-2'>S/NO</th>
              <th className='border border-gray-400 p-2'>FULL NAME</th>
              <th className='border border-gray-400 p-2'>EMAIL</th>
              <th className='border border-gray-400 p-2'>STAFF NO</th>
              <th className='border border-gray-400 p-2'>CONTACT</th>
              <th className='border border-gray-400 p-2'>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {lecturersList.map((lecturer, index) => {
              return (
                <tr key={index}>
                  <td className='border border-gray-400 p-2'>{index + 1}</td>
                  <td className='border border-gray-400 p-2'>
                    {lecturer.full_name}
                  </td>
                  <td className='border border-gray-400 p-2'>
                    {lecturer.email}
                  </td>
                  <td className='border border-gray-400 p-2'>
                    {lecturer.staff_no}
                  </td>
                  <td className='border border-gray-400 p-2'>
                    {lecturer.contact}
                  </td>
                  <td className='border border-gray-400 flex gap-3 p-2'>
                    <Link
                      to={`/lecturers/1`}
                      className='bg-green-500 text-white rounded px-2 py-1 text-sm'
                    >
                      View
                    </Link>
                    <button className='bg-red-500 text-white rounded px-2 py-1 text-sm' onClick={() => handleDeleteUser(lecturer.user_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default LecturerPage;
