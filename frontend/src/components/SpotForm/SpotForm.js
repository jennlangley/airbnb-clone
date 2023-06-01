import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as spotsActions from '../../store/spots';
import './SpotForm.css';

const SpotForm = () => {
    const dispatch = useDispatch();

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


    const handleSubmit = async (e) => {
        const newSpot = {
            address, city, state, country, lat, lng, name, description, price
        };
        const spot = dispatch(spotsActions.createSpot(newSpot));
        if (spot) reset();

    }

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
                <label>Street Address</label>
                <input 
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder='Address'
                />
                <label>City</label>
                <input 
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder='City'
                />
                <label>State</label>
                <input 
                    value={state}
                    onChange={e => setState(e.target.value)}
                    placeholder='STATE'
                />
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
                <h2>Create a title for your spot</h2>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <input 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Name of your spot'
                />
                <h2>Set a base price for your spot</h2>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <input 
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder='Price per night (USD)'
                />
                <h2>Liven up your spot with photos</h2>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <input 
                    value={previewImage}
                    onChange={e => setPreviewImage(e.target.value)}
                    placeholder='Preview Image URL'
                />
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