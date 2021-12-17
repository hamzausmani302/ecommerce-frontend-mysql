import {useState} from 'react'; 
import { useCookies } from 'react-cookie';
export default function Manager() {
    const [cookies , setcookies] = useCookies();
    const [query , setquery] =useState("");
    const [error , seterror] = useState("");
    const [result , setresult] = useState([]);
    const handlequery = (e)=>{
        setquery(e.target.value);
    }
    const handlesubmit = (e)=>{
        setresult("");
        seterror("");
        console.log("pressed");
        fetch(`http://localhost:5002/administrator/managedb`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${cookies.token}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body : JSON.stringify({query : query})
        }).then(data=>data.json())
        .then(data=>{console.log(data);setresult(JSON.stringify(data))})
        .catch(err=>{console.log(err);seterror(JSON.stringify(err))});
    }
    return (
        <div class="text-center">
            <h1 class="text-center">RUN SQL !!! hidden interface</h1>
  <div className="form-group">
      
    <label for="exampleInputPassword1">Query</label>
    <input value={query} onChange={handlequery} type="text" className="form-control" id="query" placeholder="Enter query" />
  </div>
  <div style={{minHeight:"2rem"}}></div>
  <button onClick={handlesubmit} className="btn btn-primary">Submit</button>
            {result!=""? <div class=" p-3 mb-2">{result}</div>:null}
           {error != "" ? <div class="bg-danger p-3 mb-2">{error}</div>:null}
            
        </div>
    );
}