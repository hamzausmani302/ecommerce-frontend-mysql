import React , {useEffect} from "react";
import Image from "next/image";
import Link from 'next/link';
import { useCookies } from "react-cookie";
export default function Cards(props) {
  const [cookies , setcookies] = useCookies();
  
  const add_item = (el)=>{
    if(!localStorage.cart){localStorage.setItem('cart', JSON.stringify([{product : el , quantity : 1}]));}
    else{
      let arr = JSON.parse(localStorage.getItem('cart'));
      for(let i = 0 ; i < arr.length ; i++){
        if(arr[i].product.PRODUCT_ID == el.PRODUCT_ID){
            arr[i].quantity = arr[i].quantity+1;
            localStorage.setItem('cart' ,JSON.stringify(arr) )
            return 1;
        }
      }
      arr.push({product : el , quantity : 1});
      localStorage.setItem('cart' ,JSON.stringify(arr) )
      
    }
  }
  useEffect(() => {
    

   
  }, [])
  
  return (
    <div className="card text-dark bg-light p-2" style={{ width: "18rem" , marginTop:20}}>
      <img style={{height:"15rem",width:"100%"}} className="card-img-top" src={props.product.IMAGEURL != null ? props.product.IMAGEURL :"https://thumbs.dreamstime.com/z/no-found-symbol-unsuccessful-search-vecotr-upset-magnifying-glass-cute-not-zoom-icon-suitable-results-oops-page-failure-122786031.jpg" } alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{props.product.PRODUCT_NAME}</h5>
        <p className="card-text">
          {props.product.DESCRIPTION}
        </p>
        <div>
            <p class="display-6">Rs.{props.product.PRICE}</p>
        </div>
        <div className="btn btn-primary mt-2">
        <button onClick={()=>{
            add_item(props.product)
        }} className=" fw-bold btn btn-primary rounded p-2">
          Add to Cart 🛒
        </button>
        </div>
      </div>
    </div>
  );
}
