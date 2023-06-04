import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteForm from './DeleteForm';

function DeleteModal({ spotId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div id='deleteForm'>
      <button onClick={() => setShowModal(true)} style={{cursor: "pointer"}}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <DeleteForm spotId={spotId} />
        </Modal>
      )}
    </div>
  );
}
export default DeleteModal;