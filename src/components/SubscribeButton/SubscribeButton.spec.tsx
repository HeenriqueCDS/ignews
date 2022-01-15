import { render, screen, fireEvent } from '@testing-library/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { mocked } from 'ts-jest/utils'
// import {useSession} from 'next-auth/react'
import { SubscribeButton } from '.'


jest.mock('next-auth/react')

jest.mock('next/router')

const user = { name: 'John Doe', email: 'john.doe@example.com' }

describe('SubscribeButton Component', () => {
    it('renders correctly', () => {

        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValueOnce({data: null, status: 'authenticated'})

        render(
            <SubscribeButton />
        )
        expect(screen.getByText('Subscribe now')).toBeInTheDocument()
    })
    it('redirects user to sign in when not authenticated', () => {
        const signInMocked = mocked(signIn)

        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated' })

        render(
            <SubscribeButton />
        )
        const subscribeButton = screen.getByText('Subscribe now')

        fireEvent.click(subscribeButton)

        expect(signInMocked).toHaveBeenCalled()
    });
    it('redirects to posts when user already has a subscription', () => {
        const useRouterMocked = mocked(useRouter)
        const pushMock = jest.fn()
        useRouterMocked.mockReturnValueOnce({
            push: pushMock,
        } as any)

        const useSessionMocked = mocked(useSession)
        useSessionMocked.mockReturnValueOnce({
            data: {
                user: user,
                expires: 'fake-expires'
            },
            activeSubscription: 'fake-act',
            status: 'authenticated',
        } as any)

        render(
            <SubscribeButton />
        )
        const subscribeButton = screen.getByText('Subscribe now')

        fireEvent.click(subscribeButton)
        expect(useRouterMocked).toHaveBeenCalled()
    })
})