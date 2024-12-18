import React, { useState } from 'react';
import AdminSideBar from '../../Component/AdminSideBar';

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    theme: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(eventData);
    // Here you would typically send the data to the server or handle further actions
  };

  return (
    <>
      <AdminSideBar>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Add New Event</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">Add Event</li>
          </ol>

          <div className="row justify-content-center">
            <div className="col-xl-6 col-md-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Event Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="title" 
                    name="title" 
                    value={eventData.title}
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Event Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    id="date" 
                    name="date" 
                    value={eventData.date}
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="location" className="form-label">Event Location</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="location" 
                    name="location" 
                    value={eventData.location}
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Event Description</label>
                  <textarea 
                    className="form-control" 
                    id="description" 
                    name="description" 
                    value={eventData.description}
                    onChange={handleChange} 
                    required 
                    rows="4"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="theme" className="form-label">Event Theme</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="theme" 
                    name="theme" 
                    value={eventData.theme}
                    onChange={handleChange} 
                    required 
                    maxLength="100"
                  />
                </div>

                <button type="submit" className="btn btn-primary">Add Event</button>
              </form>
            </div>
          </div>
        </div>
      </AdminSideBar>
    </>
  );
};

export default AddEvent;
