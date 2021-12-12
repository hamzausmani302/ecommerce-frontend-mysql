import React , {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import HeadComp from "../components/Head";
import router, { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import styles from "../styles/SignIn.module.css";
export default function SignIn() {
  const router = useRouter();
  
  const [cookies , setcookies ] = useCookies();
  
  const [firstname , setfirstname] = useState("");
  const [lastname , setlastname] = useState("");
  const [email , setemail] = useState("");
  const [password , setpassword] = useState("");
  const [address ,  setaddress] = useState("");
  const [phonenumber , setphonenumber] = useState("");
  const [error , seterror] = useState(null);
  const reset_inputs = ()=>{
      setfirstname("");
      setlastname("");
      setemail("");
      setpassword("")
      setaddress("")
      setphonenumber("")
      seterror(null);
  }
  const handlefirstname = (e)=>{
    e.preventDefault();
    seterror(null);
    
    setfirstname(e.target.value);
  }
  const handlelastname = (e)=>{
    e.preventDefault();
    seterror(null);
    
    setlastname(e.target.value);
  }
  const handleemail = (e)=>{
    e.preventDefault();
    seterror(null);
    setemail(e.target.value);
    
  }
  const handlepassword = (e)=>{
    e.preventDefault();
    seterror(null);
    
    setpassword(e.target.value);
  }
  const handleaddress = (e)=>{
    e.preventDefault();
    seterror(null);
    
    setaddress(e.target.value);
  }
  const handlephone = (e)=>{
    e.preventDefault();
    seterror(null);
    
    setphonenumber(e.target.value);
  }
  const handlesubmit = (e)=>{
    e.preventDefault();
  if(!email || !password || !address || !firstname || !lastname || !phonenumber ){seterror("all fields required");return 1;}
    if(email.indexOf("@") ==-1 || email.indexOf(".") == -1){ 
      seterror("invalid email");return 1;
    }
    fetch('http://localhost:5002/api/v1/user/signup', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
     
     
      body: JSON.stringify({FIRST_NAME : firstname , LAST_NAME : lastname ,email : email ,password : password ,address : address , PHONE_NUMBER : phonenumber   })
    }).then(res=>res.json())
    .then((data)=>{
      console.log(data);
      
      
      setcookies("user-token" , data.Token);
      setcookies("_id" , data.data[0].CUSTOMER_ID)
      setcookies("user-info" , JSON.stringify(data.data[0]));
      setcookies("logged" ,true);
      router.push({pathname :"/Home" , query : {token : data.Token} }, "/Home");
    }).catch(err=>{
      seterror("email already exists");
    })

    //send data to backend
    // reset_inputs();
  }
  return (
    <div className={styles.body}>
            <HeadComp title='Sign Up-Ecommerce Site'/>

      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="">
            User Sign UP
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
              value = {firstname}
              onChange={handlefirstname}
                type="text"
                placeholder="Enter First Name"
                className={styles.inp}
              />
              <input
              value = {lastname}
              onChange={handlelastname}
                type="text"
                placeholder="Enter Last Name"
                className={styles.inp}
              />
              <br/>
              <input
              value = {email}
              onChange={handleemail}
                type="email"
                placeholder="Enter Email Address"
                className={styles.inp}
              />
              <input
              value = {password}
              onChange={handlepassword}
                type="password"
                placeholder="Enter Password"
                className={styles.inp}
              />
              <br/>
              <input
              value = {address}
              onChange={handleaddress}
                type="text"
                placeholder="Enter Address"
                className={styles.inp}
              />
              <br />
              <input
              value = {phonenumber}
              onChange={handlephone}
                type="text"
                placeholder="Enter Phone No"
                className={styles.inp}
              />
              <br />
              {error!=null ? <div style={{color : "white" , opacity:0.8}} className="bg-danger rounded mt-4 text-center p-2">{error}</div> : null}
              <button className={`${styles.btn} + btn-dark`} onClick={handlesubmit}>Sign Up</button>
              <Link href='/SignIn'><button className={`${styles.btn} + btn-dark`}>Have a Account? Sign In</button></Link>
              <Link href='/Home'><button className={`${styles.btn} + btn-dark`}>Back To Home</button></Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
