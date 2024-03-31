import mongoose from "mongoose";
import { Test } from "../interfaces/test.interface";

const testSchema = new mongoose.Schema<Test>(
  {
    technology: {
      type: mongoose.Types.ObjectId,
      ref: "Technology",
      unique: true,
      required: true,
    },
    questionsTest: [
      {
        questionText: {
          type: String,
          required: true,
        },
        options: [
          {
            optionText: {
              type: String,
            },
            isTrue: {
              type: Boolean,
            },
          },
        ],
        points: {
          type: Number,
        },
      },
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    // testDescription: {
    //   type: String,
    // },
    successRate: {
      type: Number,
      default: 0,
    },
    duration: {
      num: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    userComments: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const TestModel = mongoose.model<Test>("Test", testSchema);

export default TestModel;
