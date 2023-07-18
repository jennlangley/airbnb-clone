import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import DeleteReview from './DeleteReview';
import './DeleteReview.css';

function DeleteReviewModal({ reviewId, spotId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button id='deleteReviewButton' onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <div id='deleteContainer'>
                <DeleteReview reviewId={reviewId} spotId={spotId} />
                <button id="cancelDelete" onClick={e => setShowModal(false)}>No (Keep Review)</button>  
            </div>

        </Modal>
      )}
    </div>
  );
}
export default DeleteReviewModal;