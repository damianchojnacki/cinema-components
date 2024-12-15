# Cinema

**Cinema** is a component and hook library designed for building dynamic and feature-rich cinema application. It provides reusable UI components, hooks for state management, and seamless integration with modern web development tools. It is well tested using vitest, react-testing-library and storybook.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Requirements](#requirements)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [License](#license)

---

## Features

- **Reusable Components:** Ready-to-use React components tailored for cinema-related use cases.
- **Custom Hooks:** Simplify state management and logic with hooks `useReservation` and `useCurrentMovie`.
- **TailwindCSS Support:** Preconfigured styling utilities with TailwindCSS and animations.
- **shadcn/ui Integration:** Accessible and flexible components for UI development.
- **Storybook:** Preview and test components interactively during development.
- **TypeScript Ready:** Strong type definitions for reliable and maintainable code.
- **Optimized for Performance:** Built with modern tools like `vite` and `react-query`.

---

## Requirements

- React 18

## Installation

```bash
# Using npm
npm install @damianchojnacki/cinema

# Using yarn
yarn add @damianchojnacki/cinema

# Using pnpm
pnpm add @damianchojnacki/cinema
```

## Usage

### Setup

In your main file e.g. _app.tsx add required providers:

```tsx
import { Routes, Client, CinemaContextProvider } from '@damianchojnacki/cinema'
import axios from 'axios'

// If your application use different component for navigation between pages e.g Next.js Link component, you should pass it
// to the providers as a link prop.
import Link from 'next/link'

// Routes should resolve paths as below:
const routes: Routes = {
  getMoviesPath: () => '/movies',
  getMovieShowingsPath: (id: string) => `/movies/${id}/showings`,
  getShowingPath: (movieId: string, id: string) => `/movies/${movieId}/showings/${id}`
}

// API Client should provide method to create reservation:
const client: Client = {
  createReservation: (showingId, data) => axios.post(`/api/${showingId}/reservations`, data)
}

return (
  <CinemaContextProvider apiClient={apiClient} routes={routes} link={Link}>
    <Component {...pageProps} />
  </CinemaContextProvider>
)
```

### Importing Components

```tsx
import { Movie } from 'cinema'

const App = ({ movies }) => {
  return (
    <div>
      <Movie.List movies={movies}/>
    </div>
  );
};

export default App
```

The library exports a bundled CSS file for styling. Ensure it is included in your project:

```javascript
import 'cinema/style.css';
```

## Available Scripts

### Development

Start a local development server using Vite:

```bash
pnpm dev
```

### Build

Build the library for production:

```bash
pnpm build
```

### Testing

Run tests with Vitest:

```bash
pnpm test
```

Generate test coverage reports:

```bash
pnpm test:coverage
```

### Storybook

Start Storybook to interactively develop and showcase components:

```bash
pnpm storybook
```

Build a static version of Storybook:

```bash
pnpm build-storybook
```

Test Storybook stories:

> It is required to install playwright deps to run tests

```bash
pnpx playwright install --with-deps
```

Run tests:
```bash
pnpm test:storybook
```

### Linting

Lint your codebase with ESLint:

```bash
pnpm lint
```

## License

See the LICENSE file for license rights and limitations (MIT).