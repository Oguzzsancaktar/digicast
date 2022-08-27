import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Button,
  HorizontalCenter,
  InputWithIcon,
  InputSelect,
  InputDatePicker,
  CompanyLogo,
  JustifyBetweenColumn,
  Image,
  Spinner
} from '../../components'
import { Row } from '../../components/shared/layout'
import colors from '../../constants/colors'
import { EValidationFiedTypes, IRegister, IValidationItem } from '../../models'
import { handleDateChange, handleInputChange, handleSelectChange } from '../../utils/handleValueChange'
import { Gift, Mail, MapPin, PhoneCall, User } from 'react-feather'
import cityOptions from '../../constants/cities'
import moment from 'moment'
import { useCreateRegisterMutation } from '../../services/registerService'
import { validateFormFields } from '../../utils/validationUtils'
import backgroundImage from '../../assets/images/register-background-image.jpg'
import Success from '../../components/request-response/Success'
import { useLocation, useNavigate } from 'react-router-dom'

const PageContainer = styled.div`
  background-color: red;
  width: 100vw;
  height: 100vh;

  @media (max-width: 1100px) {
    background-image: url(${backgroundImage}),
      linear-gradient(135deg, ${colors.primary.light}, ${colors.secondary.light});
    background-size: cover;
    background-position-y: bottom;
  }
`
const PageLayout = styled(Row)`
  width: 100%;
  height: 100%;

  @media (max-width: 1100px) {
    display: flex;
    justify-content: end;
    flex-direction: column;
    align-items: flex-end;
  }
`
const FormSection = styled.div`
  ${HorizontalCenter}
  background-color: ${colors.white.light};
  width: 100%;
  height: 100%;

  @media (max-width: 1100px) {
    background-color: ${colors.white.light}df;

    height: 80%;
    border-top-left-radius: 5rem;
    border-top-right-radius: 5rem;
    overflow: hidden;
  }
`
const FormContainer = styled.div`
  padding: 3rem 1rem;
  width: calc(100% - 2rem);
  max-width: 500px;
  height: 100%;

  @media (max-width: 1100px) {
    padding: 1rem;
  }
`
const FormLayout = styled.div`
  ${JustifyBetweenColumn}
  width: 100%;
  height: 100%;
`

const FormArea = styled.div`
  height: auto;
  width: 100%;
`

const FormLogo = styled.div`
  height: 200px;
  width: 200px;
  margin: auto;

  @media (max-width: 1100px) {
    height: 120px;
    width: 120px;
  }
`

const FormItem = styled.div`
  width: 100%;
  margin: 1rem 0;
`
const InfoSection = styled.div`
  background-image: url(${backgroundImage}), linear-gradient(135deg, ${colors.primary.light}, ${colors.secondary.light});
  background-blend-mode: overlay;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;

  @media (max-width: 1100px) {
    display: none;
  }
`

