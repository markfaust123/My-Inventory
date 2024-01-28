import { useState } from "react";
import AuthContent from "../components/auth/AuthContent";
import { createUser } from "../lib/auth-api";
import LoadingOverlay from "../components/auth/ui/LoadingOverlay";
import { Alert } from "react-native";
import { useAppDispatch } from "../hooks/use-redux";
import { authenticate } from "../store/auth";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleSignUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      dispatch(authenticate({ token: token }));
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not create user, please check your input, and try again later."
      );
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent isLogin={false} onAuthenticate={handleSignUp} />;
}

export default SignupScreen;
