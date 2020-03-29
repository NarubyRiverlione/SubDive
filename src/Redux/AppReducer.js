/* eslint no-case-declarations:off */
import { Actions, CstDelta } from '../Cst'


export const InitialState = {
  SubStatus: '',
  Depth: 0,
  DeltaDepth: 0,

  Balast: 0,
  DeltaBalast: 0,

  Air: 100,
  DeltaAir: 0,

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

// limit the change
const LimitDelta = (Delta, Max, Min, Current) => {
  const testNew = Current + Delta
  if (testNew > Max) return { limited: Max, delta: 0 }
  if (testNew < Min) return { limited: Min, delta: 0 }
  return { limited: testNew, delta: Delta }
}

export const AppReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Actions.SetDeltaAir:
      return { ...state, DeltaAir: action.Delta }
    case Actions.SetDeltaBalast:
      return { ...state, DeltaBalast: state.DeltaBalast + action.Delta }

    // case Actions.ChangeAir:
    //   if (state.DeltaAir === 0) return state
    //   const { limited, delta } = LimitDelta(state.DeltaAir, 100, 0, state.Air)
    //   return { ...state, Air: limited, DeltaAir: delta }


    case Actions.SetStartup:
      return {
        ...state, Air: action.StartAir, Balast: action.StartBalast, Depth: action.StartDepth,
      }

    case Actions.TickTimer:
      const {
        DeltaAir, DeltaBalast, Air, Balast,
      } = state
      let newState = { ...state }
      if (DeltaAir !== 0) {
        const { limited, delta } = LimitDelta(DeltaAir, 100, 0, Air)
        newState = { ...newState, Air: limited, DeltaAir: delta }
      }
      if (DeltaBalast !== 0) {
        let validatedDelta = DeltaBalast
        // only remove balast if there is Air to blow
        if (validatedDelta < 0 && Air === 0) {
          validatedDelta = 0
          console.log('CANNOT BLOW BALAST, NO AIR')
        }
        if (validatedDelta < 0) {
          // remove air from reserve as it use to blow the balast
          const { limited: newAir, delta: limitedBalastDelta } = LimitDelta(CstDelta.AirUsedBlowing, 100, 0, Air)
          newState = { ...newState, Air: newAir, DeltaAir: limitedBalastDelta }
        }

        // set new balast
        const { limited: newBalast, delta: limitedAirDelta } = LimitDelta(validatedDelta, 100, 0, Balast)
        newState = { ...newState, Balast: newBalast, DeltaBalast: limitedAirDelta }
      }
      return newState

    case Actions.StartTimer:
      return {
        ...state,
        RefChangeTimer: action.RefChangeTimer,
      }
    case Actions.StopTimer:
      return {
        ...state,
        RefChangeTimer: null,
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
