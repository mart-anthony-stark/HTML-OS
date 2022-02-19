import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import userDP from "../browser/dp.jpg";
import "./login.css";

export default function Login({ weather }) {
  const [showPass, toggleShowPass] = useState("password");
  const [isLogged, setLog] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });
  const [err, setErr] = useState({ username: "", password: "" });
  const [time, setTime] = useState("00:00:00 am");
  const [date, setDate] = useState("");

  React.useEffect(() => {
    setInterval(() => {
      getTime();
    }, 1000);

    return clearInterval();
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    // e.preventDefault();
    // user.username !== "martanthony" &&
    //   setErr({ username: "Account not found", password: user.password });
    // user.password !== "admin" &&
    //   setErr({
    //     username: err.username,
    //     password: "Your password is incorrect",
    //   });
    // if (user.username == "martanthony" && user.password == "admin")
    setLog(true);
  }
  const getTime = () => {
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = h >= 12 ? "pm" : "am";
    // h = (h >= 12) ? h-12 : (h == 0 ? 12: h)

    if (h > 12) h = h - 12;
    if (h == 0) h = 12;

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    setTime(`${h}:${m} ${ampm}`);
    setDate(date.toString().split(" ").splice(0, 4).join(" "));
  };
  return (
    <div className={`user-login ${isLogged && "logged"}`}>
      <div className="login-widget">
        <div className="login-time">
          {time}
          <p>{date}</p>
        </div>
        <div className="login-weather">
          {weather.weather[0].description}
          <h3>{weather.main.temp} °C</h3>
          <h2>
            {weather.name} city, {weather.sys.country}
          </h2>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <img src={userDP} alt="Mart Anthony User Icon" className="user-icon" />
        <div className="input-cont">
        </div>
        <p style={{ color: "red" }}>{err.username}</p>
        <div className="input-cont">
          <input
            type={showPass}
            placeholder="Password"
            value={user.password}
            onChange={(e) =>
              setUser({ username: user.username, password: e.target.value })
            }
          />
        </div>

        <p style={{ color: "red" }}>{err.password}</p>
        <button onClick={handleSubmit}>Signin</button>
      </form>
    </div>
  );
}
