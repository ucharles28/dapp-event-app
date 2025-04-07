import React from 'react'
import Header from './Header'

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-black min-h-screen flex flex-col text-white">
            <Header />
            {children}
            {/* <Component {...pageProps} />
          
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            /> */}
            {/* <footer className="text-center py-20 text-gray-400 text-sm">
              © 2024 HemiVent. All rights reserved.
            </footer> */}
        </div>
    )
}
