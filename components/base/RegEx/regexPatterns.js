export const regexPatterns = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phoneNumber: /^\+?(\d.*){10,15}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  firstName: /^[A-Za-z]+$/,
  lastName: /^[A-Za-z]+$/,
};
