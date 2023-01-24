import { useUserStore } from 'stores/user';

export const addBeforeEach = (router) => {
  const storeUser = useUserStore();

  router.beforeEach( ( to, from ) => {
    const isAuthenticated = storeUser.isAuthenticated;
    const validation = ( to.path === '/login' || to.path === '/register' );

    console.log( 'beforeEach:', isAuthenticated );

    if ( !isAuthenticated ) {
      if ( !validation ) { return '/login' }
    } else {
      // if ( validation ) { return '/' }
      console.log( 'User is logged' );
    }
  } );
}
