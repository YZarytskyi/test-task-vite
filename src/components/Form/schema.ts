import * as yup from 'yup'

export const schema = yup.object({
  name: yup.string().required('This field is required'),
  email: yup.string().required('This field is required').email('Invalid email'),
  phone: yup.string().required('This field is required'),
  photo: yup
    .mixed<FileList>()
    .test('required', 'You need to provide a file', (file) => {
      console.log('file', file)
      if (file?.length) return true
      return false
    })
    .test(
      'fileSize',
      'Only documents up to 2MB are permitted.',
      (files) =>
        !files ||
        files.length === 0 ||
        Array.from(files).every((file) => file.size <= 5_000_000),
    ),
})
