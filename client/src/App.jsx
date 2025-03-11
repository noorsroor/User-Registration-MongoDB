import { useState } from "react";
import axios from 'axios';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // Signup Function
  const handleSignup = async (e) => {
    e.preventDefault();
    const body = {
        email: email,
        password:password,
    };
    try {
        const response = await axios.post("http://localhost:5000/auth/register", body, {
            withCredentials: true,
        });
      console.log(response);
    } catch (error) {
       console.log(error);
    } 
  };

  // Login Function
  const handleLogin = async (e) => {
    e.preventDefault();
    const body = { email, password };

    try {
        const response = await axios.post("http://localhost:5000/auth/login", body, {
            withCredentials: true,
        });
        const data = response.data;
        setUser(data.username);  // Assuming your API returns a username
        console.log(data);
    } catch (error) {
        console.error("خطأ أثناء تسجيل الدخول:", error);
    }
};


  // Fetch Profile Function
  const fetchProfile = async () => {
    try {
        const response = await axios.get("http://localhost:5000/auth/check", {
            withCredentials: true,
        });
        const data = response.data;
        setUser(data.username);  // Assuming the response has a username field
        console.log(data);
    } catch (error) {
        console.error("Error fetching profile:", error);
    }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        {user ? (
          <h2 className="text-2xl font-bold text-center text-purple-500">{user}</h2>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-center mb-4">Signup / Login</h2>
            <input
              type="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
            />
            <div className="flex justify-between">
              <button onClick={handleSignup} className="bg-pink-700 text-white px-4 py-2 rounded">
                Signup
              </button>
              <button onClick={handleLogin} className="bg-pink-500 text-white px-4 py-2 rounded">
                Login
              </button>
            </div>
            <button
              onClick={fetchProfile}
              className="mt-3 w-full bg-purple-500 text-white px-4 py-2 rounded"
            >
              Check Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
