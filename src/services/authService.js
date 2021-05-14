import * as Server from '../Server';

const AuthService = {
  
  logIn: async (obj) => {
    try {
      let response = await Server.request({
        url: '/login',
        method: 'POST',
        data: obj || {}
      });
      return response;
    } catch (error) {
      throw Error(error.message);
    }
  },
}

export default AuthService;