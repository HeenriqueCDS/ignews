import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'

import { getPrismicClient } from '../../services/prismic'
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';


const post = {
    slug: 'my-new-post',
    title: 'My new post',
    content: '<p>This is a new post!!</>',
    updatedAt: '10 de Abril'
};
// const user = { name: 'John Doe', email: 'john.doe@example.com' }


jest.mock('next-auth/react')
jest.mock('next/router')
jest.mock('../../services/prismic')

describe('Post preview page', () => {
    it('rendes correctly', () => {
        render(
            <Post post={post} />
        )

        expect(screen.getByText('My new post')).toBeInTheDocument()
        expect(screen.getByText('This is a new post!!')).toBeInTheDocument()
        expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument()
    })

    it('redirects user to full post when user is subscribed', async () => {
        const useSessionMocked = mocked(getSession)
        const useRouterMocked = mocked(useRouter)
        const pushMock = jest.fn()

        useSessionMocked.mockReturnValueOnce({
            activeSubscription: 'fake-act',
        } as any)

        useRouterMocked.mockReturnValueOnce({
            push: pushMock
        } as any)

        render(
            <Post post={post} />
        )
        
        expect(useRouterMocked).toHaveBeenCalled()
    })
    it('loads initial data',async () => {

        const getPrismicClientMocked = mocked(getPrismicClient)
        getPrismicClientMocked.mockReturnValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
                data: {
                    title: [
                        { type: 'heading', text: 'My new post'}
                    ],
                    content:[
                        { type: 'paragraph', text: 'This is a new post!!'}
                    ],
                },
                last_publication_date: '04-01-2021',
            })
        } as any)

        const response = await getStaticProps({
            params: {
                slug: 'my-new-post'
            },

        } as any)

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    post: {
                        slug: 'my-new-post',
                        title: 'My new post',
                        content: '<p>This is a new post!!</p>',
                        updatedAt: '01 de abril de 2021'
                    }
                }
            })
        )
    })
})