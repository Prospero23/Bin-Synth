export {default} from 'next-auth/middleware'

export const config = {
    matcher: ['/posts/new', '/synth', '/users/login/loggedIn'],
  };