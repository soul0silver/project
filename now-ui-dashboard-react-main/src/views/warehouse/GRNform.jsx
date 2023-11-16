import React, { useContext, useEffect, useRef, useState } from 'react'

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Table
} from 'reactstrap'

import { useFormik } from 'formik'

import * as Yup from 'yup'
import { Appcontext } from 'context/Appcontext'
import ReactNotificationAlert from 'react-notification-alert'
import { saveSupplier } from 'Service/SupplierService'
import PanelHeader from 'components/PanelHeader/PanelHeader'
import { getListSupplier } from 'Service/SupplierService'
import { searchStock } from 'Service/WarehouseService'
import { findEmpByName } from 'Service/EmpolyeeService'
import { saveGRN } from 'Service/WarehouseService'
import { Link, useNavigate } from 'react-router-dom'
const GRNform = props => {
  const {update, setUpdate } = useContext(Appcontext)
  const [supplier, setSup] = useState([])
  const [stores, setStore] = useState(0)
  const [employee, setEm] = useState()
  const [searchVal, setSearchVal] = useState([]);
  const [quanArr, setQuanArr] = useState([]);
  const [listStock, setList] = useState([]);

  useEffect(() => {
    getListSupplier().then(res => setSup(res))
  }, [])
  useEffect(() => {
    findEmpByName(JSON.parse(window.localStorage.getItem('token')).username).then(res => { setEm(res);})
  }, [])
  const formik = useFormik({
    initialValues: {
      id: '',
      date_create: '',
      date_in: '',
      deliver:0,
      supplier: 0,
      store: 0,
      status: false
    },
    validationSchema: Yup.object({
      id: Yup.string(),
      date_in: Yup.date().required('Required'),
      deliver: Yup.number().required('required').min(1),
      supplier: Yup.string().required('required'),
      store: Yup.number().required().min(1),
      status: Yup.boolean(),
      date_create: Yup.date().required('Required')
    }),
    onSubmit: async value => {
      console.log({ receipt: value, list: listStock, quan: quanArr });
      let res = await saveGRN({receipt:value,list:listStock,quan:quanArr})
      console.log(res)
      if (res.includes('success')) {
        formik.resetForm()
        notify('tc', 2, res)
        setUpdate(update + 1)
      } else notify('tc', 3, res)
    }
  })
  useEffect(() => {
    if (employee)
    {
      formik.values.deliver = employee.eid;
      formik.values.store = employee.store;
      setStore(employee.store);
    }
 },[employee])
  const notificationAlert = React.useRef()
  const notify = (place, color, message) => {
    var type
    switch (color) {
      case 1:
        type = 'primary'
        break
      case 2:
        type = 'success'
        break
      case 3:
        type = 'danger'
        break
      case 4:
        type = 'warning'
        break
      case 5:
        type = 'info'
        break
      default:
        break
    }
    var options = {}
    options = {
      place: place,
      message: (
        <div>
          <div>{message}</div>
        </div>
      ),
      type: type,
      icon: 'now-ui-icons ui-1_bell-53',
      autoDismiss: 6
    }
    notificationAlert.current.notificationAlert(options)
  }
  const [search, setSearch] = useState('')
  useEffect(() => {
    if (search !== '')
      searchStock(search, stores).then(res => setSearchVal(res));
    
  }, [search]);
  const navi = useNavigate();
  const handlBack = (e) => {
    e.preventDefault();
    navi('/main/warehouse')
  }
  return (
    <>
      <ReactNotificationAlert ref={notificationAlert} />
      <PanelHeader size='sm' />
      <div className='content' onClick={()=>setSearchVal()}>
        <Col>
          <Card>

              <Col md='8' className='text-left pl-4 pt-4'>
               <Link onClick={handlBack}>Warehouse</Link><span style={{color:'rgb(56, 142, 218)'}}>{' >> '}New Good Receipt note</span>
              </Col>
          
            <CardBody className='product_form'>
              <Row>
                <Col>
                  <div>
                    <InputGroup className='no-border'>
                      <Input
                        
                        placeholder={
                           'Search ...'
                        }
                        onChange={e => setSearch(e.target.value)}
                      />
                      <InputGroupAddon addonType='append'>
                        <InputGroupText>
                          <i className='now-ui-icons ui-1_zoom-bold' />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {(searchVal) && <Table style={{ position: 'absolute',zIndex:3,backgroundColor:'#fff',border:'1px solid black'}}>
                      <tbody>
                        {searchVal.map((v, i) => (
                          <tr  className='resultSearch' key={v.qid} onClick={() =>
                          { setQuanArr([...quanArr, 0]); (listStock.filter(va=>va.qid===v.qid).length===0)&&setList([...listStock,v])  ;setSearchVal([]) }}>
                            <td>{v.pname}</td>
                            <td>{v.size}</td>
                            <td>{v.color}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>}
                  </div>
                  <Table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>ROM</th>
                        <th>Color</th>
                        <th>Quantity</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {listStock?.map((v,i)=><tr key={i}>
                      <td>{v.pname}</td>
                      <td>{v.size}</td>
                      <td>{v.color}</td>
                      <td><Input type='number' min={0} style={{width:'60px'}}
                        value={quanArr[i]}
                        onChange={(e) => { let newItem = quanArr; newItem[i] = Number(e.target.value); setQuanArr(newItem);setUpdate(update+1) }}></Input></td>
                      <td><i className='fas fa-trash fa-lg'
                                style={{
                                  color: 'red',
                                  marginRight: '8px',
                                  cursor: 'pointer'
                        }}
                        onClick={()=>setList(listStock.filter(val=>val.qid!==v.qid))}
                      ></i>
                      </td>
                    </tr>)}
                      
                    </tbody>    
                  </Table>
                </Col>
                <Col>
                  <Form method='POST' onSubmit={formik.handleSubmit}>
                    <Col>
                      <div>
                      <Col md='12'>
                          <FormGroup
                            className={
                              !formik.touched.id
                                ? ''
                                : !formik.errors.id &&
                                  formik.values.id !== ''
                                ? 'has-success form-group'
                                : 'has-danger form-group'
                            }
                          >
                            <label>GRN No.</label>
                            <Input
                              required
                              onBlur={formik.handleBlur}
                              placeholder='IMPxxx'
                              name='id'
                              type='text'
                              value={formik.values.id}
                              onChange={formik.handleChange}
                              onFocus={formik.handleBlur}
                            />
                          </FormGroup>
                        </Col>
                        <Col md='12'>
                          <FormGroup
                            className={
                              !formik.touched.date_create
                                ? ''
                                : !formik.errors.date_create &&
                                  formik.values.date_create !== ''
                                ? 'has-success form-group'
                                : 'has-danger form-group'
                            }
                          >
                            <label>Date recieved</label>
                            <Input
                              required
                              onBlur={formik.handleBlur}
                              name='date_create'
                              type='datetime-local'
                              value={formik.values.date_create}
                              onChange={formik.handleChange}
                              onFocus={formik.handleBlur}
                            />
                          </FormGroup>
                        </Col>
                        <Col md='12'>
                          <FormGroup
                            className={
                              !formik.touched.date_in
                                ? ''
                                : !formik.errors.date_in &&
                                  formik.values.date_in !== ''
                                ? 'has-success form-group'
                                : 'has-danger form-group'
                            }
                          >
                            <label>Date recieved</label>
                            <Input
                              required
                              onBlur={formik.handleBlur}
                              name='date_in'
                              type='date'
                              value={formik.values.date_in}
                              onChange={formik.handleChange}
                              onFocus={formik.handleBlur}
                            />
                          </FormGroup>
                        </Col>
                        <Col md='12'>
                          <FormGroup
                            className={
                              !formik.touched.supplier
                                ? ''
                                : !formik.errors.supplier &&
                                  formik.values.supplier !== ''
                                ? 'has-success form-group'
                                : 'has-danger form-group'
                            }
                          >
                            <label>Supplier name</label>
                            <Input
                              required
                              name='supplier'
                              onChange={formik.handleChange}
                              placeholder='Supplier name'
                              type='select'
                              value={formik.values.supplier}
                              onBlur={formik.handleBlur}
                              onFocus={formik.handleBlur}
                            >
                              <option value=''></option>
                              {supplier.map((v, i) => (
                                <option key={i} value={v.id}>
                                  {v.name}
                                </option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>

                        <Col md='12'>
                          <FormGroup
                            className={
                              !formik.touched.store
                                ? ''
                                : !formik.errors.store &&
                                  formik.values.store !== 0
                                ? 'has-success form-group'
                                : 'has-danger form-group'
                            }
                          >
                            <label>Store</label>
                            <Input
                              required
                              name='store'
                              onFocus={formik.handleBlur}
                              onChange={e => {
                                formik.handleChange(e)
                                setStore(Number(e.target.value))
                              }}
                              type='select'
                              value={employee?.store}
                              onBlur={formik.handleBlur}
                            >
                              <option value={Number(0)}></option>
                              <option value={Number(1)}>Ha Noi</option>
                              <option value={Number(2)}>Hai Phong</option>
                              <option value={Number(3)}>Quang Ninh</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md='12'>
                          <FormGroup
                            className={
                              !formik.touched.deliver
                                ? ''
                                : !formik.errors.deliver &&
                                  formik.values.deliver !== 0
                                ? 'has-success form-group'
                                : 'has-danger form-group'
                            }
                          >
                            <label>Deliver</label>
                            <Input
                              required
                              name='deliver'
                              type='text'
                              value={employee?.firstname+' '+employee?.lastname}
                              style={{ color: 'black' }}
                            >
                              
                            
                            </Input>
                          </FormGroup>
                        </Col>
                      </div>
                      <Col md='12' className='text-center'>
                        <Button type='submit'>SAVE</Button>
                      </Col>
                    </Col>
                  </Form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </div>
    </>
  )
}

export default GRNform
