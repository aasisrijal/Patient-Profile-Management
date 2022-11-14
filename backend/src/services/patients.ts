import knexConnection from "../db";

/**
 * Fetch all patients.
 */
export async function fetchAll(id, query) {
  const {page} = query;
  const patients = await knexConnection("patients").where("user_id", id)
  .orderBy("is_special","desc")
  .orderBy("created_at","desc")
    .paginate({ perPage: 20, currentPage: page, isLengthAware: true });
  return patients;
}

// Get a Patient by email
export async function getPatient(email) {
  const patient = await knexConnection("patients").where("email", email);
  return patient;
}

// Creates a new patient
export async function createPatient(patient) {
  const newPatient = await knexConnection("patients").insert(patient);
  return newPatient;
}

// Updates a patient
export async function updatePatient(id, patientChanges) {
  const newPatient = await knexConnection("patients")
    .where("id", id)
    .update(patientChanges);
  return newPatient;
}

// Delete a patient removePatient
export async function removePatient(id) {
  const newPatient = await knexConnection("patients").where("id", id).del();
  return newPatient;
}
