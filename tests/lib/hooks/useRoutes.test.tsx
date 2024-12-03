import { render, screen, cleanup } from '@testing-library/react'
import { RoutesContextProvider, useRoutes, Routes } from '@/lib/hooks/useRoutes'
import { test, afterEach } from 'vitest'

const mockRoutes: Routes = {
  getMoviesPath: () => '/movies',
  getMovieShowingsPath: (id) => `/movies/${id}/showings`,
  getShowingPath: (movieId, id) => `/movies/${movieId}/showings/${id}`
}

afterEach(() => {
  cleanup()
})

test('should provide routes context to children', async () => {
  const TestComponent = () => {
    const routes = useRoutes()

    return <div>{routes?.getMoviesPath()}</div>
  }

  render(
    <RoutesContextProvider routes={mockRoutes}>
      <TestComponent />
    </RoutesContextProvider>
  )

  await screen.findByText('/movies')
})

test('should return the correct routes', async () => {
  const TestComponent = () => {
    const routes = useRoutes()

    return (
      <>
        <p>{routes?.getMoviesPath()}</p>
        <p>{routes?.getMovieShowingsPath('123')}</p>
        <p>{routes?.getShowingPath('123', '456')}</p>
      </>
    )
  }

  render(
    <RoutesContextProvider routes={mockRoutes}>
      <TestComponent />
    </RoutesContextProvider>
  )

  await screen.findByText('/movies')
  await screen.findByText('/movies/123/showings')
  await screen.findByText('/movies/123/showings/456')
})
