import React, {FunctionComponent, isValidElement, PropsWithChildren, useEffect, useState} from 'react'

const Link: FunctionComponent<React.AnchorHTMLAttributes<HTMLAnchorElement> & PropsWithChildren> = (props) => {
  const [Component, setComponent] = useState<never>()

  useEffect(() => {
    // @ts-ignore
    void import('next/link').then((Link) => setComponent(Link))
  }, []);

  if (!Component) {
    return <a {...props} />
  }

  // @ts-ignore
  return <Component {...props }/>
};

export default Link