/* eslint no-case-declarations:off */
import {
  Actions,
} from '../Cst'


export const InitialState = {

  Pumps: {
  },

  Valves: {
  },

  Flows: {
  },
  RefChangeTimer: null,
  Fout: false,
  Foutmelding: null,
}


export const AppReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Actions.ChangeTimer:
      return {
        ...state,
        RefChangeTimer: action.ChangeTimer,
      }
    // Valves & Pumps & Flows
    case Actions.ToggleValve:
      return {
        ...state,
        Valves: action.Valves,
      }
    case Actions.SetPump:
      return {
        ...state,
        Pumps: action.Pumps,
      }
    case Actions.FlowChange:
      return {
        ...state,
        Flows: {
          ...state.Flows,
          [action.PumpName]: state.Flows[action.PumpName] + action.FlowChangeBy,
        },
      }
    default:
      return state
  }
}
