import {useContext, useState} from 'react';
import {CDBAlert} from 'cdbreact';
import RequestHandler from '../../request-handler/RequestHandler';
import {ItemProps, ItemSizes, SIZESTRINGINT, SIZEINTSTRING} from '../../item/Item';
import {globalItemsContext} from '../../item-context/ItemContext';


function AddItem() {
    // store user inputs when adding new items
    const itemContext = useContext(globalItemsContext);
    const [itemName, setName] = useState<string>('');
    const [itemPrice, setPrice] = useState<number>(0);
    const [frontImageUrl, setFrontImage] = useState<string>('');
    const [backImageUrl, setBackImage] = useState<string>('');
    const [showAlert, toggleAlert] = useState<boolean>(false);
    const [isSuccess, toggleSuccess] = useState<boolean>(false);
    const [alertMessage, toggleMessage] = useState<string>('');

    // Initial state: every size number with a stock value of -1.
    // Allows for possible changes in size number in future
    const [itemSizes, setItemSizes] = useState(Object.fromEntries(Object.keys(SIZEINTSTRING).map(value => [value, -1])))

    function loadFile(event: React.ChangeEvent<HTMLInputElement>, isFront: boolean) {
        if (event.target.files == null) {
            throw new Error("No files added");
        } else {
            const file = event.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            if (isFront) {
                fileReader.onload = (e) => setFrontImage(e?.target?.result as string);
            } else {
                fileReader.onload = (e) => setBackImage(e?.target?.result as string);
            }
        }
    }


    function sendRequestCallback(response: any, item: ItemProps) {
        toggleAlert(true);

        if (response.success) {
            //update global context
            itemContext.items.push(item);

            //show alert
            toggleSuccess(true);
            toggleMessage('Item added successfully');
        } else {
            toggleSuccess(false);
            toggleMessage(response.message);
        }

        //scroll to bottom of page to show alert
        window.scrollTo(0, document.body.scrollHeight);

        // hide alert after 3 seconds
        setTimeout(() => toggleAlert(false), 2000);
    }


    function sendRequest() {
        console.log(frontImageUrl);

        const item = {
            'name': itemName,
            'frontImageUrl': frontImageUrl,
            'backImageUrl': backImageUrl,
            'price': Number(itemPrice),
            'sizes': Object.keys(itemSizes).filter(value => itemSizes[value] >= 0).map(value => {
                return {size: Number(value), stock: itemSizes[value]}
            }), 
            'isClickable' : true
        }

        RequestHandler.Post('api/items',
            {
                'operation': 'ADD',
                'items': [item]
            }).then((response) => sendRequestCallback(response, item));
    }


    function getUnselectedSizes() {
        return <>
            { // Only display other unused sizes in the dropdown.
                Object.keys(SIZEINTSTRING)
                    .filter(value => itemSizes[value] < 0)
                    .map(value => <option>{SIZEINTSTRING[value]}</option>)
            }
        </>;
    }


    return (
        <div className='text-center'>
            <div style={{width: '60vw'}} className='text-center input-div'>
                <form>
                    <div className='form-group'>
                        {/* item name input */}
                        <label htmlFor='name' className='description-text'>Name</label>

                        <div className='mt-2 mb-2'>
                            <input type='text'
                                   id='name'
                                   className='form-control text-center'
                                   placeholder='Enter name'
                                   onChange={event => setName(event.target.value)}
                            />
                        </div>
                    </div>

                    {/* stock size input */}
                    <div className='form-group'>
                        <span className='description-text' key="description">Sizes</span>

                        {/* Add dropdowns for currently added sizes. */}
                        {
                            Object.entries(itemSizes).map(([size, stock]) => {
                                if (stock < 0) return <></>
                                return <div className='form-group form-inline justify-content-center'
                                            key={String(size) + String(stock)}>
                                    <select className="custom-select mr-4" value={size} onChange={event => {
                                        let newSizeName = event.target.value

                                        // Remove old size from the sizes
                                        setItemSizes(prevState => {
                                            return {...prevState, [size]: -1}
                                        })

                                        if (newSizeName !== "Remove size") {
                                            let newSizeNum = SIZESTRINGINT[newSizeName]
                                            setItemSizes(prevState => {
                                                return {...prevState, [newSizeNum]: stock}
                                            })
                                        }
                                    }}
                                    >
                                        <option>{SIZEINTSTRING[size]}</option>
                                        {getUnselectedSizes()}
                                        <option>Remove size</option>
                                    </select>

                                    <input type='number'
                                           className='form-control text-center'
                                           placeholder='Enter Stock'
                                           value={stock > 0 ? stock : ""}
                                           onChange={event =>
                                               // Basically just set the index of this size to the value in the number input
                                               setItemSizes(prevState => {
                                                   return {...prevState, [size]: Number(event.target.value)}
                                               })
                                           }
                                    />
                                </div>
                            })
                        }

                        {/* Add a dropdown to add a new size, only if there are available sizes left. */}
                        {
                            Object.entries(itemSizes)
                                .some(([size, stock]) => stock < 0) &&  // Only show if there are available sizes left.
                            <div className='form-group form-inline justify-content-center' key="unpicked">
                                <select className="custom-select mr-4" value="Pick a size!" onChange={event => {
                                    let value = event.target.value;
                                    if (value !== "Pick a size!") {
                                        let newSizeNum = SIZESTRINGINT[value]
                                        setItemSizes(prevState => {
                                            return {...prevState, [newSizeNum]: 0}
                                        })
                                    }
                                }}>
                                    <option>Pick a size!</option>
                                    {getUnselectedSizes()}
                                </select>

                                <input type='number'
                                       className='form-control text-center'
                                       placeholder='Enter Stock'
                                       disabled
                                />
                            </div>
                        }
                    </div>

                    {/* item price input */}
                    <div className='form-group'>
                        <label htmlFor='price' className='description-text'>Price</label>

                        <div className='mt-2 mb-2'>
                            <input type='number'
                                   className='form-control text-center'
                                   id='price'
                                   placeholder='Enter Price (Pence)'
                                   onChange={event => setPrice(event.target.value as unknown as number)}
                            />
                        </div>
                    </div>


                    {/* front image input */}
                    <div className='form-group mt-3'>
                        <label htmlFor='front-image-input' className='form-label description-text'>Choose front
                            image</label>

                        <div className='mt-2 mb-2'>
                            <input className='form-control'
                                   type='file'
                                   id='front-image-input'
                                   accept='image/x-png,image/gif,image/jpeg'
                                   onChange={(e) => loadFile(e, true)}
                            />
                        </div>
                    </div>

                    {/* back image input */}
                    <div className='form-group'>
                        <label htmlFor='back-image-input' className='form-label description-text'>Choose back
                            image</label>
                        <div className='mt-2 mb-2'>
                            <input className='form-control'
                                   type='file'
                                   id='back-image-input'
                                   accept='image/x-png,image/gif,image/jpeg'
                                   onChange={(e) => loadFile(e, false)}
                            />
                        </div>
                    </div>


                    {/* submit button */}
                    <button type='button'
                            className='btn btn-dark btn-lg mt-5'
                            style={{width: '50vw'}}
                            onClick={sendRequest}>
                        Add Item
                    </button>
                </form>
            </div>


            {showAlert &&
                <CDBAlert color={isSuccess ? 'success' : 'danger'} className='mt-3 text-center'>
                    {alertMessage}
                </CDBAlert>
            }
        </div>
    );
}

export default AddItem;
