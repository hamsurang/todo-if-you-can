import { useState } from "react";
import "./App.css";
import { Button } from "@chakra-ui/react";
import { useUploadModal } from "./hooks/useUploadModal";

function App() {
  const [count, setCount] = useState(0);
  const { open } = useUploadModal();

  return (
    <div className="layout">
      <section>
        <h1>킹받do</h1>
      </section>
    </div>
  );
}

export default App;
