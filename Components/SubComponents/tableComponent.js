import { useState } from "react";


function tableComponent(props) {
  const handleclick= (el)=>{
    console.log(el);
  }
  
  const [isbutton , setisbutton] = useState(props.buttonstate); 
  
  const cols = props.cols;

    const totalcolumns = cols.length;
    if(isbutton){
      cols.push("");
      
      cols.push("");
    }
    const data = props.data;
    return (
        <div class="table-responsive-sm ">
        <table class="table table-hover  ">
        <thead>
    <tr>
        
      {cols.map(col=>{return (<th scope="col">{col}</th>)})}
    </tr>
    
  </thead>
  <tbody>
    
    {data.map((el)=>{
        return (<tr>
                <th scope="row">
                <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
</svg>
                </div>
                
                </th>
                {
                Object.keys(el).map((attr)=>{
                  var bufferBase64=null;
                  if(attr == "IMAGESOURCE"){
                      bufferBase64 = new Buffer( attr, 'binary' ).toString('base64');
                  }  
                  return (
                    //attr== "items" ? <td></td> :   null
                    attr == "IMAGESOURCE" ? <td>{JSON.stringify(el[attr])}</td> :<td>{el[attr]}</td>
                    
                   
                    );
                })}
               {isbutton ? (<td> <button onClick={()=>{
                 props.handleclick(el);
               }} style={{borderRadius : "0.5rem",backgroundColor : "darkgrey" ,  color : "black"}}  class=" p-2"> UPDATE </button></td> )  : (null)}
               
                <td>{props.modalComponent}</td>
                {
                  props.showdustbin ?(<td onClick={()=>{
                    props.handle_delete(el);
                  
                  }} ><svg style={{float: "left"}} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg></td>) : null 
                  }
             </tr>)
    })}

    {/* <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr> */}
    </tbody>
        </table>
      </div>
    );
}

export default tableComponent;