// src/utils/decodeToken.js
import jwtDecode from 'jwt-decode';

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Token không hợp lệ hoặc đã hết hạn.');
    return null;
  }
};
