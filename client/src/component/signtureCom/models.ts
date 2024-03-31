export interface UserInterface {
  id: string;
  username: string;
  email: string;
  isConfirmedAccount: boolean;
}
export type FieldFormSignUpComp = {
  recruitmentOfficer: string;
  companyName: string;
  emailWork: string;
  companyPassword: string;
  companyPasswordConfirm: string;
  license: string;
};
export type FieldFormSignUp = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
export type FieldFormSignIn = {
  email: string;
  password: string;
  role: boolean;
};
