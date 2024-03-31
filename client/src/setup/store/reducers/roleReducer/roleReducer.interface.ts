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
  
  export interface RoleState {
    roleload: boolean;
    roleDa: Role[];
    roleerr: any;
  }
  