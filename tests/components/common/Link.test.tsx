import React, {FunctionComponent, PropsWithChildren} from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { expect, test, afterEach } from 'vitest'
import Link from "@/components/common/Link"
import {CinemaContextProvider} from "@/lib/hooks"

afterEach(() => {
  cleanup()
})

test('should render anchor element if no link provided', () => {
  render(<Link href="https://example.com/">Click</Link>)

  const link = screen.getByText('Click')

  expect(link).toBeInstanceOf(HTMLAnchorElement)
  expect(link).toHaveProperty('href', 'https://example.com/')
})

test('should render provided link component', () => {
  const CustomLink: FunctionComponent<{href: string} & PropsWithChildren> = ({href, children}) => {
    return <div title={href}>{children}</div>
  }

  render(
    <CinemaContextProvider link={CustomLink}>
      <Link href="https://example.com/">Click</Link>
    </CinemaContextProvider>
  )

  const link = screen.getByText('Click')

  expect(link).toBeInstanceOf(HTMLDivElement)
  expect(link).toHaveProperty('title', 'https://example.com/')
})