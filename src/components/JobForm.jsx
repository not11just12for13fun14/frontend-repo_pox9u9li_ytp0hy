import React, { useState } from 'react'

const backend = import.meta.env.VITE_BACKEND_URL || ''

export default function JobForm({ onCreated }) {
  const [prompt, setPrompt] = useState('An astronaut drifting through neon ribbons in a cyberpunk city, cinematic, 5s')
  const [image, setImage] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (file) => {
    if (!file) return null
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result.split(',')[1])
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const image_base64 = image ? await handleFile(image) : null
      const res = await fetch(`${backend}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, image_base64 })
      })
      if (!res.ok) throw new Error('Failed to create job')
      const data = await res.json()
      onCreated?.(data)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit} className="card" id="playground" style={{marginTop:24}}>
      <div style={{display:'grid', gap:12}}>
        <label style={{display:'grid', gap:8}}>
          <span style={{fontWeight:600}}>Text prompt</span>
          <textarea className="input" rows={3} value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe your video..." />
        </label>
        <label style={{display:'grid', gap:8}}>
          <span style={{fontWeight:600}}>Optional image</span>
          <input className="input" type="file" accept="image/*" onChange={e=>setImage(e.target.files?.[0] || null)} />
        </label>
        {error && <div style={{color:'#fca5a5'}}>{error}</div>}
        <div style={{display:'flex', gap:12}}>
          <button className="btn" disabled={submitting}>{submitting ? 'Submitting...' : 'Generate video'}</button>
        </div>
      </div>
    </form>
  )
}
