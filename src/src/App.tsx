import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './ui/components/Home'
import Dashboard from './ui/components/Dashboard'
import Prolog from './ui/components/Prolog'
import Level from './ui/components/Level'
import Practice from './ui/components/Practice'
import LevelDone from './ui/components/LevelDone'
import Settings from './ui/components/Settings'
import Phase2 from './ui/components/Phase2'
import FreeType from './ui/components/FreeType'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/prolog" element={<Prolog />} />
        <Route path="/level/:level" element={<Level />} />
        <Route path="/level/:level/practice" element={<Practice />} />
        <Route path="/level/3/phase2" element={<Phase2 />} />
        <Route path="/level/:level/done" element={<LevelDone />} />
        <Route path="/freetype" element={<FreeType />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  )
}