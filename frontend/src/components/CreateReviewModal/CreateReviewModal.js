import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReview from './CreateReview';

const CreateReviewModal = ({ spotId }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <button id='postReviewButton' onClick={() => setShowModal(true)} style={{cursor: "pointer"}}>Post Your Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateReview spotId={spotId} />
                </Modal>
            )}
        </div>
    )
}
export default CreateReviewModal;