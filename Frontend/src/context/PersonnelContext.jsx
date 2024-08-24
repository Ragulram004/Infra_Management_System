import { createContext, useReducer } from 'react';

export const PersonnelsContext = createContext();

export const personnelsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PERSONNELS':
      return {
        personnels: action.payload,
      };
    case 'CREATE_PERSONNEL':
      return {
        personnels: [action.payload, ...state.personnels],
      };
    default:
      return state;
  }
};

export const PersonnelsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(personnelsReducer, {
    personnels: [],
  });

  return (
    <PersonnelsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PersonnelsContext.Provider>
  );
};
