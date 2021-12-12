

import { useCookies } from "react-cookie";
import { useState , useEffect } from "react";
import Navbar from "../Components/Navbar.js";
import TableItems from "../Components/TableItems.js";
export default function(props) {
const [cookies , setcookies] = useCookies();
const [user, setuser] = useState({});
const [orders , setorders] = useState([]);
const [ready,setready] = useState(false);
    
useEffect(() => {
        user.FIRST_NAME = cookies["user-info"].FIRST_NAME;
        user.LAST_NAME = cookies["user-info"].LAST_NAME;
        user.email = cookies["user-info"].EMAIL;
        user.address = cookies["user-info"].ADDRESS;
        user.phone_num = cookies["user-info"].PHONE_NUMBER;
        user.id = cookies["user-info"].CUSTOMER_ID;
        console.log(user);
        
        if(cookies['user-info']){
        fetch(`http://localhost:5002/api/v1/user/orders/${cookies['user-info'].CUSTOMER_ID}`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(data=>data.json())
        .then(data=>{
            // console.log(data);
            setorders(data);
            console.log(data);
            setready(true);
        }).catch(err=>{
            console.log(err.message);
        })

    }
    }, [])

        return (
        <div className="container">
            {/* my profile */}
            <Navbar/>
            <div style={{minHeight:"10rem"}}></div>
            <div className="container display-6" style={{marginBottom:"30px"}}>
               <strong>Name</strong>: { `${user.FIRST_NAME} ${user.LAST_NAME}`} <br/>
               <strong>Address</strong>: {user.address} <br/>
               <strong>Customer ID</strong>: {user.id}    <br/>
                <strong>Email</strong>: {user.email}  <br/>
            </div>
            <hr/>
            <div style={{minHeight:"5rem"}}></div>
            
            <div className="text-center display-5"><h1>Order HISTORY</h1></div>
            <div style={{minHeight:"5rem"}}></div>
            <div className="container">
                
                {
                    orders.map((el,key)=>{
                        return (<div class="container">
                               <div class="container text-center fw-bolder display-6">
                                        ORDER# {el.ORDER_ID}
                               </div>
                               <TableItems id={el.ORDER_ID} items={el.items}/>
                        </div> )                   })

                }


            </div>
        </div>
    );
}