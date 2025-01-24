const API_URL="http://127.0.0.1:8000/api/users";

// API TO FETCH THE USER
export const fetchUser = async () => {
    try {
        const response = await fetch(API_URL, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
              "auth-token":localStorage.getItem('token'),
            },
          });
          // const json= response.json(); // parses JSON response into native JavaScript objects
          const responseData=await response.json();
        //   console.log(responseData);
          return responseData;
    } catch (error) {
        console.error(error);
    }
}

// API TO CREATE A NEW USER
export const createUser = async (user) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// API TO UPDATE A USER
export const updateUser = async (userId,user) => {
    try {
        const response = await fetch(`${API_URL}/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// API TO DELETE A USER
export const deleteUser = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        return await response.json(); // Assume the API returns a success message
    } catch (error) {
        console.error('Error deleting user:', error);
        return { success: false, message: 'Failed to delete user' };
    }
};