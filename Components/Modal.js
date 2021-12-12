import React from "react";
import Link from 'next/head'
import { FaWindows } from "react-icons/fa";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function Modal(props) {
  const[cookies , setcookies] = useCookies()
    const [address,  setaddress] = useState("");
    const [contact,  setcontact] = useState("");
    const [show , setshow] = useState(false);
    const get_total = (cart)=>{
      let sum = 0;
      for(let i = 0; i < cart.length ; i++){
        sum += (cart[i].product.PRICE * cart[i].quantity);
      }
      return sum;
    }
    const handleaddress = (e)=>{
      e.preventDefault();
      setaddress(e.target.value);
    }
    const handlecontact = (e)=>{
      e.preventDefault();
      setcontact(e.target.value);
    }
  const handleClick=(e)=>{
      setaddress("");
      setcontact("");
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        let addr = props.user.ADDRESS;
        let obj={cart:[]};
        let to_send= {}
        if(address!= ""){addr= address}
        let cart_items = JSON.parse(localStorage.getItem('cart'));
        console.log(cart_items);
    
        let sum = 0;
        for(let i = 0 ;i<cart_items.length;i++){
          sum += (cart_items[i].product.PRICE * cart_items[i].quantity);
          obj.cart.push([cart_items[i].product.PRODUCT_ID ,cart_items[i].quantity ])
        }
        to_send.cart=  obj.cart;
        to_send.amount =sum;
        to_send.customer_id = props.user.CUSTOMER_ID;
        to_send.address = addr;
        console.log(to_send)
        fetch('http://localhost:5002/api/v1/user/order/add' , {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body : JSON.stringify(to_send)
        }).then(data=>{
          return data.json();
        }).then(data=>{
          window.alert("order placed!!! our team will tell your order status in a while!! THANK YOU") 
          console.log(data)
        }).catch(err=>{
          window.alert(`sorry!!! error placing order ${err.message}`) 
          console.log(err.message)
        })
        
        window.location.href="/Home"
        setaddress("");
      setcontact("");
    }
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Press to Confirm
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                PROCEED WITH ORDER
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{props.message}. Your Order of Rupees {props.total} is confirmed and is on its way. Happy Shopping! 😍 </div>
            <div class="container-fluid">
            <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">@</span>
  </div>
  <input type="text" class="form-control" value={address} onChange={handleaddress} placeholder="address" aria-label="Address(optional)" aria-describedby="basic-addon1" />
</div>
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">@</span>
  </div>
  <input type="text" class="form-control" value={contact} onChange={handlecontact} placeholder="other phonenumber(optional)" aria-label="Address(optional)" aria-describedby="basic-addon1" />
</div>
            </div>
            {show ? <div class="bg-success">Order Placed</div>:null}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClick}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
              >
                CONFIRM ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
