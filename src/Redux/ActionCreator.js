import * as Cst from '../Cst'


// change the water level in the reactor
// every  CstTiming.ReactorLevelUpdate tick
// by the previous calculated ReactorLevelChange
export const ChangeTimer = (refChangeTimer) => (
  (dispatch) => {
    // stop interval if ref to timer is provided
    if (refChangeTimer) {
      clearInterval(refChangeTimer)
      return dispatch({
        type: Cst.Actions.ChangeTimer,
        RefChangeTimer: null,
      })
    }

    const RefChangeTimer = setInterval(() => {
      dispatch({ type: Cst.Actions.Changes })
    }, Cst.CstTiming.Update)

    // store ref to the interval timer in state
    // so it can be stopped, and know that it's already running
    return dispatch({
      type: Cst.Actions.ChangeTimer,
      RefChangeTimer,
    })
  }
)


// Set start conditions
export const SetStart = (StartDepth, StartAir, StartBalance) => (
  {
    type: Cst.Actions.SetStartup,
    StartAir,
    StartBalance,
    StartDepth,

  })

/*
// set pump level, then calc flow
export const SetPump = (PumpName, SetTo, state, dispatch) => {
  const CurrentLevel = state.Pumps[PumpName]
  const CurrentFlow = state.Flows[PumpName]
  const FlowShouldAlreadyBe = Cst.CstFlowMax[PumpName] * CurrentLevel


  const Level = SetTo * 0.25
  const Pumps = { ...state.Pumps, [PumpName]: Level }
  dispatch({
    type: Cst.Actions.SetPump,
    Pumps,
  })

  if (CurrentFlow !== FlowShouldAlreadyBe) {
    // need to first set the change so it can be undone --> React see changes and renders Selector
    // console.warn(`Already changing pump. back to ${CurrentLevel}`)
    const UndoPumps = { ...Pumps, [PumpName]: CurrentLevel }
    dispatch({
      type: Cst.Actions.SetPump,
      Pumps: UndoPumps,
    })
  }
  else {
    SetFlow(PumpName, state.Valves, state.Flows, Pumps, dispatch, ChangeSteamFlow, ChangeSteam)
  }
}

// open or close a valve
// check if a pump is connected --> change flow
export const ToggleValve = (ValveName, PumpName, state, dispatch) => {
  const ValveCurrent = state.Valves[ValveName]
  const NewPosition = !ValveCurrent
  const Valves = { ...state.Valves, [ValveName]: NewPosition }
  dispatch({
    type: Cst.Actions.ToggleValve,
    Valves,
  })


  // a pump is connected to this now closing valve --> stop pump flow
  if (PumpName && !NewPosition) {
    // SetFlow(PumpName, 0, state, dispatch)
    SetPump(PumpName, 0, state, dispatch)
  }
  // a pump is connected &  intake valve was already open,
  // now opening this output valve --> set flow
  if (PumpName
    && ValveName.includes(Cst.CstOutputValve)
    && NewPosition
    && Valves[`${PumpName}_${Cst.CstIntakeValve}`]) {
    // const Flow = CalcFlow(PumpName, PumpLevel)
    // SetFlow(PumpName, Flow, state, dispatch)
    SetFlow(PumpName, Valves, state.Flows, state.Pumps, dispatch, ChangeSteamFlow, ChangeSteam)
  }
  // a pump is connected
  // output valve is open
  // now opening this input valve --> set flow
  if (PumpName
    && ValveName.includes(Cst.CstIntakeValve)
    && NewPosition
    && Valves[`${PumpName}_${Cst.CstOutputValve}`]) {
    // const Flow = CalcFlow(PumpName, PumpLevel)
    // SetFlow(PumpName, Flow, state, dispatch)
    SetFlow(PumpName, Valves, state.Flows, state.Pumps, dispatch, ChangeSteamFlow, ChangeSteam)
  }
}

*/
