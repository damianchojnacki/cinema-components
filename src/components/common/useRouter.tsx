import {useEffect, useState} from "react";

interface Router {
  query: Record<string, string | string[] | undefined>
}

export const useRouter = () => {
  const [router, setRouter] = useState<Router>({ query: {}})

  useEffect(() => {
    import('next/router').then(({useRouter}) => setRouter(useRouter))
  }, []);

  return router
};