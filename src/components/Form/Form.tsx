import { ChangeEventHandler, useEffect, useState } from 'react'
import { getPositions } from '../../api/positionsApi'
import { IFormInputs, IPosition } from '../../types'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'
import s from './Form.module.scss'

const INPUT_FILE_PLACEHOLDER = 'Upload your photo'

export const Form = () => {
  const [file, setFile] = useState<string | null>(null)
  const [positions, setPositions] = useState<IPosition[]>([])

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

  const onSubmit = (data: IFormInputs) => {
    console.log(data)
    reset()
    setFile(null)
  }

  const onUploadFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files
    if (!files || !files.length) {
      setFile(null)
      return
    }
    setFile(files[0].name)
  }

  const fileName = file && file.length > 30 ? file.slice(0, 30) + '...' : file

  return (
    <section className={s.formSection}>
      <div className={`container ${s.container}`}>
        <h2 className={s.heading}>Working with POST request</h2>
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

          <p className={s.radioLabel}>Select your position</p>
          {positions?.map((position, index) => (
            <div key={position.id} className={s.radioContainer}>
              <input
                type='radio'
                defaultChecked={index === 0}
                id={position.name}
                value={position.id}
                {...register('position_id')}
              />
              <label htmlFor={position.name}>{position.name}</label>
            </div>
          ))}

          <label className={`${s.photoLabel} ${errors.photo ? s.photoLabelError : ''}`}>
            <input
              type='file'
              className={`${s.photoInput} ${errors.photo ? s.photoInputError : ''}`}
              {...register('photo')}
              onChange={onUploadFile}
              accept='image/jpeg'
            />
            <p className={s.upload}>Upload</p>
            <p
              className={s.photoName}
              style={file !== INPUT_FILE_PLACEHOLDER ? { color: 'rgba(0, 0, 0, 0.87)' } : {}}
            >
              {file ? fileName : INPUT_FILE_PLACEHOLDER}
            </p>
            <p className={s.error}>{errors.photo?.message}</p>
          </label>

          <button type='submit' disabled={!isDirty || !isValid} className={`link ${s.submitBtn}`}>
            Sign Up
          </button>
        </form>
      </div>
    </section>
  )
}
