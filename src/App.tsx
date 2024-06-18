import Layout from "./layout/Layout";
import ThemeProvider from "./context/ThemeProvider";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <Layout />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
