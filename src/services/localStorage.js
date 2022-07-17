export const KEY_USER = 'user';

export function getEmail() {
  const response = localStorage.getItem(KEY_USER);

  if (response) {
    return JSON.parse(response).email;
  }
  return 'You don\'t have an email';
}
