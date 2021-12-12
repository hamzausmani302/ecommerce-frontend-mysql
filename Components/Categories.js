import React,{useState,useEffect} from "react";
import CardCategories from "./CardsCategories";
export default function Categories(props) {
  const [categories, setcategories] = useState(props.categories)
  useEffect(() => {
    console.log(props.categories);
  }, [])
  return (
      <div className="" style={{ backgroundColor: "#075ead" ,padding:0}}>
        <div  className="row d-flex justify-content-center">
          {props.categories.map((el)=>{
            
            return ( <CardCategories  category={el}/>)
          })}
          
      </div>
      </div>
  );
}
