/** Validate email format */
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/** Validate Vietnamese phone number (starts with 0 and has 10 digits) */
export const isValidPhone = (phone: string): boolean => {
  const regex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
  return regex.test(phone);
};

/** Validate Student ID (MSSV) - only digits, 8-10 characters */
export const isValidStudentID = (mssv: string): boolean => {
  const regex = /^[0-9]{8,10}$/;
  return regex.test(mssv);
};

/** Validate password length (min 6, max 32) */
export const isValidPasswordLength = (
  password: string,
  min = 6,
  max = 32
): boolean => {
  return password.length >= min && password.length <= max;
};

/** Check if string is empty */
export const isEmpty = (value: string): boolean => {
  return !value || value.trim() === "";
};

export const isPasswordMatch = (confirmPassword: string, password: string): boolean => {
  return confirmPassword === password;
};
