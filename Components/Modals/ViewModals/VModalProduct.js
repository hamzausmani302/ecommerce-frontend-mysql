import {Heading,Divider , Modal,InputGroup,InputLeftAddon, useDisclosure , Button , ModalOverlay , ModalContent , ModalHeader , ModalCloseButton , ModalFooter,ModalBody ,Input, FormControl , FormLabel , Form} from '@chakra-ui/react';
import {useRef , useState , useEffect} from 'react';
import {useCookies} from 'react-cookie';
import Image from 'next/image';
import img from '../../../public/Images/product.jpeg'
function OrderModal(props) {
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    
 
const myLoader = ({ src, width, quality }) => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`
  }
    
    
    const initialRef = useRef();
    const finalRef = useRef();
   
   useEffect(()=>{
        console.log(props.data);
   },[])
    return (
      <>
        <Button class="bg-dark text-white p-2 rounded" onClick={onOpen}>
            
            <div class="row">
                <p>View Detials</p>
                
            </div>
            </Button>
        
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader> <p>{props.product.PRODUCT_ID} #    </p></ModalHeader>
            <ModalCloseButton />
            <ModalBody pt={6} pb={6}>
                <Heading>{props.product.PRODUCT_NAME}</Heading>
                <Divider  orientation="horizontal" />
                
                <div class="container">
                        <br style={{minHeight : "10rem"}} />
                        <div class="row pb-2">   
                            <div class="col-4"> CategoryID :    </div>
                            <div class="col-8 text-start">{props.product.CATEGORY_NAME}   </div>
                        </div>
                        <div class="row pb-2"> 
                            <div class="col-4"> Description :    </div>
                            <div class="col-8 text-start">{props.product.DESCRIPTION}    </div>
                        </div>
                        
                
                
                </div>

            </ModalBody>

            <ModalFooter>
             
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default OrderModal;