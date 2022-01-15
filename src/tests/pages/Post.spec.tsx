import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'

import { getPrismicClient } from '../../services/prismic'
import Post, { getServerSideProps } from '../../pages/posts/[slug]'
import { getSession } from 'next-auth/react';


const post = {
    slug: 'my-new-post',
    title: 'My new post',
    content: '<p>This is a new post!!</>',
    updatedAt: '10 de Abril'
};

jest.mock('next-auth/react')
jest.mock('../../services/prismic')

describe('Post page', () => {
    it('rendes correctly', () => {
        render(
            <Post post={post} />
        )

        expect(screen.getByText('My new post')).toBeInTheDocument()
        expect(screen.getByText('This is a new post!!')).toBeInTheDocument()
    })

    it('redirects user if no subscription is found', async () => {
        const getSessionMocked = mocked(getSession)

        getSessionMocked.mockResolvedValueOnce(null)
        const response = await getServerSideProps({
            req: {
                cookies: {},
            },
            params: {
                slug: 'my-new-post'
            },

        } as any)

        expect(response).toEqual(
            expect.objectContaining({
                redirect: expect.objectContaining({
                    destination: '/posts/preview/my-new-post',
                })
            })
        )
    })
    it('loads initial data',async () => {
        const getSessionMocked = mocked(getSession)
        getSessionMocked.mockResolvedValueOnce({
            activeSubscription: 'fake-active-subscription',
        } as any)

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

        const response = await getServerSideProps({
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