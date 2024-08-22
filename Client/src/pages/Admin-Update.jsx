import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";


export const AdminUpdate=()=>{
  const [data ,setData] =useState({
    username :"",
    email:"",
    phone:""

  });
  const params =useParams();
  console.log("single user params",params)
  const {authorizationToken}=useAuth()
  const getSingleUserData =async(id)=>{ 
    try {
    const response =await fetch(`http://localhost:5002/api/admin/users/${id}`,{
        method:"GET",
        headers:{
            Authorization:authorizationToken
        }
    });
    const data =await response.json();
    console.log(`users  single data: ${data}`);
    setData(data)
} catch (error) {
    console.log(error)
}
}
  const handleInput=(e)=>{
    let name =e.target.name;
    let value =e.target.value;
    //using spread operator
    setData({
      ...data,
      [name]:value
    });
  };

  useEffect(()=>{
    getSingleUserData(params.id);
  },[params.id]);

    const handleSubmit = async(e)=>{
      e.preventDefault();
      try {
        const response =await fetch(`http://localhost:5002/api/admin/users/update/${params.id}`,{
          method:"PATCH",
          headers:{
            "Content-Type":"application/json",
              Authorization:authorizationToken
          },
          body:JSON.stringify(data)
        },
      );

      if(response.ok){
        toast.success("updated successfully")

      }else{toast.error("not updated successfully")}
        
      } catch (error) {
        console.log(error)
      }


    }
    return (
      <>
        <section className="section-contact">
          <div className="contact-content container">
            <h1 className="main-heading">Update User</h1>
          </div>
          {/* contact page main  */}
          <div className="container grid grid-two-cols">
            <div className="contact-img">
              <img src="/images/home.jpg" alt="we are always ready to help" />
            </div>
  
            {/* contact form content actual  */}
            <section className="section-form">
              <form onSubmit={handleSubmit} >
                <div>
                  <label htmlFor="username">username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="off"
                    value={data.username}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone">Mobile</label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    value={data.phone}
                    onChange={handleInput}
                    required
                  />
                </div>
  
                <div>
                  <label htmlFor="email">email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={data.email}
                    onChange={handleInput}
                    required
                  />
                </div>
  
               
          
                <div>
                  <button type="submit">Update Now</button>
                </div>
              </form>
            </section>
          </div>
        </section>
      </>
    );
};
