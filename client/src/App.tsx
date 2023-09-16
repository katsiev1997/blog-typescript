import { Header, Loading } from "./components";
import { router } from "./components/router";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./redux/store";
import { useEffect } from "react";
import { refreshToken } from "./redux/actions/authAction";

function App() {
  const state: any = useSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Loading />
      <main>
        <div className="container">{router()}</div>
      </main>
    </div>
  );
}

export default App;
