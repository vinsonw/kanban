import Layout from "./layout/Layout";
import ThemeProvider from "./context/ThemeProvider";

function App() {
  return (
    <>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </>
  );
}

export default App;
