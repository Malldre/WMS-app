export type UserProfile = {
  uuid: string;
  name: string;
  email: string;
  position?: string;
  registration?: string;
  avatar?: string;
  manager?: {
    id: string;
    name: string;
    position: string;
    email: string;
  };
};
