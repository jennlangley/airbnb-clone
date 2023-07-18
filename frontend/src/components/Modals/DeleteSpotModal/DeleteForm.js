import * as spotsActions from '../../../store/spots';
import { useDispatch } from 'react-redux';
import './DeleteForm.css'
const DeleteForm = ({ spotId }) => {
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault()
        return dispatch(spotsActions.deleteSpot(spotId));
    };
    return (
        <div id='deleteContainer'>
            <h1>Confirm Delete</h1>
            Are you sure you want to remove this spot from the listings?
            <button id='confirmDelete' onClick={e => onSubmit(e)}>Yes (Delete Spot)</button>
        </div>
    )
}
export default DeleteForm;