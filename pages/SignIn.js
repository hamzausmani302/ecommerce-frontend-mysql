import React, { useState } from "react";
import Image from "next/image";
import HeadComp from "../components/Head";
import { useCookies } from 'react-cookie';
import { useRouter  } from 'next/router'
import Link from "next/link";
import styles from "../styles/SignIn.module.css";
export default function SignIn() {
  const router = useRouter();
  const [cookies , setcookies ] = useCookies();
  

  const [email , setemail]= useState(null);
  const [password , setpassword]= useState(null);
  const [showerror, setshowerror] = useState(null);
  const handlesignin = (e)=>{
    e.preventDefault();
    setshowerror(null);
    if(!email || !password){setshowerror("all fields required");return 1;}
    if(email.indexOf("@") ==-1 || email.indexOf(".") == -1){ 
      setshowerror("invalid email");return 1;
    }
    //call the route from here
    fetch('http://localhost:5002/api/v1/user/login', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
     
     
      body: JSON.stringify({email: email ,  password : password}) // body data type must match "Content-Type" header
    }).then(res=>res.json())
    .then((data)=>{
      console.log(data);
      if(!data){
        throw new Error("no such user exists");
      }
      if(data.error){
        throw new Error(data.error);
      }
      if(data && data.length == 0 ){
          throw new Error("no such user exists");
      }
      
      setcookies("user-token" , data.Token);
      setcookies("_id" , data.data[0].CUSTOMER_ID)
      setcookies("user-info" , JSON.stringify(data.data[0]));
      setcookies("logged" ,true);
      router.push({pathname :"/Home" , query : {token : data.Token} }, "/Home");
    }).catch(err=>{
      setshowerror(err.message);
    })
  }
  const handleemail = (e)=>{
    e.preventDefault();
    setshowerror(null);
    setemail(e.target.value);
    
  }
  const handlepassword = (e)=>{
    e.preventDefault();
    setshowerror(null);
    setpassword(e.target.value);
  }
  return (
    <div className={styles.body}>
              <HeadComp title='SignIn-Ecommerce Site'/>

      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            User Sign In
          </a>
        </div>
      </nav>
      <div className="container" style={{ marginTop: "7%" }}>
        <div className="row">
          <div className="col-lg d-flex justify-content-center">
            <Image
              src="/Images/logo.png"
              height="100"
              width="150"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center">
            <form>
              <input
                type="email"
                value={email}
                onChange={handleemail}
                placeholder="Enter Email Address"
                className={styles.inp}
              />
              <br />
              <input
               value={password}
               onChange={handlepassword}
                type="password"
                placeholder="Enter Password"
                className={styles.inp}
              />
              <br />
              {showerror!=null ? <div style={{color : "white" , opacity:0.8}} className="bg-danger rounded mt-4 text-center p-2">{showerror}</div> : null}
              <button className={`${styles.btn} + btn-dark`} onClick={handlesignin}>Sign In</button>
              <Link href='/SignUp'><button className={`${styles.btn} + btn-dark`}>Dont Have an Account? Sign up</button></Link>
              <Link href='/Home'><button className={`${styles.btn} + btn-dark`}>Back To Home</button></Link>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
