import React, { useState } from "react";
import { useSignupMutation } from "../../services/appApi";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [signup, { error, isLoading, isError }] = useSignupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(firstname, lastname, phone, email, password);
    await signup({ firstname, lastname, phone, email, password });
  };
  return (
    <div>
      <h5 className="heading-design-h5">Register Now!</h5>
      
        <fieldset className="form-group">
          <label>First Name</label>
          <input
            className="form-control"
            type="name"
            placeholder="Enter first name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstname}
            required
          />
          {isError && <span className="errorMessage">{error.data}</span>}
        </fieldset>
        <fieldset className="form-group">
          <label>Last Name</label>
          <input
            className="form-control"
            type="name"
            placeholder="Enter last name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastname}
            required
          />
          {isError && <span className="errorMessage">{error.data}</span>}
        </fieldset>
        <fieldset className="form-group">
          <label>Phone</label>
          <input
            className="form-control"
            type="number"
            placeholder="Enter Mobile Number"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          {isError && <span className="errorMessage">{error.data}</span>}
        </fieldset>
        <fieldset className="form-group">
          <label>Enter Email</label>
          <input
            className="form-control"
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          {isError && <span className="errorMessage">{error.data}</span>}
        </fieldset>
        <fieldset className="form-group">
          <label>Enter Password</label>
          <input
            className="form-control"
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          {isError && <span className="errorMessage">{error.data}</span>}
        </fieldset>
        {/* <fieldset className="form-group">
                    <label>Enter Confirm Password </label>
                    <input type="password" className="form-control" placeholder="********" />
                </fieldset> */}
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck2"
          />
          <label className="custom-control-label" htmlFor="customCheck2">
            I Agree with <Link href="/">Term and Conditions</Link>
          </label>
        </div>
        <fieldset className="form-group">
          <button
            className="btn btn-lg btn-secondary btn-block"
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Create Your Account
          </button>
        </fieldset>
      
    </div>
  );
};

export default Register;
