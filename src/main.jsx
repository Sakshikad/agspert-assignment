import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { MultiSelectTheme } from 'chakra-multiselect'
import { Provider } from 'react-redux';
import store from './redux/store.js';

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme
  }
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)

