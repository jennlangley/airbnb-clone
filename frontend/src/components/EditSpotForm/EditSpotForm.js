import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as spotsActions from '../../store/spots';
import '../SpotForm/SpotForm.css';

const EditSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots[spotId])
    
    const [country, setCountry] = useState(spot.country);
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [description, setDescription] = useState(spot.description);
    const [name, setName] = useState(spot.name);
    const [price, setPrice] = useState(spot.price);
    // const [previewImage, setPreviewImage] = useState(spot.previewImage);
    // const [imageTwo, setImageTwo] = useState(spot.imageTwo || '');
    // const [imageThree, setImageThree] = useState(spot.imageThree || '');
    // const [imageFour, setImageFour] = useState(spot.imageFour || '');
    // const [imageFive, setImageFive] = useState(spot.imageFive || '');
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    useEffect(() => {
        if (hasSubmitted) {
            const errors = {};
            if (!country.length) errors.country = "Country is required";
            if (!address.length) errors.address = "Address is required";
            if (!city.length) errors.city = "City is required";
            if (!state.length) errors.state = "State is required";
            if (description.length < 30) errors.description = "Description needs 30 or more characters";
            // if (!previewImage.length) errors.image =  "Preview Image is required";
            if (!name.length) errors.name = "Name is required";
            if (!price) errors.price = "Price per day is required";
            setErrors(errors);  
        } 
    }, [hasSubmitted, country, address, city, state, description, name, price])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (!Object.values(errors).length) {
            try {
                const newSpot = {
                    address, city, state, country, lat, lng, name, description, price
                };
                const spot = await dispatch(spotsActions.updateSpot(newSpot, spotId))
                
                if (spot) reset();
                setErrors({});
                setHasSubmitted(false);
                
                history.push(`/spots/${spotId}`);

            } catch (error) {
                return
            }
        } 
    };
    const reset = () => {
        setCountry('');
        setAddress('');
        setCity('');
        setState('');
        setLat(0);
        setLng(0);
        setDescription('');
        setName('');
        setPrice('');
        // setPreviewImage('');
        // setImageTwo('');
        // setImageThree('');
        // setImageFour('');
        // setImageFive('');
    };
    return (
        <div className='spotFormContainer'>
            <form onSubmit={handleSubmit} className='spotForm'>
                <h1>Create a new Spot</h1>
                <h2>Where's your place located?</h2>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <label>Country
                {errors.country && (<span className='errors'> {errors.country}</span>)}
                </label>
                <input 
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    placeholder='Country'
                />
                <label>Street Address
                {errors.address && (<span className='errors'> {errors.address}</span>)}
                </label>
                <input 
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder='Address'
                />
                <div className='inputContainer'>
                    <div style={{width: '65%'}} className='inputBox'>
                        <label>City
                        {errors.city && (<span className='errors'> {errors.city}</span>)}
                        </label>
                        <input 
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            placeholder='City'
                        />
                        
                    </div>
                    <span id='commaForInput'>,</span>
                    <div className='inputBox'>
                        <label>State
                        {errors.state && (<span className='errors'> {errors.state}</span>)}
                        </label>
                        <input 
                            value={state}
                            onChange={e => setState(e.target.value)}
                            placeholder='STATE'
                        />
                    </div>
                    
                </div>
                <div className='inputContainer' id='endOfSection'>
                    <div className='inputBox'>
                        <label>Latitude</label>
                        <input
                            type='number'
                            value={lat}
                            onChange={e => setLat(e.target.value)}
                            placeholder='Latitude'
                        />
                    </div>
                    <span id='commaForInput'>,</span>
                    <div className='inputBox'>
                        <label>Longitude</label>
                        <input
                            type='number'
                            value={lng}
                            onChange={e => setLng(e.target.value)}
                            placeholder='Longitude'
                        />
                    </div>
                </div>
                
                <div id='endOfSection'>
                    <h2>Describe your place to guests</h2>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea 
                        id='spotFormDescription'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='Please write at least 30 characters'
                    />
                    {errors.description && (<span className='errors'>{errors.description}</span>)}
                </div>
                <div id='endOfSection'>
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder='Name of your spot'
                        id='titleInput'
                    />
                    {errors.name && (<span className='errors'>{errors.name}</span>)}
                </div>
                <div>
                    
                </div>
                <h2>Set a base price for your spot</h2>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <div id='endOfSection'>
                    <span>$ </span>
                    <input 
                        id='inputSpotPrice'
                        value={price}
                        type='number'
                        onChange={e => setPrice(e.target.value)}
                        placeholder='Price per night (USD)'
                    />
                    {errors.price && (<span className='errors'>{errors.price}</span>)} 
                </div>
                {/* <div id='endOfSection' className='spotImageInputs'>
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <input 
                        value={previewImage}
                        onChange={e => setPreviewImage(e.target.value)}
                        placeholder='Preview Image URL'
                    />
                    {errors.image && (<span className='errors'>{errors.image}</span>)}
                    {errors.imageName && (<span className='errors'>{errors.imageName}</span>)}
                    <input 
                        value={imageTwo}
                        onChange={e => setImageTwo(e.target.value)}
                        placeholder='Image URL' 
                    />
                    {errors.imageNameTwo && (<span className='errors'>{errors.imageNameTwo}</span>)}
                    <input 
                        value={imageThree}
                        onChange={e => setImageThree(e.target.value)}
                        placeholder='Image URL' 
                    />
                    {errors.imageNameThree && (<span className='errors'>{errors.imageNameThree}</span>)}
                    <input 
                        value={imageFour}
                        onChange={e => setImageFour(e.target.value)}
                        placeholder='Image URL' 
                    />
                    {errors.imageNameFour && (<span className='errors'>{errors.imageNameFour}</span>)}
                    <input 
                        value={imageFive}
                        onChange={e => setImageFive(e.target.value)}
                        placeholder='Image URL' 
                    />
                    {errors.imageNameFive && (<span className='errors'>{errors.imageNameFive}</span>)}
                </div>
                 */}
                <button id='createSpotButton' type="submit">Update Spot</button>
            </form>
        </div>
    )
}
export default EditSpotForm;