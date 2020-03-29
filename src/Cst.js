export const CstText = {
  Title: 'Sub Dive',
  PanelTxt: {
    Title: 'Dive Panel',
    Air: { Title: 'Air', Suffix: '%', BtnFill: 'Charge' },
    Balast: {
      Title: 'Balast', Suffix: '%', BtnPlus: '+', BtnMin: '-',
    },
    Depth: {
      Title: 'Depth', Suffix: 'meters', BtnPlus: '+', BtnMin: '-',
    },
  },
}

export const CstDelta = {
  ChargeAir: 5,
  Balast: 10,
  Depth: 1,

  AirUsedBlowing: -10,
}


export const Actions = {
  ToggleValves: 'TOGGLE_VALVE',
  SetPump: 'SET_PUMP',
  ChangeDepth: 'CHANGE_DEPTH',

  ChangeAir: 'CHANGE_AIR',
  SetDeltaAir: 'SET_DELTA_AIR',

  SetDeltaBalast: 'SET_DELTA_BALAST',

  StartTimer: 'SAVE_REF_TIMER',
  StopTimer: 'REMOVE_REF_TIMER',
  TickTimer: 'TICK_TIMER',

  SetSubStatus: 'SET_SUB_STATUS',
  SetStartup: 'STARTUP',
}

export const CstTiming = {
  Update: 1000,
}
