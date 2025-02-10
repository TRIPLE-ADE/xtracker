import LoginForm from "./form";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 px-5">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-primary text-center mb-6">Welcome to Xtracker</h2>
        <LoginForm />
      </div>
    </div>
  );
}
