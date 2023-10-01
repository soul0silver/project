import {
          Form,
          FormGroup,
          Label,
          Row,
          Col,
          Input,
          Card,
          CardBody
} from "reactstrap";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
const Move = () => {
          return (
                    <>

                              <PanelHeader size="sm" />
                              <div className="content">
                                        <Row>
                                                  <Col xs={12}>
                                                            <Card>
                                                                      <CardBody>
                                                                                <Form>
                                                                                          <FormGroup className="row">
                                                                                                    <Label htmlFor="supplier" sm="2">
                                                                                                              Supplier
                                                                                                    </Label>
                                                                                                    <Col sm="8">
                                                                                                              <Input
                                                                                                                        className="form-control-plaintext"
                                                                                                                        defaultValue="email@example.com"
                                                                                                                        id="supplier"

                                                                                                                        type="text"
                                                                                                              ></Input>
                                                                                                    </Col>
                                                                                          </FormGroup>
                                                                                          <FormGroup className="row">
                                                                                                    <Label htmlFor="date-added" sm="2">
                                                                                                              Date added
                                                                                                    </Label>
                                                                                                    <Col sm="8">
                                                                                                              <Input
                                                                                                                        id="date-added"
                                                                                                                        placeholder="Password"
                                                                                                                        type="select"
                                                                                                              >
                                                                                                                        <option>1</option>
                                                                                                                        <option>2</option>
                                                                                                                        <option>3</option>
                                                                                                                        <option>4</option>
                                                                                                                        <option>5</option>
                                                                                                              </Input>

                                                                                                    </Col>
                                                                                          </FormGroup>
                                                                                          <FormGroup className="row">
                                                                                                    <Label htmlFor="warehouse-staff" sm="2">
                                                                                                              Warehouse staff
                                                                                                    </Label>
                                                                                                    <Col sm="8">
                                                                                                              <Input
                                                                                                                        id="warehouse-staff"
                                                                                                                        placeholder="Password"
                                                                                                                        type="text"
                                                                                                              ></Input>
                                                                                                    </Col>
                                                                                          </FormGroup>
                                                                                          <FormGroup className="row">
                                                                                                    <Label htmlFor="note" sm="2">
                                                                                                              Note
                                                                                                    </Label>
                                                                                                    <Col sm="8">
                                                                                                              <Input
                                                                                                                        id="note"
                                                                                                                        placeholder="Note here..."
                                                                                                                        type="textarea"
                                                                                                              ></Input>
                                                                                                    </Col>
                                                                                          </FormGroup>
                                                                                          <Card>
                                                                                                    <CardBody>Payment info</CardBody>
                                                                                          </Card>
                                                                                          <FormGroup className="row">
                                                                                                    <Label htmlFor="payment_method" sm="2">
                                                                                                              Payment info
                                                                                                    </Label>
                                                                                                    <Col sm="8">
                                                                                                              <Input
                                                                                                                        id="payment_method"

                                                                                                                        type="select"
                                                                                                              >
                                                                                                                        <option>1</option>
                                                                                                                        <option>2</option>
                                                                                                                        <option>3</option>
                                                                                                                        <option>4</option>
                                                                                                                        <option>5</option>
                                                                                                              </Input>

                                                                                                    </Col>
                                                                                          </FormGroup>
                                                                                </Form>
                                                                      </CardBody>
                                                            </Card>

                                                  </Col>
                                        </Row>
                              </div>


                    </>
          );
}
export default Move;