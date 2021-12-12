import React,{useState,useEffect} from "react";
import Cards from "./Cards";
export default function Categories(props) {
  const [products, setproducts] = useState([])
  useEffect(() => {
    setproducts(props.products)
    
  }, [])
  return (
      <div className="container" style={{ padding:0}}>
          <div className="text-center p-2 mt-4 fw-bold display-2">{props.products[0].CATEGORY_NAME}</div>
            <hr />
            <div style={{minHeight:"10rem"}}></div>
        <div className="row  d-flex justify-content-around">
        {products.map((el,key)=>{
              return (<Cards key={key} product={el}/>)
            })}  
    
        </div>
      </div>
  );
}
