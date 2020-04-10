import * as Cst from '../Cst'
import { EmptyRequest } from './Subber_pb'
import { AirClient, ConnClient } from './Subber_grpc_web_pb'

// Set start conditions
export const SetStart = (StartDepth, StartAir, StartBalast) => (
  (dispatch) => {
    // start gRpc stream to get continues info
    const connService = new ConnClient(Cst.envoyProxy)

    const statusStream = connService.startStatusUpdates(new EmptyRequest(), null)
    statusStream.on('data', (data) => {
      // console.log(`Air = ${data.getAir()}`)
      // console.log(`Depth = ${data.getDepth()} meters`)
      // console.log(`Balast = ${data.getBalast()} %`)
      dispatch({ type: Cst.Actions.SetAir, Air: data.getAir() })
    })
    statusStream.on('error', (err) => {
      dispatch({ type: Cst.Actions.SetSubStatus, SubStatus: err.message })
    })
    statusStream.on('end', (status) => {
      console.warn(`Status updates ended because: ${status}`)
    })

    return dispatch({
      type: Cst.Actions.SetStartup,
      StartAir,
      StartBalast,
      StartDepth,
    })
  }
)


export const SetAir = (newAir) => ({
  type: Cst.Actions.SetAir,
  Air: newAir,
})

export const SetAirChargingStatus = (newStatus) => (
  (dispatch) => {
    const airService = new AirClient(Cst.envoyProxy)
    if (newStatus) {
      airService.chargeStart(new EmptyRequest(), null, (err, response) => {
        if (err) {
          return dispatch({ type: Cst.Actions.SetSubStatus, SubStatus: err.message })
        }
        // get Air value
        const SubStatus = response && response.array.length === 1 ? response.array[0] : 'ERR'
        dispatch({
          type: Cst.Actions.SetSubStatus,
          SubStatus,
        })
        return dispatch({
          type: Cst.Actions.SetAirCharging,
          AirCharging: true,
        })
      })
    }
    else {
      airService.chargeStop(new EmptyRequest(), null, (err, response) => {
        if (err) {
          return ({ type: Cst.Actions.SetSubStatus, SubStatus: err.message })
        }
        // get Air value
        const SubStatus = response && response.array.length === 1 ? response.array[0] : 'ERR'
        dispatch({
          type: Cst.Actions.SetSubStatus,
          SubStatus,
        })
        return dispatch({
          type: Cst.Actions.SetAirCharging,
          AirCharging: false,
        })
      })
    }
  }
)

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
