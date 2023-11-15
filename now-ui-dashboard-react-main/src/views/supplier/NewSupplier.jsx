import React, { useContext, useEffect, useState } from 'react'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  CardTitle
} from 'reactstrap'

import { useFormik } from 'formik'

import * as Yup from 'yup'
import { Appcontext } from 'context/Appcontext'
import ReactNotificationAlert from 'react-notification-alert'
import { saveSupplier } from 'Service/SupplierService'
const NewSupplier = props => {
  const { update, setUpdate } = useContext(Appcontext)

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      phone: '',
      email: '',
      status: true
    },
    validationSchema: Yup.object({
      pid: Yup.number(),
      name: Yup.string().required('Required'),
      phone: Yup.string()
        .required('required')
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Invalid phone number'),
      email: Yup.string()
        .required('required')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'invalid email')
    }),
    onSubmit: async  value => {
      let res = await saveSupplier(value);
      console.log(res)
      if (res.includes('success')) {
        formik.resetForm()
        notify('tc', 2, res)
        setUpdate(update + 1)
      } else notify('tc', 3, res)
    }
  })

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
  return (
    <>
      <ReactNotificationAlert ref={notificationAlert} />
     
        <div className='content' style={{width:500}}>
          
            <Col >
              <Card>
                <Row>
                  <Col md='8'className='text-left pl-4 pt-4'>
                    <CardTitle>
                      <h6 className='title'>Fill supplier's info</h6>
                    </CardTitle>
                  </Col>
                  <Col md='4' className='text-right pr-4'>
                    <Button
                      style={{
                        color: 'red',
                        backgroundColor: 'white',
                        border: '1px solid gray'
                      }}
                      onClick={() => props.close(false)}
                    >
                      X
                    </Button>
                  </Col>
                </Row>
                <CardBody className='product_form'>
                  <Form method='POST' onSubmit={formik.handleSubmit}>
                    <Col>
                      <div
                        style={{
                          overflowY: 'visible',
                          overflowX: 'hidden',
                          
                          position: 'relative'
                        }}
                      >
                        
                          <Col md='12'>
                            <FormGroup
                              className={
                                !formik.touched.id
                                  ? ''
                                  : !formik.errors.id &&
                                    formik.values.id!==''
                                  ? 'has-success form-group'
                                  : 'has-danger form-group'
                              }
                            >
                              <label>Supplier's id</label>
                              <Input
                                required
                                onBlur={formik.handleBlur}
                                placeholder={'Supplier id'}
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
                                !formik.touched.name
                                  ? ''
                                  : !formik.errors.name &&
                                    formik.values.name !== ''
                                  ? 'has-success form-group'
                                  : 'has-danger form-group'
                              }
                            >
                              <label>Supplier name</label>
                              <Input
                                required
                                name='name'
                                onChange={formik.handleChange}
                                placeholder='Supplier name'
                                type='text'
                                value={formik.values.name}
                                onBlur={formik.handleBlur}
                                onFocus={formik.handleBlur}
                              />
                            </FormGroup>
                          </Col>
                        
                          <Col md='12'>
                            <FormGroup
                              className={
                                !formik.touched.phone
                                  ? ''
                                  : !formik.errors.phone &&
                                    formik.values.phone !== ''
                                  ? 'has-success form-group'
                                  : 'has-danger form-group'
                              }
                            >
                              <label>Phone</label>
                              <Input
                                required
                                name='phone'
                                onFocus={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder='Phone number'
                                type='text'
                                value={formik.values.phone}
                                onBlur={formik.handleBlur}
                              />
                            </FormGroup>
                          </Col>
                          <Col md='12'>
                            <FormGroup
                              className={
                                !formik.touched.email
                                  ? ''
                                  : !formik.errors.email &&
                                    formik.values.email !== ''
                                  ? 'has-success form-group'
                                  : 'has-danger form-group'
                              }
                            >
                              <label>Email</label>
                              <Input
                                required
                                name='email'
                                onFocus={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder='abc@email.com'
                                type='text'
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                              />
                            </FormGroup>
                          </Col>
                        
                      </div>
                      <Col md='12' className='text-center'>
                        <Button type='submit'>SAVE</Button>
                      </Col>
                    </Col>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          
        </div>
      
    </>
  )
}

export default NewSupplier
