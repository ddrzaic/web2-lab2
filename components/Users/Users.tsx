import React from "react";
import { User } from "../../helpers/types";
import axios from "axios";
import * as S from "./Users.styled";
import { useFeatureFlags } from "../../hooks/useFeatureFlags";

export interface UsersProps {
  users: User[];
}

const SQL_INJECTION = `a' UNION ALL SELECT password FROM users WHERE '1'='1`;

const filterUsers = async (filter: string) => {
  const users = await axios.get(`/api/users?search=${filter}`);
  if (users.status === 204) {
    alert("Invalid search query");
  }
  return users.data.users;
};

export const Users: React.FC<UsersProps> = ({ users }) => {
  const [filter, setFilter] = React.useState("");
  const [filteredUsers, setFilteredUsers] = React.useState(users);
  const { featureFlags } = useFeatureFlags();
  const enableInjection = featureFlags["injection"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleButtonClick = async () => {
    const users = await filterUsers(filter);
    setFilteredUsers(users);
  };

  const usersListInjection = filteredUsers?.map((user) => (
    <S.User key={user.id}>
      {Object.values(user).map((value, index) => (
        <p key={index}>{value}</p>
      ))}
    </S.User>
  ));

  const usersList = filteredUsers?.map((user) => (
    <S.User key={user.id}>
      <p>{user.name}</p>
    </S.User>
  ));

  return (
    <div>
      <h2>Korisnici</h2>
      <div>
        Input ispod služi za demonstraciju <strong>SQL injectiona</strong>
        <div>
          Primjer unosa za testiranje SQL injectiona je
          <p>
            <strong>{SQL_INJECTION}</strong>
          </p>
        </div>
        <p>Navedena naredba ispisuje lozinke svih korisnika u bazi podataka.</p>
      </div>
      <input
        type="text"
        placeholder="Pretraži korisnika po imenu:"
        value={filter}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>Pretraži</button>
      <p>
        <strong>Rezultati:</strong>
      </p>
      <S.UsersContainer>
        {enableInjection ? usersListInjection : usersList}
      </S.UsersContainer>
    </div>
  );
};
