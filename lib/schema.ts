import { number, z } from 'zod'
const MAX_FILE_SIZE = 5*1024*1024
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
]
const ACCEPTED_FILE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'application/pdf',
    'application/msword',
]
enum Gender {
  Male = "male",
  Female = "female"
}
export const FormDataSchema = z.object({
  FullName: z.string().min(1, 'First name is required'),
  RollNumber: z.string().optional(),
  StudentNameAsPerAadhaar: z.string().min(1, 'First name is required'),
  StudentImage: z.any().optional()
  .refine(file => file?.length == 1 ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type) ? true : false : true, 'Invalid file. choose either JPEG ,jpg , webp PNG image')
  .refine(file => file?.length == 1 ? file[0]?.size <= MAX_FILE_SIZE ? true : false : true, 'Max file size allowed is 5MB.'),
  AadharNo:z.string().min(1,{message:"Aadhar No is Required"}).refine(values=>{
if(values){
const digits=/^\d+$/.test(values)
if(digits){
  return digits
}
return false
}
return false
  },{
message:" number must be exactly in digits"
  }).transform(Number)
  .refine(n=>n>= 100000000000 && n <=999999999999,{
message:"Aadhar Number must be exactly 12 digits"
  }),
  ContactNumber:z.string().min(1,{message:"Phone Number is required"}).transform(Number).refine(n=>
  n>=1000000000 && n <=9999999999,{
    message:"Phone Number must in 10 digits"
  }
  ),
  EmailID:z.union([
    z.string().email("Invalid email format"),
    z.string().length(0)
  ]).optional(),
  ParentId: z.string().min(3, 'Parent Id is required'),
  Enrollmentno: z.string().min(3, 'Enrollmentno is required'),
  PreviousClass: z.string().optional(),
  BirthPlace :z.string().optional(),
  Gender:z.enum([Gender.Male, Gender.Female]),
  Nationality:z.string().min(1,"Required"),
  PreviousGeneralRegisterNumber: z.string().optional(),
  Caste: z.string().optional(),
  AdmissionDate: z.string().min(1, { message: 'Admission Date is Required' }),
  Class: z.string().min(1, 'Class is required'),
  StudentAdmissionType: z.string().min(1, 'StudentAdmissionType is required'),
  StudentPassword: z.string().min(6, 'Password is required min 6 characters'),
  ParentPassword: z.string().min(6, 'Password is required min 6 characters'),
  DateOfBirth: z.string().min(1, 'Date of birth is Required'),
  BloodGroup: z.string().optional(),
  Religion: z.string().optional(),
  OldAdmissionDate: z.string().optional(),
  EmergencyContactName: z.string().optional(),
  EmergencyContactNo1:z.string().optional().refine(n=>{
    if(n?.length===1){
      return false
    }
    return true
  },{
    message:"Phone number is required"
  }).transform(Number).refine(n=>{
    if(n>1){
      if(n>=1000000000 && n <=9999999999){
        return true
      }
      return false
    }
    return true
    
  },  {
    message:"Phone Number must in 10 digits"
  }
),
EmergencyContactNo2:z.string().optional().refine(n=>{
  if(n?.length===1){
    return false
  }
  return true
},{
  message:"Phone number is required"
}).transform(Number).refine(n=>{
  if(n>1){
    if(n>=1000000000 && n <=9999999999){
        return true
      }
      return false
    }
    return true
    
  },  {
    message:"Phone Number must in 10 digits"
  }
),
HomeAddress: z.string().min(6, { message: "HomeAddress is required mention House no and place min 6 characters minimum 6 characters" }),
District: z.string().min(3, 'District is required'),
City: z.string().min(3, 'City is required'),
    State: z.string().min(3, 'State is required'),
    pincode: z.string().min(1, 'pincode is required').transform(Number).refine(n=>
      n>=100000 && n<=999999,{
        message:"Pincode must be in 6 digits"
      }
),
ParmentHomeAddress: z.string().min(6, { message: "ParmentHomeAddress is required mention House no and place min 6 characters minimum 6 characters" }),
ParmentDistrict: z.string().min(3, 'ParmentDistrict is required'),
ParmentCity: z.string().min(3, 'ParmentCity is required'),
    ParmentState: z.string().min(3, 'ParmentState is required'),
    Parmentpincode: z.string().min(1, 'Parmentpincode is required').transform(Number).refine(n=>
      n>=100000 && n<=999999,{
        message:"Parmentpincode must be in 6 digits"
      }
),
FatherName: z.string().min(3, 'FatherName is required'),
FatherImage:z.any().optional()
.refine(file => file?.length == 1 ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type) ? true : false : true, 'Invalid file. choose either JPEG ,jpg , webp PNG image')
.refine(file => file?.length == 1 ? file[0]?.size <= MAX_FILE_SIZE ? true : false : true, 'Max file size allowed is 5MB.'),
FatherContactNumber:z.string().min(1,'Phone number is required').transform(Number).refine(n=>n>=1000000000 && n<=9999999999,'Number must must be 10 digits'),
FatherContactNumber1:z.string().optional().refine(n=>{
  if(n?.length===1){
    return false
  }
  return true
},{
  message:"Phone number is required"
}).transform(Number).refine(n=>{
  if(n>1){
    if(n>=1000000000 && n <=9999999999){
        return true
      }
      return false
    }
    return true
    
  },  {
    message:"Phone Number must in 10 digits"
  }
),
FatherAadhaarNumber:z.string().optional().refine(value=>{
  if(value?.length===1)
{
  return false
}
return true
},'Aadhar number is required').refine(values=>{

    if(values){
      const length=values.length
      if(length>1){
        const digits=/^\d+$/.test(values)
        if(digits){
          return true
        }
        return false
      }
      
      return true
    }
    return true
    },{
  message:" number must be exactly in digits"
    }).transform(Number)
    .refine((n)=>{
      if(n>1){
        if( n>= 100000000000 && n <=999999999999){
            return true
          }
          return false
        }
        return true
    }
,{
  message:"Aadhar Number must be exactly 12 digits"
    }),
