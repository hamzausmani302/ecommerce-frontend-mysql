import {Modal,Select,InputGroup,InputLeftAddon, useDisclosure , Button , ModalOverlay , ModalContent , ModalHeader , ModalCloseButton , ModalFooter,ModalBody ,Input, FormControl , FormLabel , Form} from '@chakra-ui/react';
import {useRef , useState , useEffect} from 'react';
import {useCookies} from 'react-cookie';

function ShipperModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [address ,  setaddress ] = useState("");
    const [phone ,  setphone ] = useState("");
    const [country ,  setcountry ] = useState("");
    const [cookies , setcookies ] = useCookies();    
    const initialRef = useRef();
    const finalRef = useRef();
    const [tog , settog] = useState(false);
    const [error , seterror] = useState("");
    const [show , setshow] = useState(false);
    const [display , setdisplay] = useState(false);
    const [to_delete , set_to_delete ] = useState([]);
    
    const handlesubmit = (e )=>{
      e.preventDefault();
      console.log(cookies.token);
      const token = cookies.token;
      const requestOptions = {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json' ,
          'cache' : 'no-cache',
          'Authorization' : `Bearer ${token}`
      
      },
        body: JSON.stringify({ name :name , contact:phone , country : country })
    };
    fetch(`http://localhost:5002/administrator/api/shipper/update/${props.shipper.SHIPPER_ID}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if(data){
            //console.log(data);

            if(data.error){
                seterror(data.error);
                setshow(true);
                
            } else{
                setdisplay(true);
                setTimeout(()=>{
                    setdisplay(false);
                  },5000);
            }
            
            props.change_function(!props.change_var);
            settog(!tog);
            
          
          }
          
        setname("");
        setphone("");
        setcountry("");
        })
        .catch(err=>{seterror(err.message);
        setshow(true);
        setname("");
        setphone("");
        setcountry("");});

      //console.log(name,  phone,country)
    }
    const handlename = (e)=>{
      setshow(false);
      seterror("")
      e.preventDefault();
      setname(e.target.value);
    }
    const handleaddress = (e)=>{
        setshow(false);
        seterror("")
        e.preventDefault();
        setaddress(e.target.value);
      }
    const handlephone = (e)=>{
      setshow(false);
      seterror("")
      e.preventDefault();
      setphone(e.target.value);
    }
    const handlecountry = (e)=>{
      setshow(false);
      seterror("")
      e.preventDefault();
      setcountry(e.target.value);
    }
    
    return (
      <>
        <Button class="bg-dark text-white p-2 rounded" onClick={onOpen}>
            
          UPDATE
     </Button>
        
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Order</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input type="text" ref={initialRef} 
                placeholder="NAME" 
                value={address}
        onChange={handleaddress}/>
              </FormControl>
                <FormControl>
              <Select placeholder='Select Status'>
  <option value='CANCELLED'>Cancel Order</option>
  <option value='DELIVERED'>Order Delivered</option>
  <option value='DISPATCHED'>Dispatch Order</option>

</Select>
            </FormControl>
            {/* //code hjere */}
                {props.data.items.map((el,index)=>{
                   
                    return (<div key={el.PRODUCT_ID}>item # {el.PRODUCT_NAME}   <button onClick={()=>{
                        
                        to_delete.push(el.ORDER_ITEMS_ID);
                        props.data.items.splice(index,1);
                        props.change_func(!props.change);
                        console.log(to_delete)
                    }}>             X</button></div>);
                })}

                {/* code jere */}
              {show ? <div style={{color : "white" , opacity : "0.8"}} class="container text-center rounded bg-danger p-2 mt-2">{error}</div> : null}
              {display ? (<div class="alert alert-success mt-3" role="alert">
                  Updated Shipper shipper
              </div>) : null}
            </ModalBody>

            <ModalFooter>
              <Button onClick= {handlesubmit} colorScheme="blue" mr={3}>
                Update
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default ShipperModal;