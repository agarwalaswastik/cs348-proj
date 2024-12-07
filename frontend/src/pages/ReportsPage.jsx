import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../api";
import { useSearch } from "wouter";

function useQueryParams() {
  const search = useSearch();

  const queryParams = useMemo(() => {
    const params = new URLSearchParams(search);
    const obj = {};
    params.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }, [search]);

  return queryParams;
}

export default function ReportsPage() {
  const search = useSearch();
  const queryParams = useQueryParams();
  const [data, setData] = useState();

  const refetchData = useCallback(async () => {
    try {
      const res = await api.get(`/reports?${search}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
      /* empty */
    }
  }, [search]);

  useEffect(() => {
    refetchData();
  }, [refetchData]);

  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="p-4 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">Filtered Appointments</h2>
        {data?.stats?.[0].avg_age && (
          <p>Average Patient Age: {data.stats[0].avg_age}</p>
        )}
        {data?.stats?.[0].avg_duration && (
          <p>Average Appointment Duration: {data.stats[0].avg_duration}</p>
        )}
        {!(data?.appointments && data.appointments.length > 0) && (
          <p>No Data</p>
        )}
        {data?.appointments && data.appointments.length > 0 && (
          <div className="flex flex-col gap-2">
            {data.appointments.map((e) => (
              <article
                key={e.id}
                className="p-2 shadow-lg rounded-md flex flex-col gap-2"
              >
                <h3 className="font-semibold text-lg">Appointment #{e.id}</h3>
                <hr />
                <div className="flex flex-col">
                  <p>Date: {e.date}</p>
                  <p>Doctor Name: {e.doctor_name}</p>
                  <p>Patient Name: {e.patient_name}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-4">
        <h2 className="font-bold text-2xl">Search</h2>
        <form className="flex flex-col gap-4" onSubmit={() => {}}>
          <input
            id="doctorId"
            name="doctorId"
            placeholder="Doctor ID"
            type="search"
            className="border-2 border-black p-2 rounded-md w-80"
            autoComplete="none"
            defaultValue={queryParams["doctorId"]}
          />

          <input
            id="startDate"
            name="startDate"
            placeholder="Start Date (yyyy-mm-dd)"
            type="search"
            className="border-2 border-black p-2 rounded-md w-80"
            autoComplete="none"
            defaultValue={queryParams["startDate"]}
          />

          <input
            id="endDate"
            name="endDate"
            placeholder="End Date (yyyy-mm-dd)"
            type="search"
            className="border-2 border-black p-2 rounded-md w-80"
            autoComplete="none"
            defaultValue={queryParams["endDate"]}
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
