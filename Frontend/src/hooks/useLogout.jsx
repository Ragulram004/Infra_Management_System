import { useAuthContext } from "../hooks/useAuthContext";
import { usePersonnelsContext } from "./usePersonnelContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const {dispatch: dispatchPersonnel} = usePersonnelsContext()

  const logout = () => {
    //remove user
    localStorage.removeItem('user')

    dispatch({type:'LOGOUT'}) 
    dispatchPersonnel({type: 'SET_PERSONNELS', payload: null})
  }
  return {logout}
}