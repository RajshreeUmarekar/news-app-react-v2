import { useContext, useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Alert, Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { AuthContext } from '../../context/AuthContext';
import { authenticate } from '../../services/authenticate';
import { useStoreActions, useStoreState } from '../../store/appStore';
import '../Component.css';

const Auth = () => {
  
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(false);
  const success = useStoreState((state) => state.success);
  const checkLoginValidity = useStoreActions((actions) => actions.checkLoginValidity);

  useEffect(() => {
    if(success){
      setAuthenticated(true);
      navigate('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[success]);
  
  const handleLogin = async (credentials:any) => {
    setToggle(true);
    await authenticate(credentials)
    .then(() => {
      checkLoginValidity();
    });
     
  }

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === 'username'){
      setUsername(e.target.value);
    }else if(e.target.name === 'password'){
      setPassword(e.target.value);
    }
  };
  
  
  return (
    <div className="Component">
      <>
        <center>
          <h2>News Home Page</h2>
          <div className="p-1 my-1 rounded">
            <br/><br/>
            <Col sm={5}>
            {!success && toggle && 
              <Alert color="danger">
                Invalid credentials! Try Again..
              </Alert>
            }
            {!authenticated && !toggle && 
              <Alert color="info">
                Please Login to Proceed
              </Alert>
            }
            </Col>
            
          </div>
          </center>
          {!authenticated &&
          <Col sm={5} style={{marginLeft: '29%'}}>
            <Form>
              <FormGroup row>
              <Label for="username"  sm={4}>UserName</Label>
              <Col sm={8}>
                <Input id="username" name="username" type="text" onChange={handleValueChange}  value={username} required/>
              </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="password"  sm={4}>Password</Label>
                <Col sm={8}>
                    <Input id="password" name="password" type="password" onChange={handleValueChange}  value={password} required />
                </Col>
              </FormGroup>
              <Button color="primary" type="button" onClick= {() => handleLogin({username:username, password:password})}>
                Login
              </Button>
            </Form>
          </Col>
          }
        </>

    </div>
  );
}

export default Auth;
