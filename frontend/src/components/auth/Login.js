import React, { useState } from 'react';
import { Container, Row, Form, Col, Alert, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useLoginMutation } from '../../services/appApi';
import Register from './Register';


const Login = ({ show, setShow }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // State to manage login/signup mode
  const [login, { isError, isLoading, error }] = useLoginMutation();
 

  const handleToggleMode = () => {
         setIsLogin(!isLogin); // Toggle between login and signup modes
       };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
    setShow(false); // Close the modal after login attempt
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? 'Login to your account' : 'Sign Up for a new account'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md={6} className="login__form--container">
            {isLogin ? (
              <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
                {isError && ( <Alert variant="danger">{error.data}</Alert>)}
                <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="keep me logged in" />
                </Form.Group>

                <Form.Group>
                  <Button variant="secondary" type="submit" disabled={isLoading}>
                    Login
                  </Button>
                </Form.Group>
                <p className='pt-3 text-center'>Register for new account below?</p>
              </Form>
              ) : (
                // Render the Register component for signup mode
                   <Register />
                 )}
            </Col>
            <Col md={6} className="login__image--container"></Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
           <Button variant="secondary" onClick={handleToggleMode}>
             {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
          </Button>
         </Modal.Footer>
    </Modal>
  );
};

export default Login;

// import React, { useState } from 'react';
// import { Container, Row, Form, Col, Alert, Modal } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import { Link } from 'react-router-dom';
// import { useLoginMutation } from '../services/appApi';
// import Register from './auth/Register';

// const Login = () => {
//   const [show, setShow] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLogin, setIsLogin] = useState(true); // State to manage login/signup mode
//   const [login, { isError, isLoading, error }] = useLoginMutation();

//   const handleToggleMode = () => {
//     setIsLogin(!isLogin); // Toggle between login and signup modes
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login({ email, password });
//   };

//   return (
//     <>
//       <Button variant="primary" onClick={() => setShow(true)}>
//         Login
//       </Button>

//       <Modal show={show} onHide={() => setShow(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {isLogin ? 'Login to your account' : 'Sign Up for a new account'}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Container>
//             <Row>
//               <Col md={6} className="login__form--container">
//                 {isLogin ? (
//                   <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
//                     {isError && (
//                       <Alert variant="danger">{error.data}</Alert>
//                     )}
//                     <Form.Group>
//                       <Form.Label>Email Address</Form.Label>
//                       <Form.Control
//                         type="email"
//                         placeholder="Enter email"
//                         onChange={(e) => setEmail(e.target.value)}
//                         value={email}
//                         required
//                       />
//                     </Form.Group>

//                     <Form.Group>
//                       <Form.Label>Password</Form.Label>
//                       <Form.Control
//                         type="password"
//                         placeholder="Enter password"
//                         onChange={(e) => setPassword(e.target.value)}
//                         value={password}
//                         required
//                       />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formBasicCheckbox">
//                       <Form.Check type="checkbox" label="Check me out" />
//                     </Form.Group>

//                     <Form.Group>
//                       <Button type="submit" disabled={isLoading}>
//                         Login
//                       </Button>
//                     </Form.Group>
//                     <p className="pt-3 text-center">
//                       Don't have an account?{' '}
//                       <Link to="/signup" onClick={handleToggleMode}>
//                         Sign up for a new account
//                       </Link>
//                     </p>
//                   </Form>
//                 ) : (
//                   // Render the Register component for signup mode
//                   <Register />
//                 )}
//               </Col>
//               <Col md={6} className="login__image--container"></Col>
//             </Row>
//           </Container>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleToggleMode}>
//             {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default Login;
