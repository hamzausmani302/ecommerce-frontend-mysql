import {Modal,RadioGroup ,Select ,  Stack , Radio , useDisclosure , Button , ModalOverlay , ModalContent , ModalHeader , ModalCloseButton , ModalFooter,ModalBody ,Input, FormControl , FormLabel , Form} from '@chakra-ui/react';
import {useRef , useState , useEffect} from 'react';
import {useCookies} from 'react-cookie';

function ShipperModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const [cookies , setcookies ] = useCookies();    
    const initialRef = useRef();
    const finalRef = useRef();
    const [tog , settog] = useState(false);
    const [error , seterror] = useState("");
    const [show , setshow] = useState(false);
    const [display , setdisplay] = useState(false);
    const [to_delete , set_to_delete ] = useState([]);
    const [categories , setcategories] = useState([]);
    const [categoryid , setcategoryid] = useState(null);


    // const []
   useEffect(()=>{
    const token = cookies.token;   
    const requestOptions= {
        method : 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
        
           
       }
        fetch("http://localhost:5002/api/category" , requestOptions)
        .then(data=>{
            return data.json();
        })
        .then(data=>{
           
            setcategories(data);
            console.log(categories);
        })
        .catch(err=>{
            console.log(err.message);
        })
   }, []);
    const handlesubmit = (e )=>{
      e.preventDefault();
      console.log("clicked " , categoryid)
     
      let obj = {};
     
      const token = cookies.token;
      
      const requestOptions = {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json' ,
          'cache' : 'no-cache',
          'Authorization' : `Bearer ${token}`
      
      },
        body: JSON.stringify({ data : obj })
    };
    // fetch(`http://localhost:5002/administrator/product/update/${props.data.ORDER_ID}`, requestOptions)
    //     .then(response => response.json())
    //     .then(data => {
    //       if(data){
    //         //console.log(data);

    //         if(data.error){
    //             seterror(data.error);
    //             setshow(true);
                
    //         } else{
    //             setdisplay(true);
    //             setTimeout(()=>{
    //                 setdisplay(false);
    //               },5000);
    //         }
            
    //         props.change_function(!props.change_var);
    //         settog(!tog);
            
          
    //       }
          
     
       
    //     })
    //     .catch(err=>{seterror(err.message);
    //     setshow(true);
    //     set_to_delete([]);
    // });

      //console.log(name,  phone,country)
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
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Product Name</FormLabel>
                <Input type="text" ref={initialRef} 
                placeholder="NAME" 
        //         value={address}
        // onChange={handleaddress}
        />
              </FormControl>
                <FormControl>
                <FormLabel>CATEGORY</FormLabel>
                <Select value={categoryid} onChange={(e)=>{
                    setcategoryid(e.target.value)
                }} placeholder='Select option'>
        {categories.map(el=>{return ( <option value={el.CATEGORY_ID}>{el.CATEGORY_NAME}</option>)})}
  
</Select>
            </FormControl>
            <FormControl>
                <FormLabel>PRICE</FormLabel>
                <Input type="number" ref={initialRef} 
                placeholder="cost" 
        //         value={address}
        // onChange={handleaddress}
        />
              </FormControl>
              <FormControl>
                <FormLabel>PIECES IN STOCK</FormLabel>
                <Input type="number" ref={initialRef} 
                placeholder="IN stock ?" 
        //         value={address}
        // onChange={handleaddress}
        />
              </FormControl>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input type="file" ref={initialRef} 
                placeholder="Select file" 
        //         value={address}
        // onChange={handleaddress}
        />
              </FormControl>
             
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