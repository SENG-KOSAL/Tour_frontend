// components/Layout.js

import Header from "../components/Header/page"
import Footer from "../components/Footer/page"
const Layout = ({ children }) => {
  return (
    <>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </>
  )
}

export default Layout
