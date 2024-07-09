'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { z } from 'zod'
import { FormDataSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import Image from 'next/image'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

type Inputs = z.infer<typeof FormDataSchema>
enum Gender {
  Male = 'male',
  Female = 'female'
}
const steps = [
  {
    id: 'Step 1',
    name: 'Student Information',
    fields: [
      'FullName',
      'StudentImage',
      'ParentId',
      'AadharNo',
      'Enrollmentno',
      'StudentAdmissionType',
      'Class',
      'AdmissionDate',
      'ContactNumber',
      'EmailID',
      'Gender',
      'StudentPassword',
      'ParentPassword',
      'HomeAddress',
      'District',
      'City',
      'DateOfBirth',
      'EmergencyContactNo1',
      'EmergencyContactNo2',
      'State',
      'pincode',
      'ParmentHomeAddress',
      'ParmentDistrict',
      'ParmentCity',
      'ParmentState',
      'Parmentpincode'
    ]
  },
  {
    id: 'Step 2',
    name: 'Parent Information',
    fields: [
      'FatherName',
      'FatherImage',
      'FatherContactNumber',
      'FatherContactNumber1',
      'FatherAadhaarNumber',
      'FatherEmailId',
      'FAnnualIncome',
      'MotherName',
      'MotherImage',
      'MotherContactNumber',
      'MotherContactNumber1',
      'MotherAadhaarNumber',
      'MAnnualIncome'
    ]
  },
  {
    id: 'Step 3',
    name: 'Academic Information',
    fields: ['MotherTongue', 'VehicleAllocation']
  },
  {
    id: 'Step 4',
    name: 'Upload Certificate',
    fields: ['CertificateName', 'IssueDate', 'CertificateFile']
  },
  { id: 'Step 5', name: 'Complete' }
]

export default function Form() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [fileError, setFileError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [FfileError, FsetFileError] = useState<string | null>(null)
  const [FpreviewUrl, FsetPreviewUrl] = useState<string | null>(null)
  const [FselectedFile, FsetSelectedFile] = useState<File | null>(null)
  const [MfileError, MsetFileError] = useState<string | null>(null)
  const [MpreviewUrl, MsetPreviewUrl] = useState<string | null>(null)
  const [MselectedFile, MsetSelectedFile] = useState<File | null>(null)
  const [CertfileError, CertsetFileError] = useState<string | null>(null)
  const [CertselectedFile, CertsetSelectedFile] = useState<File | null>(null)
  const [gender, setgender] = useState<string>('male')
  const [showpassStu, setshowpassStu] = useState<boolean>(false)
  const [showpassPare, setshowpassPare] = useState<boolean>(false)
  const [sameAsAbove, setsameAsAbove] = useState<boolean>(false)
  const delta = currentStep - previousStep
  const handleGenderChange = (event: any) => {
    setgender(event.target.value)
  }
  const handleShowPassStu = () => {
    setshowpassStu(!showpassStu)
  }
  const handleShowPassPare = () => {
    setshowpassPare(!showpassPare)
  }
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    trigger,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {}
  })
  const watchAllFields = watch()
  useEffect(() => {
    const savedFormData = localStorage.getItem('formData')
    if (savedFormData) {
      const parsedFormData = JSON.parse(savedFormData)
      Object.keys(parsedFormData).forEach(key => {
        setValue(key as keyof Inputs, parsedFormData[key])
      })
    }
  }, [setValue])
  useEffect(() => {
    localStorage.setItem('currentStep', currentStep.toString())
  }, [currentStep])
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(watchAllFields))
  }, [watchAllFields])
  const permanentAddress = watch('HomeAddress')
  const permanentCity = watch('City')
  const permanetDistict = watch('District')
  const permanentState = watch('State')
  const permanentPincode = watch('pincode')

  const handleaddress = (e: any) => {
    setsameAsAbove(e.target.value)
    if (e.target.value) {
      setValue('ParmentHomeAddress', permanentAddress)
      setValue('ParmentCity', permanentCity)
      setValue('ParmentDistrict', permanetDistict)
      setValue('ParmentState', permanentState)
      setValue('Parmentpincode', permanentPincode)
    } else {
      setValue('ParmentHomeAddress', '')
      setValue('ParmentCity', '')
      setValue('ParmentDistrict', '')
      setValue('ParmentState', '')
      setValue('Parmentpincode', '' as unknown as number)
    }
  }
  const MAX_FILE_SIZE = 5 * 1024 * 1024
  const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null)
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError('File size is more than 5MB')
        setSelectedFile(null)
      } else if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        setFileError('Only png jpg jpeg files supported')
        setSelectedFile(null)
      } else {
        setSelectedFile(file)
        const fileUrl = URL.createObjectURL(file)
        setPreviewUrl(fileUrl)
        setValue('StudentImage', file)
      }
    }
  }
  const FhandleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    FsetFileError(null)
    const Ffile = e.target.files?.[0]
    if (Ffile) {
      if (Ffile.size > MAX_FILE_SIZE) {
        FsetFileError('File size is more tha 5MB')
        FsetSelectedFile(null)
      } else if (!ACCEPTED_FILE_TYPES.includes(Ffile.type)) {
        FsetFileError('Only png jpg jpeg supported')
        FsetSelectedFile(null)
      } else {
        FsetSelectedFile(Ffile)
        const FfileUrl = URL.createObjectURL(Ffile)
        FsetPreviewUrl(FfileUrl)
        setValue('FatherImage', Ffile)
      }
    }
  }
  const MhandleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    MsetFileError(null)
    const Mfile = event.target.files?.[0]
    if (Mfile) {
      if (Mfile.size > MAX_FILE_SIZE) {
        MsetFileError('File size is more tha 5MB')
        MsetSelectedFile(null)
      } else if (!ACCEPTED_FILE_TYPES.includes(Mfile.type)) {
        MsetFileError('Only png jpg jpeg supported')
        MsetSelectedFile(null)
      } else {
        MsetSelectedFile(Mfile)
        const FfileUrl = URL.createObjectURL(Mfile)
        MsetPreviewUrl(FfileUrl)
        setValue('MotherImage', Mfile)
      }
    }
  }
  const CertifiFilehandleFileChange = (
    ev: React.ChangeEvent<HTMLInputElement>
  ) => {
    MsetFileError(null)
    const Mfile = ev.target.files?.[0]
    if (Mfile) {
      if (Mfile.size > MAX_FILE_SIZE) {
        CertsetFileError('File size is more tha 5MB')
        CertsetSelectedFile(null)
      } else if (!ACCEPTED_FILE_TYPES.includes(Mfile.type)) {
        CertsetFileError('Only png jpg jpeg supported')
        CertsetSelectedFile(null)
      } else {
        CertsetSelectedFile(Mfile)
        setValue('MotherImage', Mfile)
      }
    }
  }
  const processForm: SubmitHandler<Inputs> = data => {
    console.log(data)
    reset()
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.clear()
      localStorage.removeItem('formData')
      localStorage.removeItem('currentStep')
    }
  }

  type FieldName = keyof Inputs

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)()
      }
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

  return (
    <section className='absolute inset-0 flex flex-col justify-between p-24'>
      <nav aria-label='Progress'>
        <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
          {steps.map((step, index) => (
            <li key={step.name} className='md:flex-1'>
              {currentStep > index ? (
                <div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-sky-600 transition-colors '>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                  aria-current='step'
                >
                  <span className='text-sm font-medium text-sky-600'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : (
                <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-gray-500 transition-colors'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <form className='mt-12 py-12' onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Personal Information
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Provide your personal details.
            </p>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='StudentImage'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Student Image
                </label>
                <div className='mt-2'>
                  <div className='h-[150px] w-[150px] overflow-hidden border-[1px] border-[#cdcdc0d] bg-[#cdcdcd]'>
                    {previewUrl && (
                      <Image
                        src={previewUrl}
                        alt='Student Photo'
                        width={150}
                        height={150}
                        className=' bg-cover'
                      />
                    )}
                  </div>
                  {fileError && (
                    <p className='mt-2 text-red-500'>{fileError}</p>
                  )}
                  <div className='relative'>
                    <input
                      type='file'
                      className='hidden'
                      {...register('StudentImage')}
                      id='imageInput'
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor='imageInput'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    >
                      {selectedFile ? selectedFile.name : 'Choose file'}
                    </label>
                  </div>
                  <p className='text-red-600'>
                    only JPEG,JPG,PNG files allowed of size of 5MB
                  </p>
                  {errors.StudentImage?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.StudentImage?.message?.toString()}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Parent Id'
                  className='flex items-center gap-1 text-sm font-medium leading-6 text-gray-900'
                >
                  Parent Id <p className='text-red-600'>*</p>:
                </label>
                <div className='mt-2'>
                  <input
                    id='Parent Id'
                    type='text'
                    {...register('ParentId')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  <p className='text-red-600'>
                    Note: This Parents Enrollment Number Will Be The Parents Id
                    Username
                  </p>
                  {errors.ParentId?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.ParentId.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='StudentNameAsPerAadhaar'
                  className='flex items-center gap-1 text-sm font-medium leading-6 text-gray-900'
                >
                  Student Name As Per Aadhaar{' '}
                  <p
                    className='t
                  ext-red-600'
                  >
                    *
                  </p>
                  :
                </label>
                <div className='mt-2'>
                  <input
                    id='StudentNameAsPerAadhaar'
                    type='text'
                    {...register('StudentNameAsPerAadhaar')}
                    className=' block w-full rounded-md  border-0 py-1.5 text-gray-900   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600  sm:text-sm sm:leading-6'
                  />
                  {errors.ParentId?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.ParentId.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Roll Number'
                  className='text-sm font-medium leading-6 text-gray-900'
                >
                  Roll Number :
                </label>
                <div className='mt-2'>
                  <input
                    id='Roll Number'
                    type='text'
                    {...register('RollNumber')}
                    className=' block w-full rounded-md  border-0 py-1.5 text-gray-900   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600  sm:text-sm sm:leading-6'
                  />
                  {errors.RollNumber?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.RollNumber.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Class'
                  className='flex items-center gap-1 text-sm font-medium leading-6 text-gray-900'
                >
                  Class <p className='text-red-600'>*</p>:
                </label>
                <div className='mt-2'>
                  <select
                    id='Class'
                    {...register('Class')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  >
                    <option value=''>Select Class</option>
                    <option value='Nursery'>Nursery</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                  </select>
                  {errors.Class?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.Class.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Admission Date'
                  className='flex items-center gap-1 text-sm font-medium leading-6 text-gray-900'
                >
                  Admission Date<p className='text-red-600'>*</p>:
                </label>
                <div className='mt-2'>
                  <input
                    id='Admission Date'
                    type='date'
                    {...register('AdmissionDate')}
                    className=' block w-full rounded-md  border-0 py-1.5 text-gray-900   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600  sm:text-sm sm:leading-6'
                  />
                  {errors.AdmissionDate?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.AdmissionDate.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Contact Number'
                  className='flex items-center gap-1 text-sm font-medium leading-6 text-gray-900'
                >
                  Parent Contact Number Or Student
                  <p className='text-red-600'>*</p>:
                </label>
                <div className='mt-2'>
                  <input
                    id='Contact Number'
                    type='number'
                    {...register('ContactNumber')}
                    className=' block w-full rounded-md  border-0 py-1.5 text-gray-900   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600  sm:text-sm sm:leading-6'
                    placeholder='+91'
                  />
                  {errors.ContactNumber?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.ContactNumber.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Email ID'
                  className='text-sm font-medium leading-6 text-gray-900'
                >
                  Email ID
                </label>
                <div className='mt-2'>
                  <input
                    id='Email ID'
                    type='email'
                    {...register('EmailID')}
                    className=' block w-full rounded-md  border-0 py-1.5 text-gray-900   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600  sm:text-sm sm:leading-6'
                    placeholder='john@gmail.com'
                  />
                  {errors.EmailID?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.EmailID.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='BirthPlace'
                  className='text-sm font-medium leading-6 text-gray-900'
                >
                  Birth Place :
                </label>
                <div className='mt-2'>
                  <input
                    id='BirthPlace'
                    type='text'
                    {...register('BirthPlace')}
                    className=' block w-full rounded-md  border-0 py-1.5 text-gray-900   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600  sm:text-sm sm:leading-6'
                  />
                  {errors.BirthPlace?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.BirthPlace.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Gender'
                  className='flex items-center gap-1 text-sm font-medium leading-6 text-gray-900'
                >
                  Gender<p className='text-red-600'>*</p>:
                </label>
                <div className='mt-2'>
                  <div className='flex items-center space-x-4'>
                    <label className='flex items-center gap-2'>
                      <input
                        {...register('Gender')}
                        value={Gender.Male}
                        checked={gender === Gender.Male}
                        onChange={handleGenderChange}
                        id='male'
                        type='radio'
                        className='  border-1   shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600'
                      />
                      Male
                    </label>
                    <label className='flex items-center gap-2'>
                      <input
                        {...register('Gender')}
                        value={Gender.Female}
                        checked={gender === Gender.Female}
                        onChange={handleGenderChange}
                        id='female'
                        type='radio'
                        className='  border-1   shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600'
                      />
                      Female
                    </label>
                  </div>
                  {errors.Gender?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.Gender.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Nationality'
                  className='flex items-center gap-1 text-sm font-medium leading-6 text-gray-900'
                >
                  Nationality<p className='text-red-600'>*</p> :
                </label>
                <div className='mt-2'>
                  <select
                    {...register('Nationality')}
                    className=' block w-full rounded-md  border-0 py-1.5 text-gray-900   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600  sm:text-sm sm:leading-6'
                    defaultValue='India'
                  >
                    <option value='India'>India</option>
                    <option value='United States'>United States</option>
                    <option value='Afghanistan'>Afghanistan</option>
                    <option value='Albania'>Albania</option>
                    <option value='Algeria'>Algeria</option>
                    <option value='American Samoa'>American Samoa</option>
                    <option value='Andorra'>Andorra</option>
                    <option value='Angola'>Angola</option>
                    <option value='Anguilla'>Anguilla</option>
                    <option value='Antartica'>Antarctica</option>
                    <option value='Antigua and Barbuda'>
                      Antigua and Barbuda
                    </option>
                    <option value='Argentina'>Argentina</option>
                    <option value='Armenia'>Armenia</option>
                    <option value='Aruba'>Aruba</option>
                    <option value='Australia'>Australia</option>
                    <option value='Austria'>Austria</option>
                    <option value='Azerbaijan'>Azerbaijan</option>
                    <option value='Bahamas'>Bahamas</option>
                    <option value='Bahrain'>Bahrain</option>
                    <option value='Bangladesh'>Bangladesh</option>
                    <option value='Barbados'>Barbados</option>
                    <option value='Belarus'>Belarus</option>
                    <option value='Belgium'>Belgium</option>
                    <option value='Belize'>Belize</option>
                    <option value='Benin'>Benin</option>
                    <option value='Bermuda'>Bermuda</option>
                    <option value='Bhutan'>Bhutan</option>
                    <option value='Bolivia'>Bolivia</option>
                    <option value='Bosnia and Herzegowina'>
                      Bosnia and Herzegowina
                    </option>
                    <option value='Botswana'>Botswana</option>
                    <option value='Bouvet Island'>Bouvet Island</option>
                    <option value='Brazil'>Brazil</option>
                    <option value='British Indian Ocean Territory'>
                      British Indian Ocean Territory
                    </option>
                    <option value='Brunei Darussalam'>Brunei Darussalam</option>
                    <option value='Bulgaria'>Bulgaria</option>
                    <option value='Burkina Faso'>Burkina Faso</option>
                    <option value='Burundi'>Burundi</option>
                    <option value='Cambodia'>Cambodia</option>
                    <option value='Cameroon'>Cameroon</option>
                    <option value='Canada'>Canada</option>
                    <option value='Cape Verde'>Cape Verde</option>
                    <option value='Cayman Islands'>Cayman Islands</option>
                    <option value='Central African Republic'>
                      Central African Republic
                    </option>
                    <option value='Chad'>Chad</option>
                    <option value='Chile'>Chile</option>
                    <option value='China'>China</option>
                    <option value='Christmas Island'>Christmas Island</option>
                    <option value='Cocos Islands'>
                      Cocos (Keeling) Islands
                    </option>
                    <option value='Colombia'>Colombia</option>
                    <option value='Comoros'>Comoros</option>
                    <option value='Congo'>Congo</option>
                    <option value='Congo'>
                      Congo, the Democratic Republic of the
                    </option>
                    <option value='Cook Islands'>Cook Islands</option>
                    <option value='Costa Rica'>Costa Rica</option>
                    <option value="Cota D'Ivoire">Cote &apos;Ivoire</option>
                    <option value='Croatia'>Croatia (Hrvatska)</option>
                    <option value='Cuba'>Cuba</option>
                    <option value='Cyprus'>Cyprus</option>
                    <option value='Czech Republic'>Czech Republic</option>
                    <option value='Denmark'>Denmark</option>
                    <option value='Djibouti'>Djibouti</option>
                    <option value='Dominica'>Dominica</option>
                    <option value='Dominican Republic'>
                      Dominican Republic
                    </option>
                    <option value='East Timor'>East Timor</option>
                    <option value='Ecuador'>Ecuador</option>
                    <option value='Egypt'>Egypt</option>
                    <option value='El Salvador'>El Salvador</option>
                    <option value='Equatorial Guinea'>Equatorial Guinea</option>
                    <option value='Eritrea'>Eritrea</option>
                    <option value='Estonia'>Estonia</option>
                    <option value='Ethiopia'>Ethiopia</option>
                    <option value='Falkland Islands'>
                      Falkland Islands (Malvinas)
                    </option>
                    <option value='Faroe Islands'>Faroe Islands</option>
                    <option value='Fiji'>Fiji</option>
                    <option value='Finland'>Finland</option>
                    <option value='France'>France</option>
                    <option value='France Metropolitan'>
                      France, Metropolitan
                    </option>
                    <option value='French Guiana'>French Guiana</option>
                    <option value='French Polynesia'>French Polynesia</option>
                    <option value='French Southern Territories'>
                      French Southern Territories
                    </option>
                    <option value='Gabon'>Gabon</option>
                    <option value='Gambia'>Gambia</option>
                    <option value='Georgia'>Georgia</option>
                    <option value='Germany'>Germany</option>
                    <option value='Ghana'>Ghana</option>
                    <option value='Gibraltar'>Gibraltar</option>
                    <option value='Greece'>Greece</option>
                    <option value='Greenland'>Greenland</option>
                    <option value='Grenada'>Grenada</option>
                    <option value='Guadeloupe'>Guadeloupe</option>
                    <option value='Guam'>Guam</option>
                    <option value='Guatemala'>Guatemala</option>
                    <option value='Guinea'>Guinea</option>
                    <option value='Guinea-Bissau'>Guinea-Bissau</option>
                    <option value='Guyana'>Guyana</option>
                    <option value='Haiti'>Haiti</option>
                    <option value='Heard and McDonald Islands'>
                      Heard and Mc Donald Islands
                    </option>
                    <option value='Holy See'>
                      Holy See (Vatican City State)
                    </option>
                    <option value='Honduras'>Honduras</option>
                    <option value='Hong Kong'>Hong Kong</option>
                    <option value='Hungary'>Hungary</option>
                    <option value='Iceland'>Iceland</option>
                    <option value='Indonesia'>Indonesia</option>
                    <option value='Iran'>Iran (Islamic Republic of)</option>
                    <option value='Iraq'>Iraq</option>
                    <option value='Ireland'>Ireland</option>
                    <option value='Israel'>Israel</option>
                    <option value='Italy'>Italy</option>
                    <option value='Jamaica'>Jamaica</option>
                    <option value='Japan'>Japan</option>
                    <option value='Jordan'>Jordan</option>
                    <option value='Kazakhstan'>Kazakhstan</option>
                    <option value='Kenya'>Kenya</option>
                    <option value='Kiribati'>Kiribati</option>
                    <option value="Democratic People's Republic of Korea">
                      Korea, Democratic People&apos;s Republic of
                    </option>
                    <option value='Korea'>Korea, Republic of</option>
                    <option value='Kuwait'>Kuwait</option>
                    <option value='Kyrgyzstan'>Kyrgyzstan</option>
                    <option value='Lao'>
                      Lao People&apos;s Democratic Republic
                    </option>
                    <option value='Latvia'>Latvia</option>
                    <option value='Lebanon'>Lebanon</option>
                    <option value='Lesotho'>Lesotho</option>
                    <option value='Liberia'>Liberia</option>
                    <option value='Libyan Arab Jamahiriya'>
                      Libyan Arab Jamahiriya
                    </option>
                    <option value='Liechtenstein'>Liechtenstein</option>
                    <option value='Lithuania'>Lithuania</option>
                    <option value='Luxembourg'>Luxembourg</option>
                    <option value='Macau'>Macau</option>
                    <option value='Macedonia'>
                      Macedonia, The Former Yugoslav Republic of
                    </option>
                    <option value='Madagascar'>Madagascar</option>
                    <option value='Malawi'>Malawi</option>
                    <option value='Malaysia'>Malaysia</option>
                    <option value='Maldives'>Maldives</option>
                    <option value='Mali'>Mali</option>
                    <option value='Malta'>Malta</option>
                    <option value='Marshall Islands'>Marshall Islands</option>
                    <option value='Martinique'>Martinique</option>
                    <option value='Mauritania'>Mauritania</option>
                    <option value='Mauritius'>Mauritius</option>
                    <option value='Mayotte'>Mayotte</option>
                    <option value='Mexico'>Mexico</option>
                    <option value='Micronesia'>
                      Micronesia, Federated States of
                    </option>
                    <option value='Moldova'>Moldova, Republic of</option>
                    <option value='Monaco'>Monaco</option>
                    <option value='Mongolia'>Mongolia</option>
                    <option value='Montserrat'>Montserrat</option>
                    <option value='Morocco'>Morocco</option>
                    <option value='Mozambique'>Mozambique</option>
                    <option value='Myanmar'>Myanmar</option>
                    <option value='Namibia'>Namibia</option>
                    <option value='Nauru'>Nauru</option>
                    <option value='Nepal'>Nepal</option>
                    <option value='Netherlands'>Netherlands</option>
                    <option value='Netherlands Antilles'>
                      Netherlands Antilles
                    </option>
                    <option value='New Caledonia'>New Caledonia</option>
                    <option value='New Zealand'>New Zealand</option>
                    <option value='Nicaragua'>Nicaragua</option>
                    <option value='Niger'>Niger</option>
                    <option value='Nigeria'>Nigeria</option>
                    <option value='Niue'>Niue</option>
                    <option value='Norfolk Island'>Norfolk Island</option>
                    <option value='Northern Mariana Islands'>
                      Northern Mariana Islands
                    </option>
                    <option value='Norway'>Norway</option>
                    <option value='Oman'>Oman</option>
                    <option value='Pakistan'>Pakistan</option>
                    <option value='Palau'>Palau</option>
                    <option value='Panama'>Panama</option>
                    <option value='Papua New Guinea'>Papua New Guinea</option>
                    <option value='Paraguay'>Paraguay</option>
                    <option value='Peru'>Peru</option>
                    <option value='Philippines'>Philippines</option>
                    <option value='Pitcairn'>Pitcairn</option>
                    <option value='Poland'>Poland</option>
                    <option value='Portugal'>Portugal</option>
                    <option value='Puerto Rico'>Puerto Rico</option>
                    <option value='Qatar'>Qatar</option>
                    <option value='Reunion'>Reunion</option>
                    <option value='Romania'>Romania</option>
                    <option value='Russia'>Russian Federation</option>
                    <option value='Rwanda'>Rwanda</option>
                    <option value='Saint Kitts and Nevis'>
                      Saint Kitts and Nevis
                    </option>
                    <option value='Saint Lucia'>Saint LUCIA</option>
                    <option value='Saint Vincent'>
                      Saint Vincent and the Grenadines
                    </option>
                    <option value='Samoa'>Samoa</option>
                    <option value='San Marino'>San Marino</option>
                    <option value='Sao Tome and Principe'>
                      Sao Tome and Principe
                    </option>
                    <option value='Saudi Arabia'>Saudi Arabia</option>
                    <option value='Senegal'>Senegal</option>
                    <option value='Seychelles'>Seychelles</option>
                    <option value='Sierra'>Sierra Leone</option>
                    <option value='Singapore'>Singapore</option>
                    <option value='Slovakia'>Slovakia (Slovak Republic)</option>
                    <option value='Slovenia'>Slovenia</option>
                    <option value='Solomon Islands'>Solomon Islands</option>
                    <option value='Somalia'>Somalia</option>
                    <option value='South Africa'>South Africa</option>
                    <option value='South Georgia'>
                      South Georgia and the South Sandwich Islands
                    </option>
                    <option value='Span'>Spain</option>
                    <option value='Sri Lanka'>Sri Lanka</option>
                    <option value='St. Helena'>St. Helena</option>
                    <option value='St. Pierre and Miguelon'>
                      St. Pierre and Miquelon
                    </option>
                    <option value='Sudan'>Sudan</option>
                    <option value='Suriname'>Suriname</option>
                    <option value='Svalbard'>
                      Svalbard and Jan Mayen Islands
                    </option>
                    <option value='Swaziland'>Swaziland</option>
                    <option value='Sweden'>Sweden</option>
                    <option value='Switzerland'>Switzerland</option>
                    <option value='Syria'>Syrian Arab Republic</option>
                    <option value='Taiwan'>Taiwan, Province of China</option>
                    <option value='Tajikistan'>Tajikistan</option>
                    <option value='Tanzania'>
                      Tanzania, United Republic of
                    </option>
                    <option value='Thailand'>Thailand</option>
                    <option value='Togo'>Togo</option>
                    <option value='Tokelau'>Tokelau</option>
                    <option value='Tonga'>Tonga</option>
                    <option value='Trinidad and Tobago'>
                      Trinidad and Tobago
                    </option>
                    <option value='Tunisia'>Tunisia</option>
                    <option value='Turkey'>Turkey</option>
                    <option value='Turkmenistan'>Turkmenistan</option>
                    <option value='Turks and Caicos'>
                      Turks and Caicos Islands
                    </option>
                    <option value='Tuvalu'>Tuvalu</option>
                    <option value='Uganda'>Uganda</option>
                    <option value='Ukraine'>Ukraine</option>
                    <option value='United Arab Emirates'>
                      United Arab Emirates
                    </option>
                    <option value='United Kingdom'>United Kingdom</option>
                    <option value='United States Minor Outlying Islands'>
                      United States Minor Outlying Islands
                    </option>
                    <option value='Uruguay'>Uruguay</option>
                    <option value='Uzbekistan'>Uzbekistan</option>
                    <option value='Vanuatu'>Vanuatu</option>
                    <option value='Venezuela'>Venezuela</option>
                    <option value='Vietnam'>Viet Nam</option>
                    <option value='Virgin Islands (British)'>
                      Virgin Islands (British)
                    </option>
                    <option value='Virgin Islands (U.S)'>
                      Virgin Islands (U.S.)
                    </option>
                    <option value='Wallis and Futana Islands'>
                      Wallis and Futuna Islands
                    </option>
                    <option value='Western Sahara'>Western Sahara</option>
                    <option value='Yemen'>Yemen</option>
                    <option value='Serbia'>Serbia</option>
                    <option value='Zambia'>Zambia</option>
                    <option value='Zimbabwe'>Zimbabwe</option>
                  </select>
                  {errors.Nationality?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.Nationality.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Enrollment no '
                  className=' text-sm font-medium leading-6 text-gray-900'
                >
                  Caste :
                </label>
                <div className='mt-2'>
                  <select
                    id='Caste'
                    {...register('Caste')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  >
                    <option value=''>Select</option>
                    <option value='satriya'>Satriya</option>
                    <option value='vaishya'>Vaishya</option>
                    <option value='padhama shayli'>Padhama Shayli</option>
                    <option value='brahmans'>Brahmans</option>
                    <option value='siya'>Siya</option>
                    <option value='suniya'>Suniya</option>
                  </select>
                  {errors.Caste?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.Caste.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Home Address'
                  className=' text-sm font-medium leading-6 text-gray-900'
                >
                  Home Address :
                </label>
                <div className='mt-2'>
                  <textarea
                    {...register('HomeAddress')}
                    className='block h-[80px] w-full resize-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.HomeAddress?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.HomeAddress.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='City'
                  className=' text-sm font-medium leading-6 text-gray-900'
                >
                  City :
                </label>
                <div className='mt-2'>
                  <input
                    {...register('City')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.City?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.City.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='District'
                  className=' text-sm font-medium leading-6 text-gray-900'
                >
                  District :
                </label>
                <div className='mt-2'>
                  <input
                    {...register('District')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.District?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.District.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='Enrollment no '
                  className='flex items-center gap-1 text-sm font-medium leading-6 text-gray-900'
                >
                  Enrollment no <p className='text-red-600'>*</p> :
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='Enrollment no '
                    {...register('Enrollmentno')}
                    autoComplete='given-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  <p className='text-red-600'>
                    Note: This Students Enrollment Number Will Be The Students
                    Id Username
                  </p>
                  {errors.Enrollmentno?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.Enrollmentno.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='StudentPassword'
                  className='flex items-center gap-1 text-sm font-medium leading-6 text-gray-900'
                >
                  Password<p className='text-red-600'>*</p> :
                </label>
                <div className='mt-2'>
                  <div className='relative'>
                    <input
                      type={`${showpassStu ? 'text' : 'password'}`}
                      id='Student Password'
                      {...register('StudentPassword')}
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    />
                    {showpassStu ? (
                      <button
                        type='button'
                        onClick={handleShowPassStu}
                        className='absolute inset-y-2 right-2'
                      >
                        <FaEye />
                      </button>
                    ) : (
                      <button
                        type='button'
                        onClick={handleShowPassStu}
                        className='absolute inset-y-2 right-2'
                      >
                        <FaEyeSlash />
                      </button>
                    )}
                  </div>
                  {errors.StudentPassword?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.StudentPassword.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='FullName'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Full Name
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='FullName'
                    {...register('FullName')}
                    autoComplete='given-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.FullName?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.FullName.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='ParentPassword'
                  className='flex items-center gap-1 text-sm font-medium leading-6 text-gray-900'
                >
                  Parent Password<p className='text-red-600'>*</p> :
                </label>
                <div className='mt-2'>
                  <div className='relative'>
                    <input
                      type={`${showpassPare ? 'text' : 'password'}`}
                      id='ParentPassword'
                      {...register('ParentPassword')}
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    />
                    {showpassPare ? (
                      <button
                        type='button'
                        onClick={handleShowPassPare}
                        className='absolute inset-y-2 right-2'
                      >
                        <FaEye />
                      </button>
                    ) : (
                      <button
                        type='button'
                        onClick={handleShowPassPare}
                        className='absolute inset-y-2 right-2'
                      >
                        <FaEyeSlash />
                      </button>
                    )}
                  </div>
                  {errors.ParentPassword?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.ParentPassword.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Aadharnumber'
                  className='flex items-center gap-1 text-sm font-medium leading-6 text-gray-900'
                >
                  Aadhar No<p className='text-red-600'>*</p>:
                </label>
                <div className='mt-2'>
                  <input
                    id='Aadhar No'
                    type='text'
                    {...register('AadharNo')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.AadharNo?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.AadharNo.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Previous Class'
                  className='text-sm font-medium leading-6 text-gray-900'
                >
                  Previous Class :
                </label>
                <div className='mt-2'>
                  <input
                    id='Previous Class'
                    type='text'
                    {...register('PreviousClass')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.PreviousClass?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.PreviousClass.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Previous General Register Number '
                  className='text-sm font-medium leading-6 text-gray-900'
                >
                  Previous General Register Number :
                </label>
                <div className='mt-2'>
                  <input
                    id='Previous General Register Number '
                    type='text'
                    {...register('PreviousGeneralRegisterNumber')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.PreviousGeneralRegisterNumber?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.PreviousGeneralRegisterNumber.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Student Admission Type'
                  className='flex items-center gap-1 text-sm font-medium leading-6 text-gray-900'
                >
                  Student Admission Type<p className='text-red-600'>*</p>:
                </label>
                <div className='mt-2'>
                  <select
                    id='Student Admission Type'
                    {...register('StudentAdmissionType')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    defaultValue={'new'}
                  >
                    <option value=''>Select Student Admission Type</option>
                    <option value='new'>New Admission</option>
                    <option value='old'>old Admission</option>
                  </select>
                  {errors.StudentAdmissionType?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.StudentAdmissionType.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Date Of Birth'
                  className='text-sm font-medium leading-6 text-gray-900'
                >
                  Date Of Birth :
                </label>
                <div className='mt-2'>
                  <input
                    id='Date Of Birth'
                    type='date'
                    {...register('DateOfBirth')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.DateOfBirth?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.DateOfBirth.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Blood Group'
                  className='text-sm font-medium leading-6 text-gray-900'
                >
                  Blood Group :
                </label>
                <div className='mt-2'>
                  <select
                    id='Blood Group'
                    {...register('BloodGroup')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  >
                    <option value=''>Select</option>
                    <option value='A +'>A +</option>
                    <option value='A -'>A -</option>
                    <option value='B +'>B +</option>
                    <option value='B -'>B -</option>
                    <option value='O +'>O +</option>
                    <option value='O -'>O -</option>
                    <option value='AB +'>AB +</option>
                    <option value='AB -'>AB -</option>
                  </select>
                  {errors.BloodGroup?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.BloodGroup.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Religion'
                  className='text-sm font-medium leading-6 text-gray-900'
                >
                  Religion :
                </label>
                <div className='mt-2'>
                  <select
                    id='Religion'
                    {...register('Religion')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  >
                    <option value=''>Select</option>
                    <option value='hindu'>Hindu</option>
                    <option value='muslim'>Muslim</option>
                    <option value='sikh'>Sikh</option>
                    <option value='chrishtan'>Chrishtan</option>
                  </select>
                  {errors.Religion?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.Religion.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='OldAdmissionDate'
                  className='text-sm font-medium leading-6 text-gray-900'
                >
                  Old Admission Date :
                </label>
                <div className='mt-2'>
                  <input
                    id='OldAdmissionDate'
                    type='date'
                    {...register('OldAdmissionDate')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.Religion?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.Religion.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Emergency Contact Name'
                  className='text-sm font-medium leading-6 text-gray-900'
                >
                  Emergency Contact Name :
                </label>
                <div className='mt-2'>
                  <input
                    id='Emergency Contact Name'
                    type='text'
                    {...register('EmergencyContactName')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.EmergencyContactName?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.EmergencyContactName.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Emergency Contact No 1'
                  className='text-sm font-medium leading-6 text-gray-900'
                >
                  Emergency Contact No 1 :
                </label>
                <div className='mt-2'>
                  <input
                    id='Emergency Contact No 1'
                    type='number'
                    {...register('EmergencyContactNo1')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.EmergencyContactNo1?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.EmergencyContactNo1.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Emergency Contact No 2'
                  className='text-sm font-medium leading-6 text-gray-900'
                >
                  Emergency Contact No 2 :
                </label>
                <div className='mt-2'>
                  <input
                    id='Emergency Contact No 2'
                    type='number'
                    {...register('EmergencyContactNo2')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.EmergencyContactNo2?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.EmergencyContactNo2.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='State'
                  className='text-sm font-medium leading-6 text-gray-900'
                >
                  State :
                </label>
                <div className='mt-2'>
                  <input
                    id='State'
                    type='text'
                    {...register('State')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.State?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.State.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='pincode'
                  className='text-sm font-medium leading-6 text-gray-900'
                >
                  pincode :
                </label>
                <div className='mt-2'>
                  <input
                    id='pincode'
                    type='number'
                    {...register('pincode')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.pincode?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.pincode.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <h1 className='mt-10'>CORRESPONDENCE ADDRESS</h1>
            <div className='mt-5 flex items-center gap-1'>
              <h1>Same As Above :</h1>
              <div>
                <input
                  type='checkbox'
                  checked={sameAsAbove}
                  onChange={handleaddress}
                />
              </div>
            </div>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-sapn-3'>
                <label
                  htmlFor='ParmentHomeAddress'
                  className=' text-sm font-medium leading-6 text-gray-900'
                >
                  Home Address :
                </label>
                <div className='mt-2'>
                  <textarea
                    {...register('ParmentHomeAddress')}
                    className='block h-[80px] w-full resize-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.ParmentHomeAddress?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.ParmentHomeAddress.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='ParmentCity'
                  className=' text-sm font-medium leading-6 text-gray-900'
                >
                  City :
                </label>
                <div className='mt-2'>
                  <input
                    {...register('ParmentCity')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.ParmentCity?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.ParmentCity.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='ParmentDistrict'
                  className=' text-sm font-medium leading-6 text-gray-900'
                >
                  District :
                </label>
                <div className='mt-2'>
                  <input
                    {...register('ParmentDistrict')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.ParmentDistrict?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.ParmentDistrict.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='ParmentState'
                  className='text-sm font-medium leading-6 text-gray-900'
                >
                  State :
                </label>
                <div className='mt-2'>
                  <input
                    id='ParmentState'
                    type='text'
                    {...register('ParmentState')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.ParmentState?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.ParmentState.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Parmentpincode'
                  className='text-sm font-medium leading-6 text-gray-900'
                >
                  pincode :
                </label>
                <div className='mt-2'>
                  <input
                    id='Parmentpincode'
                    type='number'
                    {...register('Parmentpincode')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.Parmentpincode?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.Parmentpincode.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Address
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Address where you can receive mail.
            </p>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='Father Name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Name
                </label>
                <div className='mt-2'>
                  <input
                    id='FatherName'
                    type='text'
                    {...register('FatherName')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.FatherName?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.FatherName.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='FatherImage'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Father Image
                </label>
                <div className='mt-2'>
                  <div className='h-[150px] w-[150px] overflow-hidden border-[1px] border-[#cdcdc0d] bg-[#cdcdcd]'>
                    {FpreviewUrl && (
                      <Image
                        src={FpreviewUrl}
                        alt='Father Photo'
                        width={150}
                        height={150}
                        className=' bg-cover'
                      />
                    )}
                  </div>
                  {FfileError && (
                    <p className='mt-2 text-red-500'>{FfileError}</p>
                  )}
                  <div className='relative'>
                    <input
                      type='file'
                      className='hidden'
                      id='FatherimageInput'
                      {...register('FatherImage')}
                      onChange={FhandleFileChange}
                    />
                    <label
                      htmlFor='FatherimageInput'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    >
                      {FselectedFile ? FselectedFile.name : 'Choose file'}
                    </label>
                  </div>
                  <p className='text-red-600'>
                    only JPEG,JPG,PNG files allowed of size of 5MB
                  </p>
                  {errors.FatherImage?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.FatherImage?.message?.toString()}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Father Contact Number'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Father Contact Number :
                </label>
                <div className='mt-2'>
                  <input
                    type='number'
                    id='Father Contact Number'
                    {...register('FatherContactNumber')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    placeholder='+91'
                  />
                  {errors.FatherContactNumber?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.FatherContactNumber.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Father Contact Number1'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Father Contact Number1 :
                </label>
                <div className='mt-2'>
                  <input
                    type='number'
                    id='Father Contact Number1'
                    {...register('FatherContactNumber1')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    placeholder='+91'
                  />
                  {errors.FatherContactNumber1?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.FatherContactNumber1.message}
                    </p>
                  )}
                </div>

                <label
                  htmlFor='Father Aadhaar Number'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Father Aadhaar Number :
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='Father Aadhaar Number'
                    {...register('FatherAadhaarNumber')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.FatherAadhaarNumber?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.FatherAadhaarNumber.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Father Email Id'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Father Email Id :
                </label>
                <div className='mt-2'>
                  <input
                    type='email'
                    id='Father Email Id'
                    {...register('FatherEmailId')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.FatherEmailId?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.FatherEmailId.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='FEducation'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Education :
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='FEducation'
                    {...register('FEducation')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.FEducation?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.FEducation.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='FOccupation'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Occupation :
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='FOccupation'
                    {...register('FOccupation')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.FOccupation?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.FOccupation.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='FAnnual Income'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Annual Income. :
                </label>
                <div className='mt-2'>
                  <input
                    type='number'
                    id='FAnnual Income'
                    {...register('FAnnualIncome')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.FAnnualIncome?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.FAnnualIncome.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Designation'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Designation :
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='FDesignation'
                    {...register('FDesignation')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.FDesignation?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.FDesignation.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='Mother Name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Name
                </label>
                <div className='mt-2'>
                  <input
                    id='MotherName'
                    type='text'
                    {...register('MotherName')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.MotherName?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.MotherName.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='MotherImage'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Mother Image
                </label>
                <div className='mt-2'>
                  <div className='h-[150px] w-[150px] overflow-hidden border-[1px] border-[#cdcdc0d] bg-[#cdcdcd]'>
                    {MpreviewUrl && (
                      <Image
                        src={MpreviewUrl}
                        alt='Mother Photo'
                        width={150}
                        height={150}
                        className=' bg-cover'
                      />
                    )}
                  </div>
                  {MfileError && (
                    <p className='mt-2 text-red-500'>{MfileError}</p>
                  )}
                  <div className='relative'>
                    <input
                      type='file'
                      className='hidden'
                      id='MotherimageInput'
                      {...register('MotherImage')}
                      onChange={MhandleFileChange}
                    />
                    <label
                      htmlFor='MotherimageInput'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    >
                      {MselectedFile ? MselectedFile.name : 'Choose file'}
                    </label>
                  </div>
                  <p className='text-red-600'>
                    only JPEG,JPG,PNG files allowed of size of 5MB
                  </p>
                  {errors.MotherImage?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.MotherImage?.message?.toString()}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Mother Contact Number'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Mother Contact Number :
                </label>
                <div className='mt-2'>
                  <input
                    type='number'
                    id='Mother Contact Number'
                    {...register('MotherContactNumber')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    placeholder='+91'
                  />
                  {errors.MotherContactNumber?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.MotherContactNumber.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Mother Contact Number1'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Mother Contact Number1 :
                </label>
                <div className='mt-2'>
                  <input
                    type='number'
                    id='Mother Contact Number1'
                    {...register('MotherContactNumber1')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    placeholder='+91'
                  />
                  {errors.MotherContactNumber1?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.MotherContactNumber1.message}
                    </p>
                  )}
                </div>

                <label
                  htmlFor='Mother Aadhaar Number'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Mother Aadhaar Number :
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='Mother Aadhaar Number'
                    {...register('MotherAadhaarNumber')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.MotherAadhaarNumber?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.MotherAadhaarNumber.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='Mother Email Id'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Mother Email Id :
                </label>
                <div className='mt-2'>
                  <input
                    type='email'
                    id='Mother Email Id'
                    {...register('MotherEmailId')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.MotherEmailId?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.MotherEmailId.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='MEducation'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Education :
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='MEducation'
                    {...register('MEducation')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.MEducation?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.MEducation.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='MOccupation'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Occupation :
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='MOccupation'
                    {...register('MOccupation')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.MOccupation?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.MOccupation.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='MAnnual Income'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Annual Income. :
                </label>
                <div className='mt-2'>
                  <input
                    type='number'
                    id='MAnnual Income'
                    {...register('MAnnualIncome')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.MAnnualIncome?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.MAnnualIncome.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='MDesignation'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Designation :
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='MDesignation'
                    {...register('MDesignation')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.MDesignation?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.MDesignation.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor=' PreviousMediumOfInstruction'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Previous Medium Of Instruction :
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='PreviousMediumOfInstruction'
                    {...register('PreviousMediumOfInstruction')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.PreviousMediumOfInstruction?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.PreviousMediumOfInstruction.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='PreviousSchoolName'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Previous School Name:
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='PreviousSchoolName'
                    {...register('PreviousSchoolName')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.PreviousSchoolName?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.PreviousSchoolName.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='AcadamicYear'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Acadamic Year <p>*</p>:
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='AcadamicYear'
                    {...register('AcadamicYear')}
                    value='August 2022 to July  2023'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.AcadamicYear?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.AcadamicYear.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='MotherTongue'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Mother Tongue:
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='MotherTongue'
                    {...register('MotherTongue')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.MotherTongue?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.MotherTongue.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='AffiliatedBoard'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Affiliated Board :
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='AffiliatedBoard'
                    {...register('AffiliatedBoard')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.AffiliatedBoard?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.AffiliatedBoard.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='sm:col-sapn-6 mt-20'>
                <h1>VEHICLE INFO</h1>
                <div className='mt-10 space-y-4 sm:col-span-3'>
                  <div className='flex items-center gap-1'>
                    <label
                      htmlFor='Vehicle Allocation'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Vehicle Allocation:
                    </label>
                    <div>
                      <input
                        type='checkbox'
                        id='VehicleAllocation'
                        {...register('VehicleAllocation')}
                      />
                      {errors.VehicleAllocation?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.VehicleAllocation.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='flex items-center gap-1'>
                    <label
                      htmlFor='Document Verification Confirmed'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Document Verification Confirmed:
                    </label>
                    <div>
                      <input
                        type='checkbox'
                        id='DocumentVerificationConfirmed'
                        {...register('DocumentVerificationConfirmed')}
                      />
                      {errors.DocumentVerificationConfirmed?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.DocumentVerificationConfirmed.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='flex items-center gap-1'>
                    <label
                      htmlFor='Student App Login Access'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Student App Login Access:
                    </label>
                    <div>
                      <input
                        type='checkbox'
                        id='StudentAppLoginAccess'
                        {...register('StudentAppLoginAccess')}
                      />
                      {errors.StudentAppLoginAccess?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.StudentAppLoginAccess.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='flex items-center gap-1'>
                    <label
                      htmlFor='Parent App Login Access'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Parent App Login Access:
                    </label>
                    <div>
                      <input
                        type='checkbox'
                        id='ParentAppLoginAccess'
                        {...register('ParentAppLoginAccess')}
                      />
                      {errors.ParentAppLoginAccess?.message && (
                        <p className='mt-2 text-sm text-red-400'>
                          {errors.ParentAppLoginAccess.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {currentStep === 3 && (
          <>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='PreviousSchoolName'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Certificate Name *:
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='CertificateName'
                    {...register('CertificateName')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.CertificateName?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.CertificateName.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='serial number'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  serial number :
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='serial number'
                    {...register('serialnumber')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.serialnumber?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.serialnumber.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='Issue Date'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Issue Date :
                </label>
                <div className='mt-2'>
                  <input
                    type='date'
                    id='IssueDate'
                    {...register('IssueDate')}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.IssueDate?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.IssueDate.message}
                    </p>
                  )}
                </div>
                <label
                  htmlFor='CertificateFile'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Upload :
                </label>
                <div className='mt-2'>
                  <div className='relative'>
                    <input
                      type='file'
                      className='hidden'
                      {...register('CertificateFile')}
                      id='CertificateFileInput'
                      onChange={CertifiFilehandleFileChange}
                    />
                    <label
                      htmlFor='CertificateFileInput'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                    >
                      {CertselectedFile ? CertselectedFile.name : 'Choose file'}
                    </label>
                  </div>
                  <p className='text-red-600'>
                    only JPEG,JPG,PNG files allowed of size of 10MB
                  </p>
                  <p className='mt-2 text-red-500'>{CertfileError}</p>
                  {errors.CertificateFile?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.CertificateFile?.message?.toString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {currentStep === 4 && (
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
