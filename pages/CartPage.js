import styles from "../styles/Home.module.css";
import HeadComp from "../components/Head";
import Navbar from "../components/Navbar";
import Link from 'next/link'
import Carousel from "../components/Carousel";
import "../styles/Home.module.css";
import Footer from "../components/Footer";
import Table from "../components/Table";
import Modal from '../components/Modal'
import Modal2 from '../components/ModalBack';
import { useState , useEffect } from "react";
import { useCookies } from "react-cookie";
export default function Contact() {
  const [cookies , setcookies] = useCookies(); 
  const [toggle,setToggle]=useState(0);
   const [items , setitems] = useState([]);
   const [change , setchange]= useState(false);
   const [loggedin , setloggedin] = useState(false);
   const gettotal = ()=>{
     let total = 0;
     for(let i=0;i<items.length ; i++){
       total += items[i].product.PRICE * items[i].quantity;
     }
     return total;
   }
   const delete_item=(el,index)=>{
    let arr = JSON.parse(localStorage.getItem('cart'));
    arr.splice(index, 1);
    localStorage.setItem('cart',JSON.stringify(arr));
    setchange(!change)
  }
   useEffect(() => {
     
    let item = localStorage.getItem("cart");
     let obj = JSON.parse(item);
     setitems(obj);

   }, [change]) 
   const handleClick=()=>{
            setToggle(1);
            
   }

   const validated = ()=>{
    console.log(cookies['user-info'],cookies['user-token'],cookies.logged)
    if(cookies['user-info'] && cookies['user-token'] && cookies.logged && cookies.logged =='true'){
        return true;
     }
     return false;
   }
  return (
    <div className={styles.container}>
      <HeadComp title="Cart-Ecommerce Site" />

      <Navbar />
      <br />
      <h1 style={{ color: "black", textAlign: "center", fontSize: 35,marginTop:120 }}>
            🛒 My Cart
      </h1>
      <br />
        <Table remove={delete_item} items={items}/>
        <br/>
      <div className="container">
        <div className="row">
          <div className="col d-flex justify-content-around">
            <p className="h4" style={{fontWeight:600}}>Number of Item: {localStorage.getItem('cart')?items.length:0}</p>
          </div>
          <div className="col d-flex justify-content-around">
            <p className="h4 font-weight-bold"  style={{fontWeight:600}}>Total Bill: Rs.{gettotal()}</p>
          </div>
          <div className="col d-flex justify-content-around">
          
          {validated() ?<Modal total={gettotal()} user={cookies['user-info']} message="Valid"  valid={true}/> :
          <Modal2 message="Not validate"  valid={false}/>
          
          }
          
          </div>
        </div>
            
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
}
