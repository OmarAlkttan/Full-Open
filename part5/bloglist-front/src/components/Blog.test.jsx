import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'


test('Renders main page correctly', () => {

  const blog = {
    title: 'trying jest'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('trying jest')
  expect(element).toBeDefined()
})