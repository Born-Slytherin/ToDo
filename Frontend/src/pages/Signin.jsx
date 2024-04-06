import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <section class="bg-black">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-yellow-300">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-black"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class=" border text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-black"
                  placeholder="name@company.com"
                  required=""
                  onChange={(em) => {
                    setEmail(em.target.value);
                    console.log(email);
                  }}
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-black border text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 "
                  required=""
                  onChange={(pass) => {
                    setPassword(pass.target.value);
                    console.log(password);
                  }}
                />
                {error && <span className="text-xs text-red-600">{error}</span>}
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="remember" class="text-black">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-black hover:bg-primary-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                onClick={(btn) => {
                  btn.preventDefault();
                  setError("");

                  const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      email: email,
                      password: password,
                    }),
                  };

                  fetch("http://localhost:3001/signin", requestOptions)
                    .then((response) => response.json())
                    .then((res) => {
                      if (res.err) {
                        console.log(res);
                        setError(res.err);
                        return;
                      }
                      localStorage.setItem("email", res.data.email);
                      alert(res.message);
                    });
                }}
              >
                Sign in
              </button>
              <p class="text-sm font-light text-black">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signin;
