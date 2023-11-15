/*!

=========================================================
* Now UI Dashboard React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useContext, useEffect, useState } from 'react'

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Input,
  FormGroup,
  Label
} from 'reactstrap'

import PanelHeader from 'components/PanelHeader/PanelHeader.js'
import { Appcontext } from 'context/Appcontext'
import { getListSupplier } from 'Service/SupplierService'
import NewSupplier from './NewSupplier'

function Supplier () {
  const [details, setDetails] = useState(0)
  const [item, setItem] = useState()
  const [data, setData] = useState([])
  const [newItem, setNewItem] = useState(false)
  const { update, setUpdate } = useContext(Appcontext)
  const [search, setSearch] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    identification: '',
    aidf: 1,
    aidl: 3,
    salf: 0,
    sall: 10,
    storef: 1,
    storel: 3,
    yf: 0,
    yl: 2023,
    mf: 1,
    ml: 12,
    df: 1,
    dl: 31
  })

  useEffect(() => {
    setDetails(0)
    getListSupplier().then(res => setData(res))
  }, [update])

  const createSupplier = e => {
    setNewItem(e)
  }
  return (
    <>
      {item ? (
        <div
          style={{
            position: 'fixed',
            zIndex: 1032,
            top: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            paddingTop: 80,
            backgroundColor: 'rgba(0,0,0,0.4)'
          }}
        >
          {/* <ProductDetails cancel={() => { setItem(); setDetails(0)}} props={item.product} priceList={item.prices}/> */}
        </div>
      ) : null}
      {newItem ? (
        <div
          style={{
            position: 'fixed',
            zIndex: 1032,
            top: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            paddingTop: 80,
            backgroundColor: 'rgba(0,0,0,0.4)'
          }}
        ><div>
          <NewSupplier close={createSupplier} /></div>
        </div>
      ) : null}
      <div>
        <PanelHeader size='sm' />
        <div className='content'>
          <Row>
            <Col xs={12}>
              <Card>
                <Row>
                  <Col md='6'>
                    <CardHeader>
                      <CardTitle tag='h4'>Supplier list</CardTitle>
                    </CardHeader>
                  </Col>
                  <Col md='6' className='text-right pr-4'>
                    <Button
                      style={{ backgroundColor: 'green' }}
                      onClick={() => setNewItem(true)}
                    >
                      + Add a new supplier
                    </Button>
                  </Col>
                </Row>
                <CardBody>
                  <Row>
                    <Col md='12'>find here</Col>
                  </Row>

                  <Table responsive>
                    <thead className='text-primary'>
                      <tr>
                        <th className='text-left'>ID</th>
                        <th className='text-left'>Supplier name</th>
                        <th className='text-left'>Phone</th>
                        <th className='text-left'>Email</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((prop, key) => {
                        return (
                          <tr
                            style={{
                              backgroundColor:
                                prop.status === 3 && 'rgb(183,184,188)'
                            }}
                            key={key}
                          >
                            <td>{prop.id}</td>
                            <td className='text-left'>{prop.name}</td>
                            <td className='text-left'>{prop.phone}</td>
                            <td className='text-left'>{prop.email}</td>
                            <td className='text-right'>
                              <i
                                className='fas fa-trash fa-lg'
                                style={{
                                  color: 'red',
                                  marginRight: '8px',
                                  cursor: 'pointer'
                                }}
                              ></i>
                              <i
                                className='fas fa-edit fa-lg'
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setDetails(prop.id)
                                }}
                              ></i>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Supplier
