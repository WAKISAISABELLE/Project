import apiClient from './config';


//fetch admin data
export const getAdminDashboard =async (username, password) => {
    try {
        const res = await apiClient.get('/api/admin/dashboard', {
            headers:{
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
            },
        });
        return res.data;

    }catch(error){
        console.error('Error fetching data:', error);
        throw error;
    }
};

//adding a new event
export const updateEvent = async (eventData, eventID) => {
    try{
        const response = await apiClient.put(`/api/admin/events/${eventID}`, eventData,{
            headers:{
                Authorization:`Basic ${btoa('irene:1101')}`,
            },
        });
        return response.data;
    }catch (error){
        console.error('Error adding event:', error);
        throw error;
    }
};


//delete an event


export const deleteEvent = async (eventId) => {
    try {
      const response = await apiClient.delete(`/api/admin/events/${eventId}`, {
        headers: {
          Authorization: `Basic ${btoa('irene:1101')}`, // Use admin credentials
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  };


//delete a user

export const deleteUser = async (userId) => {
    try {
        const response = await apiClient.delete(`/api/admin/users/${userId}`, {
            headers: {
                Authorization: `Basic ${btoa('irene:1101')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

//chapter management


export const updateChapter = async (chapterId, chapterData) => {
    try {
      const response = await apiClient.put(`/api/admin/chapters/${chapterId}`, chapterData, {
        headers: {
          Authorization: `Basic ${btoa('irene:1101')}`, // Use admin credentials
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating chapter:', error);
      throw error;
    }
  };
  
  export const deleteChapter = async (chapterId) => {
    try {
      const response = await apiClient.delete(`/api/admin/chapters/${chapterId}`, {
        headers: {
          Authorization: `Basic ${btoa('irene:1101')}`, // Use admin credentials
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting chapter:', error);
      throw error;
    }
  };