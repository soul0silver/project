import React, { useContext, useState } from 'react'
import { MDBInput, MDBCol, MDBRow,  } from 'mdb-react-ui-kit'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button, Row, Col, Input, FormGroup } from 'reactstrap'
import { Appcontext } from 'context/Appcontext'

export default function Login () {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    password: ''
  })
  const { setIsLoggin } = useContext(Appcontext)
  const senddata = e => {
    e.preventDefault()

    axios
      .post('http://localhost:8080/auth/login', form)
      .then(response => {
        window.localStorage.setItem('token', JSON.stringify(response.data))
        console.log(response)
        navigate('/admin/dashboard')
        setIsLoggin(true)
      })
      .catch(error => {
        console.log(error)
      })
    console.log(form)
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingTop:80
      }}
    >
      <h2>LOGIN</h2>
      <div className='login_page'>
        <form onSubmit={senddata} method='post'>
          <FormGroup>
            <label>User name</label>
            <Input 
              style={{textAlign:'center'}}
            className='mb-4'
            type='text'
            id='form1Example1'
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            /></FormGroup>
          <FormGroup>
            <label>Password</label>
          <Input
            className='mb-4'
            type='password'
            id='form1Example2'
            style={{textAlign:'center'}}
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </FormGroup>
          <MDBRow className='mb-4'>
            <MDBCol>
              <a href='#!'>Forgot password?</a>
            </MDBCol>
          </MDBRow>
          <Row>
            <div className='col-12  text-center'>
              <Button style={{ width: '150px' }} type='submit'>
                LOGIN
              </Button>
            </div>
          </Row>
        </form>
      </div>
    </div>
  )
}
