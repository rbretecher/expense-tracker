import { Dialog, Loading } from 'quasar';

export function showErrorMessageWithTitle(errorTitle, errorMessage) {
  Loading.hide();
  Dialog.create({
    title: errorTitle,
    message: errorMessage,
  });
}

export function showErrorMessage(errorMessage) {
  showErrorMessageWithTitle('Error', errorMessage);
}
