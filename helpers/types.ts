export type Flag = {
  id: number;
  name: string;
  isactivated: boolean;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type FeatureFlags = {
  [key: string]: boolean;
};
