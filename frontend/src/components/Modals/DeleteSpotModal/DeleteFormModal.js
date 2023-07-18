import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import DeleteForm from './DeleteForm.js';

function DeleteModal({ spotId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div id='deleteForm'>
      <button id='manageSpotButton' onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <DeleteForm spotId={spotId} />
            <button id='cancelDelete' onClick={e => setShowModal(false)}>No (Keep Spot)</button>
        </Modal>
      )}
    </div>
  );
}
export default DeleteModal;