import {useState} from 'react';
import { CDBAlert } from 'cdbreact';
import RequestHandler from '../request-handler/RequestHandler';



function AddItem() {
    // store user inputs when adding new items
    const [itemName, setName] = useState<string>('');
    const [itemStock, setStock] = useState<number>(0);
    const [itemPrice, setPrice] = useState<number>(0);
    const [frontImageUrl, setFrontImage] = useState<string>('');
    const [backImageUrl, setBackImage] = useState<string>('');
    const [showAlert, toggleAlert] = useState<boolean>(false);
    const [isSuccess, toggleSuccess] = useState<boolean>(false);
    const [alertMessage, toggleMessage] = useState<string>('');
    
    
    function loadFile(event: React.ChangeEvent<HTMLInputElement>, isFront : boolean) {
        if (event.target.files == null ) {
           throw new Error("No files added"); 
        } else {
            const file = event.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            if (isFront){
                fileReader.onload = (e) => setFrontImage(e?.target?.result as string);
            }else{
                fileReader.onload = (e) => setBackImage(e?.target?.result as string);
            }
        }
    }   


    function sendRequestCallback(response : any){
        toggleAlert(true);

        if (response.success){
            toggleSuccess(true);
            toggleMessage('Item added successfully');
        }else{
            toggleSuccess(false);
            toggleMessage(response.message);
        }

        //scroll to bottom of page to show alert
        window.scrollTo(0,document.body.scrollHeight);

        // hide alert after 3 seconds
        setTimeout(() => toggleAlert(false), 3000);
    }


    function sendRequest(){
        console.log(frontImageUrl);

        const item = {
            'name' : itemName, 
            'stock' : itemStock, 
            'frontImageUrl' : frontImageUrl, 
            'backImageUrl' : backImageUrl, 
            'price' : itemPrice
        }

        RequestHandler.Post('api/items', 
                            {'operation' : 'ADD', 
                             'items' : [item]
                           }).then(sendRequestCallback);
    }

    
    return (
        <div className = 'text-center mt-5'>
            <div style = {{width: '80vw'}} className = 'text-center input-div'>
                <form>
                    <div className='form-group'>
                        {/* item name input */}
                        <label htmlFor ='name' className = 'description-text'>Name</label>

                        <div className = 'mt-4 mb-4'>
                            <input type = 'text' 
                                id = 'name'
                                className = 'form-control text-center' 
                                placeholder ='Enter name' 
                                style = {{width: '40vw', display: 'inline-block'}}
                                onChange = {event => setName(event.target.value)}
                            />
                        </div>
                    </div>

                    {/* stock size input */}
                    <div className = 'form-group'>
                        <label htmlFor = 'stock' className = 'description-text'>Stock</label>
                        
                        <div className = 'mt-4 mb-4'>
                            <input type = 'number' 
                                className = 'form-control text-center' 
                                id = 'stock' 
                                placeholder = 'Item Stock' 
                                style = {{width: '40vw', display: 'inline-block'}}
                                onChange = {event => setStock(event.target.value as unknown as number)}
                            />
                        </div>
                    </div>

                    {/* item price input */}
                    <div className = 'form-group'>
                        <label htmlFor = 'price' className = 'description-text'>Price</label>
                        
                        <div className = 'mt-4 mb-4'>
                            <input type = 'number' 
                                className = 'form-control text-center' 
                                id = 'price' 
                                placeholder = 'Enter Price (Pence)' 
                                style = {{width: '40vw', display: 'inline-block'}}
                                onChange = {event => setPrice(event.target.value as unknown as number)}
                            />
                        </div>
                    </div>


                    {/* front image input */}
                    <div className = 'form-group'>
                        <label htlmFor = 'front-image-input' className = 'form-label'>Choose front image</label>
                        <input className = 'form-control' 
                               type = 'file' 
                               id = 'front-image-input'
                               accept = 'image/x-png,image/gif,image/jpeg' 
                               onChange = {(e) => loadFile(e, true)}
                        />
                    </div>

                    {/* back image input */}
                    <div className = 'form-group'>
                        <label htlmFor = 'back-image-input' className = 'form-label'>Choose back image</label>
                        <input className = 'form-control' 
                                type = 'file' 
                                id = 'back-image-input'
                                accept = 'image/x-png,image/gif,image/jpeg' 
                                onChange = {(e) => loadFile(e, false)}
                        />
                    </div>


                    {/* submit button */}
                    <button type = 'button' 
                            className = 'btn btn-dark btn-lg mt-5' 
                            style = {{width: '50vw'}}
                            onClick = {sendRequest}>
                                Add Item
                    </button>
                </form>
            </div>


            {showAlert && 
                <CDBAlert color = {isSuccess ? 'success' : 'danger'} className = 'mt-3'>
                    {alertMessage}
                </CDBAlert>
            }
        </div>
    );
}

export default AddItem;