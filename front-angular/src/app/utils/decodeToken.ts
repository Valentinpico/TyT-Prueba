interface DecodedToken {
  UserID: number;
  Username: string;
  Email: string;
  iat: number;
  exp: number;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded) as DecodedToken;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};
