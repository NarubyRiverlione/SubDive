import * as Cst from '../Cst'
import { EmptyRequest } from './Subber_pb'
import { AirClient, ConnClient, BalastClient } from './Subber_grpc_web_pb'

// show new Status message and remove it after Cst RemoveStatusMsg
const ShowStatusMsg = (newMsg, dispatch, getState) => {
  // check for new status msg
  const { SubStatus: currentStatusMsg } = getState()

  if (newMsg !== '' && currentStatusMsg !== newMsg) {
    dispatch({ type: Cst.Actions.SetSubStatus, SubStatus: newMsg })
    setTimeout(() => {
      // clear msg after timeout
      dispatch({ type: Cst.Actions.SetSubStatus, SubStatus: '' })
    }, Cst.CstTiming.RemoveStatusMsg)
  }
}

// Set start conditions & connect to the streaming gRpc server for updates
export const SetStart = (StartDepth, StartAir, StartBalast) => (
  (dispatch, getState) => {
    // start gRpc stream to get continues info
    const connService = new ConnClient(Cst.envoyProxy)
    const statusStream = connService.startStatusUpdates(new EmptyRequest(), null)

    statusStream.on('data', (data) => {
      const {
        Air, Depth, Balast, AirCharging, BalastBlowing, BalastFilling,
      } = getState()
      const newState = data.toObject()
      if (newState.air !== Air) {
        dispatch({ type: Cst.Actions.SetAir, Air: newState.air })
      }
      if (newState.depth !== Depth) {
        dispatch({ type: Cst.Actions.SetDepth, Depth: newState.depth })
      }
      if (newState.balast !== Balast) {
        dispatch({ type: Cst.Actions.SetBalast, Balast: newState.balast })
      }

      if (newState.aircharging !== AirCharging) {
        dispatch({ type: Cst.Actions.SetAirCharging, AirCharging: newState.aircharging })
      }
      if (newState.balastfilling !== BalastFilling) {
        dispatch({ type: Cst.Actions.SetBalastFilling, BalastFilling: newState.balastfilling })
      }
      if (newState.balastblowing !== BalastBlowing) {
        dispatch({ type: Cst.Actions.SetBalastBlowing, BalastBlowing: newState.balastblowing })
      }

      ShowStatusMsg(newState.message, dispatch, getState)
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

const responseAirCharging = (dispatch, getState, err, response) => {
  // error -> show in sub status
  if (err) {
    return dispatch({ type: Cst.Actions.SetSubStatus, SubStatus: err.message })
  }
  // show message
  const newMsg = response.getMessage()
  ShowStatusMsg(newMsg, dispatch, getState)
  // is charing started ?
  const AirCharging = response.getStatus()
  return dispatch({
    type: Cst.Actions.SetAirCharging,
    AirCharging,
  })
}

export const SetAirChargingStatus = (newStatus) => (
  (dispatch, getState) => {
    const airService = new AirClient(Cst.envoyProxy)
    if (newStatus) {
      airService.chargeStart(new EmptyRequest(), null, (err, response) => {
        responseAirCharging(dispatch, getState, err, response)
      })
      return
    }
    // not starting == stopping
    airService.chargeStop(new EmptyRequest(), null, (err, response) => {
      responseAirCharging(dispatch, getState, err, response)
    })
  }
)

export const SetBalast = (newBalast) => ({
  type: Cst.Actions.SetBalast,
  Balast: newBalast,
})

const responseBalastFilling = (dispatch, getState, err, response) => {
  // error -> show in sub status
  if (err) {
    return dispatch({ type: Cst.Actions.SetSubStatus, SubStatus: err.message })
  }
  // // show message
  const SubStatus = response.getMessage()
  ShowStatusMsg(SubStatus, dispatch, getState)
  // is filling started ?
  const BalastFilling = response.getStatus()
  return dispatch({
    type: Cst.Actions.SetBalastFilling,
    BalastFilling,
  })
}

export const SetBalastFilling = (newStatus) => (
  (dispatch, getState) => {
    const balastService = new BalastClient(Cst.envoyProxy)
    if (newStatus) {
      balastService.fillStart(new EmptyRequest(), null, (err, response) => {
        responseBalastFilling(dispatch, getState, err, response)
      })
      return
    }
    // not starting == stopping
    balastService.fillStop(new EmptyRequest(), null, (err, response) => {
      responseBalastFilling(dispatch, getState, err, response)
    })
  }
)

const responseBalastBlowing = (dispatch, getState, err, response) => {
  // error -> show in sub status
  if (err) {
    return dispatch({ type: Cst.Actions.SetSubStatus, SubStatus: err.message })
  }
  // // show message
  const SubStatus = response.getMessage()
  ShowStatusMsg(SubStatus, dispatch, getState)
  // is blowing started ?
  const BalastBlowing = response.getStatus()
  return dispatch({
    type: Cst.Actions.SetBalastBlowing,
    BalastBlowing,
  })
}

export const SetBalastBlowing = (newStatus) => (
  (dispatch, getState) => {
    const balastService = new BalastClient(Cst.envoyProxy)
    if (newStatus) {
      balastService.blowStart(new EmptyRequest(), null, (err, response) => {
        responseBalastBlowing(dispatch, getState, err, response)
      })
      return
    }
    // not starting == stopping
    balastService.blowStop(new EmptyRequest(), null, (err, response) => {
      responseBalastBlowing(dispatch, getState, err, response)
    })
  }
)
