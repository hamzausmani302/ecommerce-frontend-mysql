import React from "react";
import Link from 'next/head'
import { FaWindows } from "react-icons/fa";
export default function Modal(props) {
    const handleClick=()=>{
       //window.location.href='/Home';
    }
    const handleSubmit = ()=>{
        window.location.href='/SignIn';
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
            <div className="modal-body">{props.message}. Your Order of Rupees 2750 is confirmed and is on its way. Happy Shopping! 😍 </div>
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
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
              >
                SIGN IN FIRST
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
