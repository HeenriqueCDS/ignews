import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import {useSession} from 'next-auth/react'
import { SignInButton } from '.'


jest.mock('next-auth/react')

const user = {name: 'John Doe', email: 'john.doe@example.com' }

describe('SignInButton Component', () => {
    it('renders correctly when user is not authenticated', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce({data: null, status: 'unauthenticated'})
        render(
            <SignInButton/>
        )
        expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
    })
    it('renders correctly when user is authenticated', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce({data: {user: user, expires: 'fake-expires'}, status: 'authenticated'})
        render(
            <SignInButton/>
        )
        expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
})