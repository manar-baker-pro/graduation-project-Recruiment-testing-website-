interface PermisionDetails {
  given: boolean;
  type: "All" | "Limited" | "Self";
}
interface Permission {
  GET: PermisionDetails;
  POST: PermisionDetails;
  PUT: PermisionDetails;
  DELETE: PermisionDetails;
}
export interface UserDecoded {
  _id: string;
  username: string;
  role: Role;
}
export interface Role {
  _id: string;
  technology: Permission,
  survey: Permission,
  meeting: Permission,
  response: Permission,
  adminDash: Permission,
  profile: Permission,
  userDash: Permission,
  user: Permission,
  role: Permission,
  question:Permission,
  companyDash:Permission
}
export const role = {
  Manager: "Manager",
  Employee: "Employee",
  User: "User",
};
export type Components =
  | "technology"
  | "profile"
  | "survey"
  | "meeting"
  | "adminDash"
  | "companyDash"
  | "userDash"
  | "response"
  | "role"
  | "question";
export const ComponentName: any = {
  Technology: "technology",
  Survey: "survey",
  Meeting: "meeting",
  Response: "response",
  AdminDash: "adminDash",
  Profile: "profile",
  UserDash: "userDash",
  User: "user",
  Role: "role",
  Question: "question",
  CompanyDash:"companyDash"
};
export const TypeOfPrival = {
  Limited: "Limited",
  All: "All",
  Self: "Self",
};
// export const roleNumbers = {
//   Admin: 83710,
//   Teacher: 29134,
//   User: 52196,
// };
