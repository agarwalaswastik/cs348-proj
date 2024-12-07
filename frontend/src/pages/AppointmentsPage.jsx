import { useEffect, useState } from "react";
import api from "../api";
import Appointment from "../components/Appointment";

export default function AppointmentsPage() {
  const [formData, setFormData] = useState({
    date: "",
    duration: "0",
    doctorId: "",
    patientId: "",
  });

  const [data, setData] = useState([]);

  const refetchData = async () => {
    try {
      const res = await api.get("/appointments");
      setData(res.data);
    } catch (err) {
      console.log(err);
      /* empty */
    }
  };

  useEffect(() => {
    refetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/appointments", formData);
      alert("Success!");
      refetchData();
    } catch (err) {
      if (err.response) {
        alert(`Error occurred: ${err.response.data.error}`);
      } else alert(`Error occurred: ${err.message}`);
    }
  };

  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="p-4 flex flex-col gap-4">
        <h2 className="font-bold text-2xl">Scheduled Appointments</h2>
        {(!data || !data.length) && <p>No Data</p>}
        {data.length !== 0 && (
          <div className="flex flex-col gap-2">
            {data.map((item) => (
              <Appointment
                key={JSON.stringify(item)}
                data={item}
                refetchData={refetchData}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-4">
        <h2 className="font-bold text-2xl">Schedule Appointment</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            id="date"
            name="date"
            type="date"
            placeholder="Date"
            className="border-2 border-black p-2 rounded-md w-80"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            autoComplete="none"
            required
          />
          <input
            id="duration"
            name="duration"
            type="number"
            min={0}
            max={150}
            placeholder="Duration (mins)"
            className="border-2 border-black p-2 rounded-md w-80"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            autoComplete="none"
          />
          <input
            id="doctorId"
            name="doctorId"
            type="number"
            placeholder="Doctor ID"
            className="border-2 border-black p-2 rounded-md w-80"
            value={formData.doctorId}
            onChange={(e) =>
              setFormData({ ...formData, doctorId: e.target.value })
            }
            autoComplete="none"
            required
          />
          <input
            id="patientId"
            name="patientId"
            type="number"
            placeholder="Patient ID"
            className="border-2 border-black p-2 rounded-md w-80"
            value={formData.patientId}
            onChange={(e) =>
              setFormData({ ...formData, patientId: e.target.value })
            }
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
