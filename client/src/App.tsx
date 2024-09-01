import { BrowserRouter } from "react-router-dom";
import MainRouter from "./routes/router";
import { Provider } from "react-redux";
import store from "./redux/Store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainRouter />
        <Toaster />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
