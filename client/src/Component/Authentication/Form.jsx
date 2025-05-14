// import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

export const Form = () => {
  const methods = useForm();

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
        className="container"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="name">Name</label>
            <input
              {...methods.register('name', {
                required: 'Name is required',
                maxLength: {
                  value: 30,
                  message: '30 characters max',
                },
              })}
              type="text"
              id="name"
              placeholder="Write your name ..."
            />
            {methods.formState.errors.name && (
              <p className="text-red-500">
                {methods.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password">Password</label>
            <input
              {...methods.register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              type="password"
              id="password"
              placeholder="Type password ..."
            />
            {methods.formState.errors.password && (
              <p className="text-red-500">
                {methods.formState.errors.password.message}
              </p>
            )}
          </div>
          <div>
          <label htmlFor="email">Email</label>
          <input
            {...methods.register('email', {
                required: 'email is required',
                minLength: {
                  value: 6,
                  message: 'email must be at least 6 characters',
                },
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address"
                  }
              })}
            />
            {methods.formState.errors.email && (
              <p className="text-red-500">
                {methods.formState.errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5">
          <button
            type="submit"
            className="flex items-center gap-1 p-5 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800"
          >
            Submit Form
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
