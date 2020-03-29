import React from 'react'

import { Col, Row } from 'react-reflex-grid'
// import { useSelector } from 'react-redux'

import AirComponent from '../Components/AirComponent'
import BalastComponent from '../Components/BalastComponent'
import DepthComponent from '../Components/DepthComponent'

const DivePanel = () => (
  <>
    <Row>
      <Col auto>
        <AirComponent />
      </Col>

      <Col auto>
        <BalastComponent />
      </Col>

      <Col auto>
        <DepthComponent />
      </Col>
    </Row>
  </>
)

export default DivePanel
