import React from "react";
import { useFeatureFlags } from "../../hooks/useFeatureFlags";
import { getCookie } from "cookies-next";
import axios from "axios";
import { User } from "../../helpers/types";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useRouter } from "next/router";

export interface CurrentUserProps {
  user: User;
}

export const CurrentUser: React.FC<CurrentUserProps> = ({ user }) => {
  const [newPassword, setNewPassword] = React.useState<string>("");
  const { featureFlags } = useFeatureFlags();
  const isCSRFEnabled = featureFlags.csrf;
  const { currentUser } = useCurrentUser();
  const router = useRouter();

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value);
  };

  const handlePasswordChange = async () => {
    const token = getCookie("token");
    if (isCSRFEnabled) {
      const response = await axios.get("/api/csrf?password=" + newPassword);
    } else {
      const response = await axios.post("/api/csrf", {
        password: newPassword,
        token,
      });
    }
    router.reload();
  };

  return (
    <div>
      <h2>Informacije o trenutnom korisniku</h2>
      <p>Trenutno ste ulogirano kao korisnik {currentUser.name}</p>
      <p>Email: {currentUser.email}</p>
      <p>Password: {currentUser.password}</p>

      <input
        type="password"
        value={newPassword}
        onChange={handleNewPasswordChange}
      />
      <button onClick={handlePasswordChange}>Promijeni lozinku</button>
    </div>
  );
};
