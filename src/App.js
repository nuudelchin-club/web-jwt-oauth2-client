import logo from './logo.svg';
import './App.css';

const onGoogleLogin = () => {
  window.location.href = "https://localhost/oauth2/authorization/google";
};
const onFacebookLogin = () => {
  window.location.href = "https://localhost/oauth2/authorization/facebook";
};
const onNaverLogin = () => {
  window.location.href = "https://localhost/oauth2/authorization/naver";
};
const onMyAPI = () => {
  fetch("https://localhost/my", {
    method: "GET",
    credentials: "include",
  })
  .then((response) => { 
    if (response.ok) { 
      return response.json(); 
    }
  })
  .then((data) => {     
    console.log(data)
  })
  .catch((error) => alert(error))
}

function App() {
  return (
    <div>
        <h1>Login</h1>
        <button onClick={onGoogleLogin}>Google Login</button>
        <br></br>
        <button onClick={onFacebookLogin}>Facebook Login</button>
        <br></br>
        <button onClick={onNaverLogin}>Naver Login</button>
        <br></br>
        <button onClick={onMyAPI}>Check Login Status</button>
    </div>
  );
}

export default App;
