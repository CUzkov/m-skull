import {useDispatch} from 'react-redux';

import {setNoneAuth} from 'store/actionsCreators/userActionCreator';

export const useClearCred = () => {
  const dispatch = useDispatch();
  dispatch(setNoneAuth());
  localStorage.clear();
}
