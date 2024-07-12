// AuthComponent.tsx
import React, { useState, useEffect } from "react";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";

interface AuthComponentProps {
  children: React.ReactNode;
}

const AuthComponent = ({ children }: AuthComponentProps) => {
  useMsalAuthentication(InteractionType.Redirect);
  const [m_strUser, setm_strUser] = useState<string>("");

  const { accounts } = useMsal();

  // Update m_strUser whenever accounts change
  useEffect(() => {
    if (accounts.length > 0) {
      const username = accounts[0].username;
      setm_strUser(username);
    }
  }, [accounts]);

  if (!m_strUser) {
    return <div>Please wait...</div>;
  } else {
    return <>{children}</>;
  }
};
//   const { instance, accounts } = useMsal();
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   useEffect(() => {
//     // Attempt to authenticate the user immediately
//     initiateLogin();
//   }, []); // Empty dependency array means this effect runs once on mount

//   const initiateLogin = () => {
//     instance
//       .loginPopup()
//       .then((response) => {
//         // Handle successful login
//         console.log("Login successful", response);
//         setIsAuthenticated(true);
//       })
//       .catch((error) => {
//         // Handle login failure
//         console.error("Login failed", error);
//       });
//   };

//   if (!isAuthenticated) {
//     // Do not render anything; just start the login process
//     initiateLogin();
//     return null; // Return null to render nothing
//   }

//   return <>{children}</>;
// };

export default AuthComponent;
