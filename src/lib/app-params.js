const getAccessToken = () =>
  typeof window !== 'undefined'
    ? window.localStorage.getItem('base44_access_token') || window.localStorage.getItem('token')
    : null;

const isClearAccessTokenRequested = () =>
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).get('clear_access_token') === 'true';

if (isClearAccessTokenRequested()) {
  window.localStorage.removeItem('base44_access_token');
  window.localStorage.removeItem('token');
}

export const appParams = {
  appId: import.meta.env.VITE_BASE44_APP_ID,
  token: getAccessToken(),
  functionsVersion: import.meta.env.VITE_BASE44_FUNCTIONS_VERSION,
  appBaseUrl: import.meta.env.VITE_BASE44_APP_BASE_URL,
};
