import React from 'react';
import {
          MDBInput,
          MDBCol,
          MDBRow,
          MDBCheckbox,
          MDBBtn
} from 'mdb-react-ui-kit';

export default function Login() {
          return (
                    <div style={{ backgroundColor: "rgb(42,42,42)", display: 'flex', flexDirection: "column", alignItems: "center", width: "100%", height: "100%" }}>
                              <div>
                                        
                              </div>
                    <div className='login_page'>
                              <form>
                                        <MDBInput className='mb-4' type='email' id='form1Example1' label='Email address' />
                                        <MDBInput className='mb-4' type='password' id='form1Example2' label='Password' />

                                        <MDBRow className='mb-4'>
                                                  <MDBCol className='d-flex justify-content-center' >
                                                            <MDBCheckbox  />Remember me
                                                  </MDBCol>
                                                  <MDBCol >
                                                                      <a href='#!' >Forgot password?</a>
                                                                   
                                                  </MDBCol>
                                        </MDBRow>

                                        <MDBBtn type='submit' block>
                                                  Sign in
                                        </MDBBtn>
                              </form>
                              </div>
                    </div>
          );
}