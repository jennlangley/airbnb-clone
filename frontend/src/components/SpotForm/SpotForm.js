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
            if (!name.length) errors.name = "Name is required";
            if (!price.length) errors.price = "Price per day is required";
            setErrors(errors);  
        } 
    }, [hasSubmitted, country, address, city, state, description, previewImage, name, price])

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
                setErrors({});
                setHasSubmitted(false);
                
                history.push(`/spots/${spot.id}`);

            } catch (error) {
                setHasSubmitted(false)
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
                <label>Country</label>
                <input 
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    placeholder='Country'
                />
                {errors.country && (<div className='errors'>{errors.country}</div>)}
                <label>Street Address</label>
                <input 
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder='Address'
                />
                {errors.address && (<div className='errors'>{errors.address}</div>)}
                <label>City</label>
                <input 
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder='City'
                />
                {errors.city && (<div className='errors'>{errors.city}</div>)}
                <label>State</label>
                <input 
                    value={state}
                    onChange={e => setState(e.target.value)}
                    placeholder='STATE'
                />
                {errors.state && (<div className='errors'>{errors.state}</div>)}
                <label>Latitude</label>
                <input
                    value={lat}
                    onChange={e => setLat(e.target.value)}
                    placeholder='Latitude'
                />
                <label>Longitude</label>
                <input
                    value={lng}
                    onChange={e => setLng(e.target.value)}
                    placeholder='Longitude'
                />
                <h2>Describe your place to guests</h2>
                <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder='Please write at least 30 characters'
                />
                {errors.description && (<div className='errors'>{errors.description}</div>)}
                <h2>Create a title for your spot</h2>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <input 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Name of your spot'
                />
                {errors.name && (<div className='errors'>{errors.name}</div>)}
                <h2>Set a base price for your spot</h2>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <input 
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder='Price per night (USD)'
                />
                {errors.price && (<div className='errors'>{errors.price}</div>)}
                <h2>Liven up your spot with photos</h2>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <input 
                    value={previewImage}
                    onChange={e => setPreviewImage(e.target.value)}
                    placeholder='Preview Image URL'
                />
                {errors.image && (<div className='errors'>{errors.image}</div>)}
                <input 
                    value={imageTwo}
                    onChange={e => setImageTwo(e.target.value)}
                    placeholder='Image URL' 
                />
                <input 
                    value={imageThree}
                    onChange={e => setImageThree(e.target.value)}
                    placeholder='Image URL' 
                />
                <input 
                    value={imageFour}
                    onChange={e => setImageFour(e.target.value)}
                    placeholder='Image URL' 
                />
                <input 
                    value={imageFive}
                    onChange={e => setImageFive(e.target.value)}
                    placeholder='Image URL' 
                />
                <button type="submit">Create Spot</button>
            </form>
        </div>
    );
}

export default SpotForm;