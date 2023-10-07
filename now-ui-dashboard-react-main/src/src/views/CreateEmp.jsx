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
const CreateEmp=(props)=> {

    const formik = useFormik({
      initialValues: {
        lastname: null,
        firstname: null,
        birthday: null,
        phone: null,
        email: null,
        store: 0,
        identification: null,
        aid: 0,
        avatar: null,
        status: 0,
        salary:0
      },
      validationSchema: Yup.object({
        lastname: Yup.string().required("required"),
        firstname: Yup.string().required("required"),
        email: Yup.string().required("required").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "invalid email"),
        birthday: Yup.string().required("required"),
        store: Yup.string().required( ),
        aid: Yup.string().required("required"),
        phone: Yup.string().required("required").matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Invalid phone number"),
        identification: Yup.string().required("required").length(10),
      
      }),
      onSubmit: async (value) => {
       
        try {
          const resp = await axios.post('http://localhost8080/employee/save', value);
          console.log(value);
          alert(resp);
        } catch (err) {
          
          console.error(err);
        }
      }
    })

    return (
      <>
        <Col className="pl-4" style={{ position: "absolute", zIndex: "1", paddingTop: "80px", width: "100%" }}>
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
                    
                    <Form onSubmit={formik.handleSubmit} >
                      <Row>
                        <Col className="pl-1" md="6" > 
                      
                          <img src={""} alt="" />
                          <input type="file" />
                      
                        </Col>
                        <Col md="6" >
                          <FormGroup className={(formik.values.email===null)?'': (formik.values.email!==null &&!formik.errors.email)? "has-success form-group":"has-danger form-group"}>
                            <label htmlFor="exampleInputEmail1">
                              Email address
                            </label>
                            <Input  placeholder={(!formik.errors.email)?"Email":formik.errors.email} name="email" type="email" value={formik.values.email} onChange={formik.handleChange} />
                            
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6" >
                          <FormGroup className={(formik.values.firstname===null)?'': (formik.values.firstname!==null &&!formik.errors.firstname)? "has-success form-group":"has-danger form-group"}>
                            <label>First Name</label>
                            <Input
                              name="firstname"
                              onChange={formik.handleChange}
                              placeholder="First name"
                              type="text"
                              value={formik.values.firstname}
                            />
                            
                          </FormGroup>
                        </Col>
                        <Col  md="6">
                          <FormGroup className={(formik.values.lastname===null)?'': (formik.values.lastname!==null &&!formik.errors.lastname)? "has-success form-group":"has-danger form-group"}>
                            <label>Last Name</label>
                            <Input
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
                          <FormGroup className={(formik.values.aid===0)?'': (formik.values.aid!==null &&!formik.errors.aid)? "has-success form-group":"has-danger form-group"}>
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
                     
                        <Col className="pr-1" md="6">
                          <FormGroup className={(formik.values.phone===null)?'': (formik.values.phone!==null &&!formik.errors.phone)? "has-success form-group":"has-danger form-group"}>
                            <label>Phone number</label>
                            <Input
                              name="phone"
                              required
                              placeholder="0123456789"
                              type="tel"
                              value={formik.values.phone}
                              onChange={formik.handleChange}
                              pattern={formik.errors.phone}
                            />
                           
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup className={(formik.values.birthday===null)?'': (formik.values.birthday!==null &&!formik.errors.birthday)? "has-success form-group":"has-danger form-group"}>
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
                        <Col md="6">
                          <FormGroup className={(formik.values.store===0)?'': (formik.values.store!==null &&!formik.errors.store)? "has-success form-group":"has-danger form-group"}>
                            <label>At store</label>
                            <Input required type="select" name="store" onChange={formik.handleChange} value={formik.values.store} >
                              <option value=""></option>
                              <option value={1}>Ha Noi</option>
                              <option value={2}>Hai Phong</option>
                              <option value={3}>Quang Ninh</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label>Salary</label>
                            <Input
                              required
                              type="number"
                              value={formik.values.salary}
                              onChange={formik.handleChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12" className="text-center">
                          <Button type="submit">SAVE</Button>
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
