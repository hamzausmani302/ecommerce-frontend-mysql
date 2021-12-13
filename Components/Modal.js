import React from "react";
import Link from "next/head";
import { FaWindows } from "react-icons/fa";
import { useState ,useEffect} from "react";
import { useCookies } from "react-cookie";

export default function Modal(props) {
  const [cookies, setcookies] = useCookies();
  const [address, setaddress] = useState("");
  const [contact, setcontact] = useState("");
  const [show, setshow] = useState(false);
  const [cardenabled, setenabled] = useState(false);
  const [error, seterror] = useState("");
  const [cardnumber, setcardnumber] = useState("");
  const [pin, setpin] = useState(null);
  const [expiry, setexpiry] = useState(null);
  useEffect(() => {
    setaddress("");
    setcontact("");
    setcardnumber("");
    setpin(null);
    setexpiry(null);
    seterror("");
  }, [])
  const get_total = (cart) => {
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
      sum += cart[i].product.PRICE * cart[i].quantity;
    }
    return sum;
  };
  const handlepin = (e)=>{
    setpin(e.target.value)
  }
  const handleexpiry = (e)=>{
    setexpiry(e.target.value)
  }
  const handlecardnumber = (e)=>{
      setcardnumber(e.target.value)
  }
  const handleaddress = (e) => {
    e.preventDefault();
    setaddress(e.target.value);
  };
  const handlecontact = (e) => {
    e.preventDefault();
    setcontact(e.target.value);
  };
  const handleClick = (e) => {

    setaddress("");
    setcontact("");
    setcardnumber("");
    setpin(null);
    setexpiry(null);
    seterror("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
   let transaction = {};
    let addr = props.user.ADDRESS;
    let obj = { cart: [] };
    let to_send = {};
    if (address != "") {
      addr = address;
    }
   
    if(cardnumber != ""){
      transaction.card_number = cardnumber;
    }
    if(pin != null){
      transaction.pin = pin;
    }
    if(expiry != null){
      transaction.expiry = expiry;
    }
    let cart_items = JSON.parse(localStorage.getItem("cart"));
    console.log(cart_items);

    let sum = 0;
    for (let i = 0; i < cart_items.length; i++) {
      sum += cart_items[i].product.PRICE * cart_items[i].quantity;
      obj.cart.push([cart_items[i].product.PRODUCT_ID, cart_items[i].quantity]);
    }
    to_send.cart = obj.cart;
    to_send.transaction = transaction
    to_send.amount = sum;
    to_send.customer_id = props.user.CUSTOMER_ID;
    to_send.address = addr;
    console.log(to_send);
    if(Object.keys(to_send.transaction).length >0 && Object.keys(to_send.transaction).length<3  ){
      window.alert("all fields required");
      return null;
    }
    
    fetch("http://localhost:5002/api/v1/user/order/add", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(to_send),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if(data.error){
          throw new Error(data.error);
         
        }
        setaddress("");
    setcontact("");
    setcardnumber("");
    setpin(null);
    setexpiry(null);
   
    seterror("");
        window.alert(
          "order placed!!! our team will tell your order status in a while!! THANK YOU"
        );
        window.location.href = "/Home";
   
      })
      .catch((err) => {
        window.alert(`sorry!!!cannot place your order :  ${err.message}`);
        console.log(err.message);
      });

   
    props.toggle();
    
  };
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
            <div className="modal-body">
              {props.message}. Your Order of Rupees {props.total} is confirmed
              and is on its way. Happy Shopping! 😍{" "}
            </div>
            <div className="container-fluid">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    @
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={handleaddress}
                  placeholder="address(optional)"
                  aria-label="Address(optional)"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    @
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  value={contact}
                  onChange={handlecontact}
                  placeholder="other phonenumber(optional)"
                  aria-label="Address(optional)"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className=" row  rounded bg-primary p-2  justify-content-center text-white">
                <div className="col-2">
                  {!cardenabled ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-up"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                      />
                    </svg>
                  )}
                </div>
                <div className="col-10">
                  <button
                    onClick={() => {
                      setcardnumber("");
                      setpin(null);
                      setexpiry(null);
                      setenabled(!cardenabled);
                    }}
                  >
                    {!cardenabled ? "PAY WITH CARD" : "Donot pay with card"}
                  </button>
                </div>
              </div>
            </div>
           {cardenabled ? <div class="container">
              <div className="input-group mb-3">
               
                <input
                  type="text"
                  className="form-control"
                  value={cardnumber}
                  onChange={handlecardnumber}
                  placeholder="Card Number"
                  aria-label="Card Number"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
               
                <input
                  type="number"
                  className="form-control"
                  value={pin}
                  onChange={handlepin}
                  placeholder="Enter 4-digit pin"
                  aria-label="Pin number"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
               
               <input
                 type="date"
                 className="form-control"
                 value={expiry}
                 onChange={handleexpiry}
                 placeholder="expiry date"
                 aria-label="expiry date"
                 aria-describedby="basic-addon1"
               />
             </div>
             {error != ""?<div class="bg-danger p-2">{error}</div>:null}
            </div>:null}
            {show ? <div class="bg-success">Order Placed</div> : null}

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
