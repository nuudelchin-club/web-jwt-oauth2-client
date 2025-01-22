const apiUrl = process.env.REACT_APP_API_URL;

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

export const getCurrUserInfo = async () => {console.log("getCurrUserInfo")
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