import { useState } from "react";
import { useAuth } from "../store/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
const URL="http://localhost:5002/api/auth/login"
export const Login =()=>{
    const [user, setUser] = useState({
        email: "",
        password: "",
      });
      const navigate =useNavigate();
    const {storeTokenInLS} =useAuth();
      const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;
    
        setUser({
          ...user,
          [name]: value,
        });
      };
    
      // handle form on submit
      const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(user);
        try {
          const response = await fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          console.log("response data : ", response);
          const res_data = await response.json();
          if (response.ok) {

            
            storeTokenInLS(res_data.token);
            toast.success("login  successful");
            setUser({ email: "", password: "" });
            navigate("/")
            console.log(res_data);
            
          } else {
            toast.error(res_data.extraDetails ?res_data.extraDetails:res_data.message);
          }
        } catch (error) {
          console.error("Error", error);
        }
      };
    
      //  Help me reach 1 Million subs 👉 https://youtube.com/thapatechnical
    
      return (
        <>
          <section>
            <main>
              <div className="section-registration">
                <div className="container grid grid-two-cols">
                  <div className="registration-image reg-img">
                    <img
                      src="/images/registration.jpg"
                      alt="let fill the login form"
                      width="400"
                      height="500"
                    />
                  </div>
                  {/* our main registration code  */}
                  <div className="registration-form">
                    <h1 className="main-heading mb-3">Login form</h1>
                    <br />
                    <form onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="email">email</label>
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={handleInput}
                          placeholder="email"
                        />
                      </div>
                      
                      
                      <div>
                        <label htmlFor="password">password</label>
                        <input
                          type="password"
                          name="password"
                          value={user.password}
                          onChange={handleInput}
                          placeholder="password"
                        />
                      </div>
                      <br />
                      <button type="submit" className="btn btn-submit">
                        Login Now
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </main>
          </section>
        </>
      );
    };