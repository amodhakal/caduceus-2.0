import { patients } from "../data/patients";

export class Hospital {
  #patients: PatientData[] = [];

  constructor() {
    this.#patients = patients;
  }

  getAvailablePatients() {
    return JSON.stringify(this.#patients.map((p) => p.initialInfo));
  }
}
