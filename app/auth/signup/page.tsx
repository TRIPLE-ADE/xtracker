import SignupForm from "./form";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 px-5">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-primary text-center">Welcome to Xtracker</h2>
        <p className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Your Account</p>
        <SignupForm />
      </div>
    </div>
  );
}
