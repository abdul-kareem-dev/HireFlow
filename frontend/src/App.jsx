import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import Apply from "./pages/Apply";
import Applications from "./pages/Applications";

function App() {

    return (
        <BrowserRouter>

            <nav className="navbar">

                <Link to="/" className="logo">
                    HireFlow
                </Link>

                <div>
                    <Link to="/">Jobs</Link>
                    <Link to="/applications">
                        My Applications
                    </Link>
                </div>

            </nav>

            <Routes>

                <Route path="/" element={<Home />} />

                <Route
                    path="/jobs/:id"
                    element={<JobDetails />}
                />

                <Route
                    path="/apply/:id"
                    element={<Apply />}
                />

                <Route
                    path="/applications"
                    element={<Applications />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;