import { useEffect } from "react";
import { HashRouter, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { Practice, Review } from "./pages/Practice";
import { Progress } from "./pages/Progress";
import { Quiz } from "./pages/Quiz";
import { Test } from "./pages/Test";
import { TopicPage } from "./pages/TopicPage";
import { Topics } from "./pages/Topics";

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export function App() {
  return (
    <HashRouter>
      <ScrollToHash />
      <header className="topbar">
        <NavLink to="/" className="brand">
          🧮 Math Olympiad Prep
        </NavLink>
        <nav>
          <NavLink to="/topics">Topics</NavLink>
          <NavLink to="/quiz">Quiz</NavLink>
          <NavLink to="/test">Mock Test</NavLink>
          <NavLink to="/review">Mistakes</NavLink>
          <NavLink to="/progress">Progress</NavLink>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topic/:id" element={<TopicPage />} />
          <Route path="/practice/:id" element={<Practice />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/test" element={<Test />} />
          <Route path="/review" element={<Review />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </HashRouter>
  );
}
