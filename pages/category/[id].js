import {useRouter} from 'next/router';
import { useEffect,useState } from 'react';
import CategoryCatalog from '../../Components/CategoryCatalog';
import HeadComp from "../../Components/Head";
import Navbar from "../../Components/Navbar";
export default function(props) {
    const router = useRouter();
    const [id , setid] = useState(null);
    const [products , setproducts] = useState([]); 
    const [ready, setready] = useState(false); 
    useEffect(
        ()=>{
            if(id){
                localStorage.setItem('cat_store' , id); 
            }else{
                setid(localStorage.getItem('cat_store'))
            }   
            let len = window.location.pathname.split("/").length;
            let cat = window.location.pathname.split("/")[len-1] ;
            fetch(`http://localhost:5002/api/category/products/${cat}` , {
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
            
        
           
           
            

        },[]
    )
    return (
        <div>
          <HeadComp title="Products-Ecommerce Site" />

<Navbar />
<div style={{minHeight:"10rem"}}></div>
           {ready ?  <CategoryCatalog products={products}/>:null}
        </div>
    );
}