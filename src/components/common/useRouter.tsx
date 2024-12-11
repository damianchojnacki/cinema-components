import {useEffect, useState} from "react"

interface Router {
  useRouter: () => {
    query: Record<string, string | string[] | undefined>
  }
}

export const useRouter = () => {
  const [router, setRouter] = useState<Router>({ useRouter: () => ({query: {}})})

  useEffect(() => {
    void import('next/router').then((router) => setRouter(router))
  }, [])

  return router.useRouter()
}