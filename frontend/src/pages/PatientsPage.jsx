import { useEffect, useState } from "react";
import api from "../api";
import Patient from "../components/Patient";

export default function PatientsPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("0");
  const [data, setData] = useState([]);

  const refetchData = async () => {
    try {
      const res = await api.get("/patients");
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
      await api.post("/patients", { name, age });
      alert("Success!");
      refetchData();
    } catch (err) {
      alert(`Error occurred: ${err.message}`);
    }
  };

  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="p-4 flex flex-col gap-4">
        <h2 className="font-bold text-2xl">Sick Patients</h2>
        {(!data || !data.length) && <p>No Data</p>}
        {data.length !== 0 && (
          <div className="flex flex-col gap-2">
            {data.map((item) => (
              <Patient key={item.id} data={item} refetchData={refetchData} />
            ))}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-4">
        <h2 className="font-bold text-2xl">Add Patient</h2>
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
            id="age"
            name="age"
            type="number"
            min={0}
            max={150}
            placeholder="Age"
            className="border-2 border-black p-2 rounded-md w-80"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            autoComplete="none"
            required
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
