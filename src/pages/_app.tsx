import { AppProps } from "next/app";
import "../../styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import Image from 'next/image'

import logoImage from "../assets/igniteLogo.svg";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div className="flex flex-col items-start min-h-screen justify-center">
        <header className="py-4 px-0 w-full max-w-7xl my-2 mx-auto">
          <Image src={logoImage} alt="" />
        </header>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
