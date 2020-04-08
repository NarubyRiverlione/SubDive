import * as Cst from '../Cst'


// Set start conditions
export const SetStart = (StartDepth, StartAir, StartBalast) => (
  {
    type: Cst.Actions.SetStartup,
    StartAir,
    StartBalast,
    StartDepth,

  })


export const SetAir = (newAir) => ({
  type: Cst.Actions.SetAir,
  Air: newAir,
})
export const SetAirChargingStatus = (status) => ({
  type: Cst.Actions.SetAirCharging,
  AirCharging: status,
})

export const SetBalast = (newBalast) => ({
  type: Cst.Actions.SetBalast,
  Balast: newBalast,
})

export const SetBalastFilling = (BalastFilling) => ({
  type: Cst.Actions.SetBalastFilling,
  BalastFilling,
})
export const SetBalastBlowing = (BalastBlowing) => ({
  type: Cst.Actions.SetBalastBlowing,
  BalastBlowing,
})
