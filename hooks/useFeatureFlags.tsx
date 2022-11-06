import React from "react";
import { FeatureFlags } from "../helpers/types";
import axios from "axios";

export interface FeatureFlagsProviderReturn {
  featureFlags: FeatureFlags;
  handleFeatureFlagChange: (flag: FeatureFlags) => void;
}

const initialValues = {
  featureFlags: {
    injection: true,
    csrf: true,
  },
  handleFeatureFlagChange: () => {},
};
export const FeatureFlagsContext =
  React.createContext<FeatureFlagsProviderReturn>(initialValues);

export type FeatureFlagsProviderProps = {
  children: React.ReactNode;
  featureFlags: FeatureFlags;
};

export const FeatureFlagsProvider: React.FC<FeatureFlagsProviderProps> = ({
  children,
  featureFlags,
}) => {
  const [flags, setFlags] = React.useState<FeatureFlags>(featureFlags);

  const handleFeatureFlagChange = async (flag: FeatureFlags) => {
    setFlags((prevFlags) => ({
      ...prevFlags,
      ...flag,
    }));

    const flagName = Object.keys(flag)[0];
    const flagValue = Object.values(flag)[0];
    axios.patch("/api/flag", {
      name: flagName,
      isActivated: flagValue,
    });
  };

  return (
    <FeatureFlagsContext.Provider
      value={{
        featureFlags: flags,
        handleFeatureFlagChange: handleFeatureFlagChange,
      }}
    >
      {children}
    </FeatureFlagsContext.Provider>
  );
};

export const useFeatureFlags = () => {
  return React.useContext(FeatureFlagsContext);
};
