import { IUser } from "./types";

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem('user', JSON.stringify(user));
};

export function getUserLocalStorage() {
  const storagedUser = localStorage.getItem('user');

  if(!storagedUser) return null

  return JSON.parse(storagedUser) || null;


}