const RegisterPage: React.FC = () => {
  const navigate = useNavigate()

  const [createRegister, { isLoading: createRegisterIsLoading, isSuccess: createRegisterIsSuccess }] =
    useCreateRegisterMutation()

  const [createRegisterDTO, setCreateRegisterDTO] = useState<Omit<IRegister, '_id'>>({
    fullname: '',
    phone: '',
    email: '',
    city: '',
    birthday: ''
  })

  const registerValidationOptions: IValidationItem[] = [
    {
      fieldName: 'fullname',
      fieldType: EValidationFiedTypes.STRING
    },
    {
      fieldName: 'phone',
      fieldType: EValidationFiedTypes.STRING
    },
    {
      fieldName: 'email',
      fieldType: EValidationFiedTypes.STRING
    },
    {
      fieldName: 'city',
      fieldType: EValidationFiedTypes.STRING
    },
    {
      fieldName: 'birthday',
      fieldType: EValidationFiedTypes.STRING
    }
  ]

  const [createRegisterValidations, setCreateRegisterValidations] = useState({
    fullnameError: false,
    phoneError: false,
    emailError: false,
    cityError: false,
    birthdayError: false
  })

  const resetRegister = async () => {
    setCreateRegisterDTO({
      fullname: '',
      phone: '',
      email: '',
      city: '',
      birthday: ''
    })

    navigate('/')
  }

  const handleSubmit = async () => {
    try {
      const validationResult = validateFormFields(
        registerValidationOptions,
        createRegisterDTO,
        setCreateRegisterValidations
      )
      if (validationResult) {
        await createRegister(createRegisterDTO)
      } else {
        console.warn('control inputs !!!')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <PageContainer>
      <PageLayout>
        <InfoSection>{/* <Image src={backgroundImage} /> */}</InfoSection>

        <FormSection>
          <FormContainer>
            <FormLayout>
              <FormArea>
                <FormLogo>
                  <CompanyLogo />
                </FormLogo>
              </FormArea>
              {!createRegisterIsLoading && !createRegisterIsSuccess ? (
                <FormArea>
                  <FormItem>
                    <InputWithIcon
                      name="fullname"
                      type="text"
                      labelText="Ad Soyad"
                      placeholder="Adınızı ve soyadınızı giriniz..."
                      value={createRegisterDTO.fullname}
                      onValueChange={event => handleInputChange(event, createRegisterDTO, setCreateRegisterDTO)}
                      children={<User size={20} />}
                      color={createRegisterValidations.fullnameError ? colors.fourth.light : colors.secondary.dark}
                    />
                  </FormItem>
                  <FormItem>
                    <InputWithIcon
                      name="phone"
                      type="phone"
                      labelText="Telefon"
                      placeholder="Telefon numaranızı giriniz..."
                      value={createRegisterDTO.phone}
                      onValueChange={event => handleInputChange(event, createRegisterDTO, setCreateRegisterDTO)}
                      children={<PhoneCall size={20} />}
                      color={createRegisterValidations.phoneError ? colors.fourth.light : colors.secondary.dark}
                    />
                  </FormItem>
                  <FormItem>
                    <InputWithIcon
                      name="email"
                      type="email"
                      labelText="E-posta"
                      placeholder="E-posta adresinizi giriniz..."
                      value={createRegisterDTO.email}
                      onValueChange={event => handleInputChange(event, createRegisterDTO, setCreateRegisterDTO)}
                      children={<Mail size={20} />}
                      color={createRegisterValidations.emailError ? colors.fourth.light : colors.secondary.dark}
                    />
                  </FormItem>

                  <FormItem>
                    <InputDatePicker
                      name="birthday"
                      labelText="Doğum Tarihi"
                      placeholder="Doğum Tarihinizi giriniz..."
                      value={createRegisterDTO.birthday}
                      onValueChange={(date, dateText) => {
                        handleDateChange(
                          moment(date[0]).valueOf().toString(),
                          'birthday',
                          createRegisterDTO,
                          setCreateRegisterDTO
                        )
                      }}
                      color={createRegisterValidations.birthdayError ? colors.fourth.light : colors.secondary.dark}
                    />
                  </FormItem>

                  <FormItem>
                    <InputSelect
                      name="city"
                      labelText="Şehir"
                      placeholder="Yaşadığınız şehri seçiniz..."
                      options={cityOptions}
                      selectedOptionValue={createRegisterDTO.city}
                      onValueChange={option =>
                        handleSelectChange(option, 'city', createRegisterDTO, setCreateRegisterDTO)
                      }
                      children={<Gift size={20} />}
                      color={createRegisterValidations.cityError ? colors.fourth.light : colors.secondary.dark}
                    />
                  </FormItem>
                </FormArea>
              ) : createRegisterIsSuccess ? (
                <Success />
              ) : (
                <Spinner />
              )}
              <FormArea>
                <FormItem>
                  {createRegisterIsSuccess ? (
                    <Button
                      height="50px"
                      onClick={() => {
                        resetRegister()
                      }}
                    >
                      Yeni Kayıt Oluştur
                    </Button>
                  ) : (
                    <Button
                      height="50px"
                      onClick={() => {
                        handleSubmit()
                      }}
                    >
                      Başvur !
                    </Button>
                  )}
                </FormItem>
              </FormArea>
            </FormLayout>
          </FormContainer>
        </FormSection>
      </PageLayout>
    </PageContainer>
  )
}

export default RegisterPage
