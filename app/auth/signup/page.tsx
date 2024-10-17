import Link from "next/link";

import { signup } from "@/app/auth/actions";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-5">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              Full Name:
            </label>
            <input
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              id="name"
              name="name"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email:
            </label>
            <input
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              id="email"
              name="email"
              type="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password:
            </label>
            <input
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              id="password"
              name="password"
              type="password"
            />
          </div>

          <div className="flex justify-between">
            <button
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition ease-in-out duration-200"
              formAction={signup}
            >
              Sign up
            </button>
          </div>

          <div className="text-center text-gray-500 mt-4">
            <span> Already have an account?</span>
            <Link className="text-indigo-600 hover:underline" href="/auth/login">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
