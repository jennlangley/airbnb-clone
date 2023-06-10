import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as spotsActions from '../../store/spots';
import './SpotForm.css';

const SpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [previewImage, setPreviewImage] = useState('');
    const [imageTwo, setImageTwo] = useState('');
    const [imageThree, setImageThree] = useState('');
    const [imageFour, setImageFour] = useState('');
    const [imageFive, setImageFive] = useState('');
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
            if (!previewImage.length) errors.image =  "Preview Image is required";
            if (!(previewImage.endsWith('.png') || previewImage.endsWith('.jpg') || previewImage.endsWith('.jpeg'))) errors.imageName = "Image URL must end in .png, .jpg, or .jpeg";
            if (imageTwo && !(imageTwo.endsWith('.png') || imageTwo.endsWith('.jpg') || imageTwo.endsWith('.jpeg'))) errors.imageNameTwo = "Image URL must end in .png, .jpg, or .jpeg";
            if (imageThree && !(imageThree.endsWith('.png') || imageThree.endsWith('.jpg') || imageThree.endsWith('.jpeg'))) errors.imageNameThree = "Image URL must end in .png, .jpg, or .jpeg";
            if (imageFour && !(imageFour.endsWith('.png') || imageFour.endsWith('.jpg') || imageFour.endsWith('.jpeg'))) errors.imageNameFour = "Image URL must end in .png, .jpg, or .jpeg";
            if (imageFive && !(imageFive.endsWith('.png') || imageFive.endsWith('.jpg') || imageFive.endsWith('.jpeg'))) errors.imageNameFive = "Image URL must end in .png, .jpg, or .jpeg";
            if (!name.length) errors.name = "Name is required";
            if (!price.length) errors.price = "Price per day is required";
            if (!lat) setLat(1);
            if (!lng) setLng (1);
            setErrors(errors);  
        } 
    }, [hasSubmitted, country, address, city, state, description, previewImage, name, price, imageTwo, imageThree, imageFour, imageFive])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (!Object.values(errors).length) {
            try {
                const newSpot = {
                    address, city, state, country, lat, lng, name, description, price
                };
                const spot = await dispatch(spotsActions.createSpot(newSpot));
                await dispatch(spotsActions.createSpotImage(previewImage, true, spot.id));
                if (imageTwo) await dispatch(spotsActions.createSpotImage(imageTwo, false, spot.id));
                if (imageThree) await dispatch(spotsActions.createSpotImage(imageThree, false, spot.id));
                if (imageFour) await dispatch(spotsActions.createSpotImage(imageFour, false, spot.id));
                if (imageFive) await dispatch(spotsActions.createSpotImage(imageFive, false, spot.id));
                if (spot) reset();
                
                setHasSubmitted(false);
                setErrors({});
                history.push(`/spots/${spot.id}`);

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
        setPreviewImage('');
        setImageTwo('');
        setImageThree('');
        setImageFour('');
        setImageFive('');
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
                <div className='inputContainer'>
                    <div className='inputBox'>
                        <label>Latitude</label>
                        <input
                            value={lat}
                            onChange={e => setLat(e.target.value)}
                            placeholder='Latitude'
                        />
                    </div>
                    <span id='commaForInput'>,</span>
                    <div className='inputBox'>
                        <label>Longitude</label>
                        <input
                            value={lng}
                            onChange={e => setLng(e.target.value)}
                            placeholder='Longitude'
                        />
                    </div>
                </div>
                
                <div id='description'>
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
                <h2>Create a title for your spot</h2>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <input 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Name of your spot'
                />
                {errors.name && (<span className='errors'>{errors.name}</span>)}
                <h2>Set a base price for your spot</h2>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <div>
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
                <button id='createSpotButton' type="submit">Create Spot</button>
            </form>
        </div>
    );
}

export default SpotForm;