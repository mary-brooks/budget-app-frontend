import { extendTheme } from '@chakra-ui/react';

import '@fontsource/nunito';
import '@fontsource/lora';

const theme = extendTheme({
  colors: {
    blackAlpha800: 'RGBA(0, 0, 0, 0.80)', // Chakra UI 'Black Alpha 800'
  },
  fonts: {
    body: 'Nunito',
    heading: 'Lora',
  },
  components: {
    Text: {
      baseStyle: {
        color: 'blackAlpha800',
      },
    },
  },
});

export default theme;
