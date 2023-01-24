<template>
  <q-page class="flex flex-center q-pa-md">
    <q-card class="q-pa-md full-width shadow-8" style="max-width: 400px;">
      <h5 class="text-center">Create Account</h5>
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
          Sign in instead
          <q-btn no-caps to="/login">Sign in</q-btn>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { createNewUser } from 'boot/firebase';

/*================
 *  VARIABLES
 *================*/
const $q = useQuasar();
const username = ref( null );
const password = ref( null );
const myForm = ref( null );

/*================
 *  FUNCTIONS
 *================*/

async function onSubmit() {
  let userCredentials = false;

  try {
    userCredentials = await createNewUser( username.value, password.value );
  } catch( error ) {
    console.log( error );
  }

  if ( userCredentials ) {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'warning',
      message: 'Welcome!'
    });

    console.log( userCredentials );
  } else {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'close',
      position: 'top',
      message: 'Wrong Username or Password'
    });
  }
  console.log( username.value );
  console.log( password.value );
  myForm.value.reset();
}

function onReset() {
  username.value = null;
  password.value = null;
}

</script>
