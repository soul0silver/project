import App from 'App';
import { getListImport } from 'Service/WarehouseService';
import PanelHeader from 'components/PanelHeader/PanelHeader'
import { Appcontext } from 'context/Appcontext';
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table
} from 'reactstrap'

function Warehouses() {
  const [on, setOn] = useState(1)
  const [data, setData] = useState([]);
  const navi = useNavigate();
  const { setBack } = useContext(Appcontext);

  useEffect(() => {
    getListImport(0, 0, "id").then(res => setData(res.content))
  }, []);
  const handleLink = (e) => {
    e.preventDefault();
    setBack('/main/warehouse');
    navi('/main/new-good-recieved-note')
  }
  return (
    <>
      <PanelHeader size='sm' />
      <div className='content'>
        
          <Row>
            <Col xs={12}>
              <Card>
                <Col md='12'>
                  <CardHeader>
                    <CardTitle>
                      <h6>Warehouseing</h6>
                    </CardTitle>
                  </CardHeader>
                </Col>
              <CardBody>
                    <Col style={{display:'flex'}}>
                      <div
                        className='warehouse_action'
                        style={{ padding: 10 }}
                        onClick={() => setOn(1)}
                      >
                        <div
                          style={{
                            borderBottom:
                              on === 1 && '2px solid rgb(56, 142, 218)',
                            color: on === 1 && 'rgb(56, 142, 218)'
                          }}
                        >
                          <h6>Import</h6>
                        </div>
                      </div>
                      <div
                        className='warehouse_action'
                        style={{ padding: 10 }}
                        onClick={() => setOn(2)}
                      >
                        <div
                          style={{
                            borderBottom:
                              on === 2 && '2px solid rgb(56, 142, 218)',
                            color: on === 2 && 'rgb(56, 142, 218)'
                          }}
                        >
                          <h6>Export</h6>
                        </div>
                      </div>
                    </Col>
                    {(on === 1) && <>
                      <Col>
                        <Row>
                          <Col>
                            <Button onClick={handleLink}>
                              <span>New GRN</span>
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Table responsive>
                              <thead style={{ fontSize: '9pt' }}>
                                <tr>
                                  <th>Date import</th>
                                  <th>Receipt No</th>
                                  <th>Supplier</th>
                                  <th>At Store</th>
                                  <th>Deliver</th>
                                  <th>Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data?.map((prop, key) => {
                                  return (
                                    <tr
                                      style={{
                                        backgroundColor:
                                          prop.status === 3 && 'rgb(183,184,188)'
                                      }}
                                      key={key}
                                    >
                                      <td>{prop.date_in}</td>
                                      <td>{prop.id}</td>
                                      <td>{prop.supplier}</td>
                                      <td>{prop.store}</td>
                                      <td>{prop.deliver}</td>
                                      <td>{prop.status}</td>
                                      <td className='text-right'>
                                        <i className="fas fa-edit fa-lg" style={{ cursor: 'pointer' }}
                                        ></i>
                                      </td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      </Col>
                    </>}
              </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      <div className=''>
          {/* <Col xs='12'>
            <Card>
              <Row>
                <Col md='12'>
                  <CardHeader>
                    <CardTitle>
                      <h6>Warehouseing</h6>
                    </CardTitle>
                  </CardHeader>
                </Col>
              </Row>
              <CardBody>
                <Row>
                  <Col>
                    <Row>
                      <div
                        className='warehouse_action'
                        style={{ padding: 10 }}
                        onClick={() => setOn(1)}
                      >
                        <div
                          style={{
                            borderBottom:
                              on === 1 && '2px solid rgb(56, 142, 218)',
                            color: on === 1 && 'rgb(56, 142, 218)'
                          }}
                        >
                          <h6>Import</h6>
                        </div>
                      </div>
                      <div
                        className='warehouse_action'
                        style={{ padding: 10 }}
                        onClick={() => setOn(2)}
                      >
                        <div
                          style={{
                            borderBottom:
                              on === 2 && '2px solid rgb(56, 142, 218)',
                            color: on === 2 && 'rgb(56, 142, 218)'
                          }}
                        >
                          <h6>Export</h6>
                        </div>
                      </div>
                    </Row>
                    {(on === 1) && <>
                      <Col>
                        <Row>
                          <Col>
                            <Button>
                              <span>New GRN</span>
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Table responsive>
                              <thead style={{ fontSize: '9pt' }}>
                                <tr>
                                  <th>Date import</th>
                                  <th>Receipt No</th>
                                  <th>Supplier</th>
                                  <th>At Store</th>
                                  <th>Deliver</th>
                                  <th>Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data?.map((prop, key) => {
                                  return (
                                    <tr
                                      style={{
                                        backgroundColor:
                                          prop.status === 3 && 'rgb(183,184,188)'
                                      }}
                                      key={key}
                                    >
                                      <td>{prop.date_in}</td>
                                      <td>{prop.id}</td>
                                      <td>{prop.supplier}</td>
                                      <td>{prop.store}</td>
                                      <td>{prop.deliver}</td>
                                      <td>{prop.status}</td>
                                      <td className='text-right'>
                                        <i className="fas fa-edit fa-lg" style={{ cursor: 'pointer' }}
                                        ></i>
                                      </td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      </Col>
                    </>}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col> */}
      </div>
    </>
  )
}
export default Warehouses
