import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section style={{position:'relative', minHeight:'70vh', overflow:'hidden', borderBottom:'1px solid #1f2937'}}>
      <div className="gradient" />
      <div style={{position:'absolute', inset:0}}>
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="container" style={{position:'relative', zIndex:1, paddingTop: '80px', paddingBottom:'80px'}}>
        <h1 style={{fontSize: '48px', lineHeight:1.1, margin:0, fontWeight:700}}>Sora2</h1>
        <p style={{opacity:0.8, marginTop:12, maxWidth:640}}>Generate short, cinematic videos from a simple idea or a guiding image. A dark, futuristic vibe powered by AI.</p>
        <div style={{display:'flex', gap:12, marginTop:24}}>
          <a className="btn" href="#playground">Open Playground</a>
          <a className="btn secondary" href="#gallery">View Gallery</a>
        </div>
      </div>
    </section>
  )
}
