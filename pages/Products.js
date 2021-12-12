import styles from "../styles/Home.module.css";
import HeadComp from "../components/Head";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Card from "../components/Cards";
import "../styles/Home.module.css";
import Footer from "../components/Footer";
import { useEffect,useState } from "react";
export default function Contact() {
  const [products , setproducts] = useState([]);
  useEffect(()=>{
    fetch(`http://localhost:5002/api/products/products` , {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      
    }).then(data=>{
      return data.json();
    }).then(data=>{
      setproducts(data);
      setready(true);
      
    }).catch(err=>{
      console.log(err.message)
    })
  },[])
  return (

    <div className={styles.container}>
      <HeadComp title="Products-Ecommerce Site" />

      <Navbar />

      <Carousel />
      <br />

      <hr />
      <h1 style={{ color: "black", textAlign: "center", fontSize: 35 }}>
        Our Products
      </h1>
      <hr />
      <br />
      <div className="container">
        <div className="row  d-flex justify-content-center">
          {/* <Card /> */}
            {products.map((el,key)=>{
              return <Card key={key} product={el}/>
            })}
        </div>
       
       
       
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
}
