import React from 'react'
import App from '../App'
import { render, waitFor, act } from '@testing-library/react'
import trees from './trees.json'

it('should display page header', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => ({})
        })
    )

    await act(async () => {
        const { getByTestId } = render(<App />)

        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))

        expect(getByTestId('header-greeter').textContent).toEqual('Trees Showcase 🌿')
    });
})

it('should display fetched data', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(trees)
        })
    )

    await act(async () => {
        const { getByTestId, queryByTestId } = render(<App />)

        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))

        expect(getByTestId('tree-name').textContent).toEqual('Baobab')
        expect(getByTestId('tree-species').textContent).toEqual('Adansonia')
        expect(queryByTestId('tree-error')).toBeFalsy()
    });
})

it('should display error', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => {
                throw new Error('no trees')
            }
        })
    )

    await act(async () => {
        const { getByTestId, queryByTestId } = render(<App />)

        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))

        expect(queryByTestId('tree-name')).toBeFalsy()
        expect(queryByTestId('tree-species')).toBeFalsy()
        expect(getByTestId('header-error').textContent)
            .toEqual('An error occured during downloading of the trees. Please refresh. 🍀')
    });
})
