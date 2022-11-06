import React from "react";
import { User } from "../../helpers/types";
import { CurrentUser } from "../CurrentUser/CurrentUser";
import { FeatureFlagsCheckboxes } from "../FeatureFlagsCheckboxes/FeatureFlagsCheckboxes";
import { Users } from "../Users/Users";
import * as S from "./Home.styled";
import { setCookie } from "cookies-next";

export interface HomeProps {
  users: User[];
}

export const Home: React.FC<HomeProps> = ({ users }) => {
  //simulating log in with saving cookie
  setCookie("token", "asjdkhkj12312___213s");

  const userJohn = users.find((user) => user.name === "John");

  return (
    <S.HomeContainer>
      <h1>Labos 2</h1>
      <FeatureFlagsCheckboxes />
      <Users users={users} />

      <CurrentUser user={userJohn as User} />
    </S.HomeContainer>
  );
};
