import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Board from "./Board";
import ToweringTreetop from "./toweringtreetop.json"

function App() {

    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Board board_data={ToweringTreetop} />} />
          </Routes>
        </Router>
      </>
    );
}

export default App;
