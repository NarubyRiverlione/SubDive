import React from 'react'

import { Col, Row } from 'react-reflex-grid'
import { useSelector } from 'react-redux'
import { CstText } from '../Cst'
import Display from '../Components/ControlElements/Display'

const DivePanel = () => {
  const { PanelTxt } = CstText
  const Air = useSelector((state) => state.Air)
  const Balast = useSelector((state) => state.Balast)
  const Depth = useSelector((state) => state.Depth)


  return (
    <>
      <Row>
        <Col auto>
          <Row>
            <Display
              Title={PanelTxt.Air.Title}
              Width={50}
              Text={Air.toString(10)}
              Suffix={PanelTxt.Air.Suffix}
            />
          </Row>
        </Col>


        <Col auto>
          <Row>
            <Display
              Title={PanelTxt.Balast.Title}
              Width={50}
              Text={Balast.toString(10)}
              Suffix={PanelTxt.Balast.Suffix}
            />
          </Row>
        </Col>


        <Col auto>
          <Row>
            <Display
              Title={PanelTxt.Depth.Title}
              Width={50}
              Text={Depth.toString(10)}
              Suffix={PanelTxt.Depth.Suffix}
            />
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default DivePanel
