const ProfilePage = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col  w-2/5">
        <span>
          <img
            className="m-auto h-40 w-40 rounded-full"
            src="/assets/profile.jpeg"
            alt="profile"
          />
        </span>
        <section className="m-auto font-semibold">
          <h3>MATU WAMAI KARIUKI</h3>
          <h3>REG:NO E46/627/2021</h3>
          <h3>YEAH 3</h3>
          <br></br>
          <h2>Edit To Update</h2>
        </section>
        <div className="flex flex-col">
          <label className for="fullName">
            Full Name
          </label>
          <input
            placeholder="Matu Wamai"
            type="text"
            id="fullName"
            className="bg-amber-100 text-black p-2 outline-none"
          ></input>
          <lable for="email">Eamail</lable>
          <input
            placeholder="wamaenderitu@gmail.com"
            type="email"
            id="fullName"
            className="bg-amber-100 text-black p-2 outline-none"
          ></input>{" "}
          <lable for="contact">Contact</lable>
          <input
            placeholder="+254780276360"
            type="tellephone"
            id="contact"
            className="bg-amber-100 text-black-2 outline-none"
          ></input>
          <button className="bg-gray-900 rounded my-2 text-white p-1">
            Update Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
