import { Provider } from "@/components/ui/provider";

import { ColorModeProvider } from "@/components/ui/color-mode";
import { Color, Theme } from "@chakra-ui/react";
import { AppContextProvider } from "@/store";

export default function App({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Provider>
        <ColorModeProvider forcedTheme="light">
          <Theme appearance="light">
            <Component {...pageProps} />
          </Theme>
        </ColorModeProvider>
      </Provider>
    </AppContextProvider>
  );
}
