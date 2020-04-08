import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row } from 'react-reflex-grid'

import { SetAirChargingStatus } from '../Redux/ActionCreator'
import { CstText } from '../Cst'
import Display from './ControlElements/Display'
import Button from './ControlElements/Button'

const AirComponent = () => {
  const { PanelTxt: { Air: AirTxt } } = CstText
  const { Air, AirCharging } = useSelector((state) => ({
    Air: state.Air,
    AirCharging: state.AirCharging,
  }))
  const dispatch = useDispatch()


  return (
    <React.Fragment>
      {// Station title & display
      }
      <Row>
        <Col auto>
          <Display
            Title={AirTxt.Title}
            Width={50}
            Text={Air.toString(10)}
            Suffix={AirTxt.Suffix}
          />
        </Col>
      </Row>

      <Row direction-column>
        {// Action title
        }
        <Col size={1}>
          <span className="subtitel">{AirTxt.Charge}</span>
        </Col>

        { // Cmd buttons
        }

        <Col size={1} className="grid">
          <Button
            Width={100}
            Caption={AirTxt.BtnStart}
            Color="SteelBlue"
            TextColor="FloralWhite"
            cb={() => dispatch(SetAirChargingStatus(true))}
            SetPressed={AirCharging}
          />
        </Col>

        <Col size={1} className="grid">
          <Button
            Width={100}
            Caption={AirTxt.BtnStop}
            Color="SteelBlue"
            TextColor="FloralWhite"
            cb={() => dispatch(SetAirChargingStatus(false))}
            SetPressed={!AirCharging}
          />
        </Col>
        <Col auto>
          <div />
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default AirComponent
