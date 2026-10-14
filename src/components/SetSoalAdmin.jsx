import { useEffect, useMemo, useState } from 'react'
import AdminShell from './AdminShell.jsx'
import SetSoalCreateModal from './SetSoalCreateModal.jsx'
import SetSoalEditor from './SetSoalEditor.jsx'
import SetSoalHeader from './SetSoalHeader.jsx'
import SetSoalStats from './SetSoalStats.jsx'
import SetSoalTable from './SetSoalTable.jsx'
import { DAFTAR_SOAL, MAKS_SOAL, SET_SOAL, SOAL_KOSONG, formatTanggal } from '../data/setSoal.js'

const FILTER_AWAL = { q: '', jalur: '', tipe: '', status: '' }

export default function SetSoalAdmin({
  sets = SET_SOAL,
  setSets = () => {},
  bankSoal = null,
  setBankSoal = () => {},
  onNavigate = () => {},
  onKeluar = () => {},
}) {
  const [bank, setBank] = useState(() =>
    bankSoal || sets.reduce((acc, s) => ({ ...acc, [s.id]: DAFTAR_SOAL }), {})
  )
  const [filters, setFilters] = useState(FILTER_AWAL)
  const [aktifId, setAktifId] = useState('SET-DWS-RET-04')
  const [idxSoal, setIdxSoal] = useState(3)
  const [pesan, setPesan] = useState('')
  const [modalBuat, setModalBuat] = useState(false)

  // Bank soal ikut disimpan ke App supaya tidak hilang saat pindah halaman.
  useEffect(() => {
    setBankSoal(bank)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bank])

  useEffect(() => {
    if (!pesan) return
    const timer = window.setTimeout(() => setPesan(''), 3200)
    return () => window.clearTimeout(timer)
  }, [pesan])

  const beritahu = (teks) => setPesan(teks)
  const keEditor = () =>
    window.setTimeout(
      () => document.getElementById('editor-set-soal')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      60
    )

  const terlihat = useMemo(() => {
    const q = filters.q.trim().toLowerCase()
    return sets.filter((s) => {
      const cocokQ =
        !q ||
        s.nama.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.catatan.toLowerCase().includes(q)
      const cocokJalur = !filters.jalur || s.jalur === filters.jalur
      const cocokTipe = !filters.tipe || s.tipe === filters.tipe
      const cocokStatus = !filters.status || s.status === filters.status
      return cocokQ && cocokJalur && cocokTipe && cocokStatus
    })
  }, [sets, filters])

  const setAktif = sets.find((s) => s.id === aktifId) || null
  const daftarSoal = (setAktif && bank[setAktif.id]) || []
  const idxAman = Math.min(idxSoal, Math.max(0, daftarSoal.length - 1))

  const hitungSoal = (id) => bank[id]?.length ?? 0

  /* ---- Aksi tabel ---- */
  const pilihSet = (id) => {
    setAktifId(id)
    setIdxSoal(0)
    keEditor()
  }

  const duplikatSet = (id) => {
    const asal = sets.find((s) => s.id === id)
    if (!asal) return
    const baru = { ...asal, id: `${asal.id}-SALIN`, nama: `${asal.nama} (Salinan)`, status: 'draf', rilis: '' }
    const i = sets.findIndex((s) => s.id === id)
    const salinan = [...sets]
    salinan.splice(i + 1, 0, baru)
    setSets(salinan)
    setBank((prev) => ({ ...prev, [baru.id]: [...(prev[id] || [])] }))
    beritahu(`Set "${asal.nama}" diduplikasi menjadi draf baru.`)
  }

  const hapusSet = (id) => {
    const asal = sets.find((s) => s.id === id)
    if (!asal) return
    if (!window.confirm(`Hapus set soal "${asal.nama}"? Tindakan ini tidak bisa dibatalkan.`)) return
    const sisa = sets.filter((s) => s.id !== id)
    setSets(sisa)
    setBank((prev) => {
      const salinan = { ...prev }
      delete salinan[id]
      return salinan
    })
    if (aktifId === id) setAktifId(sisa[0]?.id || null)
    beritahu('Set soal dihapus dari daftar.')
  }

  const buatSetBaru = (form) => {
    let nomor = sets.length + 1
    let id = `SET-BARU-${String(nomor).padStart(2, '0')}`
    while (sets.some((s) => s.id === id)) {
      nomor += 1
      id = `SET-BARU-${String(nomor).padStart(2, '0')}`
    }
    const baru = {
      id,
      nama: form.nama,
      catatan: form.catatan,
      jalur: form.jalur,
      tipe: form.tipe,
      kodeKelas: form.kodeKelas || '',
      rilis: form.rilis,
      tutup: form.tutup || '',
      status: 'draf',
    }
    setSets((prev) => [...prev, baru])
    setBank((prev) => ({ ...prev, [id]: [{ ...SOAL_KOSONG, id: 1 }] }))
    setFilters(FILTER_AWAL)
    setAktifId(id)
    setIdxSoal(0)
    setModalBuat(false)
    beritahu(`Set "${baru.nama}" dibuat sebagai draf.`)
    keEditor()
  }

  /* ---- Aksi form parameter set ---- */
  const ubahSet = (field, value) => {
    if (!setAktif) return
    setSets((prev) => prev.map((s) => (s.id === setAktif.id ? { ...s, [field]: value } : s)))
  }

  const ubahFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }))

  /* ---- Aksi editor soal ---- */
  const ubahBank = (fn) => {
    if (!setAktif) return
    setBank((prev) => ({ ...prev, [setAktif.id]: fn(prev[setAktif.id] || []) }))
  }

  // Ringkasan di daftar soal ikut menyesuaikan dengan naskah pertanyaan terbaru.
  const ringkasDari = (teks) => {
    const bersih = teks.trim().replace(/\s+/g, ' ')
    if (!bersih) return 'Belum ada naskah soal...'
    return bersih.length > 46 ? `${bersih.slice(0, 46).trimEnd()}...` : bersih
  }

  const ubahSoal = (field, value) =>
    ubahBank((list) =>
      list.map((s, i) =>
        i === idxAman
          ? { ...s, [field]: value, ...(field === 'pertanyaan' ? { ringkas: ringkasDari(value) } : {}) }
          : s
      )
    )

  const ubahOpsi = (iOpsi, value) =>
    ubahBank((list) =>
      list.map((s, i) =>
        i === idxAman ? { ...s, opsi: s.opsi.map((o, j) => (j === iOpsi ? value : o)) } : s
      )
    )

  const pilihKunci = (iOpsi) =>
    ubahBank((list) => list.map((s, i) => (i === idxAman ? { ...s, kunci: iOpsi } : s)))

  // Menyimpan soal aktif lalu membuka soal baru berikutnya.
  // Dipakai tombol "Simpan & Tambah Soal" di ujung kanan bawah editor.
  const tambahSoal = () => {
    if (daftarSoal.length >= MAKS_SOAL) return
    const nomorKini = idxAman + 1
    const tersimpan = daftarSoal[idxAman]?.pertanyaan.trim() ? true : false
    ubahBank((list) => [...list, { ...SOAL_KOSONG, id: (list[list.length - 1]?.id || 0) + 1 }])
    setIdxSoal(daftarSoal.length)
    beritahu(
      tersimpan
        ? `Soal nomor ${nomorKini} tersimpan. Soal nomor ${nomorKini + 1} siap diisi.`
        : `Soal nomor ${nomorKini + 1} ditambahkan. Silakan lengkapi naskahnya.`
    )
  }

  const hapusSoal = () => {
    if (daftarSoal.length <= 1) {
      beritahu('Set harus memiliki minimal satu soal.')
      return
    }
    if (!window.confirm(`Hapus soal nomor ${idxAman + 1}?`)) return
    ubahBank((list) => list.filter((_, i) => i !== idxAman))
    setIdxSoal(Math.max(0, idxAman - 1))
    beritahu(`Soal nomor ${idxAman + 1} dihapus.`)
  }

  const perbaruiSoal = () => {
    if (!daftarSoal[idxAman]?.pertanyaan.trim()) {
      beritahu('Naskah pertanyaan masih kosong.')
      return
    }
    beritahu(`Perubahan soal nomor ${idxAman + 1} tersimpan.`)
  }

  // Menyisipkan rujukan sumber resmi ke kolom ulasan soal aktif.
  const sisipTautan = () => {
    const soal = daftarSoal[idxAman]
    if (!soal) return
    const tautan = window.prompt(
      'Masukkan tautan rujukan resmi (OJK, Satgas PASTI, Komdigi, atau Polri):',
      'https://ojk.go.id'
    )
    if (!tautan) return
    const baris = `Sumber: ${tautan.trim()}`
    const ulasanBaru = soal.ulasan.trim() ? `${soal.ulasan.trim()}\n${baris}` : baris
    ubahSoal('ulasan', ulasanBaru)
    beritahu('Tautan rujukan disisipkan ke kolom ulasan soal.')
  }

  const simpanDraf = () => beritahu('Perubahan set soal disimpan sebagai draf.')

  const rilisSet = () => {
    if (!setAktif) return
    if (setAktif.rilis && setAktif.tutup && setAktif.tutup < setAktif.rilis) {
      beritahu('Tanggal tutup tidak boleh sebelum tanggal rilis.')
      return
    }
    if (!setAktif.kodeKelas.trim()) {
      beritahu('Isi kode kelas dulu agar set hanya bisa diakses peserta yang tepat.')
      return
    }
    if (setAktif.rilis) {
      ubahSet('status', 'terjadwal')
      beritahu(
        `Set dijadwalkan rilis ${formatTanggal(setAktif.rilis)}${
          setAktif.tutup ? ` dan ditutup ${formatTanggal(setAktif.tutup)}` : ''
        }.`
      )
    } else {
      ubahSet('status', 'aktif')
      beritahu('Set dirilis dan langsung aktif untuk peserta.')
    }
  }

  return (
    <AdminShell active="set-soal" onKeluar={onKeluar} onNavigate={onNavigate}>
      <main className="w-full pt-16 bg-surface-cream px-space-xl py-space-xl">
        <div className="flex flex-col w-full gap-space-2xl">
          <SetSoalHeader onBuatBaru={() => setModalBuat(true)} />
          <SetSoalStats sets={sets} />
          <SetSoalTable
            aktifId={aktifId}
            filters={filters}
            hitungSoal={hitungSoal}
            onDuplikat={duplikatSet}
            onEdit={pilihSet}
            onHapus={hapusSet}
            onUbahFilter={ubahFilter}
            sets={terlihat}
          />
          <SetSoalEditor
            daftarSoal={daftarSoal}
            idxSoal={idxAman}
            onHapusSoal={hapusSoal}
            onPilihKunci={pilihKunci}
            onPilihSoal={setIdxSoal}
            onPerbarui={perbaruiSoal}
            onRilis={rilisSet}
            onSimpanDraf={simpanDraf}
            onSisipTautan={sisipTautan}
            onTambahSoal={tambahSoal}
            onUbahOpsi={ubahOpsi}
            onUbahSet={ubahSet}
            onUbahSoal={ubahSoal}
            set={setAktif}
          />
        </div>
      </main>

      {modalBuat && <SetSoalCreateModal onBatal={() => setModalBuat(false)} onKonfirmasi={buatSetBaru} />}

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
