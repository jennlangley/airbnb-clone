import * as spotsActions from '../../store/spots';
import { useDispatch } from 'react-redux';
import './DeleteForm.css'
const DeleteForm = ({ spotId }) => {
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault()
        return dispatch(spotsActions.deleteSpot(spotId));
    };
    return (
        <>
            <h1>Confirm Delete</h1>
            Are you sure you want to remove this spot from the listings?
            <button onClick={e=> onSubmit(e)}>Yes (Delete Spot)</button>
            <button>No (Keep Spot)</button>
        </>
    )
}
export default DeleteForm;