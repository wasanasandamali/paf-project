import './App.css';
import LoginPage from "./components/LoginPage/LoginPage";
import HomePage from "./components/HomePage/HomePage";

function App() {
    return (
        <div className="App">
            {
                (localStorage.getItem("users")===undefined ||  localStorage.getItem("users")== null)?
                    <LoginPage/>:<HomePage/>
            }
        </div>
    );
}

export default App;
