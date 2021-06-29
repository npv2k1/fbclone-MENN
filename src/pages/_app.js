import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "../assets/css/all.min.css";

import { Provider as AuthProvider } from "next-auth/client";
const MyApp = ({ Component, pageProps }) => {
  const Layout = Component.Layout || (({ children }) => <>{children}</>);
  return (
    <AuthProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default MyApp;
