import { useState } from "react";
import AuthContent from "../components/auth/AuthContent";
import { login } from "../lib/auth-api";
import LoadingOverlay from "../components/auth/ui/LoadingOverlay";
import { Alert } from "react-native";
import { useAppDispatch } from "../hooks/use-redux";
import { authenticate } from "../store/auth";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleSignIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      dispatch(authenticate({ token: token }));
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials, or try again later!"
      );
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin={true} onAuthenticate={handleSignIn} />;
}

export default LoginScreen;
