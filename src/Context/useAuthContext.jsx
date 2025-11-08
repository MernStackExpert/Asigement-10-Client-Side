import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthContext';

export const useAuthContext = () => {
  const authInfo = use(AuthContext)
  return authInfo
};

