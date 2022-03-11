import {useState} from 'react';
import { CDBAlert } from 'cdbreact';
import RequestHandler from '../../request-handler/RequestHandler';



function openFileDialog(isFront : boolean){
    const fileInput = document.getElementById(`${isFront ? 'front' : 'back'}-image-input`);

    if (fileInput){
        fileInput.click();
    }
}


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
            <ul className="p-0">
                <li>
                    <input className = 'admin-border item-input mt-3' 
                           type = 'text' 
                           id = 'item-name' 
                           placeholder = 'Item name'
                           onChange = {event => setName(event.target.value)}>
                    </input>
                </li>

                <li>
                    <input className = 'admin-border item-input mt-3' 
                           type = 'number' 
                           id = 'item-stock' 
                           placeholder = 'Item stock'
                           onChange = {event => setStock(event.target.value as unknown as number)}>        
                    </input>
                </li>

                <li>
                    <input className = 'admin-border item-input mt-3' 
                           type = 'number' 
                           id = 'price' 
                           placeholder = 'Price (pence)'
                           onChange = {event => setPrice(event.target.value as unknown as number)}>
                    </input>
                </li>

                <li>
                    <button className = 'mt-5 admin-border admin-image-input-button' onClick = {() => openFileDialog(true)}>
                        Add front image
                    </button>
                </li>

                <li className = 'text-center' style = {{width: '100%'}}>
                    {frontImageUrl !== '' &&
                        <div className = 'input-image-div admin-border mt-3 text-center'>
                            <img src = {frontImageUrl} alt = 'front' className = 'text-center'/>
                        </div>
                    }
                </li>

                <li>
                    <button className = 'mt-3 admin-border admin-image-input-button' onClick = {() => openFileDialog(false)}>
                        Add back image
                    </button>
                </li>

                <li>
                    {backImageUrl !== '' &&
                        <div className = 'input-image-div admin-border text-center mt-3'>
                            <img src = {backImageUrl} alt = 'back' />
                        </div>
                    }
                </li>
            </ul>


            <div className = 'mt-5 text-center ml-3'>
                <button onClick = {sendRequest} className = 'admin-border submit-add-item-button'>
                    Add
                </button>
            </div>


            {showAlert && 
                <CDBAlert color = {isSuccess ? 'success' : 'danger'} className = 'mt-3'>
                    {alertMessage}
                </CDBAlert>
            }

            <input type='file' 
                    name = 'front-image-input' 
                    id = 'front-image-input' 
                    accept = 'image/x-png,image/gif,image/jpeg' 
                    onChange = {(e) => loadFile(e, true)}  
                    hidden
            />

            <input type='file' 
                    name = 'back-image-input' 
                    id = 'back-image-input' 
                    accept = 'image/x-png,image/gif,image/jpeg' 
                    onChange = {(e) => loadFile(e, false)}  
                    hidden
            />
        </div>
    );
}

export default AddItem;