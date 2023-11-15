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

// core components
import PanelHeader from 'components/PanelHeader/PanelHeader.js'
import axios from 'axios'
import NewProduct from './NewProduct'
import { Appcontext } from 'context/Appcontext'
import ProductDetails from './ProductDetails'

function Product () {
  const [details, setDetails] = useState(0)
  const [item, setItem] = useState()
  const [data, setData] = useState([])
  const [newItem, setNewItem] = useState(false)
  const { updateNew, setUpNew } = useState(0);
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

  // update list
  function updateList(e) {
    let item = data.map(v => {
      if (v.pid === e.pid) 
       {
        v.pname = e.pname;
        v.status = e.status;
        v.image = e.image
      }
      return v
    });
    setData(item)
  }
  useEffect(() => {
    setDetails(0)
    axios
      .get('http://localhost:8080/product/list?page=0&sort=pid', {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(localStorage.getItem('token')).token
        }
      })
      .then(res => {
        setData(res.data)
        console.log((res))
      })
  }, [])

  useEffect(() => {
    if (details > 0)
      axios
        .get('http://localhost:8080/product/details?id=' + details, {
          headers: {
            Authorization:
              'Bearer ' + JSON.parse(localStorage.getItem('token')).token
          }
        })
        .then(res => {
          setItem(res.data)
          console.log(res)
        })
        .catch(re => setItem())
  }, [details])

  const createProduct = e => {
    setNewItem(e)
  }
  return (
    <>
      {(item) ? 
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
          <ProductDetails cancel={() => { setItem(); setDetails(0) }}
            props={item.product} priceList={item.prices} update={updateList}  />
        </div>
      : null}
      <div>
        <PanelHeader size='sm' />
        <div className='content'>
          <Row>
            <Col xs={12}>
              <Card>
                <Row>
                  <Col md='6'>
                    <CardHeader>
                      <CardTitle tag='h4'>Product list</CardTitle>
                    </CardHeader>
                  </Col>
                  <Col md='6' className='text-right pr-4'>
                    <Button
                      style={{ backgroundColor: 'green' }}
                      onClick={() => setNewItem(true)}
                    >
                      + Add a new product
                    </Button>
                  </Col>
                </Row>
                <CardBody>
                  <Row>
                    <Col md='12'>find here</Col>
                  </Row>
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
                    >
                      <NewProduct close={createProduct} setUp={setUpNew} up={updateNew} />
                    </div>
                  ) : null}
                  <Table responsive>
                    <thead className='text-primary'>
                      <tr>
                        <th></th>
                        <th className='text-left'>Image</th>
                        <th className='text-left'>ID</th>
                        <th className='text-left'>Product name</th>
                        <th className='text-left'>Quantity</th>
                        <th className='text-left'>Category</th>
                        <th className='text-left'>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((prop, key) => {
                        return (
                          <tr
                            style={{backgroundColor:(prop.status===3)&&'rgb(183,184,188)'}}
                            key={key}
                          >
                            <td>
                              <input type='checkbox' />
                            </td>
                            <td className='text-left'>
                              <img src={prop.image} width={120} />
                            </td>
                            <td>{prop.pid}</td>
                            <td className='text-left'>{prop.pname}</td>
                            <td className='text-left'>{prop.quan}</td>
                            <td className='text-left'>{prop.cname}</td>
                            <td className='text-left'>{prop.sname}</td>
                            <td className='text-right'>
                              <i className="fas fa-trash fa-lg"  style={{ color: 'red', marginRight:'8px',cursor: 'pointer'}}></i> 
                              <i className="fas fa-edit fa-lg" style={{ cursor: 'pointer' }}
                                onClick={() => { setDetails(prop.pid);}}></i>
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

export default Product
