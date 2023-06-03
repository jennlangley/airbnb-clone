import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
// import * as spotsActions from '../../store/spots';
// import { useDispatch } from 'react-redux';
function DeleteModal({ spotId }) {
  const [showModal, setShowModal] = useState(false);
//   const dispatch = useDispatch();
//   const deleteSpot = async () => {
//     dispatch(spotsActions.deleteSpot(spotId))
//   }
  return (
    <>
      <span onClick={() => setShowModal(true)} style={{cursor: "pointer"}}>Delete</span>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <div>
                <h1>Confirm Delete</h1>
                <div>
                    Are you sure you want to remove this spot from the listings?
                    <button>Yes (Delete Spot)</button>
                    <button onClick={setShowModal(false)}>No (Keep Spot)</button>
                </div>
            </div>
        </Modal>
      )}
    </>
  );
}
export default DeleteModal;