FatherEmailId:z.union([
  z.string().email("Invalid email format"),
  z.string().length(0)
]).optional(),
FEducation: z.string().optional(),
FOccupation: z.string().optional(),
FAnnualIncome:z.union([
  z.string().refine(values=>{
   if(values.length>1){
    return false
   }
  return true
  },{message:"Number is required"}),
  z.string().length(0),
]).optional(),
FDesignation: z.string().optional(),
MotherName: z.string().min(3, 'MotherName is required'),
MotherImage:z.any().optional()
.refine(file => file?.length == 1 ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type) ? true : false : true, 'Invalid file. choose either JPEG ,jpg , webp PNG image')
.refine(file => file?.length == 1 ? file[0]?.size <= MAX_FILE_SIZE ? true : false : true, 'Max file size allowed is 5MB.'),
MotherContactNumber:z.string().min(1,'Phone number is required').transform(Number).refine(n=>n>=1000000000 && n<=9999999999,'Number must must be 10 digits'),
MotherContactNumber1:z.string().optional().refine(n=>{
  if(n?.length===1){
    return false
  }
  return true
},{
  message:"Phone number is required"
}).transform(Number).refine(n=>{
  if(n>1){
    if(n>=1000000000 && n <=9999999999){
        return true
      }
      return false
    }
    return true
    
  },  {
    message:"Phone Number must in 10 digits"
  }
),
MotherAadhaarNumber:z.string().optional().refine(value=>{
  if(value?.length===1)
{
  return false
}
return true
},'Aadhar number is required').refine(values=>{

    if(values){
      const length=values.length
      if(length>1){
        const digits=/^\d+$/.test(values)
        if(digits){
          return true
        }
        return false
      }
      
      return true
    }
    return true
    },{
  message:" number must be exactly in digits"
    }).transform(Number)
    .refine((n)=>{
      if(n>1){
        if( n>= 100000000000 && n <=999999999999){
            return true
          }
          return false
        }
        return true
    }
,{
  message:"Aadhar Number must be exactly 12 digits"
    })
,
MotherEmailId:z.union([
  z.string().email("Invalid email format"),
  z.string().length(0)
]).optional(),
MEducation: z.string().optional(),
MOccupation: z.string().optional(),
MAnnualIncome:z.union([
  z.string().refine(values=>{
   if(values.length>1){
    return false
   }
  return true
  },{message:"Number is required"}),
  z.string().length(0),
]).optional(),
MDesignation: z.string().optional(),
PreviousMediumOfInstruction: z.string().optional(),
MotherTongue: z.string().optional(),
PreviousSchoolName: z.string().optional(),
AffiliatedBoard: z.string().optional(),
AcadamicYear: z.string().optional(),
VehicleAllocation: z.boolean().optional(),
DocumentVerificationConfirmed: z.boolean().optional(),
StudentAppLoginAccess: z.boolean().optional(),
ParentAppLoginAccess: z.boolean().optional(),
IssueDate:z.string().optional(),
serialnumber:z.string().optional(),
CertificateName: z.string().optional().refine(value=>
  !value || value.length >= 3
,"Certificate Name is 3 characters required"
),
CertificateFile: z.any().optional()
.refine(file => file?.length == 1 ? ACCEPTED_FILE_TYPES.includes(file?.[0]?.type) ? true : false : true, 'Invalid file. choose either JPEG ,jpg , webp PNG image')
.refine(file => file?.length == 1 ? file[0]?.size <= MAX_FILE_SIZE ? true : false : true, 'Max file size allowed is 5MB.'),
})
    