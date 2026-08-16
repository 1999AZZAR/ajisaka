import { Suspense, lazy } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { PwaUpdater } from './ui/components/PwaUpdater'

const Home = lazy(() => import('./ui/components/Home'))
const Dashboard = lazy(() => import('./ui/components/Dashboard'))
const Prolog = lazy(() => import('./ui/components/Prolog'))
const Level = lazy(() => import('./ui/components/Level'))
const Practice = lazy(() => import('./ui/components/Practice'))
const LevelDone = lazy(() => import('./ui/components/LevelDone'))
const Settings = lazy(() => import('./ui/components/Settings'))
const Phase2 = lazy(() => import('./ui/components/Phase2'))
const FreeType = lazy(() => import('./ui/components/FreeType'))

export default function App() {
  return (
    <>
      <PwaUpdater />
      <HashRouter>
        <Suspense fallback={<div className="flex h-full items-center justify-center bg-paper text-accent"><span className="text-xl font-display animate-pulse">Memuat...</span></div>}>
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
        </Suspense>
      </HashRouter>
    </>
  )
}