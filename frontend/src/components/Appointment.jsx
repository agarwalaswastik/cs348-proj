import { useState } from "react";
import api from "../api";

/* eslint-disable react/prop-types */
export default function Appointment({ data, refetchData }) {
  const [date, setDate] = useState(data.date.split("T")[0]);
  const [duration, setDuration] = useState(data.duration);
  const [doctorId, setDoctorId] = useState(data.Doctor.id);
  const [patientId, setPatientId] = useState(data.Patient.id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/appointments/${data.id}`, {
        date,
        duration,
        doctorId,
        patientId,
      });
      alert("Success!");
      refetchData();
    } catch (err) {
      if (err.response) {
        alert(`Error occurred: ${err.response.data.error}`);
      } else alert(`Error occurred: ${err.message}`);
    }
  };

  const handleRemove = async (e) => {
    e.preventDefault();

    try {
      await api.delete(`/appointments/${data.id}`);
      alert("Success!");
      refetchData();
    } catch (err) {
      if (err.response) {
        alert(`Error occurred: ${err.response.data.error}`);
      } else alert(`Error occurred: ${err.message}`);
    }
  };

  return (
    <article className="p-2 shadow-lg rounded-md flex flex-col gap-2">
      <h3 className="font-semibold text-lg">Appointment #{data.id}</h3>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label className="grid">
          Date:{" "}
          <input
            name="date"
            type="date"
            placeholder="Date"
            className="border border-black p-1 rounded-md w-80"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            autoComplete="none"
            required
          />
        </label>

        <label className="grid">
          Duration:{" "}
          <input
            name="duration"
            type="number"
            min={0}
            max={150}
            placeholder="Duration (mins)"
            className="border border-black p-1 rounded-md w-80"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            autoComplete="none"
          />
        </label>

        <label className="grid">
          Doctor ID:{" "}
          <input
            name="doctorId"
            type="number"
            placeholder="Doctor ID"
            className="border border-black p-1 rounded-md w-80"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            autoComplete="none"
            required
          />
        </label>

        <label className="grid">
          Patient ID:{" "}
          <input
            name="patientId"
            type="number"
            placeholder="Patient ID"
            className="border border-black p-1 rounded-md w-80"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            autoComplete="none"
            required
          />
        </label>

        <div className="flex gap-2 mt-2">
          <button className="p-2 bg-blue-400 hover:bg-blue-300 transition-colors rounded-md">
            Save
          </button>

          <button
            className="p-2 bg-red-400 hover:bg-red-300 transition-colors rounded-md"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </form>

      <hr />

      <div className="flex flex-col">
        <p>Doctor Name: {data.Doctor.name}</p>
        <p>Doctor Specialization: {data.Doctor.specialization}</p>
        <p>Patient Name: {data.Patient.name}</p>
        <p>Patient Age: {data.Patient.age}</p>
      </div>
    </article>
  );
}
