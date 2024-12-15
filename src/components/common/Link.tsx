import React, {createElement, FunctionComponent, PropsWithChildren} from 'react'
import {useCinema} from "@/lib/hooks/useCinema"

const Link: FunctionComponent<React.AnchorHTMLAttributes<HTMLAnchorElement> & PropsWithChildren> = (props) => {
  const {link} = useCinema()

  if (!link) {
    return <a {...props} />
  }

  return createElement(link, props, props.children)
}

export default Link