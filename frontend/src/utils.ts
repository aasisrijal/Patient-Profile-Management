import { PatientData } from "./types";

export const convertDate = (date:string) => {
    let convertedDate = new Date(date);
    return convertedDate.toISOString().split("T")[0];
}


export const sortByBoolean = (arr: PatientData[]): PatientData[] => {
    return arr.sort((a, b) => Number(b.is_special) - Number(a.is_special))
};