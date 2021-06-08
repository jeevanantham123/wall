import { Provider as NextAuthProvider } from "next-auth/client";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../store";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NextAuthProvider session={pageProps.session}>
        <Component {...pageProps} />
      </NextAuthProvider>
    </Provider>
  );
}
