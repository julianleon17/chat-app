<template>
  <q-page class="flex flex-center q-pa-md">
    <q-card class="q-pa-md full-width shadow-8" style="max-width: 400px;">
      <h5 class="text-center">Login</h5>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
        ref="myForm"
      >
        <q-input
          filled
          type="email"
          v-model="username"
          label="Username"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Password"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>

        <div class="q-pa-md text-center">
          Don't have an account yet?
          <q-btn no-caps to="/register">Create Account</q-btn>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { loginUser, isAuthenticated, user } from 'boot/firebase';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/user';

/*================
 *  VARIABLES
 *================*/
const $q = useQuasar();
const username = ref( null );
const password = ref( null );
const myForm = ref( null );
const router = useRouter();
const storeUser = useUserStore();

/*================
 *  FUNCTIONS
 *================*/

async function onSubmit() {
  let userCredentials = false;

  try {
    userCredentials = await loginUser( username.value, password.value );
  } catch ( error ) {
    console.log( 'Invalid user!' );
  }

  if ( userCredentials ) {
    storeUser.setToken( userCredentials );
  }

  if ( storeUser.isAuthenticated ) {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'warning',
      message: 'Welcome!'
    });
    router.push( { path: '/' } );
  } else {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'close',
      position: 'top',
      message: 'Wrong Username or Password'
    });
  }
  myForm.value.reset();
}

function onReset() {
  username.value = null;
  password.value = null;
}

</script>
