import { useState } from 'react'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
  { id: 'set-soal', label: 'Set Soal', icon: 'quiz' },
  { id: 'kode-kelas', label: 'Kode Kelas', icon: 'school' },
  { id: 'pengaturan', label: 'Pengaturan', icon: 'settings' },
]

const STATS = [
  {
    icon: 'group',
    iconBox: 'bg-surface-container-high text-primary',
    badge: 'bg-safe-green-light text-tertiary',
    badgeIcon: 'trending_up',
    badgeText: '+18',
    label: 'Jumlah Peserta Aktif',
    value: '142',
    valueClass: 'text-primary',
    dot: 'bg-tertiary',
    note: '94 menyelesaikan kedua tes (lengkap)',
  },
  {
    icon: 'assignment_late',
    iconBox: 'bg-warning-yellow-light text-secondary',
    badge: 'bg-warning-yellow-light text-secondary',
    badgeIcon: 'warning',
    badgeText: 'Waspada Cukup',
    label: 'Rata-rata Skor Pre-Test',
    value: '5.2',
    valueClass: 'text-secondary',
    suffix: '/ 10',
    dot: 'bg-outline',
    note: 'Dari total 128 pengerjaan terdaftar',
  },
  {
    icon: 'verified',
    iconBox: 'bg-safe-green-light text-tertiary',
    badge: 'bg-safe-green-light text-tertiary',
    badgeIcon: 'task_alt',
    badgeText: 'Sangat Kompeten',
    label: 'Rata-rata Skor Post-Test',
    value: '8.4',
    valueClass: 'text-tertiary',
    suffix: '/ 10',
    dot: 'bg-tertiary',
    note: 'Melampaui standar kelulusan (8.0)',
  },
  {
    icon: 'show_chart',
    iconBox: 'bg-surface-container-high text-primary-container',
    badge: 'bg-safe-green-light text-tertiary',
    badgeIcon: 'arrow_upward',
    badgeText: '+61.5% Retensi',
    label: 'Kenaikan Skor Rata-rata',
    value: '+3.2 Poin',
    valueClass: 'text-primary-container',
    dot: 'bg-primary-container',
    note: 'Sampel kohort berpasangan (94 warga)',
  },
]

const VULNERABILITIES = [
  {
    rank: 1,
    rankClass: 'bg-danger-red text-on-error',
    title: 'Tugas Berkomisi',
    desc: 'Menuruti permintaan transfer deposit dana talangan awal karena sudah diberi komisi kecil Rp20.000.',
    pct: 64,
    barClass: 'bg-danger-red',
    badgeClass: 'bg-danger-red-light text-danger-red',
    pctClass: 'text-danger-red',
  },
  {
    rank: 2,
    rankClass: 'bg-danger-red text-on-error',
    title: 'APK Undangan / Kurir',
    desc: 'Mengunduh file berakhiran .APK karena mengira resi kurir paket belanja e-commerce.',
    pct: 58,
    barClass: 'bg-danger-red',
    badgeClass: 'bg-danger-red-light text-danger-red',
    pctClass: 'text-danger-red',
  },
  {
    rank: 3,
    rankClass: 'bg-secondary-container text-on-secondary-container',
    title: 'Catut Pejabat Bank',
    desc: 'Memberikan kode OTP karena penelepon tahu nama lengkap dan alamat rumah warga.',
    pct: 45,
    barClass: 'bg-secondary-container',
    badgeClass: 'bg-warning-yellow-light text-secondary',
    pctClass: 'text-secondary',
  },
  {
    rank: 4,
    rankClass: 'bg-secondary-container text-on-secondary-container',
    title: 'Pinjol Ilegal',
    desc: 'Mengizinkan akses seluruh kontak buku telepon di aplikasi pinjaman online tanpa verifikasi izin.',
    pct: 39,
    barClass: 'bg-secondary-container',
    badgeClass: 'bg-warning-yellow-light text-secondary',
    pctClass: 'text-secondary',
  },
  {
    rank: 5,
    rankClass: 'bg-surface-container-high text-on-surface-variant',
    title: 'Hadiah Palsu',
    desc: 'Membayar pajak undian di depan melalui rekening pribadi sebelum klaim reward.',
    pct: 31,
    barClass: 'bg-primary-container',
    badgeClass: 'bg-surface-container-high text-primary',
    pctClass: 'text-primary',
  },
]

