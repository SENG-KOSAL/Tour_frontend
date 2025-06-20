// components/Layout.js

import Header from "../components/Header/page"
import Footer from "../components/Footer/page"
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>  
      <Header/>
      <main>{children}</main>
      <Footer/>
    </>
  )
}

export default Layout
