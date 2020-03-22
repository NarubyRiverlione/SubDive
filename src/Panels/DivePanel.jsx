import React from 'react'

import { Col, Row } from 'react-reflex-grid'

const DivePanel = () => (
  <>
    <Row>
      <Col auto>
        <span className="title">Air</span>
      </Col>
      <Col auto>
        <span className="title">Balast</span>
      </Col>
      <Col auto>
        <span className="title">Depth</span>
      </Col>
    </Row>
  </>
)

export default DivePanel
