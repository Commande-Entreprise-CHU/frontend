import Button from "./components/Button";
import Navbar from "./components/Navbar";
import { createPdf } from "./utils/pdfLogic/createPdf";
function App() {
  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold underline w-full text-center">
        Hello world!
      </h1>
      <Button className="m-4" onClick={createPdf}>
        Click me
      </Button>
    </>
  );
}

export default App;
