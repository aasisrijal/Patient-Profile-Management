import React, { useState, useEffect } from "react";
import { Patient } from "../components/Patient";

import { listPatients } from "../services/api";
import { PatientData } from "../types";

const Home: React.FC = () => {
  const [patients, setPatients] = useState<PatientData[]>([]);

  const getData = async () => {
    const data = await listPatients();
    setPatients(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Patient patients={patients} />
      {/* {patients.map((items) => {
        return <Patient patient={items} />;
      })} */}
    </div>
  );
};

export default Home;