const SCENARIO_TITLES = [
  'Tugas Berkomisi & Talangan Deposit',
  'Modus File Undangan / Resi APK',
  'Pencatutan Petugas Lembaga Perbankan',
  'Perizinan Kontak Pinjol Ilegal',
  'Pemberitahuan Undian & Hadiah Palsu',
]

const CLASS_CODE = 'RT04-WARGA'

function BarChart() {
  const groups = [
    { x: 55, labelX: 87, pre: { y: 110, h: 90, v: '4.5' }, post: { y: 38, h: 162, v: '8.1' }, label: 'Tugas Berkomisi' },
    { x: 170, labelX: 202, pre: { y: 88, h: 112, v: '5.6' }, post: { y: 30, h: 170, v: '8.5' }, label: 'Pinjol Ilegal' },
    { x: 285, labelX: 317, pre: { y: 104, h: 96, v: '4.8' }, post: { y: 28, h: 172, v: '8.6' }, label: 'Tautan/APK Kurir' },
    { x: 400, labelX: 432, pre: { y: 98, h: 102, v: '5.1' }, post: { y: 34, h: 166, v: '8.3' }, label: 'Catut Lembaga' },
    { x: 515, labelX: 547, pre: { y: 80, h: 120, v: '6.0' }, post: { y: 24, h: 176, v: '8.8' }, label: 'Hadiah Palsu' },
  ]
  return (
    <div className="relative w-full pt-4">
      <svg className="w-full h-72 overflow-visible" fill="none" viewBox="0 0 620 250" xmlns="http://www.w3.org/2000/svg">
        <line className="text-surface-container-high" stroke="currentColor" strokeDasharray="4 4" x1="30" x2="600" y1="20" y2="20" />
        <text className="text-text-muted font-label-sm" fill="currentColor" fontSize="10" textAnchor="end" x="22" y="24">10.0</text>
        <line stroke="#004824" strokeDasharray="3 3" strokeWidth="1.5" x1="30" x2="600" y1="60" y2="60" />
        <text className="text-tertiary font-label-sm" fill="#004824" fontSize="10" fontWeight="700" x="602" y="64">Target (8.0)</text>
        <text className="text-text-muted font-label-sm" fill="currentColor" fontSize="10" textAnchor="end" x="22" y="64">8.0</text>
        <line className="text-surface-container-high" stroke="currentColor" strokeDasharray="4 4" x1="30" x2="600" y1="100" y2="100" />
        <text className="text-text-muted font-label-sm" fill="currentColor" fontSize="10" textAnchor="end" x="22" y="104">6.0</text>
        <line className="text-surface-container-high" stroke="currentColor" strokeDasharray="4 4" x1="30" x2="600" y1="140" y2="140" />
        <text className="text-text-muted font-label-sm" fill="currentColor" fontSize="10" textAnchor="end" x="22" y="144">4.0</text>
        <line className="text-surface-container-high" stroke="currentColor" strokeDasharray="4 4" x1="30" x2="600" y1="180" y2="180" />
        <text className="text-text-muted font-label-sm" fill="currentColor" fontSize="10" textAnchor="end" x="22" y="184">2.0</text>
        <line className="text-outline-variant" stroke="currentColor" strokeWidth="1.5" x1="30" x2="600" y1="200" y2="200" />
        <text className="text-text-muted font-label-sm" fill="currentColor" fontSize="10" textAnchor="end" x="22" y="204">0.0</text>
        {groups.map((g) => (
          <g className="transition-all hover:opacity-90" key={g.label}>
            <rect fill="#fbbc0e" height={g.pre.h} rx="4" width="30" x={g.x} y={g.pre.y} />
            <text fill="#795900" fontSize="11" fontWeight="700" textAnchor="middle" x={g.x + 15} y={g.pre.y - 8}>{g.pre.v}</text>
            <rect fill="#0f5c73" height={g.post.h} rx="4" width="30" x={g.x + 35} y={g.post.y} />
            <text fill="#004356" fontSize="11" fontWeight="700" textAnchor="middle" x={g.x + 50} y={g.post.y - 8}>{g.post.v}</text>
            <text fill="#40484c" fontSize="11" fontWeight="600" textAnchor="middle" x={g.labelX + 15} y="222">{g.label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function DashboardAdmin({ onKeluar = () => {} }) {
  const [group, setGroup] = useState('all')
  const [refreshing, setRefreshing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isEmptyDemo = group === 'empty-demo'

  const handleRefresh = () => {
    if (refreshing) return
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      alert('Data analitik berhasil disinkronisasi ulang dengan database terbaru.')
    }, 800)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('https://tangki-stipu.id/join?kode=' + CLASS_CODE)
    } catch {
      /* clipboard tidak tersedia di konteks non-HTTPS */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-surface-cream font-body-md text-on-surface antialiased">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-surface-white z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col">
          <div className="h-16 px-space-lg flex items-center gap-space-sm bg-surface-white">
            <img src="/assets/LogoTangkis.png" alt="Logo TangkisTipu" className="h-9 w-auto shrink-0" />
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-primary tracking-tight leading-none">TangkisTipu</span>
              <span className="font-label-sm text-label-sm text-text-muted mt-space-xs">Portal Admin</span>
            </div>
            <button
              aria-label="Tutup menu samping"
              className="ml-auto w-9 h-9 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors shrink-0"
              onClick={() => setSidebarOpen(false)}
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">chevron_left</span>
            </button>
          </div>
          <div className="px-space-md py-space-sm">
            <div className="px-space-sm py-space-xs text-label-sm font-label-sm text-text-muted uppercase tracking-wider">
              Manajemen Edukasi
            </div>
          </div>
          <nav className="flex flex-col gap-space-xs px-space-md">
            {NAV_ITEMS.map((item) => (
              <button
                className={
                  item.id === 'dashboard'
                    ? 'flex items-center gap-space-md px-space-md py-3 transition-all bg-primary-container text-on-primary font-label-md rounded-xl shadow-sm text-left'
                    : 'flex items-center gap-space-md px-space-md py-3 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left'
                }
                key={item.id}
                onClick={() => {
                  if (item.id !== 'dashboard') alert(`Halaman "${item.label}" belum tersedia pada versi demo ini.`)
                }}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-space-md bg-surface-white">
          <div className="p-space-md rounded-xl bg-surface-cream flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-on-surface truncate">Rudi Hariyadi</span>
                <span className="font-label-sm text-label-sm text-text-muted truncate">Ketua Komunitas</span>
              </div>
            </div>
            <button
              className="p-space-xs rounded-lg text-text-muted hover:text-error hover:bg-danger-red-light transition-colors"
              onClick={onKeluar}
              title="Keluar Akun"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Tombol hamburger — menempel di pojok kiri atas konten halaman, ikut scroll bersama halaman, hilang saat sidebar terbuka */}
      {!sidebarOpen && (
        <button
          aria-label="Buka menu samping"
          className="absolute top-4 left-4 z-50 w-10 h-10 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
          onClick={() => setSidebarOpen(true)}
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>
      )}

      {/* Backdrop (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Konten utama */}
      <div className={sidebarOpen ? 'md:pl-72' : ''}>
        <main className="w-full pt-16 bg-surface-cream px-space-xl py-space-xl">
          <div className="flex flex-col w-full">
            {/* Header halaman */}
            <div className="flex flex-col gap-space-xs pb-space-lg">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mt-space-xs">
                <div className="flex flex-col gap-space-xs">
                  <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Dashboard Evaluasi Literasi Warga</h1>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                    Pantau ketahanan siber komunitas, progres peningkatan skor pre vs post-test, dan titik kerentanan warga secara agregat.
                  </p>
                </div>
              </div>
            </div>

            {/* Toolbar kontrol */}
            <div className="bg-surface-white rounded-xl p-space-md shadow-sm mb-space-xl flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-space-md">
              <div className="flex flex-wrap items-center gap-space-md">
                <div className="flex flex-col min-w-[280px]">
                  <label className="font-label-sm text-label-sm text-text-muted mb-1 flex items-center gap-1" htmlFor="filter-group">
                    <span className="material-symbols-outlined text-[16px]">group</span>
                    Kode Kelas
                  </label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none bg-none bg-surface-container-low text-on-surface font-label-md text-label-md py-2.5 pl-space-md pr-10 rounded-lg outline-none focus:bg-surface-white transition-all cursor-pointer"
                      id="filter-group"
                      onChange={(e) => setGroup(e.target.value)}
                      value={group}
                    >
                      <option value="all">Semua Kelompok (Aktif)</option>
                      <option value="rt05">RT 05 / RW 07 - Paguyuban Warga</option>
                      <option value="smp12">SMP Negeri 12 - Kelas 8B</option>
                      <option value="lansia">Komunitas Lansia Sejahtera</option>
                      <option value="empty-demo">RT 04 / RW 07 - Belum Ada Data (Simulasi)</option>
                      <option value="new">+ Buat Kode Baru</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted text-[20px]">expand_more</span>
                  </div>
                </div>
                <div className="flex flex-col min-w-[260px]">
                  <label className="font-label-sm text-label-sm text-text-muted mb-1 flex items-center gap-1" htmlFor="filter-date">
                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                    Rentang Waktu
                  </label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none bg-none bg-surface-container-low text-on-surface font-label-md text-label-md py-2.5 pl-space-md pr-10 rounded-lg outline-none focus:bg-surface-white transition-all cursor-pointer"
                      id="filter-date"
                    >
                      <option>30 Hari Terakhir (15 Jul - 14 Agu 2026)</option>
                      <option>7 Hari Terakhir</option>
                      <option>Semester Ini (Jan - Jun 2026)</option>
                      <option>Kustom Tanggal...</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted text-[20px]">expand_more</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-space-sm self-end xl:self-end pt-2 xl:pt-0">
                <button
                  className="h-11 px-space-md rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface-variant font-label-md text-label-md flex items-center gap-2 transition-all active:scale-95 disabled:opacity-70"
                  disabled={refreshing}
                  onClick={handleRefresh}
                  title="Muat Ulang Data"
                  type="button"
                >
                  <span className={`material-symbols-outlined text-[18px] ${refreshing ? 'animate-spin' : ''}`}>sync</span>
                  <span>Perbarui Data</span>
                </button>
                <button
                  className="h-11 px-space-lg rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md flex items-center gap-2 shadow-sm transition-all active:scale-95"
                  onClick={() => alert('Menyiapkan berkas Ringkasan Evaluasi Literasi (PDF dan format CSV anonim)...')}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">download</span>
                  <span>Unduh Laporan (PDF/CSV)</span>
                </button>
              </div>
            </div>

            {/* Grid statistik utama */}
            {!isEmptyDemo && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md mb-space-xl">
                {STATS.map((s) => (
                  <div
                    className="bg-surface-white p-space-lg rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow"
                    key={s.label}
                  >
                    <div className="flex items-start justify-between">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.iconBox}`}>
                        <span className="material-symbols-outlined text-[24px]">{s.icon}</span>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm ${s.badge}`}>
                        <span className="material-symbols-outlined text-[14px]">{s.badgeIcon}</span>
                        {s.badgeText}
                      </span>
                    </div>
                    <div className="mt-space-md">
                      <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider block">{s.label}</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className={`font-display text-display leading-none ${s.valueClass}`}>{s.value}</span>
                        {s.suffix && <span className="font-headline-sm text-headline-sm text-text-muted">{s.suffix}</span>}
                      </div>
                      <p className="font-body-sm text-body-sm text-text-muted mt-space-xs flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        {s.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Section analitik */}
            {!isEmptyDemo && (
              <div className="flex flex-col gap-space-xl mb-space-xl">
                {/* Grafik batang */}
                <div className="bg-surface-white p-space-lg rounded-xl shadow-sm flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-md border-b border-surface-container-high">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[24px]">bar_chart</span>
                        <h2 className="font-headline-md text-headline-md text-primary tracking-tight">Rata-rata Skor Pre vs Post per Modus</h2>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Evaluasi efektivitas modul interaktif pada tiap jenis penipuan (Skala 0 - 10 poin).</p>
                    </div>
                    <div className="flex items-center gap-space-lg shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-secondary-fixed-dim" />
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">Pre-Test</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-primary-container" />
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">Post-Test</span>
                      </div>
                    </div>
                  </div>
                  <BarChart />
                </div>

                {/* Peringkat kerentanan */}
                <div className="bg-surface-white p-space-lg rounded-xl shadow-sm flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md border-b border-surface-container-high gap-space-sm">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-danger-red text-[24px]">crisis_alert</span>
                        <h2 className="font-headline-md text-headline-md text-primary tracking-tight">5 Skenario Paling Rentan</h2>
                      </div>
                      <p className="font-body-sm text-body-sm text-text-muted">Prioritas materi untuk penyuluhan atau pertemuan warga berikutnya berdasarkan rasio jawaban salah.</p>
                    </div>
                    <button
                      className="h-10 px-space-md rounded-lg bg-surface-cream hover:bg-warning-yellow-light text-primary font-label-md text-label-md flex items-center justify-center gap-2 transition-all shrink-0 self-start sm:self-auto"
                      onClick={() => alert('Mengunduh paket lembar edukasi A4: 5 Modus Penipuan Paling Rentan untuk bahan penyuluhan...')}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">menu_book</span>
                      <span>Unduh Materi Penyuluhan Khusus 5 Modus Ini (A4 PDF)</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md mt-space-lg">
                    {VULNERABILITIES.map((v) => (
                      <div
                        className="p-space-md rounded-xl bg-surface-cream hover:bg-surface-card-subtle transition-colors flex flex-col justify-between border border-border-subtle"
                        key={v.rank}
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between gap-space-sm mb-space-xs">
                            <div className="flex items-center gap-2">
                              <span className={`w-6 h-6 rounded-md font-label-sm text-label-sm flex items-center justify-center shrink-0 font-bold ${v.rankClass}`}>
                                #{v.rank}
                              </span>
                              <span className="font-label-md text-label-md text-on-surface font-bold">{v.title}</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold shrink-0 ${v.badgeClass}`}>{v.pct}% Salah</span>
                          </div>
                          <p className="font-body-sm text-body-sm text-text-muted line-clamp-2 mt-1">{v.desc}</p>
                        </div>
                        <div className="mt-space-md pt-space-sm border-t border-surface-container-high flex items-center justify-between gap-2">
                          <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden mr-2">
                            <div className={`h-full rounded-full ${v.barClass}`} style={{ width: `${v.pct}%` }} />
                          </div>
                          <button
                            className="px-2.5 py-1 rounded bg-surface-white hover:bg-surface-variant text-primary font-label-sm text-label-sm shrink-0 transition-all font-bold"
                            onClick={() =>
                              alert(
                                `Membuka rincian soal #${v.rank}: ${SCENARIO_TITLES[v.rank - 1]}\n\nAnda dapat meninjau naskah teks WhatsApp simulator, opsi jebakan, dan penjelasan edukasi yang ditampilkan.`
                              )
                            }
                            type="button"
                          >
                            Lihat Soal
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Empty state (simulasi kelompok tanpa data) */}
            {isEmptyDemo && (
              <div className="bg-surface-white rounded-xl p-space-2xl text-center shadow-sm mb-space-xl relative overflow-hidden">
                <div className="max-w-xl mx-auto flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary-container mb-space-md shadow-inner">
                    <span className="material-symbols-outlined text-[40px]">folder_off</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary tracking-tight mb-space-xs">Belum Ada Peserta di Kelompok Ini</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg leading-relaxed">
                    Kode kelas <span className="font-bold text-primary">{CLASS_CODE}</span> belum memiliki peserta yang menyelesaikan
                    pre-test atau post-test. Bagikan kode kelompok ini kepada warga binaan untuk mulai mengumpulkan data literasi.
                  </p>
                  <div className="bg-surface-cream p-space-lg rounded-xl flex flex-col sm:flex-row items-center justify-between gap-space-md w-full mb-space-lg">
                    <div className="flex items-center gap-space-md">
                      <span className="material-symbols-outlined text-primary text-[28px]">qr_code_2</span>
                      <div className="text-left">
                        <span className="font-label-sm text-label-sm text-text-muted uppercase tracking-wider block">Kode Masuk Peserta</span>
                        <span className="font-headline-md text-headline-md font-bold tracking-widest text-primary">{CLASS_CODE}</span>
                      </div>
                    </div>
                    <button
                      className={`h-11 px-space-lg rounded-lg font-label-md text-label-md flex items-center gap-2 transition-all active:scale-95 ${
                        copied ? 'bg-tertiary text-on-primary' : 'bg-primary-container hover:bg-primary text-on-primary'
                      }`}
                      onClick={handleCopy}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">{copied ? 'check' : 'content_copy'}</span>
                      <span>{copied ? 'Tersalin!' : 'Salin Tautan Gabung Cepat'}</span>
                    </button>
                  </div>
                  <button
                    className="font-label-md text-label-md text-primary hover:text-primary-container flex items-center gap-2 underline underline-offset-4 mx-auto"
                    onClick={() => alert('Mengunduh panduan tata cara pengerjaan pre & post-test untuk warga (1 lembar siap cetak)...')}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
                    <span>Unduh Panduan Cara Mengerjakan untuk Warga (1 Lembar PDF)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Footer operasional */}
            <div className="pt-space-lg border-t-0 flex flex-col md:flex-row items-center justify-between gap-space-md text-text-muted font-body-sm text-body-sm">
              <div className="flex items-center gap-space-md">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">security</span>
                  <span>Gerakan Edukasi Bersama Pengurus Lingkungan &amp; Satgas Edukasi Siber</span>
                </div>
                <span className="hidden md:inline">|</span>
                <a className="hover:text-primary transition-colors" href="#">Bantuan Teknis Pengelola</a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
