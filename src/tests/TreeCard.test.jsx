import React from 'react'
import TreeCard from '../TreeCard'
import { render, fireEvent, waitFor, act } from '@testing-library/react'
import trees from './trees.json'

const tree = trees.trees[0]

it('should display tree information', () => {
    const { getByTestId, queryByTestId } = render(<TreeCard {...tree} />)

    expect(getByTestId('tree-name').textContent).toEqual('Baobab')
    expect(getByTestId('tree-species').textContent).toEqual('Adansonia')
    expect(getByTestId('tree-button').textContent).toEqual('Show image')
    expect(queryByTestId('tree-image')).toBeFalsy()
})

it('should show image when clicking the button', async () => {
    await act(async () => {
        const { getByTestId, queryByTestId } = render(<TreeCard {...tree} />)

        expect(queryByTestId('tree-image')).toBeFalsy()
        expect(queryByTestId('tree-button')).toBeTruthy()
        expect(getByTestId('tree-button').textContent).toEqual('Show image')

        fireEvent.click(getByTestId('tree-button'))

        await waitFor(() => expect(queryByTestId('tree-image')).toBeTruthy())
        expect(getByTestId('tree-button').textContent).toEqual('Hide image')
    })
})
