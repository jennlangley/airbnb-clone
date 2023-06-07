import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReview from './CreateReview';

const CreateReviewModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <button id='postReviewButton' onClick={() => setShowModal(true)}>Post Your Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateReview />
                </Modal>
            )}
        </div>
    )
}
export default CreateReviewModal;