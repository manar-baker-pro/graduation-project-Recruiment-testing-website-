import { TechnologyAction } from "../../actions/technologyActions";
import { TechnologiesActionType } from "../../actionsTypes/technologyActionType";
import { TechnologyState } from "./technologyReducerModels";

export const technologyReducer = (
  state: TechnologyState = { technologies: [], loading: false, error: {} },
  action: TechnologyAction
) => {
  switch (action.type) {
    case TechnologiesActionType.REQUEST_GET_TECHNOLOGIES:
      return { ...state, loading: true };
    case TechnologiesActionType.SUCCESS_GET_TECHNOLOGIES:
      return { ...state, loading: false, technologies: action.payload };
    case TechnologiesActionType.FAILED_GET_TECHNOLOGIES:
      return { ...state, loading: false, error: action.payload };

    case TechnologiesActionType.REQUEST_CREATE_TECHNOLOGY:
      return { ...state, loading: true };

    case TechnologiesActionType.SUCCESS_CREATE_TECHNOLOGY:
      return {
        ...state,
        loading: false,
        technologies: [action.payload, ...state.technologies],
      };

    case TechnologiesActionType.FAILED_CREATE_TECHNOLOGY:
      return { ...state, loading: false, error: action.payload };

    case TechnologiesActionType.REQUEST_UPDATE_TECHNOLOGY:
      return { ...state, loading: true };

    case TechnologiesActionType.SUCCESS_UPDATE_TECHNOLOGY:
      return {
        ...state,
        technologies: state.technologies.map((technology) =>
          technology._id === action.payload._id ? action.payload : technology
        ),
        loading: false,
      };
    case TechnologiesActionType.FAILED_UPDATE_TECHNOLOGY:
      return { ...state, loading: false, error: action.payload };

    case TechnologiesActionType.REQUEST_DELETE_TECHNOLOGY:
      return { ...state, loading: true };

    case TechnologiesActionType.SUCCESS_DELETE_TECHNOLOGY:
      return {
        ...state,
        technologies: state.technologies.filter(
          (technology) => technology._id !== action.payload
        ),
        loading: false,
      };
    case TechnologiesActionType.FAILED_DELETE_TECHNOLOGY:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
