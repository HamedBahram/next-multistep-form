'use client'

import { useState } from 'react'

const steps = [
  { id: 'Step 1', name: 'Personal Information' },
  { id: 'Step 2', name: 'Address' },
  { id: 'Step 3', name: 'Complete' }
]

export default function Form() {
  const [currentStep, setCurrentStep] = useState(0)

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(step => step + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1)
    }
  }

  return (
    <section className='absolute inset-0 flex flex-col justify-between p-24'>
      {/* steps */}
      <nav aria-label='Progress'>
        <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
          {steps.map((step, index) => (
            <li key={step.name} className='md:flex-1'>
              {currentStep > index ? (
                <button
                  onClick={() => setCurrentStep(index)}
                  className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors hover:border-sky-800 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                >
                  <span className='text-sm font-medium text-sky-600 transition-colors group-hover:text-sky-800'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </button>
              ) : currentStep === index ? (
                <button
                  onClick={() => setCurrentStep(index)}
                  className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                  aria-current='step'
                >
                  <span className='text-sm font-medium text-sky-600'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </button>
              ) : (
                <button
                  onClick={() => setCurrentStep(index)}
                  className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors hover:border-gray-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                >
                  <span className='text-sm font-medium text-gray-500 transition-colors group-hover:text-gray-700'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </button>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <form className='mt-12 py-12'>
        {currentStep === 0 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Personal Information
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Provide your personal details.
            </p>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='first-name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  First name
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    name='first-name'
                    id='first-name'
                    autoComplete='given-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='last-name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Last name
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    name='last-name'
                    id='last-name'
                    autoComplete='family-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {currentStep === 1 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Address
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Address where you can receive mail.
            </p>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='country'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Country
                </label>
                <div className='mt-2'>
                  <select
                    id='country'
                    name='country'
                    autoComplete='country-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

              <div className='col-span-full'>
                <label
                  htmlFor='street-address'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Street address
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    name='street-address'
                    id='street-address'
                    autoComplete='street-address'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-2 sm:col-start-1'>
                <label
                  htmlFor='city'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  City
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    name='city'
                    id='city'
                    autoComplete='address-level2'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='region'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  State / Province
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    name='region'
                    id='region'
                    autoComplete='address-level1'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='postal-code'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  ZIP / Postal code
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    name='postal-code'
                    id='postal-code'
                    autoComplete='postal-code'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Complete
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Thank you for your submission.
            </p>
          </>
        )}
      </form>

      {/* Navigation */}
      <div className='mt-8 pt-5'>
        <div className='flex justify-between'>
          <button
            type='button'
            onClick={prev}
            disabled={currentStep === 0}
            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5L8.25 12l7.5-7.5'
              />
            </svg>
          </button>
          <button
            type='button'
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 4.5l7.5 7.5-7.5 7.5'
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
