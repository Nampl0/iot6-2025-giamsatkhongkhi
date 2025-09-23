import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Line from "./scenes/line";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ActionHistory from "./scenes/ActionHistory";
import DataSensor from "./scenes/DataSensor";
import axios from "axios";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  useEffect(() => {
    subscribeTopic1();
    subscribeTopic2();
  }, []);

  const subscribeTopic1 = async () => {
    const body = {
      topic: "device/control",
    };
    await axios.post("http://localhost:3000/subscriber", body);
  };

  const subscribeTopic2 = async () => {
    const body = {
      topic: "led/history",
    };
    await axios.post("http://localhost:3000/subscriber", body);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/actionhistory" element={<ActionHistory />} />
              <Route path="/datasensor" element={<DataSensor />} />
              <Route path="/line" element={<Line />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
