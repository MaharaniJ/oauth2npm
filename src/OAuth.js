import React, { useState } from "react";
import SocialButton from "./components/SocialButton";
import UserCard from "./components/UserCard";

const SocialLogin = () => {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState({});
  const [currentProvider, setCurrentProvider] = useState("");
  const nodes = {};

  const onLoginSuccess = (user) => {
    console.log(user);

    setLogged(true);
    setCurrentProvider(user._provider);
    setUser(user);
  };

  const onLoginFailure = (err) => {
    console.error(err);

    setLogged(false);
    setCurrentProvider("");
    setUser({});
  };

  const onLogoutSuccess = () => {
    setLogged(false);
    setCurrentProvider("");
    setUser({});
  };

  const onLogoutFailure = (err) => {
    console.error(err);
  };

  const logout = () => {
    if (logged && currentProvider) {
      nodes[currentProvider].props.triggerLogout();
    }
  };

  let children;

  if (logged) {
    children = <UserCard user={user} logout={logout} />;
  } else {
    children = [
      <SocialButton
        provider="facebook"
        appId="657319568198782"
        onLoginSuccess={onLoginSuccess}
        onLoginFailure={onLoginFailure}
        onLogoutSuccess={onLogoutSuccess}
        getInstance={(node) => (nodes["facebook"] = node)}
        key={"facebook"}
        onInternetFailure={() => true}
      >
        Login with Facebook
      </SocialButton>,
      <SocialButton
        provider="google"
        appId="512942136006-pivfv1let7r5vcr7bquus5jtof6v7rq9.apps.googleusercontent.com"
        onLoginSuccess={onLoginSuccess}
        onLoginFailure={onLoginFailure}
        onLogoutSuccess={onLogoutSuccess}
        onLogoutFailure={onLogoutFailure}
        getInstance={(node) => (nodes["google"] = node)}
        key={"google"}
        scope={"https://www.googleapis.com/auth/user.gender.read"}
      >
        Login with Google
      </SocialButton>,
      <SocialButton
        autoCleanUri
        provider="github"
        gatekeeper="http://localhost:9999"
        appId="fda26b17d79471b1d37e"
        redirect="http://localhost:8080"
        onLoginSuccess={onLoginSuccess}
        onLoginFailure={onLoginFailure}
        onLogoutSuccess={onLogoutSuccess}
        getInstance={(node) => (nodes["google"] = node)}
        key={"github"}
      >
        Login with GitHub OAuth
      </SocialButton>,
      // Add other SocialButton components here...
    ];
  }
  //github-secrete-key:4f6aa8482afc2a7971b04301fb328a8e7e4f06a1

  //google-secret-key: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

  return children;
};

export default SocialLogin;
