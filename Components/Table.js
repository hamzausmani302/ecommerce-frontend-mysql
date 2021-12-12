import React , {useEffect} from "react";
import { useCookies } from "react-cookie";
export default function Table(props) {
  const [cookies , setcookies] = useCookies();
  useEffect(() => {
    console.log("items" , props.items)
  }, [])
  
  return (
    <div className='container'>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Net Price/Rs</th>
          </tr>
        </thead>
        <tbody>
         {props.items.map((el,index)=>{
           return ( <tr>
            <th scope="row">{index+1}</th>
            <td>{el.product.PRODUCT_NAME}</td>
            <td >{el.quantity}</td>
            <td>{el.product.PRICE}</td>
            <td> <button class="btn" onClick={()=>{
              props.remove(el,index);
            }}>✠ Remove</button></td>
          </tr>)
         })}
         
        </tbody>
      </table>
    </div>
  );
}
