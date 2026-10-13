// Empat kartu ringkasan halaman Kode Kelas — pola & teks kartu mengikuti
// kartu statistik halaman Set Soal (label, nilai, catatan berikon).

function rerata(angka) {
  if (!angka.length) return 0
  return Math.round((angka.reduce((a, b) => a + b, 0) / angka.length) * 10) / 10
}

export default function KodeKelasStats({ kelompok = [] }) {
  const semua = kelompok.flatMap((k) => k.hasil.peserta)
  const aktif = kelompok.filter((k) => k.status === 'aktif' || k.status === 'terjadwal').length
  const preRata = rerata(semua.map((p) => p.pre))
  const postRata = rerata(semua.filter((p) => p.post !== null).map((p) => p.post))
  const kenaikan = Math.round((postRata - preRata) * 10) / 10
  const selesaiPost = semua.filter((p) => p.post !== null).length
  const persen = semua.length ? Math.round((selesaiPost / semua.length) * 100) : 0

  const kartu = [
    {
      label: 'Total Kelompok Komunitas',
      nilai: kelompok.length,
      catatan: `${aktif} kode aktif dipakai peserta`,
      ikon: 'diversity_3',
      nada: 'text-primary',
      badgeClass: 'bg-safe-green-light text-tertiary',
      badgeIkon: 'check_circle',
    },
    {
      label: 'Total Peserta Tergabung',
      nilai: semua.length,
      catatan: 'Seluruh identitas tersimpan anonim',
      ikon: 'badge',
      nada: 'text-primary',
      badgeClass: 'bg-safe-green-light text-tertiary',
      badgeIkon: 'groups',
    },
    {
      label: 'Rata-rata Kenaikan Skor',
      nilai: `+${kenaikan} Poin`,
      catatan: `Dari rata-rata pre-test ${preRata} ke post-test ${postRata}`,
      ikon: 'moving',
      nada: 'text-tertiary',
      badgeClass: 'bg-safe-green-light text-tertiary',
      badgeIkon: 'trending_up',
    },
    {
      label: 'Penyelesaian Post-test',
      nilai: `${persen}%`,
      catatan: `${selesaiPost} dari ${semua.length} peserta menuntaskan post-test`,
      ikon: 'task_alt',
      nada: persen >= 80 ? 'text-tertiary' : 'text-secondary',
      badgeClass: persen >= 80 ? 'bg-safe-green-light text-tertiary' : 'bg-warning-yellow-light text-secondary',
      badgeIkon: persen >= 80 ? 'task_alt' : 'schedule',
    },
  ]

  return (
    <section aria-label="Ringkasan kelompok komunitas" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
      {kartu.map((k) => (
        <div
          className="bg-surface-white p-space-lg rounded-xl shadow-sm flex items-center justify-between gap-space-md hover:shadow-md transition-shadow"
          key={k.label}
        >
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm text-text-muted">{k.label}</span>
            <span className={`font-display text-headline-lg ${k.nada} mt-1`}>{k.nilai}</span>
            <span className={`inline-flex items-center gap-1 mt-1 font-label-sm text-label-sm ${k.badgeClass}`}>
              <span aria-hidden="true" className="material-symbols-outlined text-[14px]">{k.badgeIkon}</span>
              {k.catatan}
            </span>
          </div>
          <div className={`w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0 ${k.nada}`}>
            <span aria-hidden="true" className="material-symbols-outlined text-[26px]">{k.ikon}</span>
          </div>
        </div>
      ))}
    </section>
  )
}
