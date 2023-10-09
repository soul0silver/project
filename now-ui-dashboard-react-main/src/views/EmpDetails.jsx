import React, { useContext, useState } from "react";

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

function EmpDetails({ prop }) {
  const { setDetail } = useContext(Appcontext);
  const [read, setRead] = useState(true);
          const getAddress = (e) => {
                    let res = "";
                    switch (e){
                              case 1: res = "Ha Noi";
                                        break;
                              case 2: res = "Hai Phong";
                                        break;
                              case 3: res = "Quang Ninh";
                                        break;
                    }
                    return res;
  }
  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      // const resp = await axios.post('',);
      // alert(resp);
      setRead(true);
      
  } catch (err) {
      
      console.error(err);
  }
  }
 
  return (
    <>
      <Col className="pl-4" style={{position:"absolute",zIndex:"1",paddingTop:"80px",width:"100%"}}>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                    <Row>
                    <Col className="pl-3" md="8">
                      
                       <img src={prop.avatar} alt="" />
                        <input  type="file"/>
                      
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                          <Input placeholder="Email" type="email" defaultValue={prop.email} readOnly={ read} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          defaultValue={prop.firstname}
                          placeholder="firstname"
                            type="text"
                            readOnly={ read}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          defaultValue={prop.lastname}
                          placeholder="Last Name"
                            type="text"
                            readOnly={ read}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue={getAddress(prop.aid)}
                          placeholder="Home Address"
                            type="text"
                            readOnly={ read}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Phone number</label>
                        <Input
                          defaultValue={prop.phone}
                          placeholder="0123456789"
                            type="tel"
                            readOnly={ read}  
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          defaultValue="Andrew"
                          placeholder="Country"
                          type="text" readOnly={ read}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>At store</label>
                        <Input placeholder="Ha Noi" type="select" readOnly={ read}>
                              <option value={1}>Ha Noi</option>
                              <option value={2}>Hai Phong</option>
                              <option value={3}>Quang Ninh</option>
                        </Input>      
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Salary</label>
                        <Input
                          readOnly={ read}
                          defaultValue={prop.salary}
                          type="number"
                        />
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
