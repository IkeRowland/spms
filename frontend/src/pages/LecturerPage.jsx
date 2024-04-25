import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  importLecturers,
  listLecturers,
} from "../redux/actions/userActions";
import { resetState } from "../redux/slices/userSlices";
import Message from "../components/Message";

const LecturerPage = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [fileErr, setFileErr] = useState("");
  const [successImport, setSuccessImport] = useState(null);

  const {
    loading,
    lecturers: lecturersList,
    error,
    deleted,
    created,
  } = useSelector((state) => state.user);

  const importFromExcel = () => {
    if (file === "") {
      setFileErr("Please choose an excel file to upload!");
    } else {
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

        // setLecturers(obj);

        dispatch(importLecturers(obj));
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  console.log(error);

  const handleDeleteUser = (userId) => {
    alert("Are you sure you want to delete the user?");
    dispatch(deleteUser(userId));
  };

  useEffect(() => {
    if (created) {
      setSuccessImport("All data has been uploaded successfully!");
    }
    const timeout = setTimeout(() => {
      dispatch(resetState());
      setSuccessImport(null);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [dispatch, created]);

  useEffect(() => {
    dispatch(listLecturers());
  }, [dispatch]);

  useEffect(() => {
    if (deleted) {
      dispatch(listLecturers());
    }
  }, [dispatch, deleted]);

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
          <Message onClose={() => dispatch(resetState())}>{error}</Message>
        )}
        {successImport && (
         <Message variant="success" onClose={() => setSuccessImport(null)}>{successImport}</Message>
        )}
        {fileErr && (
          <Message onClose={() => setFileErr(null)}>{fileErr}</Message>
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
                      to={`/lecturers/${lecturer.lecturer_id}`}
                      className='bg-green-500 text-white rounded px-2 py-1 text-sm'
                    >
                      View
                    </Link>
                    <button
                      className='bg-red-500 text-white rounded px-2 py-1 text-sm'
                      onClick={() => handleDeleteUser(lecturer.user_id)}
                    >
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
