import { createContext } from 'react';

// logged in user data
// chat sender user data
export const UserContext = createContext();

// loading, main, login pages
export const PageContext = createContext();

// chat receiver user data
export const ReceiverContext = createContext();

// main page content view
export const ViewContext = createContext();