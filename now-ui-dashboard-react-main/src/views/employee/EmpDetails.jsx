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

// core components              
import { Appcontext } from "context/Appcontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
function EmpDetails( {prop} ) {
  console.log(prop)
  const { setDetail } = useContext(Appcontext);
  const [read, setRead] = useState(true);
  const navigate = useNavigate();
  const [pic, setPic] = useState();
  const [img, setImg] = useState();
  const [ava, setAva] = useState(prop.avatar);
  function convert(e) {
    let re;
    switch (e) {
      case 1: re = "Ha Noi"; break;
      case 2: re = "Hai Phong"; break;
      case 3: re = "Quang Ninh"; break;
      default: re = "";
        
    }
    return re;
  }
  const formik = useFormik({
    initialValues: {
      eid:prop.eid,
      lastname: prop.lastname,
      firstname: prop.lastname,
      birthday: prop.birthday,
      phone: prop.phone,
      email: prop.email,
      store: prop.store,
      identification: prop.identification,
      aid: prop.aid,
      avatar: prop.avatar,
      status: prop.status,
      salary: prop.salary
    },
    validationSchema: Yup.object({
      aid:Yup.number(),
      lastname: Yup.string().required("required"),
      firstname: Yup.string().required("required"),
      email: Yup.string().required("required").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "invalid email"),
      birthday: Yup.date().required("required"),
      store: Yup.string().required(),
      aid: Yup.string().required("required"),
      phone: Yup.string().required("required").matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Invalid phone number"),
      identification: Yup.string().required("required").length(10),
      avatar: Yup.string(),
      salary: Yup.number(),
      status:Yup.number()
    }),
    onSubmit: async (value) => {
      console.log(formik.values);
      if (ava===null){
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
        console.log(res.data.data.link);
        console.log(value)
        update(value);
         
      } catch (err) {
        // Handle Error Here
        console.error(err);
    }
    
      }
     else try{
      const re=  await  axios.post('http://localhost:8080/employee/save', value,
      {
        headers: {
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token")).token,
        'Content-Type': "application/json"
        }})
          console.log(re);
          alert("Create success");
          navigate("/main/employees")
    }
      catch (err){

        console.error(err);
      }
    },
  })
  function update (value) {
    axios.post('http://localhost:8080/employee/save', value,
        {
          headers: {
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token")).token,
          'Content-Type': "application/json"
          }}).
          then((res) => {
            console.log(res);
            setDetail(value)
            alert("Create success");
            navigate("/main/employees")
      }).
        catch (err=> {
  
          console.error(err);
        })
  }
  useEffect(() => {
    return () => {
      pic && URL.revokeObjectURL(pic.preview)
    }
  }, [pic])
  const preview = (inputFile) => {
    setAva(null);
    
    const file = inputFile.target.files[0]
    setImg(file);
    file.preview = URL.createObjectURL(file)
    setPic(file);
  }
  return (
    <>
      <Col className="pl-4" style={{position: 'fixed',
            zIndex: 1032,
            top: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',  
            height: '100%',
            paddingTop: 70,paddingBottom:30,
            backgroundColor: 'rgba(0,0,0,0.4)'}}>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody style={{overflow:'auto',maxHeight:460}}>
              <Form method="POST" onSubmit={formik.handleSubmit} >
                    <Row>
                      <Col className="pl-1" md="6" >
                        {ava?<img src={ava} alt="" id="avatar" width={'100px'} height={'100px'} /> :null}
                        {pic && (<img src={pic.preview} alt="" id="avatar" width={'100px'} height={'100px'} />)}

                        <input  type="file" name="avatar" id="file" onChange={preview} disabled={read} />

                      </Col>
                      <Col md="6" >
                        <FormGroup className={(formik.values.email === '') ? '' : (formik.values.email !== '' && !formik.errors.email) ? "has-success form-group" : "has-danger form-group"}>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input placeholder={(!formik.errors.email) ? "Email" : formik.errors.email} name="email" type="email" value={formik.values.email} onChange={formik.handleChange} readOnly={read} />

                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6" >
                        <FormGroup className={(formik.values.firstname === '') ? '' : (formik.values.firstname !== '' && !formik.errors.firstname) ? "has-success form-group" : "has-danger form-group"}>
                          <label>First Name</label>
                          <Input
                            name="firstname"
                            onChange={formik.handleChange}
                            placeholder="First name"
                            type="text"
                            value={formik.values.firstname}
                            readOnly={read}
                          />

                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className={(formik.values.lastname === '') ? '' : (formik.values.lastname !== '' && !formik.errors.lastname) ? "has-success form-group" : "has-danger form-group"}>
                          <label>Last Name</label>
                          <Input
                            name="lastname"
                            onChange={formik.handleChange}
                            placeholder="Last Name"
                            type="text"
                            value={formik.values.lastname}
                            readOnly={read}
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
                            value={(formik.values.aid)}
                            onChange={formik.handleChange}
                            readOnly={read}
                          >
                            <option value=""></option>
                            <option value="1">Ha Noi</option>
                            <option value="2">Hai Phong</option>
                            <option value="3">Quang Ninh</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="pr-1" md="6">
                        <FormGroup className={(formik.values.identification === '') ? '' : (formik.values.identification !== '' && !formik.errors.identification) ? "has-success form-group" : "has-danger form-group"}>
                          <label>Identification</label>
                          <Input
                            name="identification"
                            required
                            placeholder="0123456789"
                            type="text"
                            value={formik.values.identification}
                            onChange={formik.handleChange}
                            readOnly={read}
                          />

                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup className={(formik.values.phone === '') ? '' : (formik.values.phone !== '' && !formik.errors.phone) ? "has-success form-group" : "has-danger form-group"}>
                          <label>Phone number</label>
                          <Input
                            name="phone"
                            required
                            placeholder="0123456789"
                            type="tel"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            readOnly={read}
                          />

                        </FormGroup>
                      </Col>
                
                      <Col md="6">
                        <FormGroup className={(formik.values.birthday === '') ? '' : (formik.values.birthday !== '' && !formik.errors.birthday) ? "has-success form-group" : "has-danger form-group"}>
                          <label>Birtday</label>
                          <Input
                            required
                            name="birthday"
                            
                            type="date"
                            onChange={formik.handleChange}
                            value={formik.values.birthday}
                            readOnly={read}
                          />

                        </FormGroup>
                      </Col>
                      </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup className={(formik.values.store === 0) ? '' : (formik.values.store !== '' && !formik.errors.store) ? "has-success form-group" : "has-danger form-group"}>
                          <label>At store</label>
                          <Input required type="select" name="store" readOnly={read} onChange={formik.handleChange} value={formik.values.store} >
                            <option value=""></option>
                            <option value='1'>Ha Noi</option>
                            <option value='2'>Hai Phong</option>
                            <option value='3'>Quang Ninh</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    
                      <Col md="6">
                        <FormGroup>
                          <label>Salary</label>
                          <Input
                            required
                            name="salary"
                            type="number"
                            value={formik.values.salary}
                            onChange={formik.handleChange}
                            readOnly={read}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className={(formik.values.status === 0) ? '' : (formik.values.status !== '' && !formik.errors.status) ? "has-success form-group" : "has-danger form-group"}>
                          <label>Status</label>
                          <Input required type="select" readOnly={read} name="status" onChange={formik.handleChange} value={formik.values.status} >
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
                        <Button onClick={()=>setRead(false)}>EDIT</Button>
                        <Button type="submit">SAVE</Button>
                        <Button onClick={()=>setDetail(null)}>CLOSE</Button>
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

export default EmpDetails;
