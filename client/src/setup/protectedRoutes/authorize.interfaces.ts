export type ApiCall = "GET" | "POST" | "PUT" | "DELETE";
export const ApiEnum: any = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
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
  CompanyDash: "companyDash",
};
export const TypeOfPrival = {
  Limited: "Limited",
  All: "All",
  Self: "Self",
};
