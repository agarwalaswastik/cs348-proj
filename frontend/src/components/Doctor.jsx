import { useState } from "react";
import api from "../api";

/* eslint-disable react/prop-types */
export default function Doctor({ data, refetchData }) {
  const [name, setName] = useState(data.name);
  const [specialization, setSpecialization] = useState(data.specialization);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/doctors/${data.id}`, {
        name,
        specialization,
      });
      alert("Success!");
      refetchData();
    } catch (err) {
      alert(`Error occurred: ${err.message}`);
    }
  };

  const handleRemove = async (e) => {
    e.preventDefault();

    try {
      await api.delete(`/doctors/${data.id}`);
      alert("Success!");
      refetchData();
    } catch (err) {
      alert(`Error occurred: ${err.message}`);
    }
  };

  return (
    <article className="p-2 shadow-lg rounded-md flex flex-col gap-2">
      <h3 className="font-semibold text-lg">Doctor #{data.id}</h3>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label className="grid">
          Name:{" "}
          <input
            name="name"
            placeholder="Name"
            className="border border-black p-1 rounded-md w-80"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </label>

        <label className="grid">
          Specialization:{" "}
          <input
            name="specialization"
            placeholder="Specialization"
            className="border border-black p-1 rounded-md w-80"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            autoComplete="off"
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
    </article>
  );
}
