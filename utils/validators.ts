const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isValidEmail = (email: string): boolean => emailRegex.test(email);


const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d\W]{8,}$/;

export const isValidPassword = (password: string): boolean => passwordRegex.test(password);


export interface ValidationError {
  error: string;
}

export const validateRegistration = (
  email?: string,
  password?: string,
  confirmPassword?: string
): ValidationError | null => {
    
  const validations = [
    { condition: !email, error: "Email is required" },
    { condition: email && !isValidEmail(email), error: "Invalid email" },
    { condition: !password, error: "Password is required" },
    { condition: password && !isValidPassword(password), error: "Invalid password" },
    { condition: !confirmPassword, error: "Confirm password is required" },
    { condition: password !== confirmPassword, error: "Passwords do not match" },
  ];

  for (const { condition, error } of validations) {
    if (condition) return { error };
  }

  return null; // ✅ Aucune erreur
};

export const validateSignIn = (
  email?: string,
  password?: string
): ValidationError | null => {      
  const validations = [
    { condition: !email, error: "Email is required" },
    { condition: email && !isValidEmail(email), error: "Invalid email" },
    { condition: !password, error: "Password is required" },
  ];

  for (const { condition, error } of validations) {
    if (condition) return { error };
  }

  return null; // ✅ Aucune erreur
}