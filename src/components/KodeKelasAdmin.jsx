import { useEffect, useMemo, useState } from 'react'
import AdminShell from './AdminShell.jsx'
import KodeKelasDetail from './KodeKelasDetail.jsx'
import KodeKelasHeader from './KodeKelasHeader.jsx'
import KodeKelasStats from './KodeKelasStats.jsx'
import KodeKelasTable from './KodeKelasTable.jsx'
import { daftarKelompok, pesanPengingat } from '../data/kodeKelas.js'

const FILTER_AWAL = { q: '', tab: 'semua' }

// Halaman admin Kode Kelas: daftar kelompok komunitas + hasil belajarnya.
// Sumber datanya adalah kode kelas pada set soal milik App, jadi halaman ini
// otomatis mengikuti setiap perubahan di halaman Set Soal (buat/hapus/duplikat).
export default function KodeKelasAdmin({ sets = [], onNavigate = () => {}, onKeluar = () => {} }) {
  const [filters, setFilters] = useState(FILTER_AWAL)
  const [kodeTerpilih, setKodeTerpilih] = useState(null)
  const [statusManual, setStatusManual] = useState({})
  const [pesan, setPesan] = useState('')

  useEffect(() => {
    if (!pesan) return
    const timer = window.setTimeout(() => setPesan(''), 3200)
    return () => window.clearTimeout(timer)
  }, [pesan])

  const beritahu = (teks) => setPesan(teks)
  const keDetail = () =>
    window.setTimeout(
      () => document.getElementById('detail-kelas')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      60
    )

  const kelompok = useMemo(() => daftarKelompok(sets, statusManual), [sets, statusManual])
  const terpilih = kelompok.find((k) => k.kode === kodeTerpilih) || kelompok[0] || null

  const terlihat = kelompok.filter((k) => {
    const kata = filters.q.trim().toLowerCase()
    const cocokQ =
      !kata ||
      k.nama.toLowerCase().includes(kata) ||
      k.kode.toLowerCase().includes(kata) ||
      k.catatan.toLowerCase().includes(kata)
    const cocokTab = filters.tab === 'semua' || k.status === filters.tab
    return cocokQ && cocokTab
  })

  const hitungTab = (id) => (id === 'semua' ? kelompok.length : kelompok.filter((k) => k.status === id).length)

  const ubahFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }))

  const salinTeks = async (teks, info) => {
    try {
      await navigator.clipboard.writeText(teks)
      beritahu(info)
    } catch {
      beritahu('Peramban menolak akses papan klip. Salin manual ya.')
    }
  }

  const salinKode = (kode) => salinTeks(kode, `Kode kelas ${kode} disalin ke papan klip.`)

  const salinPesan = (kelompokTerpilih) =>
    salinTeks(pesanPengingat(kelompokTerpilih), `Pesan pengingat tes ulang kelas ${kelompokTerpilih.kode} disalin.`)

  const pilihKode = (kode) => {
    setKodeTerpilih(kode)
    keDetail()
  }

  const nonaktifkan = (kode) => {
    setStatusManual((prev) => ({ ...prev, [kode]: 'selesai' }))
    beritahu(`Sesi kelas ${kode} dinonaktifkan dan masuk arsip.`)
  }

  return (
    <AdminShell active="kode-kelas" onKeluar={onKeluar} onNavigate={onNavigate}>
      <main className="w-full pt-16 bg-surface-cream px-space-xl py-space-xl">
        <div className="flex flex-col w-full gap-space-2xl">
          <KodeKelasHeader onBuatKode={() => onNavigate('set-soal')} />
          <KodeKelasStats kelompok={kelompok} />
          <KodeKelasTable
            hitungTab={hitungTab}
            kelompok={terlihat}
            kodeTerpilih={terpilih?.kode || null}
            onBuatKode={() => onNavigate('set-soal')}
            onNonaktifkan={nonaktifkan}
            onPilih={pilihKode}
            onSalin={salinKode}
            onUbahFilter={ubahFilter}
            q={filters.q}
            tab={filters.tab}
          />
          <div className="scroll-mt-20" id="detail-kelas">
            {terpilih && (
              <KodeKelasDetail
                kelompok={terpilih}
                onBeritahu={beritahu}
                onSalinKode={salinKode}
                onSalinPesan={salinPesan}
              />
            )}
          </div>
        </div>
      </main>

      {pesan && (
        <div
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 pop-in bg-surface-white text-on-surface font-label-md text-label-md px-space-md py-space-sm rounded-xl shadow-lg flex items-center gap-space-sm max-w-[calc(100%-3rem)]"
          role="status"
        >
          <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
          <span>{pesan}</span>
        </div>
      )}
    </AdminShell>
  )
}
