export interface RegisterTalent {
  // role: 'ADMIN' | 'COMPANY' | 'TALENT';
  name: string;
  email: string;
  password: string;
  contact: string;
}

export interface ICompanyRegistrationForm {
  name: string;
  password: string;
  website: string;
  email: string;
  contact: string;
  certificate: File;
  logo: File;
}
