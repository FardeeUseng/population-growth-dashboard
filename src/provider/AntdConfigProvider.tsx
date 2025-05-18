import React from 'react'
import { ConfigProvider, theme } from 'antd'

export default function AntdConfigProvider({ children } : { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#213555',
          borderRadius: 8,
          fontFamily: 'Inter, sans-serif',
        },
        components: {
          Button: {
            colorPrimary: '#1f2937',
            colorText: '#ffffff'
          },
          Layout: {
            headerBg: '#1f2937',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
