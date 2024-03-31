import mongoose from "mongoose";
import { Role } from "../interfaces/role.interfaces";
let Permission = {
  GET: {
    given: { type: Boolean, default: false },
    type: { type: String, enum: ["All", "Self", "Limit"] },
  },
  POST: {
    given: { type: Boolean, default: false },
    type: { type: String, enum: ["All", "Self", "Limit"] },
  },
  PUT: {
    given: { type: Boolean, default: false },
    type: { type: String, enum: ["All", "Self", "Limit"] },
  },
  DELETE: {
    given: { type: Boolean, default: false },
    type: { type: String, enum: ["All", "Self", "Limit"] },
  },
};
export const roleSchema = new mongoose.Schema<Role>(
  {
    _id: { type: String },
    technology: Permission,
    survey: Permission,
    meeting: Permission,
    response: Permission,
    adminDash: Permission,
    profile: Permission,
    userDash: Permission,
    user: Permission,
    role: Permission,
    question: Permission,
    companyDash: Permission,
  },
  {
    timestamps: true,
  }
);

export const initroles = [
  {
    _id: "User",
    technology: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
    survey: {
      GET: {
        given: false,
        type: "All",
      },
      POST: {
        given: false,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
    meeting: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
    response: {
      GET: {
        given: false,
        type: "All",
      },
      POST: {
        given: false,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
    adminDash: {
      GET: {
        given: false,
        type: "All",
      },
      POST: {
        given: false,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
    profile: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
    userDash: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
    user: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
    role: {
      GET: {
        given: false,
        type: "All",
      },
      POST: {
        given: false,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
    question: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
    companyDash: {
      GET: {
        given: false,
        type: "All",
      },
      POST: {
        given: false,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
  },
  {
    _id: "Admin",
    technology: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
    survey: {
      GET: {
        given: false,
        type: "All",
      },
      POST: {
        given: false,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
    meeting: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
    response: {
      GET: {
        given: false,
        type: "All",
      },
      POST: {
        given: false,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
    adminDash: {
      GET: {
        given: false,
        type: "All",
      },
      POST: {
        given: false,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
    profile: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
    userDash: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
    user: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
    role: {
      GET: {
        given: false,
        type: "All",
      },
      POST: {
        given: false,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
    question: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
    companyDash: {
      GET: {
        given: false,
        type: "All",
      },
      POST: {
        given: false,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
  },
  {
    _id: "CompanyActive",
    technology: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
    survey: {
      GET: {
        given: false,
        type: "All",
      },
      POST: {
        given: false,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
    meeting: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
    response: {
      GET: {
        given: false,
        type: "All",
      },
      POST: {
        given: false,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
    adminDash: {
      GET: {
        given: false,
        type: "All",
      },
      POST: {
        given: false,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
    profile: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
    userDash: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
    user: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
    role: {
      GET: {
        given: false,
        type: "All",
      },
      POST: {
        given: false,
        type: "All",
      },
      PUT: {
        given: false,
        type: "All",
      },
      DELETE: {
        given: false,
        type: "All",
      },
    },
    question: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
    companyDash: {
      GET: {
        given: true,
        type: "All",
      },
      POST: {
        given: true,
        type: "All",
      },
      PUT: {
        given: true,
        type: "All",
      },
      DELETE: {
        given: true,
        type: "All",
      },
    },
  },
];
export const RoleModel = mongoose.model<Role>("Role", roleSchema);
