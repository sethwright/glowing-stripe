import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default function Login() {
  const [showLogIn, setShowLogIn] = useState(true);

  return (
    <div>
      {showLogIn ? (
        <SignIn showLogIn={showLogIn} setShowLogIn={setShowLogIn} />
      ) : (
        <SignUp showLogIn={showLogIn} setShowLogIn={setShowLogIn} />
      )}
    </div>
  );
}
