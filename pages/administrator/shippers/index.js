import {  } from 'next'
import {useState , useEffect} from 'react';
import {useRouter} from 'next/router';
import { useCookies } from 'react-cookie';
import { IconButton } from "@chakra-ui/react"
import {HiMenuAlt2 , HiMenuAlt3} from 'react-icons/hi';
import Table from '../../../Components/SubComponents/tableComponent';
export default function ShippersPage(){
    const [shippers , setshippers] = useState([]);
    const [isLoggedin , setLoggedin] = useState(false); 
    const [authorized , setAuhtorized] = useState(false);
    const router = useRouter();
    const [cookies , setcookie] = useCookies();
    
    useEffect(async () =>{
        const token = cookies.token;
       
        const res = await fetch('http://localhost:5002/administrator/api/shipper' , {
        method : 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
        ) 
        const data = await res.json();
        setshippers(data);
        

    } ,[]);
    const  validate = ()=>{
        setTimeout(async ()=>{
            //validate token
            if(cookies.token && cookies.user){
                if(!isLoggedin){
                   setLoggedin(true); 
                }
               
            }
        } , 500);
        
        
    }
 
    validate();
    return (
        isLoggedin ? 
        (<div class="container-fluid">
        <div style={{ alignItems: "center"}} class="row flex bg-dark h-25">
            
            <div  className="container col-12 text-white text-center p-2 fw-bold">ADMIN PANEL</div>
            
        </div>
        <div className=" container-fluid border mt-2 p-2"> 
                <p className="display-5 text-center"> Shippers </p>
               
        </div>
        {/* table of shippers */}
        <div className="container">
        <Table data={shippers} cols={["#" ,"Shipper ID" , "Name" , "Contact no","Country"]} />
        </div>
        
        </div>) 
        : (<div></div>)

    )
    

}
