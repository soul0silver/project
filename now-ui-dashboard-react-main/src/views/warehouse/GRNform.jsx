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
  InputGroupText
} from 'reactstrap'

import { useFormik } from 'formik'

import * as Yup from 'yup'
import { Appcontext } from 'context/Appcontext'
import ReactNotificationAlert from 'react-notification-alert'
import { saveSupplier } from 'Service/SupplierService'
import PanelHeader from 'components/PanelHeader/PanelHeader'
import { searchValue } from 'Service/WarehouseService'
import { getListSupplier } from 'Service/SupplierService'
import { findEmpByStore } from 'Service/EmpolyeeService'
const GRNform = props => {
  const { update, setUpdate } = useContext(Appcontext)
  const [supplier, setSup] = useState([])
  const [stores, setStore] = useState(0)
  const [employee, setEm] = useState([])

  useEffect(() => {
    getListSupplier().then(res => setSup(res))
  }, [])

  const formik = useFormik({
    initialValues: {
      id: 0,
      date_create: '',
      date_in: '',
      deliver: 0,
      supplier: '',
      store: 0,
      status: false
    },
    validationSchema: Yup.object({
      id: Yup.number(),
      date_in: Yup.date().required('Required'),
      deliver: Yup.number().required('required').min(1),
      supplier: Yup.string().required('required'),
      store: Yup.number().required().min(1),
      status: Yup.boolean(),
      date_create: Yup.date().required('Required')
    }),
    onSubmit: async value => {
      let res = await saveSupplier(value)
      console.log(res)
      if (res.includes('success')) {
        formik.resetForm()
        notify('tc', 2, res.message)
        setUpdate(update + 1)
      } else notify('tc', 3, res)
    }
  })
  useEffect(() => {
    findEmpByStore(stores).then(res => setEm(res))
    console.log(formik.values)
  }, [stores])
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
  const [search, setSearch] = useState()
  useEffect(() => {
    if (search) searchValue(search, 1).then(res => console.log(res))
  }, [search])
  return (
    <>
      <ReactNotificationAlert ref={notificationAlert} />
      <PanelHeader size='sm' />
      <div className='content'>
        <Col>
          <Card>
            <Row>
              <Col md='8' className='text-left pl-4 pt-4'>
                <CardTitle>
                  <h6 className='title'>Fill supplier's info</h6>
                </CardTitle>
              </Col>
            </Row>
            <CardBody className='product_form'>
              <Row>
                <Col>
                  <InputGroup className='no-border'>
                    <Input
                      placeholder='Search...'
                      onChange={e => setSearch(e.target.value)}
                    />
                    <InputGroupAddon addonType='append'>
                      <InputGroupText>
                        <i className='now-ui-icons ui-1_zoom-bold' />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <div></div>
                </Col>
                <Col>
                  <Form method='POST' onSubmit={formik.handleSubmit}>
                    <Col>
                      <div>
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
                                setStore(e.target.value)
                              }}
                              type='select'
                              value={formik.values.phone}
                              onBlur={formik.handleBlur}
                            >
                              <option value={0}></option>
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
                              onFocus={formik.handleBlur}
                              onChange={formik.handleChange}
                              type='select'
                              value={formik.values.deliver}
                              onBlur={formik.handleBlur}
                            >
                              <option value=''></option>
                              {employee.map((v, i) => (
                                <option key={i} value={v.eid}>
                                  {v.firstname + ' ' + v.lastname}
                                </option>
                              ))}
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
