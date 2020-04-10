import firebase from 'firebase/app';
import 'firebase/database';

import { Notify } from 'quasar';
import { showErrorMessage } from 'src/functions/show-error-message';

export function firebaseSetValue(path, value, options = {}) {
  return firebase
    .database()
    .ref(path)
    .set(value, (error) => {
      if (error) {
        showErrorMessage(error.message);
      } else if (options.successMessage) {
        Notify.create(options.successMessage);
      }
    });
}

export function firebaseUpdateValue(path, values, options = {}) {
  return firebase
    .database()
    .ref(path)
    .update(values, (error) => {
      if (error) {
        showErrorMessage(error.message);
      } else if (options.successMessage) {
        Notify.create(options.successMessage);
      }
    });
}

export function firebaseRemoveValue(path, options = {}) {
  return firebase
    .database()
    .ref(path)
    .remove((error) => {
      if (error) {
        showErrorMessage(error.message);
      } else if (options.successMessage) {
        Notify.create(options.successMessage);
      }
    });
}
