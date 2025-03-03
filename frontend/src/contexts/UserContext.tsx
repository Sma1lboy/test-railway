import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface IUser {
  UserID: number;
  Name: string;
  Email: string;
  Bio: string;
  SocialMediaLinks: string;
}

interface IUserContextProps {
  currentUser: IUser | null;
  setCurrentUser: (user: IUser | null) => void;
  users: IUser[];
  fetchUsers: () => Promise<void>;
  fetchUserById: (id: number) => Promise<IUser | null>;
}

const UserContext = createContext<IUserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);

  /**
   * Fetches the list of user profiles from the backend API.
   */
  const fetchUsers = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3000/api/users');
      if (!response.ok) {
        throw new Error(`Error fetching users: ${response.status}`);
      }
      const data = await response.json();
      if (data.success && data.success.users) {
        setUsers(data.success.users);
      } else {
        console.error('No users found in response');
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  /**
   * Fetches details for a specific user by ID from the backend API.
   * @param id - The UserID of the user to fetch.
   * @returns A promise that resolves to an IUser object or null if not found.
   */
  const fetchUserById = async (id: number): Promise<IUser | null> => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching user with id ${id}: ${response.status}`);
      }
      const data = await response.json();
      if (data.success && data.success.user) {
        setCurrentUser(data.success.user);
        return data.success.user;
      } else {
        console.error('User not found in response');
        return null;
      }
    } catch (error) {
      console.error(`Error fetching user by id ${id}:`, error);
      return null;
    }
  };

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, users, fetchUsers, fetchUserById }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): IUserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};