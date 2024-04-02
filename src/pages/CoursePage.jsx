const CoursePage = () => {
  return (
    <div className="bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-3">Courses</h2>
      <section className="grid md:grid-cols-5">
        <div className="col-span-3 pr-2">
          <div className="bg-white p-2">
            <h4 className="text-center font-md-bold">2024/2</h4>
            <table className="w-full border">
              <thead className="">
                <tr className="text-left">
                  <th className="border border-gray-300 p-2">ID</th>
                  <th className="border border-gray-300 p-2">Course Code</th>
                  <th className="border border-gray=300 p-2">Course Name</th>
                  <th className="border border-gray-300 p-2">Exam Type</th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  <td className="border border-gray-300 p-2">1</td>
                  <td className="border border-gray-300 p-2">ICS 215</td>
                  <td className="border border-gray-300 p-2">
                    Object Orienred
                  </td>
                  <td className="border border-gray-300 p-2">First Attempt</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">2</td>
                  <td className="border border-gray-300 p-2">ICS 350</td>
                  <td className="border border-gray-300 p-2"> Calculus 1</td>
                  <td className="border border-gray-300 p-2">Supplemtary</td>
                </tr>{" "}
                <tr>
                  <td className="border border-gray-300 p-2">3</td>
                  <td className="border border-gray-300 p-2">SMA 128</td>
                  <td className="border border-gray-300 p-2"> Discrete Math</td>
                  <td className="border border-gray-300 p-2">Supplemtary</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">3</td>
                  <td className="border border-gray-300 p-2">ICS 350</td>
                  <td className="border border-gray-300 p-2"> Calculus 1</td>
                  <td className="border border-gray-300 p-2">First Attempt</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">4</td>
                  <td className="border border-gray-300 p-2">ICS 350</td>
                  <td className="border border-gray-300 p-2"> Calculus 1</td>
                  <td className="border border-gray-300 p-2">First Attempt</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">5</td>
                  <td className="border border-gray-300 p-2">ICS 350</td>
                  <td className="border border-gray-300 p-2"> Calculus 1</td>
                  <td className="border border-gray-300 p-2">First Attempt</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">6</td>
                  <td className="border border-gray-300 p-2">ICS 350</td>
                  <td className="border border-gray-300 p-2"> Calculus 1</td>
                  <td className="border border-gray-300 p-2">Supplemtary</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">7</td>
                  <td className="border border-gray-300 p-2">ICS 350</td>
                  <td className="border border-gray-300 p-2"> Calculus 1</td>
                  <td className="border border-gray-300 p-2">First Attempt</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">8</td>
                  <td className="border border-gray-300 p-2">ICS 350</td>
                  <td className="border border-gray-300 p-2"> Calculus 1</td>
                  <td className="border border-gray-300 p-2">First Attempt</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">9</td>
                  <td className="border border-gray-300 p-2">ICS 350</td>
                  <td className="border border-gray-300 p-2"> Calculus 1</td>
                  <td className="border border-gray-300 p-2">First Attempt</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">10</td>
                  <td className="border border-gray-300 p-2">ICS 350</td>
                  <td className="border border-gray-300 p-2"> Calculus 1</td>
                  <td className="border border-gray-300 p-2">First Attempt</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <form className="col-span-2 bg-white p-4 h-max">
          <h2 className="text-xl font-bold p-2"> Register New Course</h2>
          <table className="">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Course Code</th>
                <th className="border border-gray-300 p-2">Exam Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="outline-none border border-gray-300 p-2">
                  <input
                    placeholder="ICS 215"
                    className="w-28 outline-none"
                  ></input>
                </td>
                <td className="border border-gray-300 p-2">
                  <select className="outline-none">
                    <option>First Attempt</option>
                    <option>Suplement</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  <input
                    placeholder="ICS 215"
                    className="w-28 outline-none"
                  ></input>
                </td>
                <td className="border border-gray-300 p-2">
                  <select className="outline-none">
                    <option>First Attempt</option>
                    <option>Suplement</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  <input
                    placeholder="ICS 215"
                    className="w-28 outline-none"
                  ></input>
                </td>
                <td className=" border border-gray-300 p-2">
                  <select className="outline-none">
                    <option>First Attempt</option>
                    <option>Suplement</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  <input
                    placeholder="ICS 215"
                    className="w-28 outline-none"
                  ></input>
                </td>
                <td className="bordewr border-gray-300 p-2">
                  <select className="outline-none">
                    <option>First Attempt</option>
                    <option>Suplement</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  <input
                    placeholder="ICS 215"
                    className="w-28 outline-none"
                  ></input>
                </td>
                <td className="border boreder-gray-300 p-2">
                  <select className="outline-none">
                    <option>First Attempt</option>
                    <option>Suplement</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-center">
            <button
              className="bg-gray-900 text-white hover:cusor-pointer 
           my-3 p-2 rounded "
            >
              Regester Courses
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CoursePage;
