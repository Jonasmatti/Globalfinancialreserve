const demoUser = {
  id: 'demo-user',
  name: 'Demo User',
  email: 'demo@example.com',
};

export const base44 = {
  app: {
    async getPublicSettings() {
      return { appName: 'Global Financial Reserve' };
    },
  },
  auth: {
    async me() {
      const token = localStorage.getItem('base44_access_token') || localStorage.getItem('token');
      if (!token) {
        const error = new Error('Authentication required');
        error.status = 401;
        throw error;
      }
      return demoUser;
    },
    logout(redirectUrl) {
      localStorage.removeItem('base44_access_token');
      localStorage.removeItem('token');
      if (redirectUrl) window.location.href = redirectUrl;
    },
    redirectToLogin() {
      window.location.href = '/signin';
    },
  },
};

export default base44;
