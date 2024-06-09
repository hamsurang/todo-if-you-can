import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@chakra-ui/react";
import { useUploadModal } from "./hooks/useUploadModal";

function App() {
  const [count, setCount] = useState(0);
  const { open } = useUploadModal();

  return (
    <>
      <Button
        onClick={() => {
          open();
        }}
      >
        아아아아아
      </Button>
    </>
  );
}

export default App;
