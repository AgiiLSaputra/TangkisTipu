import { useState } from 'react'
import LoginForm from './LoginForm.jsx'
import LoginScene from './LoginScene.jsx'
import LoginSceneMobile from './LoginSceneMobile.jsx'

export default function LoginPage({ onMasuk = () => {}, onKembali = () => {} }) {
  const [isDay, setIsDay] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggle = () => setIsDay((d) => !d)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onMasuk()
    }, 900)
  }

  return (
    <div className="w-full min-h-screen md:h-screen md:overflow-hidden bg-white text-slate-800 antialiased select-none">
      {/* Full Screen Edge-to-Edge Container */}
      <main className="w-full min-h-screen md:h-full flex flex-col md:flex-row relative">
        <LoginSceneMobile isDay={isDay} onToggle={toggle} />
        <LoginForm isDay={isDay} loading={loading} onKembali={onKembali} onSubmit={handleSubmit} onToggle={toggle} />
        <LoginScene isDay={isDay} onToggle={toggle} />
      </main>
    </div>
  )
}
