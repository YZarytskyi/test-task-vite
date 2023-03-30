import * as yup from 'yup'

export const schema = yup.object({
  name: yup
    .string()
    .required('This field is required')
    .min(2, 'Name should be at least 2 characters')
    .max(60, 'Name should not exceed 60 characters'),
  email: yup
    .string()
    .required('This field is required')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address'),
  phone: yup
    .string()
    .required('This field is required')
    .matches(/^\+380\d{9}$/, 'Phone number should start with +380 and have 12 digits in total'),
  photo: yup
    .mixed<FileList>()
    .required('This field is required')
    .test('required', 'You need to provide a file', (file) => {
      if (file?.length) return true
      return false
    })
    .test(
      'fileSize',
      'Image should be at least 70x70px and must not exceed 5MB',
      (files) =>
        !files ||
        files.length === 0 ||
        Array.from(files).every(async (file) => {
          const image = new Image()
          const src = await new Promise<string>((resolve) => {
            const reader = new FileReader()
            reader.onload = (event) => {
              resolve(event.target!.result as string)
            }
            reader.readAsDataURL(file)
          })
          image.src = src
          await new Promise((resolve) => {
            image.onload = resolve
          })
          return image.width >= 70 && image.height >= 70 && file.size <= 5000000
        }),
    ),
})
