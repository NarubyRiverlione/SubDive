import * as Cst from '../Cst'
import { EmptyRequest } from './Subber_pb'
import { AirClient, ConnClient, BalastClient } from './Subber_grpc_web_pb'


// const getValue = (resp) => (resp && resp.array.length === 1 ? resp.array[0] : 'ERR')

// Set start conditions & connect to the streaming gRpc server for updates
export const SetStart = (StartDepth, StartAir, StartBalast) => (
  (dispatch) => {
    // start gRpc stream to get continues info
    const connService = new ConnClient(Cst.envoyProxy)

    const statusStream = connService.startStatusUpdates(new EmptyRequest(), null)
    statusStream.on('data', (data) => {
      dispatch({ type: Cst.Actions.SetAir, Air: data.getAir() })
      dispatch({ type: Cst.Actions.SetDepth, Depth: data.getDepth() })
      dispatch({ type: Cst.Actions.SetBalast, Balast: data.getBalast() })

      dispatch({ type: Cst.Actions.SetAirCharging, AirCharging: data.getAircharging() })
      dispatch({ type: Cst.Actions.SetBalastFilling, BalastFilling: data.getBalastfilling() })
      dispatch({ type: Cst.Actions.SetBalastBlowing, BalastBlowing: data.getBalastblowing() })

      dispatch({ type: Cst.Actions.SetSubStatus, SubStatus: data.getMessage() })
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

const responseAirCharging = (dispatch, err, response) => {
  // error -> show in sub status
  if (err) {
    return dispatch({ type: Cst.Actions.SetSubStatus, SubStatus: err.message })
  }
  // show message
  const SubStatus = response.getMessage()
  dispatch({
    type: Cst.Actions.SetSubStatus,
    SubStatus,
  })
  // is charing started ?
  const AirCharging = response.getStatus()
  return dispatch({
    type: Cst.Actions.SetAirCharging,
    AirCharging,
  })
}

export const SetAirChargingStatus = (newStatus) => (
  (dispatch) => {
    const airService = new AirClient(Cst.envoyProxy)
    if (newStatus) {
      airService.chargeStart(new EmptyRequest(), null, (err, response) => {
        responseAirCharging(dispatch, err, response)
      })
      return
    }
    // not starting == stopping
    airService.chargeStop(new EmptyRequest(), null, (err, response) => {
      responseAirCharging(dispatch, err, response)
    })
  }
)

export const SetBalast = (newBalast) => ({
  type: Cst.Actions.SetBalast,
  Balast: newBalast,
})

const responseBalastFilling = (dispatch, err, response) => {
  // error -> show in sub status
  if (err) {
    return dispatch({ type: Cst.Actions.SetSubStatus, SubStatus: err.message })
  }
  // show message
  const SubStatus = response.getMessage()
  dispatch({
    type: Cst.Actions.SetSubStatus,
    SubStatus,
  })
  // is filling started ?
  const BalastFilling = response.getStatus()
  return dispatch({
    type: Cst.Actions.SetBalastFilling,
    BalastFilling,
  })
}

export const SetBalastFilling = (newStatus) => (
  (dispatch) => {
    const balastService = new BalastClient(Cst.envoyProxy)
    if (newStatus) {
      balastService.fillStart(new EmptyRequest(), null, (err, response) => {
        responseBalastFilling(dispatch, err, response)
      })
      return
    }
    // not starting == stopping
    balastService.fillStop(new EmptyRequest(), null, (err, response) => {
      responseBalastFilling(dispatch, err, response)
    })
  }
)

const responseBalastBlowing = (dispatch, err, response) => {
  // error -> show in sub status
  if (err) {
    return dispatch({ type: Cst.Actions.SetSubStatus, SubStatus: err.message })
  }
  // show message
  const SubStatus = response.getMessage()
  dispatch({
    type: Cst.Actions.SetSubStatus,
    SubStatus,
  })
  // is blowing started ?
  const BalastBlowing = response.getStatus()
  return dispatch({
    type: Cst.Actions.SetBalastBlowing,
    BalastBlowing,
  })
}

export const SetBalastBlowing = (newStatus) => (
  (dispatch) => {
    const balastService = new BalastClient(Cst.envoyProxy)
    if (newStatus) {
      balastService.blowStart(new EmptyRequest(), null, (err, response) => {
        responseBalastBlowing(dispatch, err, response)
      })
      return
    }
    // not starting == stopping
    balastService.blowStop(new EmptyRequest(), null, (err, response) => {
      responseBalastBlowing(dispatch, err, response)
    })
  }
)
