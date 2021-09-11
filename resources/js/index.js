import React from 'react';
import ReactDOM from 'react-dom';
import {Tab, Row, Col, Nav} from 'react-bootstrap';
import UploadArea from "./components/UploadArea";

function App() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <h1>Upload area</h1>
                    <div className="uploadWrapper">
                        <h4>Select a job</h4>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row className="no-gutters">
                                <Col lg={3}>
                                    <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="first">
                                                Job 1
                                                <span>Flayer</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="second">
                                                Job 2
                                                <span>Poster</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col lg={9}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <h3>Upload now your Flyer</h3>
                                            <UploadArea />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            <h3>Upload now your Poster</h3>
                                            <div className="uploadAreaBox">
                                                <UploadArea />
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App/>, document.getElementById('root'));
}
