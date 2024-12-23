import React, { useEffect, useState } from 'react';
import AdminSideBar from '../../Component/AdminSideBar';
import axios from 'axios';

const AllEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [currentEvent, setCurrentEvent] = useState(null); // Current event being updated
  const [updatedEvent, setUpdatedEvent] = useState({}); // Updated event data
  const [modalErrors, setModalErrors] = useState({}); // Validation errors for modal fields

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/expo');
        if (response.data && Array.isArray(response.data.data)) {
          setEvents(response.data.data);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        setError(`Failed to fetch events: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleUpdateClick = (event) => {
    setCurrentEvent(event); // Set the current event to be updated
    setUpdatedEvent({ ...event }); // Copy the current event data for editing
    setModalErrors({}); // Reset errors
    setShowModal(true); // Show the modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prev) => ({ ...prev, [name]: value })); // Update the field being edited

    // Clear specific error when user starts typing
    setModalErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateModalFields = () => {
    const errors = {};
    if (!updatedEvent.title || updatedEvent.title.trim() === '') {
      errors.title = 'Title is required.';
    }
    if (!updatedEvent.date || updatedEvent.date.trim() === '') {
      errors.date = 'Date is required.';
    }
    if (!updatedEvent.location || updatedEvent.location.trim() === '') {
      errors.location = 'Location is required.';
    }
    if (!updatedEvent.description || updatedEvent.description.trim() === '') {
      errors.description = 'Description is required.';
    }
    if (!updatedEvent.theme || updatedEvent.theme.trim() === '') {
      errors.theme = 'Theme is required.';
    }
    setModalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateSubmit = async () => {
    if (!validateModalFields()) {
      return; // Stop if validation fails
    }

    try {
      const response = await axios.put(`http://localhost:4000/expo/${currentEvent._id}`, updatedEvent);
      console.log('Update Response:', response.data);

      // Update the events list locally
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === currentEvent._id ? { ...event, ...updatedEvent } : event
        )
      );

      setShowModal(false); // Close the modal
    } catch (err) {
      console.error('Update Error:', err);
      alert('Failed to update event!');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/expo/${id}`);
        // Remove the deleted event from the state
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
      } catch (err) {
        console.error('Delete Error:', err);
        alert('Failed to delete event!');
      }
    }
  };

  return (
    <AdminSideBar>
      <div className="container-fluid px-4">
        <h1 className="mt-4">Events</h1>
        <div className="card mt-4">
          <div className="card-header">
            <i className="fas fa-table me-1" />
            All Events
          </div>
          <div className="card-body">
            {loading && <p>Loading events...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && events.length === 0 && <p>No events found.</p>}
            {!loading && !error && events.length > 0 && (
              <div className="table-responsive">
                <table className="table table-striped-columns">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Date</th>
                      <th scope="col">Location</th>
                      <th scope="col">Description</th>
                      <th scope="col">Theme</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{event.title}</td>
                        <td>{event.date}</td>
                        <td>{event.location}</td>
                        <td>{event.description}</td>
                        <td>{event.theme}</td>
                        <td>
                          <button className="btn btn-success m-1" onClick={() => handleUpdateClick(event)}>
                            Update
                          </button>
                          <button className="btn btn-danger m-1" onClick={() => handleDelete(event._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Event</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={updatedEvent.title}
                    className={`form-control ${modalErrors.title ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.title && <div className="invalid-feedback">{modalErrors.title}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={updatedEvent.date ? updatedEvent.date.split('T')[0] : ''}
                    className={`form-control ${modalErrors.date ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.date && <div className="invalid-feedback">{modalErrors.date}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={updatedEvent.location}
                    className={`form-control ${modalErrors.location ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.location && <div className="invalid-feedback">{modalErrors.location}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    value={updatedEvent.description}
                    className={`form-control ${modalErrors.description ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.description && (
                    <div className="invalid-feedback">{modalErrors.description}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Theme</label>
                  <input
                    type="text"
                    name="theme"
                    value={updatedEvent.theme}
                    className={`form-control ${modalErrors.theme ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {modalErrors.theme && <div className="invalid-feedback">{modalErrors.theme}</div>}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminSideBar>
  );
};

export default AllEvent;
