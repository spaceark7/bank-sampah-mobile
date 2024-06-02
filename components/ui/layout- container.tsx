import { Layout } from '@ui-kitten/components'
import React from 'react'

const LayoutContainer = ({
  children,
  level = '1',
  flex,
}: {
  children: React.ReactNode
  level?: string
  flex?: number | undefined
}) => {
  return (
    <Layout
      level={level}
      style={{
        padding: 20,
        flex: flex,
      }}
    >
      {children}
    </Layout>
  )
}

export default LayoutContainer
