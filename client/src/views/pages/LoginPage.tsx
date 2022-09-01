import React, { useEffect, useMemo, useState } from 'react'
import { Key, User } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Center, CompanyLogo, InputWithIcon, JustifyBetweenColumn } from '../../components'
import colors from '../../constants/colors'
import { useAuth } from '../../hooks/useAuth'
import { EValidationFiedTypes, ILoginCredentials, IValidationItem } from '../../models'
import { handleInputChange } from '../../utils/handleValueChange'
import { validateFormFields } from '../../utils/validationUtils'

const PageContainer = styled.div`
  ${Center}
  width: 100vw;
  height: 100vh;
`

const LoginCard = styled.div`
  border-radius: 0.3rem;
  border: 1px solid ${colors.primary.dark};
  padding: 1rem;
  width: 600px;
`

const FormContainer = styled.div`
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

const LoginPage = () => {
  const navigate = useNavigate()
  const {
    tryLogin: { login, isLoginSuccessfull }
  } = useAuth()

  const [credentials, setCredentials] = useState<ILoginCredentials>({
    username: 'admin',
    password: 'adminadmin'
  })

  const [credentialsValidationsErrors, setCredentialsValidationsErrors] = useState({
    usernameError: false,
    passwordError: false
  })

  const loginValidationOptions: IValidationItem[] = useMemo(
    () => [
      {
        fieldName: 'username',
        fieldType: EValidationFiedTypes.STRING
      },
      {
        fieldName: 'password',
        fieldType: EValidationFiedTypes.STRING
      }
    ],
    []
  )

  const handleSubmit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    try {
      const validationResult = validateFormFields(loginValidationOptions, credentials, setCredentialsValidationsErrors)
      if (validationResult) {
        await login(credentials)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <PageContainer>
      <LoginCard>
        <FormContainer>
          <FormLayout>
            <FormArea>
              <FormLogo>
                <CompanyLogo />
              </FormLogo>
            </FormArea>

            <FormArea>
              <FormItem>
                <InputWithIcon
                  name="username"
                  type="text"
                  labelText="Kullanıcı Adı"
                  placeholder="Kullanıcı adınızı giriniz..."
                  value={credentials.username}
                  onValueChange={event => handleInputChange(event, credentials, setCredentials)}
                  children={<User size={20} />}
                  color={credentialsValidationsErrors.usernameError ? colors.fourth.light : colors.secondary.dark}
                />
              </FormItem>
              <FormItem>
                <InputWithIcon
                  name="password"
                  type="password"
                  labelText="Şifre"
                  placeholder="Telefon numaranızı giriniz..."
                  value={credentials.password}
                  onValueChange={event => handleInputChange(event, credentials, setCredentials)}
                  children={<Key size={20} />}
                  color={credentialsValidationsErrors.passwordError ? colors.fourth.light : colors.secondary.dark}
                />
              </FormItem>
            </FormArea>

            <FormArea>
              <FormItem>
                <Button height="50px" onClick={handleSubmit}>
                  Giriş
                </Button>
              </FormItem>
            </FormArea>
          </FormLayout>
        </FormContainer>
      </LoginCard>
    </PageContainer>
  )
}

export default LoginPage
