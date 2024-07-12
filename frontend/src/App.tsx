import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import Navbar from "./Components/Navbar/TopNavBar/Navbar";
import { Outlet } from "react-router";
import AuthComponent from "./auth/authComponent";

function App() {
  return (
    <>
      <AuthComponent>
        <Navbar />
        <Outlet />
      </AuthComponent>
    </>
  );
}

export default App;

// useMsalAuthentication(InteractionType.Redirect);
// const [m_strUser, setm_strUser] = useState<string>("");

// function Render() {
//   const { accounts } = useMsal();

//   try {
//     const username = accounts[0].username;
//     setm_strUser(username);
//   } catch (e) {}
// }

// if (m_strUser != "")
//   return (
//     <div className="App">
//       <div>User: {m_strUser}</div>
//     </div>
//   );
// else
// return (
//   <>
//     {Render()}
//     <div>Please wait...</div>
//   </>
// );
