import Layout from "./layout/Layout";
import ThemeProvider from "./context/ThemeProvider";
import QueryProvider from "./context/QueryProvider";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <QueryProvider>
          <ThemeProvider>
            <Layout />
          </ThemeProvider>
        </QueryProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
