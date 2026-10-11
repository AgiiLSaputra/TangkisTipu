import { useState } from 'react'

export default function LoginForm({ isDay = false, onToggle = () => {}, onKembali = () => {}, loading = false, onSubmit = () => {} }) {
  const [showPass, setShowPass] = useState(false)

  return (
    <section
      className="w-full md:w-[46%] lg:w-[44%] xl:w-[42%] md:h-full bg-white z-20 flex flex-col justify-between px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-10 sm:py-12 md:py-14 flex-1 md:flex-none relative"
      data-purpose="login-form-container"
    >
      {/* Top Branding Header */}
      <header className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              aria-label="Kembali ke beranda"
              className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-200/90 bg-slate-50/80 hover:bg-slate-100 text-slate-600 transition-all shadow-sm"
              onClick={onKembali}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div
              className={`w-6 h-6 rounded-full bg-gradient-to-tr shadow-md transition-transform duration-500 hover:scale-110 ${isDay ? 'from-sky-400 to-cyan-300 shadow-sky-300/40' : 'from-amber-400 to-amber-300 shadow-amber-300/40'}`}
              id="brand-indicator"
              title="Penanda identitas TangkisTipu"
            />
          </div>
        </div>
        <div>
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-slate-400 uppercase">Selamat datang di</p>
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-slate-900 mt-1">
            TangkisTipu
          </h1>
        </div>
      </header>
      {/* Center Credential Form */}
      <div className="my-auto py-6 max-w-md w-full">
        <form action="#" className="space-y-7" data-purpose="credential-form" method="POST" onSubmit={onSubmit}>
          <div className="field-underline pb-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1" htmlFor="email">
              Email
            </label>
            <input
              autoComplete="email"
              className="w-full px-0 py-1.5 bg-transparent border-0 focus:ring-0 text-slate-700 text-base font-medium placeholder-slate-300 tracking-wide outline-none"
              disabled={loading}
              id="email"
              name="email"
              placeholder="nama@contoh.com"
              required=""
              type="email"
            />
          </div>
          <div className="field-underline pb-1.5 relative">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1" htmlFor="password">
              Kata Sandi
            </label>
            <div className="flex items-center justify-between">
              <input
                autoComplete="current-password"
                className="w-full px-0 py-1.5 bg-transparent border-0 focus:ring-0 text-slate-700 text-base font-medium tracking-widest outline-none"
                disabled={loading}
                id="password"
                name="password"
                placeholder="••••••••"
                required=""
                type={showPass ? 'text' : 'password'}
              />
              <button
                aria-label={showPass ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 shrink-0"
                id="toggle-password-btn"
                onClick={() => setShowPass((v) => !v)}
                type="button"
              >
                {showPass ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="pt-3">
            <button
              aria-busy={loading}
              className="w-full md:w-auto px-10 py-3 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold text-xs tracking-widest uppercase rounded-full shadow-lg shadow-brand-600/35 hover:shadow-brand-600/50 hover:translate-y-[-1px] active:translate-y-[0px] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              data-purpose="submit-login-button"
              disabled={loading}
              type="submit"
            >
              {loading ? 'MEMERIKSA...' : 'MASUK'}
            </button>
          </div>
        </form>
      </div>
      {/* Bottom Section: Notice */}
      <footer className="pt-4">
        <p className="text-xs sm:text-sm text-slate-400 font-medium text-center md:text-left">
          Belum punya akun?
          <span className="text-brand-600 font-semibold underline underline-offset-4 ml-1">Hubungi pengelola komunitas</span>
        </p>
      </footer>
    </section>
  )
}
