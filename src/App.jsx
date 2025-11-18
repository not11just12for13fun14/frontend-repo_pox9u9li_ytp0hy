import React, { useState } from 'react'
import { Rocket, Image, Settings } from 'lucide-react'
import Hero from './components/Hero'
import JobForm from './components/JobForm'
import JobList from './components/JobList'

export default function App() {
  const [lastJob, setLastJob] = useState(null)
  return (
    <div>
      <Hero />
      <div className="container">
        <div className="card" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <div style={{width:36, height:36, display:'grid', placeItems:'center', background:'#111827', border:'1px solid #1f2937', borderRadius:8}}>
              <Rocket size={18} />
            </div>
            <div>
              <div style={{fontWeight:600}}>Text-to-Video</div>
              <div style={{opacity:0.7, fontSize:13}}>Turn ideas into short clips. Optionally guide with an image.</div>
            </div>
          </div>
          <div style={{display:'flex', gap:12}}>
            <div title="Attachment support"><Image size={18} /></div>
            <div title="Settings"><Settings size={18} /></div>
          </div>
        </div>

        <JobForm onCreated={setLastJob} />
        <JobList key={lastJob?.id || 'list'} />
      </div>
    </div>
  )
}
