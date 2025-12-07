type InitialInfo = {
  patientId: string;
  firstName: string;
  lastName: string;
  age: number;
  sex: "male" | "female";
  summary: string;
};

type PatientData = {
  initialInfo: InitialInfo;
};
