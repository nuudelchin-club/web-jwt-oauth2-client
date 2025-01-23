const apiUrl = process.env.REACT_APP_API_URL;

export const getData = async (url) => {console.log("getData")
    try {
        const response = await fetch(`${apiUrl}${url}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
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

export const postData = async (url, body) => {console.log("postData")
    try {
        const response = await fetch(`${apiUrl}${url}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: body,
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