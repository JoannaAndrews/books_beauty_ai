import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeProvider } from "./components/ui/color-mode";
import { system } from "@chakra-ui/react/preset";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ColorModeProvider>
        <ChakraProvider value={system}>
          <App />
        </ChakraProvider>
      </ColorModeProvider>
    </BrowserRouter>
  </StrictMode>
)
