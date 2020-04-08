/* eslint no-case-declarations:off */
import { Actions } from '../Cst'

export const InitialState = {
  SubStatus: '',

  Depth: 0,

  Balast: 0,
  BalastFilling: false,
  BalastBlowing: false,

  Air: 100,
  AirCharging: false,


  Fout: false,
  Foutmelding: null,
}

export const AppReducer = (state = InitialState, action) => {
  switch (action.type) {
    case Actions.SetAir:
      return { ...state, Air: action.Air }
    case Actions.SetAirCharging:
      return { ...state, AirCharging: action.AirCharging }


    case Actions.SetBalast:
      return { ...state, Balast: action.Balast }
    case Actions.SetBalastFilling:
      return { ...state, BalastFilling: action.BalastFilling }
    case Actions.SetBalastBlowing:
      return { ...state, BalastBlowing: action.BalastBlowing }


    case Actions.SetSubStatus:
      return { ...state, SubStatus: action.SubStatus }


    default:
      return state
  }
}
