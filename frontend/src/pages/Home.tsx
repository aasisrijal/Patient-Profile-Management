import React, { useState, useEffect } from "react";

import { Patient } from "../components/Patient";
import { listPatients } from "../services/api";
import { PatientData } from "../types";
import { sortByBoolean } from "../utils";

const Home: React.FC = () => {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [updatePatients, setUpdatePatients] = useState<boolean>(false)
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getData = async (page:number) => {
    const data = await listPatients(page);
    setPatients(data.data);
    setTotalPage(data.pagination.lastPage);
  };

  useEffect(() => {
    getData(page);
  }, [updatePatients, page]);

  return (
    <div>
      <Patient 
        patients={patients} 
        updatePatientsList={setUpdatePatients}
        setPage={setPage}
        setLimit={setLimit}
        totalPage={totalPage}
        />
    </div>
  );
};

export default Home;
