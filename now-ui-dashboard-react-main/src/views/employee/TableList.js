/*!

=========================================================
* Now UI Dashboard React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be includesd in all copies or substantial portions of the Software.

*/
import React, { useContext, useEffect, useRef, useState } from "react";

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
  Label,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { thead } from "variables/general";
import axios from "axios";
import EmpDetails from "./EmpDetails";
import { Appcontext } from "context/Appcontext";
import CreateEmp from "./CreateEmp";

function RegularTables() {
  const { setDetail, detail, } = useContext(Appcontext);
  const [create,setCreate] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    identification: '',
    aidf:1,
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
    dl:31
  });


  const createEmp = (e) => {  
      setCreate(e);
  } 
  useEffect(() => { 
    axios.get("http://localhost:8080/employee/by?page=0&sort=lastname"+
      "&identification=" + search.identification +
      "&phone=" + search.phone +
      "&email=" + search.email +
      "&lastname=" + search.lastname +
      "&firstname=" + search.firstname +
      '&aidf='+search.aidf+
      '&aidl=' + search.aidl +
      '&salf='+search.salf+'&sall=' +search.sall+ 
      '&storef='+search.storef+
      '&storel='+search.storel+
      '&yf='+search.yf+
      '&yl='+search.yl+
      '&mf='+search.mf+
      '&ml='+search.ml+
      '&df='+search.df+
      '&dl='+search.dl,
          {
            headers: {
              'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token")).token
            }
      }).then(res => { setData(res.data.content);console.log(res) })
  },[search,create,detail])
  
  return (
    <>
      {(detail !== null) ? <EmpDetails prop={detail} /> : null}
      {(create===true) ? <CreateEmp close={createEmp} />:null}
    <div>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
              <Card>
                <Row>
                  <Col md="6">
                <CardHeader>
                  <CardTitle tag="h4">Employee list</CardTitle>
                    </CardHeader>
                  </Col>
                  
                  <Col md="6" className="text-right pr-4">
                    <Button style={{backgroundColor:"green"}}  onClick={()=>createEmp(true)}>+ Add a new employee</Button>
                  </Col>
                </Row><hr/>
                <Row>
                  <Col md="6">
                    <CardHeader>
                      <CardTitle tag={'h5'}>Search employees</CardTitle>
                    </CardHeader>
                  </Col>
                  <Col md="6" className="text-right pr-4">
                    <Button style={{backgroundColor:"red"}}  onClick={()=>setSearch({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    identification: '',
    aidf:1,
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
    dl:31
  })}>Reset</Button>
                  </Col>
                  
                </Row>
                <Col md='12'>
                  <Row>
                    <Col md='2'>
                      <FormGroup>
                        <Label>Last name</Label>
                        <Input type="text" style={{textTransform:'capitalize'}} value={search.lastname} onChange={(e)=>setSearch({ ...search, lastname: e.target.value })}  />
                      </FormGroup>
                    </Col>
                    <Col md='2'>
                      <FormGroup>
                        <Label>First name</Label>
                        <Input type="text" style={{textTransform:'capitalize'}} value={search.firstname} onChange={(e)=>setSearch({ ...search, firstname: e.target.value })}  />
                      </FormGroup>
                    </Col>
                    <Col md='2'>
                      <FormGroup>
                        <Label>Email</Label>
                        <Input type="email" value={search.email} onChange={(e)=>setSearch({ ...search, email: e.target.value })}  />
                      </FormGroup>
                    </Col>
                    <Col md='2'>
                      <FormGroup>
                        <Label>Phone</Label>
                        <Input type="text" value={search.phone} onChange={(e)=>setSearch({ ...search, phone: e.target.value })}  />
                      </FormGroup>
                    </Col>
                    <Col md='2'>
                      <FormGroup>
                        <Label>Identification</Label>
                        <Input type="text" value={search.identification} onChange={(e)=>setSearch({ ...search, identification: e.target.value })}  />
                      </FormGroup>
                    </Col>
                    
                  </Row>
                  <Row>
                  <Col md='2'>
                      <FormGroup>
                        <Label>Address</Label>
                        <Input type="select" onChange={(e) =>  setSearch({ ...search, aidl: Number(e.target.value),aidf:Number(e.target.value)})} >
                          <option value=''></option>
                          <option value={1}>Ha Noi</option>
                          <option value={2}>Hai Phong</option>
                          <option value={3}>Quang Ninh</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  <Col md='2'>
                      <FormGroup>
                        <Label>Store</Label>
                        <Input type="select" onChange={(e) =>  setSearch({ ...search, storel: Number(e.target.value),storef:Number(e.target.value)})} >
                          <option value=''></option>
                          <option value={1}>Ha Noi</option>
                          <option value={2}>Hai Phong</option>
                          <option value={3}>Quang Ninh</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md='4'>
                      
                        <Label>Birtday</Label>
                        <Row className="pl-3">
                          
                          <Label>
                            DD<input style={{fontSize:"0.8571em",padding:'8px',borderRadius:'7px',border:'1px solid #E3E3E3'}} type="number" min={1} max={31} onChange={(e) => setSearch({ ...search, dl: Number(e.target.value), df: Number(e.target.value) })} ></input>
                          </Label>
                          <Label>  MM
                            <input style={{fontSize:"0.8571em",padding:'8px',borderRadius:'7px',border:'1px solid #E3E3E3'}} type="number" min={1} max={12} onChange={e => setSearch({ ...search, ml: Number(e.target.value), mf: Number(e.target.value) })} />
                          </Label>
                          <Label>  YYYY
                            <input style={{fontSize:"0.8571em",padding:'8px',width:'70px',borderRadius:'7px',border:'1px solid #E3E3E3'}} type="number" min={1900}  onChange={e => setSearch({ ...search, yf: Number(e.target.value), yl: Number(e.target.value) })} />
                          </Label>
                        </Row>
                      
                    </Col>
                    <Col md='2'>
                      <FormGroup>
                        <Label>Salary</Label>
                        <Input type="number"  onChange={(e)=>setSearch({ ...search, salf: e.target.value,sall:e.target.value })}  />
                      </FormGroup>
                    </Col>
                  </Row>  
                </Col>
                <CardBody>
                  <Row>
                    <Col md="12">
                      
                    </Col>
                  </Row>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      {thead.map((prop, key) => {
                        if (key === thead.length - 1)
                          return (
                            <th key={key} className="text-right">
                              {prop}
                            </th>
                          );
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                      {data.map((prop, key) => {  
                      
                      return (
                        <tr key={prop.eid} onClick={()=>setDetail(prop)}>
                          <td>{prop.firstname+" "+prop.lastname}</td>
                          <td>{prop.identification}</td>
                          <td>{prop.birthday}</td>
                          <td>{prop.email}</td>
                          <td>{prop.phone}</td>
                          <td className="text-right">{prop.salary}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div></div>
    </>
  );
}

export default RegularTables;
