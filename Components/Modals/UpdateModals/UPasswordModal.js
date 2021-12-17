import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    FormControl,
    FormLabel,
    Input,
    useDisclosure ,
    ModalCloseButton,
 
} from '@chakra-ui/react'
import {useRef , useState} from 'react'
import { useCookies} from 'react-cookie';

function UPasswordModal(props){
    const [cookies,setcookies] = useCookies();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef()
const finalRef = useRef()
const [password,  setpassword] = useState("");
const [error , seterror] = useState(""); 
const handlepassword = (e)=>{seterror("");setpassword(e.target.value);}
const handlesubmit = (e)=>{
    e.preventDefault();
    console.log("");
    if(password.length < 8){
        seterror("password must be greater than 8");
        return null;
    }
    let obj={};
    obj['info'] = props.data;
    obj['newpassword']= password;
 

    

    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${cookies['user-token']}`
        },
        body: JSON.stringify(obj)
    };
    fetch('http://localhost:5002/api/v1/user/change-password', requestOptions)
        .then(response => response.json())
        .then(data => {
            if(data.error){
                throw new Error(data.error);               
            }
            console.log("success");
        })
        .catch(err=>{
            console.log(err.message);
            seterror(err.message);
        })

    
}

    return ( <>
        <Button onClick={onOpen}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg>Change Password</Button>
     
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Change password</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input onChange={handlepassword} value={password} ref={initialRef} placeholder='First name' />
              </FormControl>
  
             
            </ModalBody>
  
            <ModalFooter>
              <Button onClick={handlesubmit} colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>);

}

export default UPasswordModal;