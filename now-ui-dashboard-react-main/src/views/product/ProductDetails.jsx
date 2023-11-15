import React, { useContext, useEffect, useRef, useState } from 'react'

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
  Col
} from 'reactstrap'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { getColor } from 'Service/ColorService'
import { getRom } from 'Service/RomService'
import { instance } from 'config/AxiosConfig'
import NotificationAlert from "react-notification-alert";
import { getListSupplier } from 'Service/SupplierService'
import { Appcontext } from 'context/Appcontext'

const ProductDetails = ({ props, cancel, priceList,update }) => {
  
  const [pic, setPic] = useState()
  const [img, setImg] = useState()
  const [color, setColor] = useState([])
  const [rom, setRom] = useState([])
  const [price, setPrice] = useState(priceList)
  const [supplier,setListSp]=useState([])
  let pr = { id: 0, color: 1, rom: 1, pid:props.pid, priceim: 0,pricesel:0 }
  const [updatep, setupdatep] = useState(0);
  useEffect(() => {
    getColor().then(res => setColor(res))
    getRom().then(res => setRom(res))
    getListSupplier().then(res=>setListSp(res))
  }, [])
  const formik = useFormik({
    initialValues: {
      pid: props.pid,
      pname: props.pname,
      description: props.description,
      rcamera: props.rcamera,
      resolution: props.resolution,
      glass: props.glass,
      brand: props.brand,
      os: props.os,
      category: props.category,
      image: props.image,
      cpu: props.cpu,
      gpu: props.gpu,
      ram: props.ram,
      battery: props.battery,
      charge: props.charge,
      screen: props.screen,
      fcamera: props.fcamera,
      screenratio: props.screenratio,
      scanfrequency: props.scanfrequency,
      brightness: props.brightness,
      card: props.card,
      status: props.status,
      supplier:props.supplier
    },
    validationSchema: Yup.object({
      pid: Yup.number(),
      pname: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      rcamera: Yup.string().required('Required'),
      resolution: Yup.string()
        .required('Required')
        .matches(/([0-9]{3,4})x([0-9]{3,4})/i, 'Mismatch'),
      brand: Yup.number().required().min(1),
      category: Yup.number().required('Required').min(1),
      glass: Yup.string().required('Required'),
      os: Yup.string().required('Required'),
      image: Yup.string(),
      cpu: Yup.string().required('Required'),
      gpu: Yup.string().required('Required'),
      ram: Yup.number().required('Required').min(1),
      battery: Yup.number().required('Required').min(1),
      charge: Yup.number().required('Required').min(0.1),
      screen: Yup.number().required('Required').min(0.1),
      fcamera: Yup.number().required('Required').min(1),
      screenratio: Yup.string()
        .required('Required')
        .matches(/(\d+):(\d+)/i),
      scanfrequency: Yup.number().required('Required').min(40),
      brightness: Yup.number().required('Required').min(1),
      card: Yup.number().required('Required').min(0),
      status: Yup.number().required(),
      supplier:Yup.string().required()
    }),
    onSubmit: async value => {
      setupdatep(value)
      const data = new FormData()
      if (img) {
        data.append('image', img)
        try {
          const res = await axios.post('https://api.imgur.com/3/image/', data, {
            headers: {
              Authorization: 'Client-ID 2739162cd7d6953',
              'Content-Type': 'image/jpeg'
            }
          })
          value = { ...value, image: res.data.data.link }
          
        } catch (err) {
          // Handle Error Here
          console.error(err)
        }
      }
      instance
        .post('/product/update', { product: value, prices: price })
        .then(res => {
          
          if (res.data.includes("success")) {
            update(value)
            notify('tc', 2, res.data);
          }
           else notify('tc', 3, res.data)
          
        })
        .catch(err => {
          console.error(err)
        })
    }
  })
  //pic
  useEffect(() => {
    return () => {
      pic && URL.revokeObjectURL(pic.preview)
    }
  }, [pic])
  const preview = inputFile => {
    const file = inputFile.target.files[0]
    setImg(file)
    file.preview = URL.createObjectURL(file)
    setPic(file)
  }
  const changePrice = (index, key, value) => {
    let list = []
    switch (key) {
      case 'rom':
        list = price
        list[index].rom = value
        setPrice(list)
        break
      case 'color':
        list = price
        list[index].color = value
        setPrice(list)
        break
      case 'priceim':
        list = price
        list[index].priceim = value
        setPrice(list)
        break
      case 'pricesel':
        list = price
        list[index].pricesel = value
        setPrice(list)
        break
    }
  }
  const notificationAlert = useRef();
  const notify = (place,color,message) => {
    
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default: 
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            {message}
          </div>
        </div>
      ),
      type: type,
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 6,
    };
    notificationAlert.current.notificationAlert(options);
  };
  return (
    <>
      <NotificationAlert ref={notificationAlert}/>
      <Col>
        <div className='content'  >
          <Row>
            <Col md='12'>
              <Card>
                <Row>
                  <Col md='6'>
                    <CardHeader>
                      <h5 className='title'>Product information</h5>
                    </CardHeader>
                  </Col>
                  <Col md='6' className='text-right pr-4'>
                    <Button
                      style={{
                        color: 'red',
                        backgroundColor: 'white',
                        border: '1px solid gray'
                      }}
                      onClick={() => cancel()}
                    >
                      X
                    </Button>
                  </Col>
                </Row>
                <CardBody className='product_form'>
                  <Form method='POST' onSubmit={formik.handleSubmit}>
                    <Row>
                      <Col md='4'>
                        <Col className='pl-3 text-center pb-4'>
                          {pic ? (
                            <img
                              src={pic.preview}
                              alt=''
                              name='image'
                              width={'280px'}
                            />
                          ) : (
                            <img
                              src={props.image}
                              alt=''
                              name='image'
                              width={280}
                            />
                          )}
                          <br />
                          <label
                            style={{
                              border: '1px solid',
                              padding: '4px 5px',
                              marginTop: '5px'
                            }}
                            htmlFor='file'
                          >
                            {pic ? 'Change image' : 'Add image'}
                            <Input
                              type='file'
                              name='image'
                              id='file'
                              onChange={preview}
                              style={{ display: 'none' }}
                            />
                          </label>
                        </Col>
                      </Col>
                      <Col>
                        <div
                          style={{
                            overflowY: 'visible',
                            overflowX: 'hidden',
                            height: '330px',
                            position: 'relative'
                          }}
                        >
                          <Row>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  formik.errors.pname && formik.touched.pname
                                    ? 'has-danger form-group'
                                    : formik.values.pname === '' &&
                                      !formik.touched.pname
                                    ? ''
                                    : 'has-success form-group'
                                }
                              >
                                <label htmlFor='exampleInputpname1'>
                                  Product name
                                </label>
                                <Input
                                  required
                                  onBlur={formik.handleBlur}
                                  placeholder={'Product name'}
                                  name='pname'
                                  type='text'
                                  value={formik.values.pname}
                                  onChange={formik.handleChange}
                                  onFocus={formik.handleBlur}
                                />
                              </FormGroup>
                              <Col></Col>
                            </Col>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  !formik.touched.description
                                    ? ''
                                    : !formik.errors.description &&
                                      formik.touched.description === true
                                    ? 'has-success form-group'
                                    : 'has-danger form-group'
                                }
                              >
                                <label>Description</label>
                                <Input
                                  required
                                  name='description'
                                  onChange={formik.handleChange}
                                  placeholder='Description'
                                  type='text'
                                  value={formik.values.description}
                                  onBlur={formik.handleBlur}
                                  onFocus={formik.handleBlur}
                                />
                              </FormGroup>
                            </Col>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  !formik.touched.rcamera
                                    ? ''
                                    : formik.values.rcamera !== '' &&
                                      !formik.errors.rcamera
                                    ? 'has-success form-group'
                                    : 'has-danger form-group'
                                }
                              >
                                <label>Rear camera</label>
                                <Input
                                  required
                                  style={{ textTransform: 'capitalize' }}
                                  name='rcamera'
                                  onFocus={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  placeholder='Rear camera'
                                  type='text'
                                  value={formik.values.rcamera}
                                  onBlur={formik.handleBlur}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  !formik.touched.screen
                                    ? ''
                                    : !formik.errors.screen
                                    ? 'has-success form-group'
                                    : 'has-danger form-group'
                                }
                              >
                                <label>Widescreen</label>
                                <Input
                                  required
                                  onFocus={formik.handleBlur}
                                  name='screen'
                                  min={0}
                                  placeholder='Front camera'
                                  type='number'
                                  value={formik.values.screen}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                ></Input>
                              </FormGroup>
                            </Col>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  !formik.touched.fcamera
                                    ? ''
                                    : !formik.errors.fcamera
                                    ? 'has-success form-group'
                                    : 'has-danger form-group'
                                }
                              >
                                <label>Front camera</label>
                                <Input
                                  required
                                  onFocus={formik.handleBlur}
                                  name='fcamera'
                                  min={0}
                                  placeholder='Front camera'
                                  type='number'
                                  value={formik.values.fcamera}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                ></Input>
                              </FormGroup>
                            </Col>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  !formik.touched.resolution
                                    ? ''
                                    : !formik.errors.resolution
                                    ? 'has-success form-group'
                                    : 'has-danger form-group'
                                }
                              >
                                <label>Resolution</label>
                                <Input
                                  required
                                  name='resolution'
                                  onBlur={formik.handleBlur}
                                  onFocus={formik.handleBlur}
                                  placeholder='1024 x 1024'
                                  type='text'
                                  value={formik.values.resolution}
                                  onChange={formik.handleChange}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  !formik.touched.screenratio
                                    ? ''
                                    : !formik.errors.screenratio
                                    ? 'has-success form-group'
                                    : 'has-danger form-group'
                                }
                              >
                                <label>Screen ratio</label>
                                <Input
                                  required
                                  name='screenratio'
                                  onBlur={formik.handleBlur}
                                  placeholder='16:9'
                                  type='text'
                                  value={formik.values.screenratio}
                                  onChange={formik.handleChange}
                                  onFocus={formik.handleBlur}
                                />
                              </FormGroup>
                            </Col>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  !formik.touched.glass
                                    ? ''
                                    : !formik.errors.glass
                                    ? 'has-success form-group'
                                    : 'has-danger form-group'
                                }
                              >
                                <label>Glass</label>
                                <Input
                                  required
                                  onBlur={formik.handleBlur}
                                  name='glass'
                                  placeholder='GORILLA GLASS'
                                  type='text'
                                  onChange={formik.handleChange}
                                  value={formik.values.glass}
                                  onFocus={formik.handleBlur}
                                />
                              </FormGroup>
                            </Col>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  !formik.touched.os
                                    ? ''
                                    : !formik.errors.os
                                    ? 'has-success form-group'
                                    : 'has-danger form-group'
                                }
                              >
                                <label>OS</label>
                                <Input
                                  required
                                  onBlur={formik.handleBlur}
                                  onFocus={formik.handleBlur}
                                  name='os'
                                  placeholder='IOS 11'
                                  type='text'
                                  onChange={formik.handleChange}
                                  value={formik.values.os}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  !formik.touched.brand
                                    ? ''
                                    : !formik.errors.brand
                                    ? 'has-success form-group'
                                    : 'has-danger form-group'
                                }
                              >
                                <label>Brand</label>
                                <Input
                                  required
                                  onBlur={formik.handleBlur}
                                  type='select'
                                  name='brand'
                                  onChange={formik.handleChange}
                                  value={formik.values.brand}
                                  onFocus={formik.handleBlur}
                                >
                                  <option value=''></option>
                                  <option value={Number(1)}>Apple</option>
                                  <option value={2}>Samsung</option>
                                  <option value={3}>Sony</option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  !formik.touched.ram
                                    ? ''
                                    : !formik.errors.ram
                                    ? 'has-success form-group'
                                    : 'has-danger form-group'
                                }
                              >
                                <label>Ram</label>
                                <Input
                                  required
                                  onBlur={formik.handleBlur}
                                  name='ram'
                                  type='number'
                                  value={formik.values.ram}
                                  onChange={formik.handleChange}
                                  onFocus={formik.handleBlur}
                                />
                              </FormGroup>
                            </Col>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  !formik.touched.category
                                    ? ''
                                    : !formik.errors.category
                                    ? 'has-success form-group'
                                    : 'has-danger form-group'
                                }
                              >
                                <label>Category</label>
                                <Input
                                  required
                                  onBlur={formik.handleBlur}
                                  type='select'
                                  name='category'
                                  onChange={formik.handleChange}
                                  value={formik.values.category}
                                  onFocus={formik.handleBlur}
                                >
                                  <option value=''></option>
                                  <option value={1}>Smart phone</option>
                                </Input>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  !formik.touched.cpu
                                    ? ''
                                    : !formik.errors.cpu
                                    ? 'has-success form-group'
                                    : 'has-danger form-group'
                                }
                              >
                                <label>Chipset</label>
                                <Input
                                  required
                                  onBlur={formik.handleBlur}
                                  type='text'
                                  name='cpu'
                                  onChange={formik.handleChange}
                                  value={formik.values.cpu}
                                  placeholder='Apple A15 Bionic '
                                  onFocus={formik.handleBlur}
                                ></Input>
                              </FormGroup>
                            </Col>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  !formik.touched.gpu
                                    ? ''
                                    : !formik.errors.gpu
                                    ? 'has-success form-group'
                                    : 'has-danger form-group'
                                }
                              >
                                <label>GPU</label>
                                <Input
                                  required
                                  onBlur={formik.handleBlur}
                                  name='gpu'
                                  type='text'
                                  value={formik.values.gpu}
                                  onChange={formik.handleChange}
                                  placeholder='Apple GPU 4 cores'
                                  onFocus={formik.handleBlur}
                                />
                              </FormGroup>
                            </Col>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  !formik.touched.brightness
                                    ? ''
                                    : !formik.errors.brightness
                                    ? 'has-success form-group'
                                    : 'has-danger form-group'
                                }
                              >
                                <label>Maximum brightness</label>
                                <Input
                                  required
                                  type='number'
                                  name='brightness'
                                  onChange={formik.handleChange}
                                  value={formik.values.brightness}
                                  onFocus={formik.handleBlur}
                                  min={0}
                                ></Input>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  !formik.touched.scanfrequency
                                    ? ''
                                    : !formik.errors.scanfrequency
                                    ? 'has-success form-group'
                                    : 'has-danger form-group'
                                }
                              >
                                <label>Scanfrequency (Hz)</label>
                                <Input
                                  required
                                  name='scanfrequency'
                                  onBlur={formik.handleBlur}
                                  placeholder='120'
                                  type='select'
                                  value={formik.values.scanfrequency}
                                  onChange={formik.handleChange}
                                  onFocus={formik.handleBlur}
                                >
                                  <option value='0'></option>
                                  <option value='60'>60Hz</option>
                                  <option value='90'>90Hz</option>
                                  <option value='120'>120Hz</option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  !formik.touched.battery
                                    ? ''
                                    : !formik.errors.battery
                                    ? 'has-success form-group'
                                    : 'has-danger form-group'
                                }
                              >
                                <label>Battery (Mah)</label>
                                <Input
                                  required
                                  onBlur={formik.handleBlur}
                                  type='number'
                                  name='battery'
                                  onChange={formik.handleChange}
                                  value={formik.values.battery}
                                  onFocus={formik.handleBlur}
                                  min='0'
                                ></Input>
                              </FormGroup>
                            </Col>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  !formik.touched.charge
                                    ? ''
                                    : !formik.errors.charge
                                    ? 'has-success form-group'
                                    : 'has-danger form-group'
                                }
                              >
                                <label>Quick charge</label>
                                <Input
                                  required
                                  onBlur={formik.handleBlur}
                                  name='charge'
                                  type='text'
                                  value={formik.values.charge}
                                  onChange={formik.handleChange}
                                  placeholder='3.0'
                                  onFocus={formik.handleBlur}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  !formik.touched.card
                                    ? ''
                                    : !formik.errors.card
                                    ? 'has-success form-group'
                                    : 'has-danger form-group'
                                }
                              >
                                <label>Extended Memory</label>
                                <Input
                                  required
                                  onBlur={formik.handleBlur}
                                  type='number'
                                  name='card'
                                  onChange={formik.handleChange}
                                  value={formik.values.card}
                                  onFocus={formik.handleBlur}
                                  min={0}
                                ></Input>
                              </FormGroup>
                            </Col>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  !formik.touched.status
                                    ? ''
                                    : !formik.errors.status
                                    ? 'has-success form-group'
                                    : 'has-danger form-group'
                                }
                              >
                                <label>Status</label>
                                <Input
                                  required
                                  onBlur={formik.handleBlur}
                                  type='select'
                                  name='status'
                                  onChange={formik.handleChange}
                                  value={formik.values.status}
                                  onFocus={formik.handleBlur}
                                >
                                  <option value=''></option>
                                  <option value={1}>In stock</option>
                                  <option value={2}>Out stock</option>
                                  <option value={3}>Stop bussiness</option>
                                  <option value={4}>Incoming</option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md='4'>
                              <FormGroup
                                className={
                                  !formik.touched.supplier
                                    ? ''
                                    : !formik.errors.supplier
                                    ? 'has-success form-group'
                                    : 'has-danger form-group'
                                }
                              >
                                <label>Supplier</label>
                                <Input
                                  required
                                  onBlur={formik.handleBlur}
                                  type='select'
                                  name='supplier'
                                  onChange={formik.handleChange}
                                  value={formik.values.supplier}
                                  onFocus={formik.handleBlur}
                                >
                                  <option value=""></option>
                                  {supplier.map((v, i) => (
                                    <option value={v.id} key={i}>{v.name}</option>
                                  ))}
                                </Input>
                              </FormGroup>
                            </Col>   
                          </Row>
                          <hr />
                          <Row>
                            <Col>
                              {price.map((v, i) => (
                                <Row key={i}>
                                  <Col>
                                    <label>Rom</label>
                                    <Input
                                      type='select'
                                      value={v.rom}
                                      onChange={e =>
                                      { changePrice(i, 'rom', e.target.value); setupdatep(updatep+1)}
                                      }
                                    >
                                      {rom.map((v, i) => (
                                        <option value={v.id}>
                                          {v.size} GB
                                        </option>
                                      ))}
                                    </Input>
                                  </Col>
                                  <Col>
                                    <label>Color</label>
                                    <Input
                                      type='select'
                                      value={v.color}
                                      onChange={e =>
                                      { changePrice(i, 'color', e.target.value); setupdatep(updatep+1)}
                                      }
                                    >
                                      {color.map((v, i) => (
                                        <option key={i} value={v.id}>
                                          {v.color}
                                        </option>
                                      ))}
                                    </Input>
                                  </Col>
                                  <Col>
                                    <label>Price Import</label>
                                    <Input
                                      type='number'
                                      value={v.priceim}
                                      onChange={e => {
                                        changePrice(
                                          i,
                                          'priceim',
                                          e.target.value
                                        )
                                        setupdatep(updatep + 1)
                                      }}
                                    ></Input>
                                  </Col>
                                  <Col>
                                    <label>Price sell</label>
                                    <Input
                                      type='number'
                                      value={v.pricesel}
                                      onChange={e => {
                                        changePrice(
                                          i,
                                          'pricesel',
                                          e.target.value
                                        ); setupdatep(updatep+1);
                                      }}
                                    ></Input>
                                  </Col>
                                  <Col md='1'>
                                    <br />
                                    <i
                                      className='fas fa-times'
                                      style={{
                                        cursor: 'pointer',
                                        marginTop: '10px',
                                        display: v.id !== 0 && 'none'
                                      }}
                                      onClick={() =>
                                        setPrice(
                                          price.filter(
                                            (v, index) => index !== i
                                          )
                                        )
                                      }
                                    ></i>
                                  </Col>
                                </Row>
                              ))}
                            </Col>
                          </Row>
                          <Row className='pt-3'>
                            <Col>
                              <a
                                onClick={() => setPrice([...price, pr])}
                                style={{ cursor: 'pointer' }}
                              >
                                + Add color and rom
                              </a>
                            </Col>
                          </Row>
                        </div>
                        <Row>
                          <Col md='12' className='text-center'>
                            <Button type='submit'>SAVE</Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Col>
    </>
  )
}

export default ProductDetails
