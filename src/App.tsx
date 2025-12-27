import {useState} from "react";
import axios from "axios";
import "./styling/form.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error,setError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    if (formData.password !== formData.confirmPassword) {
      setError(true);
      setSubmitError("Passwords do not match");
      return;
    }

    if (!formData.name || !formData.email || !formData.password) {
      setSubmitError("Please fill in all fields");
      return;
    }

    setLoading(true);
    
    try {
      await axios.post('http://192.168.29.117:3000/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setRegisteredEmail(formData.email);
      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      setError(false);
    } catch (err: any) {

      if (err.response) {

        setSubmitError(err.response.data?.error || "Registration failed. Please try again.");
      } else if (err.request) {

        setSubmitError("Network error. Please check if the server is running.");
      } else {
        setSubmitError("An error occurred. Please try again.");
      }
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  }

  return(
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{
      minHeight: "100vh",
  width: "100%",
  background: "linear-gradient(270deg, rgb(70, 207, 147), rgb(43, 169, 140), rgb(89, 204, 103))"

    }}>
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-md-6 col-lg-5 mb-4 mb-md-0">
            <div className="text-white p-4">
              <h2 className="mb-4 fw-bold">Welcome to Our Platform</h2>
              <p className="lead mb-4" style={{fontSize: '1.1rem', lineHeight: '1.8'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <div className="mt-4">
                <h4 className="fw-bold text-warning">Register for more!</h4>
                <p className="mt-3">
                  Join thousands of users who are already benefiting from our platform. Get access to exclusive features, updates, and more!
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-7 col-lg-5 offset-lg-1">
            <div className="card shadow-lg border-0" style = {{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
              <div className="card-header text-white text-center py-3" style = {{backgroundColor: 'rgb(1, 116, 25)'}}>
                <h3 className="mb-0">
                  Join Us Today 🎉
                </h3>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-bold text-white">Name</label>
                    <input 
                      type="text" 
                      className="form-control  " 
                      id="name" 
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold text-white">Email address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    />
                    </div>
                  
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-bold text-white">Password</label>
                    <input 
                      type="password" 
                      className="form-control " 
                      id="password" 
                      placeholder="Enter your password" 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label fw-bold text-white">Confirm Password</label>
                    <input 
                      type="password" 
                      className={`form-control ${error ? 'is-invalid' : ''}`}
                      id="confirmPassword" 
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => { 
                        setFormData({...formData, confirmPassword: e.target.value});
                        if(formData.password && formData.password.length > 0 && formData.password !== e.target.value){
                          setError(true);
                        } else {
                          setError(false);
                        }
                      }} 
                    />
                    {error && (
                      <div className="invalid-feedback d-block" style={{color: 'rgb(204, 32, 32)'}}>
                        Passwords do not match
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label text-white" htmlFor="exampleCheck1">
                      I agree to the terms and conditions
                    </label>
                  </div>

                  {submitError && (
                    <div className="alert alert-danger" role="alert">
                      {submitError}
                    </div>
                  )}
                  
                  <div className="d-grid">
                    <button 
                      type="submit" 
                      className="btn btn-lg"
                      disabled={loading}
                      style = {{backgroundColor: 'rgb(1, 116, 25)', color: 'white'}}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Registering...
                        </>
                      ) : (
                        "Register"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="modal show d-block" tabIndex={-1} style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">
                  ✅ Registration Successful!
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setShowSuccess(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="mb-0">
                  <strong>Registration successful! Kindly check your email.</strong>
                </p>
                <p className="text-muted mt-2">
                  We've sent a confirmation email to <strong>{registeredEmail}</strong>
                </p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-success" 
                  onClick={() => setShowSuccess(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RegistrationForm;