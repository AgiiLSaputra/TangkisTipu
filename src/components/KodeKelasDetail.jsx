import KodeKelasPeserta from './KodeKelasPeserta.jsx'
import { JALUR_META, formatTanggal } from '../data/setSoal.js'
import { STATUS_KODE } from '../data/kodeKelas.js'

// Panel detail hasil kelompok terpilih: ringkasan skor pre vs post,
// komparasi per modus tipuan, dan daftar peserta anonim di kolom kanan.
export default function KodeKelasDetail({ kelompok, onSalinKode = () => {}, onSalinPesan = () => {}, onBeritahu = () => {} }) {
  const jalur = JALUR_META[kelompok.jalur]
  const status = STATUS_KODE[kelompok.status]
  const { hasil } = kelompok
  const persenLulus = hasil.jumlah ? Math.round((hasil.lulus / hasil.jumlah) * 100) : 0
  const persenKenaikan = hasil.preRata ? Math.round((hasil.delta / hasil.preRata) * 100) : 0

  return (
    <section aria-label={`Hasil kelompok ${kelompok.kode}`} className="flex flex-col gap-space-lg">
      {/* Panel kepala kelompok */}
      <div className="bg-surface-white rounded-xl shadow-sm p-space-lg flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
        <div className="flex flex-col sm:flex-row sm:items-center gap-space-md">
          <div className="w-14 h-14 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-md shrink-0">
            <span aria-hidden="true" className="material-symbols-outlined text-[32px]">{jalur.icon}</span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="font-headline-md text-headline-md text-on-surface">{kelompok.nama}</span>
              <span className={`px-space-sm py-0.5 rounded-full font-label-sm text-label-sm font-bold ${status.pill}`}>
                Batch {status.label}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-space-md mt-space-xs text-text-muted font-body-sm text-body-sm">
              <span className="flex items-center gap-1">
                <span aria-hidden="true" className="material-symbols-outlined text-[16px]">pin</span>
                Kode Kelas: <strong className="text-on-surface font-mono">{kelompok.kode}</strong>
              </span>
              <span aria-hidden="true">•</span>
              <span className="flex items-center gap-1">
                <span aria-hidden="true" className="material-symbols-outlined text-[16px]">groups</span>
                Target Demografi: <strong className="text-on-surface">{`${jalur.label} (${jalur.usia})`}</strong>
              </span>
              <span aria-hidden="true">•</span>
              <span className="flex items-center gap-1">
                <span aria-hidden="true" className="material-symbols-outlined text-[16px]">event</span>
                Pelaksanaan: {kelompok.rilis ? formatTanggal(kelompok.rilis) : 'Belum dijadwalkan'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm">
          <button
            className="h-11 px-space-md rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-space-xs hover:bg-surface-container-highest transition-colors"
            onClick={() => onSalinKode(kelompok.kode)}
            type="button"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[18px]">content_copy</span>
            <span>Salin Kode</span>
          </button>
          <button
            className="h-11 px-space-md rounded-xl bg-secondary-container text-on-secondary-container font-label-md text-label-md font-bold flex items-center gap-space-xs shadow-sm hover:brightness-95 active:translate-y-0.5 transition-all"
            onClick={() => onSalinPesan(kelompok)}
            type="button"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[20px]">chat</span>
            <span>Salin Pesan Pengingat Tes Ulang</span>
          </button>
        </div>
      </div>

      {/* Dua kolom responsif */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Kolom kiri: ringkasan skor & grafik */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          <div className="bg-surface-white rounded-xl shadow-sm p-space-lg">
            <div className="flex items-center justify-between mb-space-md">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Evaluasi Peningkatan Skor</h3>
              <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-surface-card-subtle text-primary font-bold">
                Skala 1 - 10
              </span>
            </div>

            <div className="grid grid-cols-2 gap-space-md mb-space-lg">
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col">
                <span className="font-label-sm text-label-sm text-text-muted mb-space-xs">Rata-rata Pre-test</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg text-on-surface font-bold">{hasil.preRata}</span>
                  <span className="font-body-sm text-body-sm text-text-muted">/ 10</span>
                </div>
                <span className="font-label-sm text-label-sm text-danger-red mt-space-xs flex items-center gap-0.5">
                  <span aria-hidden="true" className="material-symbols-outlined text-[14px]">warning</span>
                  Tingkat rentan awal
                </span>
              </div>
              <div className="p-space-md rounded-xl bg-safe-green-light flex flex-col">
                <span className="font-label-sm text-label-sm text-tertiary mb-space-xs font-bold">Rata-rata Post-test</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg text-tertiary font-bold">{hasil.postRata}</span>
                  <span className="font-body-sm text-body-sm text-tertiary">/ 10</span>
                </div>
                <span className="font-label-sm text-label-sm text-tertiary mt-space-xs flex items-center gap-0.5 font-bold">
                  <span aria-hidden="true" className="material-symbols-outlined text-[14px]">arrow_upward</span>
                  {hasil.delta} Poin (+{persenKenaikan}%)
                </span>
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-card-subtle flex items-center gap-space-md mb-space-lg">
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg aria-hidden="true" className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-surface-container-highest" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
                  <path className="text-tertiary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${persenLulus}, 100`} strokeLinecap="round" strokeWidth="3.5" />
                </svg>
                <span className="absolute font-label-md text-label-md text-on-surface font-bold">{persenLulus}%</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface font-bold">{hasil.lulus} dari {hasil.jumlah} Peserta Lulus</span>
                <span className="font-body-sm text-body-sm text-text-muted mt-0.5">
                  Memenuhi batas kelulusan literasi keamanan digital (skor ≥ 8.0).
                </span>
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-danger-red-light flex items-start gap-space-sm">
              <span aria-hidden="true" className="material-symbols-outlined text-danger-red text-[22px] shrink-0 mt-0.5">crisis_alert</span>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-danger-red font-bold">Skenario Paling Rawan: {hasil.rawan.label}</span>
                <p className="font-body-sm text-body-sm text-on-surface mt-space-xs">{hasil.rawan.rawan}</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-white rounded-xl shadow-sm p-space-lg">
            <div className="flex items-center justify-between mb-space-md">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Komparasi per Modus Tipuan</h3>
                <p className="font-body-sm text-body-sm text-text-muted">Perbandingan rata-rata skor tiap topik materi</p>
              </div>
              <div className="flex items-center gap-space-sm font-label-sm text-label-sm">
                <span className="flex items-center gap-1 text-text-muted">
                  <span aria-hidden="true" className="w-3 h-3 rounded-sm bg-surface-container-highest inline-block"></span>
                  Pre
                </span>
                <span className="flex items-center gap-1 text-tertiary font-bold">
                  <span aria-hidden="true" className="w-3 h-3 rounded-sm bg-primary inline-block"></span> Post
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-space-md">
              {hasil.modus.map((m) => {
                const rawan = m.label === hasil.rawan.label
                return (
                  <div className="flex flex-col gap-1" key={m.label}>
                    <div className="flex justify-between font-label-sm text-label-sm">
                      <span className={`flex items-center gap-1 ${rawan ? 'text-danger-red font-bold' : 'text-on-surface font-bold'}`}>
                        {rawan && <span aria-hidden="true" className="material-symbols-outlined text-[14px]">flag</span>}
                        {m.label}
                      </span>
                      <span className={`font-bold ${rawan ? 'text-danger-red' : 'text-tertiary'}`}>
                        {m.pre} → {m.post} (+{m.delta})
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-low rounded-full h-3 flex overflow-hidden">
                      <div className="bg-surface-container-highest h-full" style={{ width: `${m.pre * 10}%` }}></div>
                      <div className={`${rawan ? 'bg-danger-red' : 'bg-primary'} h-full`} style={{ width: `${m.delta * 10}%` }}></div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-space-md pt-space-md bg-surface-container-low/50 rounded-lg p-space-sm flex items-center gap-space-xs text-text-muted font-label-sm text-label-sm">
              <span aria-hidden="true" className="material-symbols-outlined text-[16px]">info</span>
              <span>Uji kompetensi menggunakan 12 simulasi skenario interaktif berbasis chat.</span>
            </div>
          </div>
        </div>

        {/* Kolom kanan: progres peserta anonim */}
        <div className="lg:col-span-7">
          <KodeKelasPeserta kelompok={kelompok} onBeritahu={onBeritahu} />
        </div>
      </div>
    </section>
  )
}
