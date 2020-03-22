/* eslint no-case-declarations:off */
import {
  Actions,
} from '../Cst'


export const InitialState = {
  SubStatus: '',
  Depth: 0,
  Balast: 0,
  Air: 100,
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
    case Actions.ChangeAir:
      return { ...state, Air: action.Air }
    case Actions.ChangeBalast:
      return { ...state, Balast: action.Balast }
    case Actions.ChangeDepth:
      return { ...state, Depth: action.Depth }

    case Actions.ChangeTimer:
      return {
        ...state,
        RefChangeTimer: action.RefChangeTimer,
      }

    case Actions.SetSubStatus:
      return { ...state, SubStatus: action.SubStatus }

    // Valves & Pumps
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

    default:
      return state
  }
}
