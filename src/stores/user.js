import { defineStore } from 'pinia';

export const useUserStore = defineStore( 'user', {
  state: () => ( {
    userToken: null,
    authenticated: false,
    username: null,
    email: null
  } ),
  getters: {
    isAuthenticated: ( state ) => state.authenticated,
    getUsername: ( state ) => state.username,
    getEmail: ( state ) => state.email
  },
  actions: {
    setToken ( token ) {
      this.userToken = token
      this.authenticated = true
      // this.username
      // this.email
    },
    deleteToken () {
      this.accessToken = ''
      this.refreshToken = ''
      this.authenticated = false
      this.deleteLocalTokens()
      this.id = ''
      this.name = ''
      this.roles = []
    },
    // async checkToken () {
    //   let accessToken = this.accessToken;

    //   if (!accessToken || !refreshToken) {
    //     accessToken = this.getLocalToken()
    //   }

    //   if (accessToken) {
    //     await this.refreshAccessTokens(accessToken, refreshToken)
    //   } else {
    //     this.deleteTokens()
    //     return false
    //   }
    // }
  }
} );
