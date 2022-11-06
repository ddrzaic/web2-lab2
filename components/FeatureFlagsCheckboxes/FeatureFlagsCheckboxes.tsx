import React from "react";
import { useFeatureFlags } from "../../hooks/useFeatureFlags";

export const FeatureFlagsCheckboxes: React.FC = () => {
  const { handleFeatureFlagChange, featureFlags } = useFeatureFlags();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    handleFeatureFlagChange({ [name]: checked });
  };

  const featureFlagsCheckboxes = Object.entries(featureFlags).map(
    ([key, value]) => (
      <div key={key}>
        <input
          type="checkbox"
          checked={value}
          name={key}
          onChange={handleCheckboxChange}
        />
        <label>{key}</label>
      </div>
    )
  );
  return (
    <div>
      <h2>Uključi ili isključi ranjivosti</h2>
      {featureFlagsCheckboxes}
    </div>
  );
};
