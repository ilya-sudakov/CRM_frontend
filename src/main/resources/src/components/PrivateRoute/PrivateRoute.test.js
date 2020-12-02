import React from 'react'
import { cleanup, screen } from '@testing-library/react'
import PrivateRoute from './PrivateRoute.jsx'
import '@testing-library/jest-dom/extend-expect'
import {
  renderWithContext,
  renderWithRouter,
  renderWithRouterAndContext,
} from '../../utils/testing/functions.js'
import UserContext from '../../App.js'

//Данные пользователя
const defaultUser = {
  email: '',
  username: '',
  firstName: '',
  lastName: '',
  roles: ['ROLE_MANAGER'],
  id: 0,
}

const userHasAccess = (rolesNeeded = []) => {
  let check = false
  defaultUser.roles.map((item) => {
    for (let i = 0; i < rolesNeeded.length; i++) {
      if (rolesNeeded[i] === item.name) {
        check = true
        break
      }
    }
  })
  return check
}

describe('PrivateRoute component', () => {
  afterEach(cleanup)

  it('matches snapshot', () => {
    const { asFragment } = renderWithContext(<PrivateRoute />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders w/ context', () => {
    renderWithContext(<PrivateRoute />)
  })

  it('renders w/ router & context', () => {
    renderWithRouterAndContext(<PrivateRoute />)
  })

  it('redirect to LoginPage if token is not stored', () => {
    renderWithRouterAndContext(<PrivateRoute />)
    setTimeout(
      () => expect(mockHistoryPush).toHaveBeenCalledWith('/login'),
      1000,
    )
  })

  it('renders component if user is allowed', () => {
    renderWithRouter(
      <UserContext.Provider
        value={{
          userData: defaultUser,
          isAuthorized: true,
          userHasAccess,
        }}
      >
        <PrivateRoute allowedRoles={['ROLE_ADMIN']}>123</PrivateRoute>
      </UserContext.Provider>,
    )

    setTimeout(
      async () =>
        expect(
          await screen.findByText('Доступ на эту страницу запрещен'),
        ).toBeInTheDocument(),
      1000,
    )
  })

  it('renders component if no restrictions are provided', () => {
    renderWithRouter(
      <UserContext.Provider
        value={{
          userData: defaultUser,
          isAuthorized: true,
          userHasAccess,
        }}
      >
        <PrivateRoute>123</PrivateRoute>
      </UserContext.Provider>,
    )

    setTimeout(
      async () => expect(await screen.findByText('123')).toBeInTheDocument(),
      1000,
    )
  })

  it('renders component if no restrictions are provided', () => {
    renderWithRouter(
      <UserContext.Provider
        value={{
          userData: defaultUser,
          isAuthorized: true,
          userHasAccess,
        }}
      >
        <PrivateRoute allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}>
          123
        </PrivateRoute>
      </UserContext.Provider>,
    )

    setTimeout(
      async () => expect(await screen.findByText('123')).toBeInTheDocument(),
      1000,
    )
  })
})
