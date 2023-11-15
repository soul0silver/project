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
import React, { useContext, useEffect, useState } from "react";

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
} from "reactstrap";

import { useFormik } from "formik"

import * as Yup from "yup";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
const CreateEmp = (props) => {
  
  const navigate = useNavigate();
  const [pic, setPic] = useState();
  const [img, setImg] = useState();
  const formik = useFormik({
    initialValues: {
      lastname: '',
      firstname: '',
      birthday: '',
      phone: '',
      email: '',
      store: 0,
      identification: '',
      aid: 0,
      avatar: '',
      status: 0,
      salary: 0
    },
    validationSchema: Yup.object({
      lastname: Yup.string().required("required"),
      firstname: Yup.string().required("required"),
      email: Yup.string().required("required").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "invalid email"),
      birthday: Yup.date().required("required"),
      store: Yup.string().required(),
      aid: Yup.string().required("required"),
      phone: Yup.string().required("required").matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Invalid phone number"),
      identification: Yup.string().required("required").length(12),
      avatar: Yup.string(),
      salary: Yup.number(),
      status:Yup.number()
    }),
    onSubmit: async (value) => {
      console.log(value);
      
      const data = new FormData();
      data.append("image", img)
      try {
        const res = await axios.post('https://api.imgur.com/3/image/', data,
          {
            headers: {
              'Authorization': 'Client-ID 2739162cd7d6953',
              'Content-Type': "image/jpeg"
            }
          });
          value={...value,avatar:res.data.data.link}
          setImg();
          console.log(value);
      } catch (err) {
        // Handle Error Here
        console.error(err);
    }
    axios.post( 'http://localhost:8080/employee/save',value,
    {
      headers: {
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token")).token,
      'Content-Type': "application/json"
      }}).
      then((res) => {
        console.log(res);
        formik.handleReset
        alert("Create success");
        navigate("/main/employees")
  }).
    catch (err=> {

      console.error(err);
    })
    },
  })

  useEffect(() => {
    return () => {
      pic && URL.revokeObjectURL(pic.preview)
    }
  }, [pic])
  const preview = (inputFile) => {
    const file = inputFile.target.files[0]
    setImg(file);
    file.preview = URL.createObjectURL(file)
    setPic(file);
  }
  return (
    <>
      <Col className="pl-4" style={{
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

      }}>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <Row>
                  <Col md="6">
                    <CardHeader>
                      <h5 className="title">Fill employee's info</h5>
                    </CardHeader>
                  </Col>
                
                  <Col md="6" className="text-right pr-4">
                    <Button style={{ color: "red", backgroundColor: "white", border: "1px solid gray" }} onClick={() => props.close(false)}>X</Button>
                  </Col>
                </Row>
                <CardBody>

                  <Form method="POST" onSubmit={formik.handleSubmit} >
                    <Row>
                      <Col className="pl-1" md="6" >

                        {pic && (<img src={pic.preview} alt="" id="avatar" width={'200px'} height={'200px'} />)}

                        <input type="file" name="avatar" id="file" onChange={ preview} />

                      </Col>
                    </Row>
                    <Row>
                      <Col md="4" >
                        <FormGroup className={(formik.values.email === '') ? '' : (formik.values.email !== '' && !formik.errors.email) ? "has-success form-group" : "has-danger form-group"}>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input placeholder={(!formik.errors.email) ? "Email" : formik.errors.email} name="email" type="email" value={formik.values.email} onChange={formik.handleChange} />

                        </FormGroup>
                      </Col>
                    
                      <Col md="4" >
                        <FormGroup className={(formik.values.firstname === '') ? '' : (formik.values.firstname !== '' && !formik.errors.firstname) ? "has-success form-group" : "has-danger form-group"}>
                          <label>First Name</label>
                          <Input
                            style={{textTransform:'capitalize'}}
                            name="firstname"
                            onChange={formik.handleChange}
                            placeholder="First name"
                            type="text"
                            value={formik.values.firstname}
                          />

                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup className={(formik.values.lastname === '') ? '' : (formik.values.lastname !== '' && !formik.errors.lastname) ? "has-success form-group" : "has-danger form-group"}>
                          <label>Last Name</label>
                          <Input
                            style={{textTransform:'capitalize'}}
                            name="lastname"
                            onChange={formik.handleChange}
                            placeholder="Last Name"
                            type="text"
                            value={formik.values.lastname}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup className={(formik.values.aid === 0) ? '' : (formik.values.aid !== '' && !formik.errors.aid) ? "has-success form-group" : "has-danger form-group"}>
                          <label>Address</label>
                          <Input
                            name="aid"
                            placeholder="Home Address"
                            type="select"
                            value={formik.values.aid}
                            onChange={formik.handleChange}
                          >
                            <option value=""></option>
                            <option value="1">Ha Noi</option>
                            <option value="2">Hai Phong</option>
                            <option value="3">Quang Ninh</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className={(formik.values.identification === '') ? '' : (formik.values.identification !== '' && !formik.errors.identification) ? "has-success form-group" : "has-danger form-group"}>
                          <label>Identification</label>
                          <Input
                            name="identification"
                            required
                            placeholder="0123456789"
                            type="text"
                            value={formik.values.identification}
                            onChange={formik.handleChange}

                          />

                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup className={(formik.values.phone === '') ? '' : (formik.values.phone !== '' && !formik.errors.phone) ? "has-success form-group" : "has-danger form-group"}>
                          <label>Phone number</label>
                          <Input
                            name="phone"
                            required
                            placeholder="0123456789"
                            type="tel"
                            value={formik.values.phone}
                            onChange={formik.handleChange}

                          />

                        </FormGroup>
                      </Col>
                
                      <Col md="6">
                        <FormGroup className={(formik.values.birthday === '') ? '' : (formik.values.birthday !== '' && !formik.errors.birthday) ? "has-success form-group" : "has-danger form-group"}>
                          <label>Birtday</label>
                          <Input
                            required
                            name="birthday"
                            placeholder="dd/MM/yyyy"
                            type="date"
                            onChange={formik.handleChange}
                            value={formik.values.birthday}

                          />

                        </FormGroup>
                      </Col>
                      </Row>
                    <Row>
                      <Col md="4">
                        <FormGroup className={(formik.values.store === 0) ? '' : (formik.values.store !== '' && !formik.errors.store) ? "has-success form-group" : "has-danger form-group"}>
                          <label>At store</label>
                          <Input required type="select" name="store" onChange={formik.handleChange} value={formik.values.store} >
                            <option value=""></option>
                            <option value={1}>Ha Noi</option>
                            <option value={2}>Hai Phong</option>
                            <option value={3}>Quang Ninh</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    
                      <Col md="4">
                        <FormGroup>
                          <label>Salary</label>
                          <Input
                            required
                            name="salary"
                            type="number"
                            value={formik.values.salary}
                            onChange={formik.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup className={(formik.values.status === 0) ? '' : (formik.values.status !== '' && !formik.errors.status) ? "has-success form-group" : "has-danger form-group"}>
                          <label>Status</label>
                          <Input required type="select" name="status" onChange={formik.handleChange} value={formik.values.status} >
                            <option value=""></option>
                            <option value={1}>Test</option>
                            <option value={2}>working</option>
                            <option value={3}>fired</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12" className="text-center">
                        <Button type="submit" >SAVE</Button>
                      </Col>
                    </Row>
                  </Form>



                </CardBody>
              </Card>
            </Col>

          </Row>
        </div></Col>
    </>
  );

}

export default CreateEmp;
