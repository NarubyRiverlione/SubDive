
export const envoyProxy = 'http://localhost:8080'

export const CstText = {
  Title: 'Sub Dive',
  PanelTxt: {
    Title: 'Conn',
    Air: {
      Title: 'Air',
      Suffix: '%',
      BtnStart: 'Start',
      BtnStop: 'Stop',
      Charge: 'Charge',
    },
    Balast: {
      Title: 'Balast',
      Suffix: '%',
      BtnStart: 'Start',
      BtnStop: 'Stop',
      Fill: 'Fill',
      Blow: 'Blow',
    },
    Depth: {
      Title: 'Depth', Suffix: 'meters',
    },
  },
}

export const Actions = {
  SetDepth: 'SET_DEPTH',

  SetAir: 'SET_AIR',
  SetAirCharging: 'CHARING_AIR',

  SetBalast: 'SET_BALAST',
  SetBalastFilling: 'SET_FILLING_BALAST',
  SetBalastBlowing: 'SET_BLOWING_BALAST',

  SetSubStatus: 'SET_SUB_STATUS',
  SetStartup: 'STARTUP',
}

export const CstTiming = {
  Update: 1000,
}
