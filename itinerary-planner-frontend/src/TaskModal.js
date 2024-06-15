import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './TaskModal.css';

Modal.setAppElement('#root');

function TaskModal({ isOpen, onClose, onSave, onDelete, task, isDeleteMode }) {
    const [text, setText] = useState('');

    useEffect(() => {
        if (task) {
            setText(task.text);
        } else {
            setText('');
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isDeleteMode) {
            onDelete(task._id);
            onClose();
            return;
        }
        const taskToSave = task ? { ...task, text } : { text, completed: false };
        onSave(taskToSave);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="modal" overlayClassName="overlay">
            <form onSubmit={handleSubmit} className="task-form">
                {isDeleteMode ? (
                    <div>
                        <p>Are you sure you want to delete this task?</p>
                        <div className="modal-buttons">
                            <button className="confirm-button" type="submit">Yes</button>
                            <button className="cancel-button" type="button" onClick={onClose}>No</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <label>
                            Task:
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                required
                            />
                        </label>
                        <div className="modal-buttons">
                            <button className="save-button" type="submit">Save</button>
                            <button className="cancel-button" type="button" onClick={onClose}>Cancel</button>
                        </div>
                    </div>
                )}
            </form>
        </Modal>
    );
}

export default TaskModal;
