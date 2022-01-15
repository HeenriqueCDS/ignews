import { render, screen } from '@testing-library/react'
import { ActiveLink } from '.'

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

describe('Active Link Component', () => {
    it('renders correctly', () => {
        render(
            <ActiveLink href='/' activeClassname='active'>
                <a>Home</a>
            </ActiveLink>
        )

        expect(screen.getByText('Home')).toBeInTheDocument()
    })

    it('is reciving active class', () => {
        render(
            <ActiveLink href='/' activeClassname='active'>
                <a>Home</a>
            </ActiveLink>
        )

        expect(screen.getByText('Home')).toHaveClass('active')
    })
})

