const apiUrl = process.env.REACT_APP_API_URL;

// reissue tokens (access and refresh)
export const authenticate = async () => {console.log("authenticate")
    try {
        const response = await fetch(`${apiUrl}/reissue`, {
            method: 'POST',
            credentials: "include",
        });
        return response.ok;      
    } catch (error) {
      console.error(error);
      return false;
    }
};

// logged in user data
export const getUserData = async () => {console.log("getUserData")
    try {
        const response = await fetch(`${apiUrl}/user/getLoggedIn`, {
            method: 'GET',
            credentials: "include",
        });
        if(response.ok) {
            return await response.json();
        } else {
            return null;
        }
    } catch (error) {
      console.error(error);
      return null;
    }
};