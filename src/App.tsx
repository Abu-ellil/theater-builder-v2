import { useState, useEffect } from 'react'
import { Trash2, Download, Eye, Plus, X, MousePointer2, Ban, Pin, Palette, Settings2, LayoutGrid } from 'lucide-react'
import type { Section, Tool, Row } from './types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


function App() {
  const [sections, setSections] = useState<Section[]>([])
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null)
  const [editingSectionId, setEditingSectionId] = useState<number | null>(null)
  const [currentTool, setCurrentTool] = useState<Tool>('select')
  const [theaterName, setTheaterName] = useState('')
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  // Form State
  const [formName, setFormName] = useState('')
  const [formColor, setFormColor] = useState('#e57373')
  const [formRowIndex, setFormRowIndex] = useState(0)
  const [formCurve, setFormCurve] = useState(0)
  const [formSkew, setFormSkew] = useState(0)
  const [formSeatSize, setFormSeatSize] = useState(18)
  const [formSeatGap, setFormSeatGap] = useState(2)

  // Row Form State
  const [rowName, setRowName] = useState('')
  const [rowSeats, setRowSeats] = useState(10)
  const [rowAisles, setRowAisles] = useState(0)

  const selectedSection = sections.find(s => s.id === selectedSectionId)
  const editingSection = sections.find(s => s.id === editingSectionId)

  // Sync editing form
  useEffect(() => {
    if (editingSection) {
      setFormName(editingSection.name)
      setFormColor(editingSection.color)
      setFormRowIndex(editingSection.rowIndex)
      setFormCurve(editingSection.curve)
      setFormSkew(editingSection.skew)
      setFormSeatSize(editingSection.seatSize)
      setFormSeatGap(editingSection.seatGap)
    } else {
      resetForm()
    }
  }, [editingSectionId])

  const resetForm = () => {
    setFormName('')
    setFormColor('#e57373')
    setFormRowIndex(0)
    setFormCurve(0)
    setFormSkew(0)
    setFormSeatSize(18)
    setFormSeatGap(2)
    setEditingSectionId(null)
  }

  const handleSaveSection = () => {
    if (editingSectionId) {
      setSections(prev => prev.map(s => s.id === editingSectionId ? {
        ...s,
        name: formName || `Section ${sections.length + 1}`,
        color: formColor,
        rowIndex: formRowIndex,
        curve: formCurve,
        skew: formSkew,
        seatSize: formSeatSize,
        seatGap: formSeatGap,
      } : s))
      setEditingSectionId(null)
    } else {
      const newSection: Section = {
        id: Date.now(),
        name: formName || `Section ${sections.length + 1}`,
        color: formColor,
        rowIndex: formRowIndex,
        curve: formCurve,
        skew: formSkew,
        seatSize: formSeatSize,
        seatGap: formSeatGap,
        rows: []
      }
      setSections(prev => [...prev, newSection])
    }
    resetForm()
  }

  const handleDeleteSection = (id: number) => {
    setSections(prev => prev.filter(s => s.id !== id))
    if (selectedSectionId === id) setSelectedSectionId(null)
    if (editingSectionId === id) resetForm()
  }

  const getNextRowName = (section: Section) => {
    if (section.rows.length === 0) return 'A'
    const last = section.rows[section.rows.length - 1].name
    if (last.length === 1 && last.charCodeAt(0) >= 65 && last.charCodeAt(0) < 90) {
      return String.fromCharCode(last.charCodeAt(0) + 1)
    }
    return `R${section.rows.length + 1}`
  }

  const handleAddRow = () => {
    if (!selectedSectionId) return
    setSections(prev => prev.map(s => {
      if (s.id === selectedSectionId) {
        const name = rowName || getNextRowName(s)
        const newRow: Row = {
          id: Date.now(),
          name,
          aisles: rowAisles,
          seats: Array.from({ length: rowSeats }, (_, i) => ({
            number: i + 1,
            status: 'available'
          }))
        }
        return { ...s, rows: [...s.rows, newRow] }
      }
      return s
    }))
    setRowName('')
  }

  const handleDeleteRow = (sectionId: number, rowId: number) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        return { ...s, rows: s.rows.filter(r => r.id !== rowId) }
      }
      return s
    }))
  }

  const handleSeatClick = (sectionId: number, rowId: number, seatNumber: number) => {
    if (currentTool === 'select') return

    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          rows: s.rows.map(r => {
            if (r.id === rowId) {
              return {
                ...r,
                seats: r.seats.map(seat => {
                  if (seat.number === seatNumber) {
                    if (currentTool === 'skip') {
                      return { ...seat, status: seat.status === 'skipped' ? 'available' : 'skipped' }
                    } else if (currentTool === 'pin') {
                      return { ...seat, status: seat.status === 'pinned' ? 'available' : 'pinned' }
                    }
                  }
                  return seat
                })
              }
            }
            return r
          })
        }
      }
      return s
    }))
  }

  const clearAll = () => {
    if (confirm('هل أنت متأكد من مسح جميع البيانات؟')) {
      setSections([])
      setSelectedSectionId(null)
      setEditingSectionId(null)
      setTheaterName('')
    }
  }

  const exportData = () => {
    const data = {
      theaterName,
      sections,
      exportedAt: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${theaterName || 'theater'}-layout.json`
    a.click()
  }

  // Stats
  const totalSeats = sections.reduce((sum, s) => sum + s.rows.reduce((rSum, r) => rSum + r.seats.length, 0), 0)
  const totalRows = sections.reduce((sum, s) => sum + s.rows.length, 0)

  // Group sections by rowIndex
  const rowGroups: Record<number, Section[]> = {}
  sections.forEach(s => {
    const idx = s.rowIndex || 0
    if (!rowGroups[idx]) rowGroups[idx] = []
    rowGroups[idx].push(s)
  })
  const sortedRowIndices = Object.keys(rowGroups).map(Number).sort((a, b) => a - b)


  if (isPreviewMode) {
    return (
      <div className="flex flex-col min-h-screen font-cairo bg-[#0f172a] text-white overflow-hidden">
        <header className="flex items-center justify-between px-5 py-3 bg-white/5 backdrop-blur-md border-b border-white/10 z-50">
          <div className="flex items-center gap-3 font-bold">
            <span className="text-xl">🎭</span>
            <span>معاينة: {theaterName || 'مسرح جديد'}</span>
          </div>
          <button 
            onClick={() => setIsPreviewMode(false)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-sm font-semibold hover:bg-white/20 transition-all"
          >
            <X size={18} /> إغلاق المعاينة
          </button>
        </header>

        <main className="flex-1 relative overflow-auto p-10 flex flex-col items-center">
          {/* Stage */}
          <div className="w-full max-w-4xl mb-20 relative">
            <div className="h-10 bg-gradient-to-b from-slate-700 to-slate-800 rounded-t-[50%] opacity-40 blur-sm" />
            <div className="h-4 bg-slate-600 rounded-t-[50%] border-t border-white/20 flex items-center justify-center text-[10px] tracking-[5px] text-white/40 font-bold uppercase">STAGE / المسرح</div>
          </div>

          {/* Layout Render */}
          <div className="flex flex-col gap-12 items-center w-full max-w-7xl pb-40">
            {sortedRowIndices.map(rowIndex => (
              <div key={rowIndex} className="flex flex-col gap-10 items-center w-full">
                {rowGroups[rowIndex].map(section => (
                  <div 
                    key={section.id} 
                    className="flex flex-col gap-2 items-center transition-all"
                    style={{ 
                      transform: `perspective(1000px) rotateX(${section.skew}deg)`
                    }}
                  >
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{section.name}</div>
                    <div className="flex flex-col gap-[2px]">
                      {section.rows.map(row => (
                        <div key={row.id} className="flex gap-4 items-center justify-center">
                          <div className="flex" style={{ gap: `${section.seatGap}px` }}>
                            {Array.from({ length: row.aisles + 1 }).map((_, gi) => {
                              const groupSize = Math.ceil(row.seats.length / (row.aisles + 1))
                              const group = row.seats.slice(gi * groupSize, (gi + 1) * groupSize)
                              
                              return (
                                <div key={gi} className="flex" style={{ gap: `${section.seatGap}px` }}>
                                  {group.map((seat, si) => {
                                    const totalInRow = row.seats.length
                                    const globalIdx = gi * groupSize + si
                                    const normalized = totalInRow > 1 ? (globalIdx - (totalInRow - 1) / 2) / ((totalInRow - 1) / 2) : 0
                                    const yOffset = Math.pow(normalized, 2) * (section.curve / 100) * 15
                                    const rotation = normalized * (section.curve / 100) * 10
                                    
                                    if (seat.status === 'skipped') return (
                                      <div 
                                        key={seat.number}
                                        style={{ 
                                          width: `${section.seatSize}px`, 
                                          height: `${section.seatSize}px`,
                                          transform: `translateY(-${yOffset}px) rotate(${rotation}deg)`
                                        }}
                                      />
                                    )

                                    return (
                                      <div 
                                        key={seat.number}
                                        className={cn(
                                          "flex items-center justify-center font-bold text-white/70 transition-all z-0",
                                          seat.status === 'pinned' && "border-2 border-amber-400"
                                        )}
                                        style={{ 
                                          backgroundColor: section.color,
                                          width: `${section.seatSize}px`, 
                                          height: `${section.seatSize}px`,
                                          fontSize: `${Math.max(7, Math.floor(section.seatSize * 0.4))}px`,
                                          borderRadius: '0px',
                                          transform: `translateY(-${yOffset}px) rotate(${rotation}deg)`
                                        }}
                                      >
                                        {seat.number}
                                      </div>
                                    )
                                  })}
                                  {gi < row.aisles && <div style={{ width: `${section.seatSize * 1.5}px` }} />}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-lg border-t border-white/10 flex justify-center gap-10">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-white/40 font-bold uppercase">إجمالي المقاعد</span>
            <span className="text-xl font-bold">{totalSeats}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-white/40 font-bold uppercase">الأقسام</span>
            <span className="text-xl font-bold">{sections.length}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-white/40 font-bold uppercase">الصفوف</span>
            <span className="text-xl font-bold">{totalRows}</span>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden font-cairo bg-[#020617]">
      {/* Sidebar / Control Panel */}
      <aside className="w-[380px] h-full glass-panel border-l border-white/10 flex flex-col z-40 shadow-2xl">
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-inner">
              <span className="text-xl">🎭</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">منشئ المسارح</h1>
              <p className="text-[10px] text-white/40 font-semibold uppercase tracking-[2px]">Theater Architect v2</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-5 space-y-6">
            {/* Project Info Section */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-white/30 uppercase tracking-widest mr-1">معلومات المشروع</label>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="اسم المسرح..." 
                  value={theaterName}
                  onChange={(e) => setTheaterName(e.target.value)}
                  className="w-full input-glass pr-10 h-11"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                  <Palette size={18} />
                </div>
              </div>
            </div>

            {/* Section Form */}
            <div className="glass-card rounded-2xl p-5 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-primary rounded-full" />
                  {editingSectionId ? 'تعديل قسم' : 'إضافة قسم جديد'}
                </h3>
                {editingSectionId && (
                  <button onClick={resetForm} className="text-[10px] text-white/40 hover:text-white transition-colors">إلغاء</button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 mr-1">اسم القسم</label>
                  <input 
                    className="w-full input-glass h-10" 
                    placeholder="مثال: الواجهة" 
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 mr-1">لون المقاعد</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      className="w-10 h-10 rounded-lg bg-transparent cursor-pointer border-none"
                      value={formColor}
                      onChange={(e) => setFormColor(e.target.value)}
                    />
                    <input 
                      className="flex-1 input-glass h-10 text-[10px] uppercase font-mono" 
                      value={formColor}
                      onChange={(e) => setFormColor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 mr-1">موضع البداية (Y)</label>
                  <input 
                    type="number" 
                    className="w-full input-glass h-10" 
                    value={formRowIndex}
                    onChange={(e) => setFormRowIndex(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 mr-1">حجم المقعد</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      className="w-full input-glass h-10 pr-2" 
                      value={formSeatSize}
                      onChange={(e) => setFormSeatSize(Number(e.target.value))}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-white/20">PX</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 mr-1">تباعد المقاعد</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      className="w-full input-glass h-10 pr-2" 
                      value={formSeatGap}
                      onChange={(e) => setFormSeatGap(Number(e.target.value))}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-white/20">PX</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 mr-1">الانحناء (Curve)</label>
                  <input 
                    type="range" min="-100" max="100" 
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                    value={formCurve}
                    onChange={(e) => setFormCurve(Number(e.target.value))}
                  />
                  <div className="text-[10px] text-center text-white/30">{formCurve}%</div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 mr-1">الميلان (Skew)</label>
                  <input 
                    type="range" min="-45" max="45" 
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                    value={formSkew}
                    onChange={(e) => setFormSkew(Number(e.target.value))}
                  />
                  <div className="text-[10px] text-center text-white/30">{formSkew}°</div>
                </div>
              </div>

              <button 
                onClick={handleSaveSection}
                className="w-full btn-primary h-11"
              >
                {editingSectionId ? <><Eye size={18} /> تحديث القسم</> : <><Plus size={18} /> إنشاء القسم</>}
              </button>
            </div>

          {/* Section List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <label className="text-[11px] font-bold text-white/30 uppercase tracking-widest">الأقسام المضافة</label>
              <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">{sections.length}</span>
            </div>
            
            <div className="space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar pr-1">
              {sections.length === 0 ? (
                <div className="glass-card rounded-xl p-8 flex flex-col items-center justify-center border-dashed border-white/10">
                  <span className="text-2xl mb-2 opacity-20">🎟️</span>
                  <p className="text-[10px] text-white/30 font-bold">لا توجد أقسام بعد</p>
                </div>
              ) : (
                sections.map(s => (
                  <div 
                    key={s.id}
                    onClick={() => setSelectedSectionId(s.id)}
                    className={cn(
                      "group glass-card rounded-xl p-3 cursor-pointer transition-all duration-300",
                      selectedSectionId === s.id ? "ring-2 ring-primary/50 bg-primary/10" : "hover:bg-white/10"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-10 rounded-full" style={{ backgroundColor: s.color }} />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white truncate">{s.name}</div>
                        <div className="text-[10px] text-white/40 flex items-center gap-2">
                          <span>{s.rows.length} صفوف</span>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <span>{s.rows.reduce((sum, r) => sum + r.seats.length, 0)} مقعد</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setEditingSectionId(s.id); }}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                        >
                          <Settings2 size={14} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDeleteSection(s.id); }}
                          className="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500 flex items-center justify-center text-red-400 hover:text-white transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Row Form */}
          {selectedSection && (
            <div className="glass-card rounded-2xl p-5 space-y-4 border-primary/20 bg-primary/5 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <LayoutGrid size={16} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">إضافة صفوف</h3>
                  <p className="text-[10px] text-white/40">قسم: {selectedSection.name}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 mr-1">الاسم</label>
                  <input 
                    className="w-full input-glass h-9 text-center" 
                    placeholder="A" 
                    value={rowName}
                    onChange={(e) => setRowName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 mr-1">المقاعد</label>
                  <input 
                    type="number" 
                    className="w-full input-glass h-9 text-center" 
                    value={rowSeats}
                    onChange={(e) => setRowSeats(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 mr-1">الممرات</label>
                  <input 
                    type="number" 
                    className="w-full input-glass h-9 text-center" 
                    value={rowAisles}
                    onChange={(e) => setRowAisles(Number(e.target.value))}
                  />
                </div>
              </div>

              <button 
                onClick={handleAddRow}
                className="w-full h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-all flex items-center justify-center gap-2"
              >
                <Plus size={16} /> إضافة الصف
              </button>

              <div className="space-y-1.5 pt-2 border-t border-white/5 max-h-[150px] overflow-y-auto custom-scrollbar">
                {selectedSection.rows.map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-2 bg-white/5 rounded-lg group">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-primary bg-primary/10 w-5 h-5 flex items-center justify-center rounded">
                        {r.name}
                      </span>
                      <span className="text-[10px] text-white/60">
                        {r.seats.length} مقاعد • {r.aisles} ممر
                      </span>
                    </div>
                    <button 
                      onClick={() => handleDeleteRow(selectedSection.id, r.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-white/20 hover:text-red-400 transition-all"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>

      {/* Canvas Area */}
      <main className="flex-1 h-full relative flex flex-col items-center overflow-auto custom-scrollbar bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black">
        {/* Toolbar */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 p-1.5 glass-panel rounded-2xl shadow-2xl border-white/5">
          {[
            { id: 'select', icon: MousePointer2, label: 'تحديد' },
            { id: 'skip', icon: Ban, label: 'تخطي' },
            { id: 'pin', icon: Pin, label: 'تثبيت' }
          ].map(tool => (
            <button
              key={tool.id}
              onClick={() => setCurrentTool(tool.id as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300",
                currentTool === tool.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/25" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              <tool.icon size={14} />
              <span>{tool.label}</span>
            </button>
          ))}
          <div className="w-px h-6 bg-white/10 mx-1" />
          <button 
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white/40 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
          >
            <Download size={14} />
            <span>تصدير</span>
          </button>
          <button 
            onClick={clearAll}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <Trash2 size={14} />
            <span>مسح الكل</span>
          </button>
        </div>

        {/* Stage Visualization */}
        <div className="mt-32 mb-16 relative">
          <div className="w-[500px] h-[80px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 rounded-[100px/40px] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t border-white/10 overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent)]" />
            <div className="relative flex flex-col items-center">
              <span className="text-white/20 text-[10px] font-black uppercase tracking-[10px] mr-[10px]">THE STAGE</span>
              <span className="text-white/60 text-lg font-bold">المسرح الرئيسي</span>
            </div>
            {/* Stage Glow */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[40px] bg-primary/20 blur-[40px] rounded-full group-hover:bg-primary/30 transition-all duration-700" />
          </div>
        </div>

        {/* Theater Grid */}
        <div className="flex flex-col items-center gap-8 w-full max-w-6xl px-20 pb-40">
          {sections.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-20">
              <div className="w-24 h-24 rounded-full border-4 border-dashed border-white mb-6 animate-[spin_20s_linear_infinite]" />
              <p className="text-xl font-bold">ابدأ بتصميم مخطط المسرح الخاص بك</p>
            </div>
          ) : (
            sortedRowIndices.map(idx => (
              <div key={idx} className="flex gap-12 justify-center w-full animate-in fade-in zoom-in-95 duration-700">
                {rowGroups[idx].map(section => (
                  <div 
                    key={section.id}
                    onClick={() => setSelectedSectionId(section.id)}
                    className={cn(
                      "relative p-6 pt-10 rounded-2xl flex flex-col items-center gap-2 cursor-pointer transition-all duration-500",
                      selectedSectionId === section.id 
                        ? "bg-white/[0.03] ring-1 ring-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)]" 
                        : "hover:bg-white/[0.01]"
                    )}
                    style={{ 
                      transform: `skewX(${section.skew}deg)`
                    }}
                  >
                    {/* Section Label */}
                    <div 
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-black text-white shadow-xl flex items-center gap-2 whitespace-nowrap"
                      style={{ backgroundColor: section.color }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
                      {section.name}
                    </div>
                    
                    {section.rows.map(row => {
                      const groupSize = row.aisles > 0 ? Math.ceil(row.seats.length / (row.aisles + 1)) : row.seats.length
                      const seatGroups = []
                      for (let i = 0; i < row.seats.length; i += groupSize) {
                        seatGroups.push(row.seats.slice(i, i + groupSize))
                      }

                      return (
                        <div key={row.id} className="flex items-center gap-4 justify-center">
                          <div className="flex justify-center" style={{ gap: `${section.seatGap}px` }}>
                            {seatGroups.map((group, gi) => (
                              <div key={gi} className="flex gap-[inherit]">
                                {group.map((seat, si) => {
                                  const totalInRow = row.seats.length
                                  const globalIdx = gi * groupSize + si
                                  const normalized = totalInRow > 1 ? (globalIdx - (totalInRow - 1) / 2) / ((totalInRow - 1) / 2) : 0
                                  const yOffset = Math.pow(normalized, 2) * (section.curve / 100) * 20
                                  const rotation = normalized * (section.curve / 100) * 15
                                  
                                  return (
                                    <div 
                                      key={seat.number}
                                      onClick={(e) => { e.stopPropagation(); handleSeatClick(section.id, row.id, seat.number); }}
                                      className={cn(
                                        "seat-modern group/seat",
                                        seat.status === 'skipped' && "opacity-20 grayscale",
                                        seat.status === 'pinned' && "ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900"
                                      )}
                                      style={{ 
                                        '--seat-color': seat.status === 'available' ? section.color : '#334155',
                                        width: `${section.seatSize}px`, 
                                        height: `${section.seatSize}px`,
                                        transform: `translateY(-${yOffset}px) rotate(${rotation}deg)`
                                      } as any}
                                    >
                                      <span className="text-[10px] font-black text-white/40 group-hover/seat:text-white transition-colors duration-300" style={{ fontSize: `${Math.max(6, section.seatSize * 0.35)}px` }}>
                                        {seat.number}
                                      </span>
                                      
                                      {/* Seat Tooltip */}
                                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-[8px] text-white rounded opacity-0 group-hover/seat:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                                        {section.name} - {seat.number}
                                      </div>
                                    </div>
                                  )
                                })}
                                {gi < seatGroups.length - 1 && <div className="w-4" />}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Floating Stats */}
        {sections.length > 0 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 glass-panel rounded-2xl px-8 py-4 flex items-center gap-10 shadow-2xl border-white/5 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col items-center">
              <span className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1">إجمالي المقاعد</span>
              <span className="text-2xl font-black text-white tabular-nums">{totalSeats}</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1">الأقسام</span>
              <span className="text-2xl font-black text-white tabular-nums">{sections.length}</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1">الصفوف</span>
              <span className="text-2xl font-black text-white tabular-nums">{totalRows}</span>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
