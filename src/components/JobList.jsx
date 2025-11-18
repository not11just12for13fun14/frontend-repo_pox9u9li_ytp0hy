import React, { useEffect, useState } from 'react'

const backend = import.meta.env.VITE_BACKEND_URL || ''

export default function JobList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${backend}/api/jobs`)
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchJobs(); const t = setInterval(fetchJobs, 4000); return () => clearInterval(t) }, [])

  if (loading) return <div className="card" style={{marginTop:24}}>Loading...</div>

  return (
    <div className="card" id="gallery" style={{marginTop:24}}>
      <div style={{display:'grid', gap:16}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <h3 style={{margin:0}}>Recent videos</h3>
          <button className="btn secondary" onClick={fetchJobs}>Refresh</button>
        </div>
        <div style={{display:'grid', gap:16, gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))'}}>
          {items.length === 0 && <div style={{opacity:0.7}}>No jobs yet. Generate your first video above.</div>}
          {items.map(item => (
            <div key={item.id} className="card" style={{padding:12}}>
              <div style={{fontSize:12, opacity:0.7, marginBottom:8}}>{item.status?.toUpperCase()}</div>
              {item.result_url ? (
                <video src={item.result_url} controls muted style={{width:'100%', borderRadius:12, border:'1px solid #1f2937'}} />
              ) : (
                <div style={{height:160, display:'grid', placeItems:'center', background:'#0f1320', border:'1px solid #1f2937', borderRadius:12}}>Processing...</div>
              )}
              <div style={{marginTop:8, fontSize:13}}>{item.prompt}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
