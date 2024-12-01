import React, {FunctionComponent, PropsWithChildren, useEffect, useState} from 'react'

const Link: FunctionComponent<React.AnchorHTMLAttributes<HTMLAnchorElement> & PropsWithChildren> = (props) => {
  const [Component, setComponent] = useState<any>()

  useEffect(() => {
    import('next/link').then((Link) => setComponent(Link))
  }, []);

  if (!Component) {
    return <a {...props} />
  }

  return <Component {...props }/>
};

export default Link