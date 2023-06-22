export class ComplexFormValue {
  personalInfo!: {
    firstname: string;
    lastname: string;
  };
  contactPreference!: string;
  email?: {
    email: string;
    confirm: string;
  };
  phone?: string;
  loginInfo!: {
    username: string;
    password: string;
    confirmPassword: string;
  };
}
