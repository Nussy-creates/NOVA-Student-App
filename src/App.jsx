import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LessonPlans from "./Pages/LessonPlans";
import MyCourses from "./Pages/MyCourses";
import Analysis from "./Pages/Analysis";
import AITutor from "./Pages/AITutor";
import Layout from "./components/Layout";
import CourseDetails from "./Pages/CourseDetails";
import CreateLesson from "./Pages/CreateLesson";
import ViewLesson from "./Pages/ViewLesson";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/view-lesson" element={<ViewLesson />} />
            <Route path="/create-lesson" element={<CreateLesson />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/" element={<Home />} />
            <Route path="/LessonPlans" element={<LessonPlans />} />
            <Route path="/MyCourses" element={<MyCourses />} />
            <Route path="/Analysis" element={<Analysis />} />
            <Route path="/AITutor" element={<AITutor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
