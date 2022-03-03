import {useState} from 'react';
import Globals from '../Globals';
import RequestHandler from '../request-handler/RequestHandler';



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
        console.log(response);

        // todo
        // show pop up
    }


    function sendRequest(){
        console.log(frontImageUrl);

        const item = {
            'name' : itemName, 
            'stock' : itemStock as number, 
            'frontImageUrl' : frontImageUrl, 
            'backImageUrl' : backImageUrl, 
            'price' : itemPrice as number
        }

        RequestHandler.Post(`api/items`, 
                            {'operation' : 'ADD', 
                             'items' : [item]
                           }).then(sendRequestCallback);
    }


    return (
        <div className = 'text-center mt-5'>
            <ul>
                <li>
                    <input className = 'item-input mt-3' 
                           type = 'text' 
                           id = 'item-name' 
                           placeholder = 'Item name'
                           onChange = {event => setName(event.target.value)}>
                    </input>
                </li>

                <li>
                    <input className = 'item-input mt-3' 
                           type = 'number' 
                           id = 'item-stock' 
                           placeholder = 'Item stock'
                           onChange = {event => setStock(event.target.value as unknown as number)}>        
                    </input>
                </li>

                <li>
                    <input className = 'item-input mt-3' 
                           type = 'number' 
                           id = 'price' 
                           placeholder = 'Price (pence)'
                           onChange = {event => setPrice(event.target.value as unknown as number)}>
                    </input>
                </li>

                <li>
                    <button className = 'mt-5' onClick = {() => openFileDialog(true)}>
                        Add front image
                    </button>
                </li>

                <li>
                    <button className = 'mt-2' onClick = {() => openFileDialog(false)}>
                        Add back image
                    </button>
                </li>
            </ul>


            <div className = 'mt-5 text-center'>
                <button onClick = {sendRequest}>
                    AddItem
                </button>
            </div>


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