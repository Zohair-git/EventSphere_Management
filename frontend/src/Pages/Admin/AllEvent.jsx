import React, { useEffect, useState } from 'react';
import AdminSideBar from '../../Component/AdminSideBar';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';

const AllEvent = () => {
  const [events, setEvents] = useState([]); // Initialize events as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Function to fetch events data
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/expo'); // API URL

        // Log the full response to inspect its structure
        console.log("Full API Response:", response);

        // Check if response.data is an array directly
        if (Array.isArray(response.data)) {
          setEvents(response.data); // If it's an array, use it directly
        }
        // If response is an object, check if it has an 'events' array inside it
        else if (response.data && Array.isArray(response.data.events)) {
          setEvents(response.data.events); // If events are inside 'events' key, use it
        } else {
          // If the structure is unexpected, throw an error
          throw new Error('Response data is not in the expected format');
        }
      } catch (error) {
        setError(error.message); // Set error state
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchEvents(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  useEffect(() => {
    // Initialize DataTable only after data is loaded
    if (!loading) {
      $('#datatablesSimple').DataTable();
    }
  }, [loading]);

  return (
    <>
      <AdminSideBar>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Events</h1>
          <div className="card mt-4">
            <div className="card-header">
              <i className="fas fa-table me-1" />
              All Events
            </div>
            <div className="card-body">
              {/* Display loading message while fetching data */}
              {loading && <p>Loading events...</p>}
              {/* Display error message if an error occurs */}
              {error && <div className="alert alert-danger">{error}</div>}

              <table id="datatablesSimple">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Description</th>
                    <th>Theme</th>
                  </tr>
                </thead>

                <tbody>
                  {/* Check if events is an array and has data */}
                  {events && events.length > 0 ? (
                    events.map((event, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{event.title}</td>
                        <td>{event.date}</td>
                        <td>{event.location}</td>
                        <td>{event.description}</td>
                        <td>{event.theme}</td>
                        <td>
                          <button className="btn btn-primary btn-sm">Edit</button>
                          <button className="btn btn-danger btn-sm">Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">No events found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AdminSideBar>
    </>
  );
};

export default AllEvent;
