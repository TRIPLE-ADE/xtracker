export interface AuthFormState {
  inputs?: Record<string, string | number>;
  errors?: Partial<Record<string, string[]>>;
  message?: string;
}
