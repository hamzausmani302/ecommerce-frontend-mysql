import React from "react";
import Image from "next/image";
import Link from 'next/link';
import { FaPeopleArrows } from "react-icons/fa";

export default function CardCategories(props) {
  return (
    <div className="card text-dark" style={{ width: "18rem" , marginTop:20,backgroundColor:'#075ead',border:0}}>
      <img className="card-img-top rounded-circle" src={props.category.CATEGORY_IMAGE} alt="Card image cap" />
      <div className="card-body" style={{textAlign:'center'}}>
      
        <Link   href={`/category/${props.category.CATEGORY_ID}`} className="btn btn-primary" style={{textTransform:'uppercase'}}>
          <div className="rounded btn text-white fw-bold bg-primary p-2">
            {props.category.CATEGORY_NAME}
          </div>
        </Link>
        
      </div>
    </div>
  );
}
