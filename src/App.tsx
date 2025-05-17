import "./App.css";
import { MCPProvider } from "./contexts/MCPProvider";
import Main from "./components/Main";

function App() {
  return (
    <MCPProvider>
      <Main />
    </MCPProvider>
  );
}

export default App;
