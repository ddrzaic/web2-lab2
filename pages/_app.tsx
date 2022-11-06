import "../styles/globals.css";
import type { AppProps } from "next/app";
import { FeatureFlagsProvider } from "../hooks/useFeatureFlags";
import { UserProvider } from "../hooks/useCurrentUser";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider currentUser={pageProps.currentUser}>
      <FeatureFlagsProvider featureFlags={pageProps.featureFlags}>
        <Component {...pageProps} />
      </FeatureFlagsProvider>
    </UserProvider>
  );
}
