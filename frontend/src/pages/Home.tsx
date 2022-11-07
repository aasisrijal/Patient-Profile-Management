import React, { useState, useEffect, useMemo, useCallback } from "react";

import { Patient } from "../components/Patient";
import { listPatients } from "../services/api";
import { PatientData } from "../types";
import { sortByBoolean } from "../utils";

const Home: React.FC = () => {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [updatePatients, setUpdatePatients] = useState<boolean>(false)
  const memoizedDataList = useMemo(() => sortByBoolean(patients), [patients]);

  const getData = async () => {
    const data = await listPatients();
    setPatients(data);
  };

  useEffect(() => {
    console.log('home logged in')
    getData();
  }, [updatePatients]);

  return (
    <div>
      <Patient patients={memoizedDataList} updatePatientsList={setUpdatePatients}/>
    </div>
  );
};

export default Home;
