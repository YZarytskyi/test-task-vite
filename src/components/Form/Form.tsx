import { ChangeEventHandler, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'
import { IFormInputs, IPosition } from '../../types'
import { formSubmit, getPositions } from '../../api/api'
import success from '../../assets/success.png'
import s from './Form.module.scss'
import { Loader } from '../Loader/Loader'

interface FormProps {
  isRegisterSuccess: boolean
  setIsRegisterSuccess: Dispatch<SetStateAction<boolean>>
}

const INPUT_FILE_PLACEHOLDER = 'Upload your photo'

export const Form: FC<FormProps> = ({ isRegisterSuccess, setIsRegisterSuccess }) => {
  const [fileName, setFileName] = useState<string | null>(null)
  const [positions, setPositions] = useState<IPosition[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const data = await getPositions()
        setPositions(data.positions)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPositions()
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, errors },
  } = useForm<IFormInputs>({ resolver: yupResolver(schema), mode: 'onChange' })

  const onSubmit = async (data: IFormInputs) => {
    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('photo', data.photo[0])
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })
      await formSubmit(formData)
      setIsRegisterSuccess(true)
      reset()
      setFileName(null)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onUploadFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files
    if (!files || !files.length) {
      setFileName(null)
      return
    }
    setFileName(files[0].name)
    setTimeout(() => {
      e.target.blur()
    }, 10)
  }

  const fileNameFormatted =
    fileName && fileName.length > 30 ? fileName.slice(0, 30) + '...' : fileName

  return (
    <section id='signUp' className={s.formSection}>
      <div className={`container ${s.container}`}>
        <h2 className='subTitle'>Working with POST request</h2>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={`${s.inputLabel} ${errors.name ? s.inputLabelError : ''}`}>
            <input
              type='text'
              placeholder=' '
              className={`${s.input} ${errors.name ? s.inputError : ''}`}
              {...register('name')}
            />
            <span>Your name</span>
            <p className={s.error}>{errors.name?.message}</p>
          </label>

          <label className={`${s.inputLabel} ${errors.email ? s.inputLabelError : ''}`}>
            <input
              type='text'
              placeholder=' '
              className={`${s.input} ${errors.email ? s.inputError : ''}`}
              {...register('email')}
            />
            <span>Email</span>
            <p className={s.error}>{errors.email?.message}</p>
          </label>

          <label
            className={`${s.inputLabel} ${s.phoneLabel} ${errors.phone ? s.inputLabelError : ''}`}
          >
            <input
              type='tel'
              id='phone'
              placeholder=' '
              className={`${s.phoneInput} ${s.input} ${errors.phone ? s.inputError : ''}`}
              {...register('phone')}
            />
            <span>Phone</span>
            <p className={s.phoneHelper} style={errors.phone?.message ? { color: '#CB3D40' } : {}}>
              {errors.phone?.message ? errors.phone.message : '+38 (XXX) XXX - XX - XX'}
            </p>
          </label>

          <fieldset className={s.fieldset}>
            <legend className={s.radioLabel}>Select your position</legend>
            {positions?.map((position, index) => (
              <label key={position.id} className={s.radioContainer}>
                <input
                  type='radio'
                  defaultChecked={index === 0}
                  value={position.id}
                  {...register('position_id')}
                />
                <span>{position.name}</span>
              </label>
            ))}
          </fieldset>

          <label className={`${s.photoLabel} ${errors.photo ? s.photoLabelError : ''}`}>
            <input
              type='file'
              className={s.photoInput}
              {...register('photo')}
              onChange={onUploadFile}
              accept='image/jpeg'
            />
            <p className={s.upload}>Upload</p>
            <p
              className={s.photoName}
              style={fileName !== INPUT_FILE_PLACEHOLDER ? { color: 'rgba(0, 0, 0, 0.87)' } : {}}
            >
              {fileName ? fileNameFormatted : INPUT_FILE_PLACEHOLDER}
            </p>
            <p className={s.error}>{errors.photo?.message}</p>
          </label>

          <button type='submit' disabled={!isDirty || !isValid} className={`link ${s.submitBtn}`}>
            Sign Up
          </button>
        </form>

        {isLoading && <Loader />}

        <div
          className={s.registerSuccessContainer}
          style={isRegisterSuccess ? {} : { display: 'none' }}
        >
          <p className={s.registerSuccess}>User successfully registered</p>
          <img src={success} alt='A woman with a laptop successfully sent a file' />
        </div>
      </div>
    </section>
  )
}
