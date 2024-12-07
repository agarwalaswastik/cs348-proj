import { useEffect, useState } from "react";
import api from "../api";
import Doctor from "../components/Doctor";

export default function DoctorsPage() {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [data, setData] = useState([]);

  const refetchData = async () => {
    try {
      const res = await api.get("/doctors");
      setData(res.data);
    } catch (err) {
      alert(`Error occurred: ${err.message}, Please refresh`);
    }
  };

  useEffect(() => {
    refetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/doctors", { name, specialization });
      alert("Success!");
      refetchData();
    } catch (err) {
      alert(`Error occurred: ${err.message}`);
    }
  };

  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="p-4 flex flex-col gap-4">
        <h2 className="font-bold text-2xl">Available Doctors</h2>
        {(!data || !data.length) && <p>No Data</p>}
        {data.length !== 0 && (
          <div className="flex flex-col gap-2">
            {data.map((item) => (
              <Doctor key={item.id} data={item} refetchData={refetchData} />
            ))}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-4">
        <h2 className="font-bold text-2xl">Add doctor</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            id="name"
            name="name"
            placeholder="Name"
            className="border-2 border-black p-2 rounded-md w-80"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
          <input
            id="specialization"
            name="specialization"
            placeholder="Specialization"
            className="border-2 border-black p-2 rounded-md w-80"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            autoComplete="none"
          />
          <div>
            <button
              type="submit"
              className="bg-blue-400 p-3 rounded-md hover:bg-blue-300 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
