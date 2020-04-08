import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-reflex-grid'

import { SetBalastFilling, SetBalastBlowing } from '../Redux/ActionCreator'
import { CstText } from '../Cst'
import Display from './ControlElements/Display'
import Button from './ControlElements/Button'


const BalastComponent = () => {
  const { PanelTxt: { Balast: BalastTxt } } = CstText
  const { Balast, BalastFilling, BalastBlowing } = useSelector((state) => ({
    Balast: state.Balast,
    BalastFilling: state.BalastFilling,
    BalastBlowing: state.BalastBlowing,
  }))
  const dispatch = useDispatch()


  return (
    <React.Fragment>
      <Row>
        <Col auto>
          <Display
            Title={BalastTxt.Title}
            Width={50}
            Text={Balast.toString(10)}
            Suffix={BalastTxt.Suffix}
          />
        </Col>
      </Row>

      <Row>
        <Col size={6}>
          <Row direction-column>
            <Col size={1}>
              <span className="subtitel">{BalastTxt.Fill}</span>
            </Col>
            <Col size={1} className="grid">
              <Button
                Width={100}
                Caption={BalastTxt.BtnStart}
                Color="SteelBlue"
                TextColor="FloralWhite"
                cb={() => dispatch(SetBalastFilling(true))}
                SetPressed={BalastFilling}
              />
            </Col>
            <Col size={1} className="grid">
              <Button
                Width={100}
                Caption={BalastTxt.BtnStop}
                Color="SteelBlue"
                TextColor="FloralWhite"
                cb={() => dispatch(SetBalastFilling(false))}
                SetPressed={!BalastFilling}
              />
            </Col>
          </Row>
        </Col>

        <Col size={6}>
          <Row direction-column>
            <Col size={1}>
              <span className="subtitel">{BalastTxt.Blow}</span>
            </Col>
            <Col size={1} className="grid">
              <Button
                Width={100}
                Caption={BalastTxt.BtnStart}
                Color="SteelBlue"
                TextColor="FloralWhite"
                cb={() => dispatch(SetBalastBlowing(true))}
                SetPressed={BalastBlowing}
              />
            </Col>
            <Col size={1} className="grid">
              <Button
                Width={100}
                Caption={BalastTxt.BtnStop}
                Color="SteelBlue"
                TextColor="FloralWhite"
                cb={() => dispatch(SetBalastBlowing(false))}
                SetPressed={!BalastBlowing}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default BalastComponent
