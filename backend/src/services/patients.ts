import knexConnection from "../../db";

/**
 * Fetch all patients.
 *
 * @returns {Promise}
 */
export async function fetchAll(id) {
  const patients = await knexConnection("patients").where("user_id", id);
  return {
    count: patients.length,
    data: patients,
  };
}

// Creates a new patient

export async function createPatient(patient) {
  const newPatient = await knexConnection("patients").insert(patient);
  return newPatient;
}
