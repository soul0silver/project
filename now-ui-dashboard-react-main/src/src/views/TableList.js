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
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { thead } from "variables/general";
import axios from "axios";
import EmpDetails from "./EmpDetails";
import { Appcontext } from "context/Appcontext";
import CreateEmp from "./CreateEmp";

function RegularTables() {
  const { setDetail, detail,setI } = useContext(Appcontext);
  const [create,setCreate] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/employee/all?page=0&sort=lastname",{
      headers :{
      'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem("token")).token
      }
    }).then(re => { setData(re.data.content);console.log(re) })
  },[])
  const createEmp = (e) => {
    
      setCreate(e);
   
} 
  return (
    <>
      {(detail !== null) ? <EmpDetails prop={detail} /> : null}
      {(create==true) ? <CreateEmp close={createEmp} />:null}
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
                    <Button style={{backgroundColor:"green"}} onClick={()=>createEmp(true)}>+ Add a new employee</Button>
                  </Col>
                </Row>
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
                        <tr key={key} onClick={()=>setDetail(prop)}>
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
