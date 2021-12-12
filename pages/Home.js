
import { useEffect,useState } from "react";
import { useCookies } from 'react-cookie';
import styles from "../styles/Home.module.css";
import HeadComp from "../components/Head";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Cards from "../components/Cards";
import Categories from "../components/Categories";
import "../styles/Home.module.css";
import Footer from "../components/Footer";

export default function Home() {
  const [cookies , setcookie] = useCookies();
  const [logged,setlogged] = useState(false); 
  const [categories , setcategories ] = useState([null]); 
  const [products , setproducts] = useState([null]);
  
  const [change , setchange]= useState(false);
  const [ready, setready] = useState(false);
  useEffect(() => {
    if(cookies.logged){
      setlogged(true);
    }
    //fetch 10 products
    fetch('http://localhost:5002/api/category' , {
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
      setcategories(data);

    }).catch(err=>{
      console.log(err.message)
    })
   
    fetch('http://localhost:5002/api/products/products' , {
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
      setready(true)
    }).catch(err=>{
      console.log(err.message)
    })
    //fetch all categories
  }, [change])
  return (
    ready ? (<div className={styles.container}>
      <HeadComp title="Home-Ecommerce Site" />
      <Navbar loggedin={!logged} />
      <Carousel />
      <br />

      <hr />
      <h1 style={{ color: "black", textAlign: "center", fontSize: 35 }}>
        Categories
      </h1>
      <hr />
      <br />
      <Categories categories={categories} />
      <br />
      <hr />
      <h1 style={{ color: "black", textAlign: "center", fontSize: 35 }}>
        Featured Products{" "}
        <sup>
          <span className="badge bg-danger" style={{ fontSize: 14 }}>
            Sale <span style={{ color: "yellow" }}>🔥</span>{" "}
          </span>
        </sup>
        <br />
      </h1>
      <hr />
{  products != null ?     (  <div className="container ">
          <div className="row  d-flex justify-content-around">
            {products.map((el,key)=>{
              return (<Cards key={key} product={el}/>)
            })}
            
          </div>
        </div>) : null
}
      <br />
      <br />
      <Footer />
    </div>) : null
  );
}
