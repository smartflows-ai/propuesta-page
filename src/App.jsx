import { useEffect, useState } from 'react';

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,700&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy: #050d1a; --navy-mid: #0a1628; --navy-light: #111f38;
    --green: #00e676; --green-glow: rgba(0,230,118,0.14);
    --white: #f8fafb; --white-dim: rgba(248,250,251,0.68); --white-faint: rgba(248,250,251,0.1);
    --gold: #d4a853; --red: #ff5252; --border: rgba(255,255,255,0.08);
    --radius: 16px; --radius-lg: 24px;
  }
  html { scroll-behavior: smooth; }
  body { background: var(--navy); color: var(--white); font-family: 'DM Sans', sans-serif; line-height: 1.6; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: var(--green); border-radius: 2px; }
  .reveal { opacity: 0; transform: translateY(26px); transition: opacity .65s ease, transform .65s ease; }
  .reveal.in { opacity: 1; transform: none; }
  .reveal-r { opacity: 0; transform: translateX(34px); transition: opacity .65s ease, transform .65s ease; }
  .reveal-r.in { opacity: 1; transform: none; }

  /* HEADER */
  header { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: .85rem 2.5rem; display: flex; justify-content: space-between; align-items: center; background: rgba(5,13,26,.9); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); transition: box-shadow .3s; }
  .logo { font-family: 'Fraunces', serif; font-size: 1.2rem; font-weight: 700; letter-spacing: -.5px; }
  .logo span { color: var(--green); }
  nav { display: flex; gap: 1.6rem; align-items: center; }
  nav a { color: var(--white-dim); text-decoration: none; font-size: .82rem; font-weight: 500; letter-spacing: .3px; transition: color .2s; }
  nav a:hover { color: var(--green); }
  .nav-btn { background: var(--green) !important; color: var(--navy) !important; padding: .42rem 1.1rem; border-radius: 50px; font-weight: 700 !important; }
  .nav-btn:hover { box-shadow: 0 0 18px rgba(0,230,118,.4) !important; }

  /* HERO */
  .hero { min-height: 100vh; display: flex; align-items: center; padding: 8rem 2.5rem 4rem; position: relative; overflow: hidden; background: var(--navy); }
  .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 70% 55% at 65% 40%, rgba(0,230,118,.07), transparent 65%); }
  .hero-grid { position: absolute; inset: 0; opacity: .03; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 60px 60px; }
  .hero-inner { max-width: 1200px; margin: 0 auto; width: 100%; position: relative; z-index: 2; display: grid; grid-template-columns: 1.1fr .9fr; gap: 4rem; align-items: center; }
  .hero-badge { display: inline-flex; align-items: center; gap: .5rem; background: var(--green-glow); border: 1px solid rgba(0,230,118,.3); color: var(--green); padding: .32rem .9rem; border-radius: 50px; font-size: .73rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 1.4rem; }
  .pulse { width: 7px; height: 7px; border-radius: 50%; background: var(--green); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.75)} }
  .hero h1 { font-family: 'Fraunces', serif; font-size: clamp(2.6rem,4.2vw,4rem); font-weight: 900; line-height: 1.05; letter-spacing: -2px; margin-bottom: 1.4rem; color: var(--white) !important; }
  .hero h1 em { color: var(--green); font-style: italic; }
  .hero-sub { font-size: 1.02rem; color: var(--white-dim); line-height: 1.75; margin-bottom: 2.4rem; max-width: 460px; }
  .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn-p { display: inline-flex; align-items: center; gap: .4rem; background: var(--green); color: var(--navy); padding: .82rem 1.8rem; border-radius: 50px; font-weight: 700; font-size: .92rem; text-decoration: none; transition: all .25s; box-shadow: 0 0 26px rgba(0,230,118,.28); }
  .btn-p:hover { transform: translateY(-2px); box-shadow: 0 0 45px rgba(0,230,118,.5); }
  .btn-g { display: inline-flex; align-items: center; gap: .4rem; border: 1px solid var(--border); color: var(--white-dim); padding: .82rem 1.8rem; border-radius: 50px; font-weight: 500; font-size: .92rem; text-decoration: none; transition: all .25s; }
  .btn-g:hover { border-color: var(--green); color: var(--green); }
  .hstats { display: flex; flex-direction: column; gap: 1.1rem; }
  .hstat { background: var(--navy-light); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.3rem 1.7rem; position: relative; overflow: hidden; transition: border-color .3s, transform .3s; }
  .hstat:hover { border-color: rgba(0,230,118,.3); transform: translateX(5px); }
  .hstat::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; background:var(--green); }
  .hstat-num { font-family:'Fraunces',serif; font-size:2.5rem; font-weight:900; color:var(--green); line-height:1; margin-bottom:.2rem; }
  .hstat-lbl { color:var(--white-dim); font-size:.85rem; }

  /* SHARED */
  .container { max-width: 1200px; margin: 0 auto; width: 100%; }
  section { padding: 5.5rem 2.5rem; }
  .slbl { display: inline-block; font-size: .71rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--green); margin-bottom: .85rem; }
  .display { font-family: 'Fraunces', serif; font-size: clamp(1.8rem,3.5vw,3rem); font-weight: 900; line-height: 1.1; letter-spacing: -1.5px; margin-bottom: 1.3rem; color: var(--white) !important; }
  .display em { color: var(--green); font-style: italic; }
  .lead { font-size: 1rem; color: var(--white-dim); line-height: 1.75; max-width: 680px; margin-bottom: 2.2rem; }
  .card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px,1fr)); gap: 1.1rem; margin-top: 2rem; }
  .card { background: var(--navy-light); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.6rem; transition: all .3s; }
  .card:hover { border-color: rgba(0,230,118,.28); transform: translateY(-3px); }
  .card-icon { font-size: 1.7rem; margin-bottom: .7rem; }
  .card h3 { font-family:'Fraunces',serif; font-size: .98rem; margin-bottom: .4rem; }
  .card p { color: var(--white-dim); font-size: .84rem; line-height: 1.55; }

  /* TIMELINE */
  .timeline { position: relative; margin-top: 2.5rem; }
  .timeline::before { content:''; position:absolute; left:28px; top:0; bottom:0; width:2px; background:linear-gradient(to bottom, var(--green) 15%, var(--red)); }
  .tl-item { display:flex; gap:1.8rem; align-items:flex-start; margin-bottom:1.6rem; }
  .tl-dot { width:56px; height:56px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.1rem; flex-shrink:0; z-index:2; border:2px solid var(--border); }
  .tl-dot.ok { background:rgba(0,230,118,.1); border-color:var(--green); }
  .tl-dot.bad { background:rgba(255,82,82,.1); border-color:var(--red); }
  .tl-body { padding-top:.6rem; }
  .tl-body h4 { font-weight:700; margin-bottom:.2rem; font-size:.93rem; }
  .tl-body.bad h4 { color:var(--red); }
  .tl-body.ok h4 { color:var(--green); }
  .tl-body p { color:var(--white-dim); font-size:.86rem; line-height:1.5; }

  /* SOLUCION */
  .sol-flow { display:flex; align-items:center; flex-wrap:wrap; gap:.45rem; padding:1.3rem 1.7rem; background:var(--navy-light); border:1px solid var(--border); border-radius:var(--radius); margin:1.8rem 0; }
  .sol-node { background:var(--green-glow); border:1px solid rgba(0,230,118,.25); color:var(--green); padding:.38rem .95rem; border-radius:50px; font-size:.78rem; font-weight:600; white-space:nowrap; }
  .comp-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:1.1rem; margin-top:1rem; }
  .comp-card { background:var(--navy); border:1px solid var(--border); border-radius:var(--radius); padding:1.7rem; transition:all .3s; }
  .comp-card:hover { border-color:rgba(0,230,118,.25); box-shadow:0 0 30px rgba(0,230,118,.05); }
  .comp-num { width:34px; height:34px; background:var(--green); color:var(--navy); border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:.82rem; margin-bottom:.85rem; }
  .comp-card h3 { font-family:'Fraunces',serif; font-size:.98rem; margin-bottom:.45rem; }
  .comp-card > p { color:var(--white-dim); font-size:.86rem; line-height:1.55; }
  .comp-reqs { margin-top:.85rem; padding-top:.85rem; border-top:1px solid var(--border); display:flex; flex-direction:column; gap:.3rem; }
  .comp-req { font-size:.77rem; color:var(--white-dim); padding-left:.95rem; position:relative; }
  .comp-req::before { content:'→'; position:absolute; left:0; color:var(--green); font-size:.68rem; }

  /* ESCALAS */
  .scales-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(175px,1fr)); gap:1rem; margin-top:2rem; }
  .scale-card { background:var(--navy-light); border:1px solid var(--border); border-radius:var(--radius); padding:1.3rem; }
  .scale-name { font-weight:700; font-size:.95rem; color:var(--green); margin-bottom:.25rem; }
  .scale-full { font-size:.78rem; color:var(--white-dim); margin-bottom:.45rem; }
  .scale-use { font-size:.78rem; color:var(--white-dim); line-height:1.45; }

  /* FASES */
  .phases-wrap { display:grid; grid-template-columns:repeat(auto-fit,minmax(205px,1fr)); gap:1.1rem; margin-top:2.5rem; }
  .phase-card { background:var(--navy-light); border:1px solid var(--border); border-radius:var(--radius); padding:1.7rem; transition:all .3s; position:relative; overflow:hidden; }
  .phase-card:hover { border-color:rgba(0,230,118,.3); transform:translateY(-5px); }
  .phase-bg-n { position:absolute; right:-8px; top:-8px; font-family:'Fraunces',serif; font-size:6rem; font-weight:900; color:rgba(0,230,118,.04); line-height:1; pointer-events:none; }
  .phase-tag { display:inline-flex; align-items:center; gap:.35rem; background:var(--green-glow); color:var(--green); font-size:.68rem; font-weight:700; letter-spacing:.8px; text-transform:uppercase; padding:.22rem .65rem; border-radius:50px; margin-bottom:.75rem; }
  .phase-card h4 { font-family:'Fraunces',serif; font-size:.97rem; font-weight:700; margin-bottom:.75rem; }
  .phase-items { list-style:none; display:flex; flex-direction:column; gap:.32rem; }
  .phase-items li { font-size:.79rem; color:var(--white-dim); padding-left:.9rem; position:relative; line-height:1.4; }
  .phase-items li::before { content:'→'; position:absolute; left:0; color:var(--green); font-size:.66rem; top:.12rem; }
  .phase-kpi { margin-top:.85rem; padding:.55rem .75rem; background:rgba(0,230,118,.06); border-radius:8px; font-size:.73rem; color:var(--green); font-weight:600; }
  .phase-footer { margin-top:.85rem; padding-top:.85rem; border-top:1px solid var(--border); display:flex; flex-direction:column; gap:.25rem; }
  .phase-footer .days { font-size:.78rem; font-weight:700; color:var(--green); }
  .phase-footer .weeks { font-size:.73rem; color:var(--white-dim); }
  .phase-footer .cost { font-size:.85rem; font-weight:700; color:var(--white); margin-top:.1rem; }

  /* GANTT */
  .gantt { background:var(--navy-light); border:1px solid var(--border); border-radius:var(--radius); padding:1.6rem 1.8rem; margin-bottom:2rem; }
  .gantt-title { font-size:.72rem; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:var(--green); margin-bottom:1.2rem; }
  .gantt-row { display:grid; grid-template-columns:130px 1fr 95px; gap:.8rem; align-items:center; margin-bottom:.6rem; }
  .gantt-lbl { font-size:.76rem; color:var(--white-dim); font-weight:600; text-align:right; }
  .gantt-track { background:rgba(255,255,255,.04); border-radius:50px; height:32px; overflow:hidden; border:1px solid var(--border); }
  .gantt-fill { height:100%; border-radius:50px; display:flex; align-items:center; padding:0 .9rem; font-size:.75rem; font-weight:700; color:var(--navy); white-space:nowrap; min-width:60px; }
  .g1 { background:var(--green); }
  .g2 { background:#26c6da; }
  .g3 { background:#ab47bc; }
  .g4 { background:#ff7043; }
  .g5 { background:var(--gold); }
  .gantt-days { font-size:.73rem; color:var(--white-dim); }

  /* NFR */
  .nfr-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(255px,1fr)); gap:1rem; margin-top:2rem; }
  .nfr-card { background:var(--navy-light); border:1px solid var(--border); border-radius:var(--radius); padding:1.5rem; }
  .nfr-icon { font-size:1.4rem; margin-bottom:.55rem; }
  .nfr-title { font-weight:700; font-size:.88rem; margin-bottom:.35rem; }
  .nfr-desc { color:var(--white-dim); font-size:.81rem; line-height:1.5; }

  /* TECH */
  .tech-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(195px,1fr)); gap:1rem; margin-top:2rem; }
  .tech-card { background:var(--navy-light); border:1px solid var(--border); border-radius:var(--radius); padding:1.4rem; text-align:center; transition:all .3s; }
  .tech-card:hover { border-color:rgba(0,230,118,.25); transform:translateY(-3px); }
  .tech-e { font-size:1.7rem; margin-bottom:.55rem; }
  .tech-n { font-weight:700; font-size:.88rem; margin-bottom:.25rem; }
  .tech-d { color:var(--white-dim); font-size:.77rem; line-height:1.4; }

  /* INVERSION */
  .invest-table { width:100%; border-collapse:collapse; margin:2rem 0; border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; }
  .invest-table th { background:var(--navy-light); padding:.95rem 1.1rem; text-align:left; font-size:.76rem; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--white-dim); border-bottom:1px solid var(--border); }
  .invest-table td { padding:.95rem 1.1rem; font-size:.88rem; border-bottom:1px solid var(--border); }
  .invest-table tr:hover td { background:rgba(255,255,255,.02); }
  .total-row td { background:var(--navy-light); font-weight:700; color:var(--green); }
  .disc-row td { background:rgba(0,230,118,.06); font-weight:700; }
  .mtto-row td { background:var(--navy-light); color:var(--white-dim); font-size:.83rem; }

  /* ROI */
  .roi-block { background:linear-gradient(135deg,rgba(0,230,118,.07),rgba(0,200,83,.02)); border:1px solid rgba(0,230,118,.2); border-radius:var(--radius-lg); padding:2.8rem; margin:2.5rem 0; display:grid; grid-template-columns:1fr 1fr; gap:3rem; align-items:center; }
  .roi-block h3 { font-family:'Fraunces',serif; font-size:1.6rem; margin-bottom:.9rem; line-height:1.2; }
  .roi-block p { color:var(--white-dim); line-height:1.7; font-size:.93rem; }
  .roi-items { display:flex; flex-direction:column; gap:.8rem; }
  .roi-item { display:flex; justify-content:space-between; align-items:center; padding:.85rem 1.3rem; background:rgba(0,0,0,.3); border-radius:12px; border:1px solid var(--border); }
  .roi-lbl { font-size:.85rem; color:var(--white-dim); }
  .roi-val { font-family:'Fraunces',serif; font-size:1.28rem; font-weight:700; color:var(--green); }

  /* OPTS */
  .opts-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(245px,1fr)); gap:1.3rem; margin-top:2.5rem; }
  .opt-card { background:var(--navy-light); border:1px solid var(--border); border-radius:var(--radius-lg); padding:2rem 1.8rem; display:flex; flex-direction:column; gap:.55rem; transition:all .3s; position:relative; }
  .opt-card:hover { transform:translateY(-5px); }
  .opt-card.featured { border-color:var(--gold); background:linear-gradient(135deg,var(--navy-light),rgba(212,168,83,.06)); box-shadow:0 0 45px rgba(212,168,83,.1); }
  .opt-card.partner { border-color:var(--green); }
  .opt-badge { position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:var(--gold); color:var(--navy); padding:.25rem .85rem; border-radius:50px; font-size:.68rem; font-weight:800; letter-spacing:1px; text-transform:uppercase; white-space:nowrap; }
  .opt-ttl { font-size:.73rem; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--white-dim); }
  .opt-price { font-family:'Fraunces',serif; font-size:2.1rem; font-weight:900; line-height:1; }
  .opt-price span { font-size:.9rem; font-weight:400; color:var(--white-dim); }
  .opt-strike { text-decoration:line-through; color:rgba(255,255,255,.22); font-size:.9rem; }
  .opt-save { display:inline-block; background:rgba(0,230,118,.1); color:var(--green); font-size:.74rem; font-weight:700; padding:.16rem .5rem; border-radius:4px; }
  .opt-desc { color:var(--white-dim); font-size:.86rem; line-height:1.55; margin-top:.2rem; }
  .opt-list { list-style:none; margin-top:.5rem; display:flex; flex-direction:column; gap:.22rem; }
  .opt-list li { font-size:.79rem; color:var(--white-dim); padding-left:.9rem; position:relative; }
  .opt-list li::before { content:'✓'; position:absolute; left:0; color:var(--green); font-weight:700; font-size:.72rem; }

  /* MTTO */
  .mtto-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:.95rem; margin:2rem 0; }
  .mtto-card { background:var(--navy-light); border:1px solid var(--border); border-radius:var(--radius); padding:1.3rem; }
  .mtto-ico { font-size:1.35rem; margin-bottom:.55rem; }
  .mtto-lbl { font-size:.73rem; color:var(--white-dim); margin-bottom:.2rem; }
  .mtto-val { font-family:'Fraunces',serif; font-size:1.45rem; font-weight:700; }
  .mtto-sub { font-size:.72rem; color:var(--white-dim); margin-top:.22rem; }
  .mtto-total { background:var(--green); color:var(--navy); border-radius:var(--radius); padding:1.7rem; text-align:center; }
  .mtto-total h3 { font-family:'Fraunces',serif; font-size:2.2rem; font-weight:900; }
  .mtto-total p { font-size:.86rem; font-weight:600; opacity:.8; }


  /* INTENCION */
  .intencion { background:var(--navy); position:relative; overflow:hidden; }
  .intencion::before { content:''; position:absolute; top:-120px; right:-120px; width:450px; height:450px; border-radius:50%; background:radial-gradient(circle,rgba(0,230,118,.05),transparent 70%); }
  .int-goals { list-style:none; display:flex; flex-direction:column; gap:.85rem; margin-top:2rem; }
  .int-goals li { display:flex; align-items:flex-start; gap:.9rem; padding:1rem 1.3rem; background:var(--navy-light); border:1px solid var(--border); border-radius:12px; font-size:.91rem; transition:border-color .3s, transform .3s; }
  .int-goals li:hover { border-color:rgba(0,230,118,.3); transform:translateX(5px); }
  .int-chk { width:25px; height:25px; background:var(--green); color:var(--navy); border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:.73rem; flex-shrink:0; margin-top:.12rem; }

  /* CTA */
  .cta { background:linear-gradient(135deg,var(--navy-mid),var(--navy)); border-top:1px solid var(--border); text-align:center; padding:5.5rem 2.5rem; position:relative; overflow:hidden; }
  .cta::before { content:''; position:absolute; bottom:-70px; left:50%; transform:translateX(-50%); width:650px; height:320px; border-radius:50%; background:radial-gradient(circle,rgba(0,230,118,.07),transparent 60%); }
  .cta h2 { font-family:'Fraunces',serif; font-size:clamp(2.2rem,4vw,3.6rem); font-weight:900; letter-spacing:-2px; margin-bottom:1.3rem; position:relative; z-index:2; }
  .cta h2 em { color:var(--green); font-style:italic; }
  .cta p { color:var(--white-dim); font-size:1rem; max-width:520px; margin:0 auto 2.3rem; line-height:1.7; position:relative; z-index:2; }
  .cta-btns { display:flex; gap:.9rem; justify-content:center; flex-wrap:wrap; margin-bottom:2rem; position:relative; z-index:2; }
  .cpills { display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; position:relative; z-index:2; }
  .cpill { background:var(--navy-light); border:1px solid var(--border); border-radius:50px; padding:.7rem 1.5rem; display:flex; align-items:center; gap:.65rem; transition:border-color .2s; }
  .cpill:hover { border-color:var(--green); }
  .cpill a { color:var(--white); text-decoration:none; font-size:.86rem; }

  footer { background:var(--navy); border-top:1px solid var(--border); padding:1.8rem; text-align:center; color:var(--white-dim); font-size:.81rem; }
  .foot-brand { font-family:'Fraunces',serif; font-size:1.05rem; font-weight:700; color:var(--white); margin-bottom:.35rem; }
  .foot-brand span { color:var(--green); }

  @media(max-width:900px){
    .hero-inner { grid-template-columns:1fr; text-align:center; gap:2rem; }
    .hero-actions { justify-content:center; }
    .hero h1 { font-size: 2.8rem; }
    .hstats { display:none; }
    nav a:not(.nav-btn) { display:none; }
    .roi-block { grid-template-columns:1fr; gap:2rem; padding:1.8rem; }
    .invest-table { display:block; overflow-x:auto; white-space:nowrap; }
    .phase-card { grid-template-columns:1fr; gap:1.2rem; }
    .phase-footer { flex-direction:column; align-items:flex-start; gap:.5rem; }
    .phase-bg-n { right:10px; font-size:4rem; }
  }
  @media(max-width:600px){ 
    section { padding:3.5rem 1.2rem; } 
    header { padding:.8rem 1.2rem; }
    .hero { padding: 7rem 1.2rem 3rem; }
    .display { font-size:1.9rem; } 
    .hero h1 { font-size: 2.2rem; }
    .btn-p, .btn-g { width: 100%; justify-content:center; }
    .opts-grid, .mtto-grid, .risk-grid { grid-template-columns: 1fr; }
    .gantt-row { flex-direction:column; align-items:flex-start; gap:.4rem; }
    .gantt-lbl { width:auto; text-align:left; }
    .gantt-days { min-width:auto; }
  }
`;

const phases = [
    {
        n: '01', cls: 'g1', badge: 'Abr 2026', name: 'Digital Foundation',
        days: '~27 días hábiles', weeks: '5–6 semanas', cost: '$141,300', pct: '20%',
        items: ['Nueva página web para captar más pacientes', 'Google Ads enfocados en citas de alto valor', 'Migración exitosa de tu sitio actual', 'Estructura base del Expediente Digital', 'Análisis de datos de visitantes (Google Analytics)', 'Asistente de WhatsApp automático las 24 hrs', 'Tus asistentes retoman conversaciones complejas'],
        kpi: '-60% pérdida de pacientes',
    },
    {
        n: '02', cls: 'g2', badge: 'Jul 2026', name: 'Patient Platform',
        days: '~47 días hábiles', weeks: '9–10 semanas', cost: '$285,500', pct: '36%',
        items: ['Cuentas separadas: Doctor, Asistentes, Clínica', 'Agenda inteligente (consultas separadas de rehab)', 'Portal privado para cada paciente', 'Cuestionarios médicos enviados automático antes de cita', 'Inteligencia Artificial para redactar notas médicas', 'Borradores automáticos integrados a tu expediente', 'Tienda en línea: cremas, suplementos, proteínas'],
        kpi: '-30% tiempo escribiendo notas',
    },
    {
        n: '03', cls: 'g3', badge: 'Sep 2026', name: 'CRM Automation',
        days: '~33 días hábiles', weeks: '6–7 semanas', cost: '$221,900', pct: '26%',
        items: ['Sincronización automática con Doctoralia', 'Diferentes IA para citas generales vs. terapias', 'Envío inteligente de promociones y descuentos', 'Seguimiento por WhatsApp según el padecimiento', 'Página web dedicada exclusivamente a cirugías', 'Propuesta de nueva marca registrable'],
        kpi: 'Doctoralia + WhatsApp unidos',
    },
    {
        n: '04', cls: 'g4', badge: 'Nov 2026', name: 'Intelligence',
        days: '~28 días hábiles', weeks: '5–6 semanas', cost: '$178,700', pct: '21%',
        items: ['Panel visual de ingresos, citas y crecimiento', 'Cobros con tarjeta a través de un link', 'Asistente generar cotizaciones de cirugía', 'Visualiza el historial por paciente', 'Creación automática de recetas médicas', 'Facturación electrónica automática para el SAT', 'Avisos internos a tu equipo según el paciente'],
        kpi: 'Finanzas y facturas en automático',
    },
    {
        n: '05', cls: 'g5', badge: 'Q1 2027', name: 'Deep Tech & Scaling',
        days: '~23 días hábiles', weeks: '4–5 semanas', cost: '$157,500', pct: '19%',
        items: ['La IA aprende exclusivamente de tus PDF y manuales', 'Búsqueda inteligente dentro de tu propio conocimiento', 'Asistente resuelve dudas del paciente después de cirugía', 'Resultados de laboratorio directo en tu pantalla', 'Reportes médicos automáticos para aseguradoras', 'Biblioteca visual de ejercicios de rehabilitación'],
        kpi: 'Tu propio conocimiento hecho software',
    },
];

export default function App() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,700&family=DM+Sans:wght@300;400;500;600&display=swap';
        document.head.appendChild(link);
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('in'), i * 80); });
        }, { threshold: 0.07 });
        document.querySelectorAll('.reveal,.reveal-r').forEach(el => io.observe(el));
        return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); };
    }, []);

    return (
        <>
            <style>{style}</style>

            {/* HEADER */}
            <header style={scrolled ? { boxShadow: '0 4px 26px rgba(0,0,0,.45)' } : {}}>
                <img src="white-pet-bot-no-back-no-name.png" alt="RobotInAi" style={{height:'42px',width:'auto'}} />
                <nav>
                    <a href="#problema">Diagnóstico</a>
                    <a href="#solucion">Solución</a>
                    <a href="#fases">Fases</a>
                    <a href="#inversion">Inversión</a>
                    <a href="#contacto" className="nav-btn">Agendar →</a>
                </nav>
            </header>

            {/* HERO */}
            <section className="hero">
                <div className="hero-bg" /><div className="hero-grid" />
                <div className="hero-inner">
                    <div>
                        <div className="hero-badge reveal"><div className="pulse" /> Propuesta exclusiva · Dr. César Ruiz · Marzo 2026</div>
                        <h1 className="reveal" style={{ color: 'var(--white)' }}>Tu consultorio,<br /><em>automatizado</em><br />sin fugas de pacientes</h1>
                        <p className="hero-sub reveal" style={{ color: 'var(--white)' }}>Un sistema inteligente diseñado para evitar que tus pacientes se vayan a otra clínica, reducir la carga administrativa y convertir tus 44K seguidores en pacientes reales.</p>
                        <div className="hero-actions reveal">
                            <a href="#solucion" className="btn-p">Ver la propuesta →</a>
                            <a href="#inversion" className="btn-g">Ver inversión</a>
                        </div>
                    </div>
                    <div className="hstats">
                        <div className="hstat reveal-r"><div className="hstat-num">44K+</div><div className="hstat-lbl">Seguidores en Instagram listos para convertirse en pacientes — el tráfico ya existe</div></div>
                        <div className="hstat reveal-r" style={{ transitionDelay: '.1s' }}><div className="hstat-num">-60%</div><div className="hstat-lbl">Reducción objetivo de pacientes perdidos gracias al seguimiento automático desde el Día 1</div></div>
                        <div className="hstat reveal-r" style={{ transitionDelay: '.2s' }}><div className="hstat-num">5→1</div><div className="hstat-lbl">Herramientas desconectadas consolidadas en una sola plataforma inteligente</div></div>
                    </div>
                </div>
            </section>

            {/* LO QUE YA TIENES */}
            <section style={{ background: 'var(--navy-mid)' }} id="entendemos">
                <div className="container">
                    <span className="slbl reveal">Lo que ya tienes construido</span>
                    <h2 className="display reveal">La autoridad médica<br /><em>ya la ganaste.</em></h2>
                    <p className="lead reveal">Construir confianza con una audiencia toma años. El contenido, la reputación y los pacientes ya existen. La única pieza faltante es una infraestructura que no deje escapar ni uno solo.</p>
                    <div className="card-grid">
                        {[
                            { icon: '📱', title: 'Audiencia activa de 44K+', desc: 'Seguidores en Instagram con intención real. Pacientes potenciales que ya confían en tu contenido educativo y buscan atención.' },
                            { icon: '🏥', title: 'Práctica de alto volumen', desc: 'Referente en traumatología y ortopedia en Monterrey. Doctoralia activo, flujo constante de consultas — solo falta automatizarlo.' },
                            { icon: '🤝', title: 'Pacientes con dolor real', desc: 'Personas que contactan buscando solución a un problema físico concreto. La motivación de compra más alta que existe en salud.' },
                            { icon: '🎓', title: 'Contenido listo para sistematizar', desc: 'Prompts de ChatGPT, PDFs clínicos, guías de rehab y know-how que hoy están dispersos y pueden potenciarse con IA.' },
                        ].map((a, i) => (
                            <div key={i} className="card reveal" style={{ transitionDelay: `${i * .08}s` }}>
                                <div className="card-icon">{a.icon}</div>
                                <h3>{a.title}</h3>
                                <p>{a.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROBLEMA */}
            <section style={{ background: 'var(--navy)' }} id="problema">
                <div className="container">
                    <span className="slbl reveal">Diagnóstico actual</span>
                    <h2 className="display reveal">Hay demanda.<br /><em>Se pierden pacientes en cada paso.</em></h2>
                    <p className="lead reveal">5+ herramientas desconectadas y sin automatización crean una ruta de fricción que expulsa al paciente antes de que llegue a tu consultorio.</p>
                    <div className="timeline">
                        {[
                            { ok: true, icon: '📣', title: 'El paciente descubre al Dr. Ruiz', desc: 'Ve un video en Instagram, encuentra el perfil de Doctoralia o llega por recomendación directa.' },
                            { ok: false, icon: '📵', title: 'Intenta contactar — sin respuesta automática', desc: 'Más de 10,000 conversaciones de WhatsApp manejadas manualmente. Sin bot, sin seguimiento, sin sistema.' },
                            { ok: false, icon: '🌐', title: 'Encuentra el sitio web desactualizado', desc: 'drcesarruiz.com con botones rotos, contenido antiguo y paleta oscura. La primera impresión digital falla.' },
                            { ok: false, icon: '⚙️', title: 'El equipo no puede con el volumen manual', desc: 'ChatGPT, Excel, WhatsApp y apps sueltas que no se hablan. Violeta, Renata y el equipo absorben carga innecesaria.' },
                            { ok: false, icon: '💸', title: 'El paciente elige a otro médico', desc: 'Un paciente perdido más. Ingreso perdido. Esto ocurre decenas de veces cada semana sin que nadie lo note.' },
                        ].map((t, i) => (
                            <div key={i} className="tl-item reveal" style={{ transitionDelay: `${i * .09}s` }}>
                                <div className={`tl-dot ${t.ok ? 'ok' : 'bad'}`}>{t.icon}</div>
                                <div className={`tl-body ${t.ok ? 'ok' : 'bad'}`}><h4>{t.title}</h4><p>{t.desc}</p></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SOLUCIÓN */}
            <section style={{ background: 'var(--navy-mid)' }} id="solucion">
                <div className="container">
                    <span className="slbl reveal">La solución: Doctorela Plus</span>
                    <h2 className="display reveal">Un portal clínico todo en uno.<br /><em>Web responsiva + IA nativa.</em></h2>
                    <p className="lead reveal">Consolidamos agenda, CRM, IA clínica, marketing y facturación en una sola plataforma diseñada para el Dr. Ruiz — y que será el piloto del SaaS Doctorela Plus.</p>
                    <div className="sol-flow reveal">
                        {['📱 Tu nueva Web', '🤖 Asistente WhatsApp', '📅 Agenda + Expediente', '📋 Cuestionarios Médicos', '🩺 Portal Privado', '💳 Cobros y Facturas', '📊 Panel Financiero'].map((n, i, arr) => (
                            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '.35rem' }}>
                                <span className="sol-node">{n}</span>
                                {i < arr.length - 1 && <span style={{ color: 'var(--white-faint)' }}>→</span>}
                            </span>
                        ))}
                    </div>
                    <div className="comp-grid">
                        {[
                            { n: 1, title: 'Web Unificada y Posicionamiento', desc: 'Reconstrucción de tu página web médica diseñada para que más personas agenden cita, posicionamiento en Google y tienda de productos propios.', reqs: ['Cambio a una plataforma mucho más rápida', 'Aparecer en las primeras búsquedas de Google', 'Fotos reales en quirófano y animaciones médicas', 'Anuncios en Google enfocados en cirugía y dolor', 'Panel para medir cuántos pacientes nuevos llegan'] },
                            { n: 2, title: 'Recepcionista Inteligente 24/7', desc: 'Asistente de WhatsApp entrenado con tu conocimiento que atiende pacientes nuevos, responde dudas comunes e impide que pacientes se vayan.', reqs: ['Responde: precio consulta, ubicación, horarios', 'Permite a pacientes agendar, cambiar o cancelar citas', 'Mensajes automáticos de seguimiento según su dolor', 'Avisa a tu equipo humano si el paciente es complejo', 'Todas las conversaciones se guardan en el expediente'] },
                            { n: 3, title: 'Expediente Médico Automático', desc: 'Historial médico digital completo con inteligencia artificial que te ayuda a redactar notas médicas, diagnósticos y planes de rehabilitación al instante.', reqs: ['Cuentas separadas: Doctor, Asistentes y Clínica', 'Agendas independientes (consultas médicas vs. terapias)', 'Inteligencia que sugiere el diagnóstico y plan de tratamiento', 'Perfil completo: visitas, recetas, documentos y estudios'] },
                            { n: 4, title: 'Portal del Paciente (Web)', desc: 'Portal responsivo donde el paciente llena sus escalas antes de la cita y la clínica integra su contenido paso a paso.', reqs: ['Escalas: Oswestry, VAS, KOOS, PHQ-9', 'Carrusel interactivo + link externo', 'Recordatorios por WhatsApp automáticos', 'Resultados pre-vinculados al resumen médico'] },
                            { n: 5, title: 'Cobros y Facturación Automática', desc: 'Cobra tus consultas por internet o enviando un enlace por WhatsApp, generando tu facturación para el SAT y aseguradoras automáticamente.', reqs: ['Envío de enlaces de pago mediante el asistente virtual', 'Factura electrónica generada sin intervención humana', 'Creación automática de reportes médicos para aseguradoras'] },
                            { n: 6, title: 'Panel de Control de la Clínica', desc: 'Pantalla principal donde ves de inmediato tus ingresos, número de citas y puedes crear presupuestos de cirugía con un solo clic.', reqs: ['Gráficas visuales de crecimiento e ingresos de la clínica', 'Asistente redacta propuesta económica para paciente quirúrgico', 'Avisos directos a tu equipo dependiendo del tipo de cita', 'Exportación de archivos financieros para tu contador'] },
                        ].map((c, i) => (
                            <div key={i} className="comp-card reveal" style={{ transitionDelay: `${i * .07}s` }}>
                                <div className="comp-num">{c.n}</div>
                                <h3>{c.title}</h3>
                                <p>{c.desc}</p>
                                <div className="comp-reqs">{c.reqs.map((r, j) => <div key={j} className="comp-req">{r}</div>)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ESCALAS CLÍNICAS */}
            <section style={{ background: 'var(--navy)' }} id="clinico">
                <div className="container">
                    <span className="slbl reveal">Módulo clínico</span>
                    <h2 className="display reveal">Escalas validadas<br /><em>integradas al expediente</em></h2>
                    <p className="lead reveal">Los pacientes completan sus escalas antes de llegar. El médico visualiza los resultados en el resumen pre-consulta — sin papel, sin tiempo perdido, sin preguntas repetidas.</p>
                    <div className="scales-grid">
                        {[
                            { name: 'Oswestry', full: 'Oswestry Disability Index', use: 'Evaluación funcional de columna lumbar — indica nivel de discapacidad por dolor (leve, moderado, severo)' },
                            { name: 'VAS', full: 'Visual Analog Scale', use: 'Escala visual de dolor 0–10 — rápida y aplicable a cualquier padecimiento en cada visita' },
                            { name: 'KOOS', full: 'Knee Injury & Osteoarthritis Outcome Score', use: 'Evaluación completa de rodilla: dolor, síntomas, AVD, deportes y calidad de vida' },
                            { name: 'PHQ-9', full: 'Patient Health Questionnaire-9', use: 'Detección de depresión — crítico en pacientes con dolor crónico y post-quirúrgicos' },
                        ].map((s, i) => (
                            <div key={i} className="scale-card reveal" style={{ transitionDelay: `${i * .08}s` }}>
                                <div className="scale-name">{s.name}</div>
                                <div className="scale-full">{s.full}</div>
                                <div className="scale-use">{s.use}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '1.8rem', padding: '1.4rem 1.8rem', background: 'var(--navy-light)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} className="reveal">
                        <p style={{ color: 'var(--white-dim)', fontSize: '.88rem', lineHeight: 1.7 }}>
                            💡 <strong style={{ color: 'var(--white)' }}>Dos formatos de entrega:</strong> carrusel interactivo dentro del portal del paciente <strong style={{ color: 'var(--green)' }}>Y</strong> link externo por WhatsApp inmediato. Resultados se vinculan automáticamente al perfil CRM y aparecen en el resumen pre-consulta del médico — reduce el tiempo de consulta hasta un 30%.
                        </p>
                    </div>
                </div>
            </section>

            {/* FASES */}
            <section style={{ background: 'var(--navy-mid)' }} id="fases">
                <div className="container">
                    <span className="slbl reveal">Hoja de ruta completa</span>
                    <h2 className="display reveal">5 fases de entrega.<br /><em>Resultados desde el mes 1.</em></h2>
                    <p className="lead reveal">
                        Cada fase construye sobre la anterior y genera valor inmediato. Total del proyecto:&nbsp;
                        <strong style={{ color: 'var(--green)' }}>1,890 horas de ingeniería</strong> en&nbsp;
                        <strong style={{ color: 'var(--green)' }}>~158 días hábiles (~32 semanas)</strong>.
                    </p>

                    {/* GANTT */}
                    <div className="gantt reveal">
                        <div className="gantt-title">Cronograma estimado — equipo: 1 Senior Dev · 1 QA · 1 BA · 4 hrs/día efectivas</div>
                        {phases.map((p, i) => (
                            <div key={i} className="gantt-row">
                                <span className="gantt-lbl">F{p.n} · {p.badge}</span>
                                <div className="gantt-track">
                                    <div className={`gantt-fill ${p.cls}`} style={{ width: p.pct }}>{p.name}</div>
                                </div>
                                <span className="gantt-days">{p.days}</span>
                            </div>
                        ))}
                        <p style={{ fontSize: '.72rem', color: 'var(--white-dim)', marginTop: '.9rem', opacity: .55 }}>* Días hábiles. Fases se ejecutan secuencialmente. Variación ±10% según feedback y ajustes de alcance.</p>
                    </div>

                    <div className="phases-wrap">
                        {phases.map((p, i) => (
                            <div key={i} className="phase-card reveal" style={{ transitionDelay: `${i * .08}s` }}>
                                <div className="phase-bg-n">{p.n}</div>
                                <div className="phase-tag">📅 {p.badge} · {p.weeks}</div>
                                <h4>{p.name}</h4>
                                <ul className="phase-items">{p.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
                                <div className="phase-kpi">🎯 {p.kpi}</div>
                                <div className="phase-footer">
                                    <span className="days">{p.days}</span>
                                    <span className="weeks">{p.weeks}</span>
                                    <span className="cost">{p.cost} MXN</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TECH STACK */}
            <section style={{ background: 'var(--navy)' }} id="tech">
                <div className="container">
                    <span className="slbl reveal">Stack tecnológico</span>
                    <h2 className="display reveal" style={{ color: 'var(--white)' }}>Tecnología enterprise<br /><em>aplicada al consultorio</em></h2>
                    <p className="lead reveal">El mismo stack que usan Google, Amazon y Walmart — adaptado para una clínica médica en Saltillo. Sin overkill, sin vendor lock-in, con 10 años de escalabilidad.</p>
                    <div className="tech-grid">
                        {[
                            { e: '⚛️', n: 'React + Reponsive', d: 'Portal web 100% responsivo adaptable a cualquier dispositivo móvil o tablet' },
                            { e: '🐘', n: 'PostgreSQL + pgvector', d: 'Base de datos relacional con búsqueda semántica nativa para el bot RAG' },
                            { e: '☁️', n: 'AWS (EC2 + RDS + S3)', d: 'Infraestructura escalable · Backups automáticos diarios · 99.5% uptime SLA' },
                            { e: '🤖', n: 'OpenAI GPT-4o', d: 'Agentes IA para cotizaciones, notas clínicas, recetas y bot conversacional' },
                            { e: '💬', n: 'WhatsApp Business API', d: 'Meta-certified · Conversaciones entrantes 100% gratuitas · Multi-agente nativo' },
                            { e: '🧾', n: 'SAT CFDI 4.0', d: 'Facturación electrónica compliant · RFC del paciente · Timbrado automático' },
                            { e: '🔐', n: 'AES-256 + TLS 1.3', d: 'Cifrado end-to-end · RBAC por rol · LFPDPPP · OWASP Top 10 · NOM-024' },
                            { e: '📊', n: 'Google Analytics 4', d: 'Tracking de conversiones desde Día 1 — mide cada paciente captado digitalmente' },
                        ].map((t, i) => (
                            <div key={i} className="tech-card reveal" style={{ transitionDelay: `${i * .06}s` }}>
                                <div className="tech-e">{t.e}</div>
                                <div className="tech-n">{t.n}</div>
                                <div className="tech-d">{t.d}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NFR */}
            <section style={{ background: 'var(--navy-mid)' }}>
                <div className="container">
                    <span className="slbl reveal">Estándares de la plataforma</span>
                    <h2 className="display reveal">Construida para<br /><em>aguantar y proteger</em></h2>
                    <p className="lead reveal">Requerimientos no funcionales definidos desde el inicio. Los datos de tus pacientes merecen el mismo cuidado que tu práctica clínica.</p>
                    <div className="nfr-grid">
                        {[
                            { icon: '⚡', title: 'Performance', desc: 'API ≤ 2s con 500 usuarios simultáneos · Chatbot ≤ 3s · Carga mobile < 2.5s en 4G' },
                            { icon: '🔒', title: 'Seguridad', desc: 'RBAC por rol · AES-256 en reposo · TLS 1.3 en tránsito · OWASP Top 10 compliance' },
                            { icon: '🏥', title: 'Privacidad LFPDPPP', desc: 'Datos del paciente segregados · Consentimiento explícito · Auditoría completa · NOM-024-SSA3-2012' },
                            { icon: '🟢', title: 'Disponibilidad 99.5%', desc: 'Uptime SLA · Failover automático en chatbot y agenda · Mantenimiento fuera de horario clínico' },
                            { icon: '📱', title: 'Usabilidad Mobile-first', desc: 'Portal iOS y Android · WCAG 2.1 AA · Máx. 3 taps para crear una nota clínica' },
                            { icon: '🇲🇽', title: 'Localización México', desc: 'Español · Zona horaria Monterrey (CST/CDT) · MXN · CFDI 4.0 · NOM-024-SSA3-2012' },
                            { icon: '💾', title: 'Backups y Recuperación', desc: 'Snapshots automáticos diarios · Retención 30 días · RTO ≤ 4h · RPO ≤ 1h · PITR habilitado' },
                            { icon: '📶', title: 'Funcionamiento Offline', desc: 'Formularios pre-consulta funcionales sin conexión · Sync automático al reconectar' },
                        ].map((n, i) => (
                            <div key={i} className="nfr-card reveal" style={{ transitionDelay: `${i * .06}s` }}>
                                <div className="nfr-icon">{n.icon}</div>
                                <div className="nfr-title">{n.title}</div>
                                <div className="nfr-desc">{n.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* INVERSION */}
            <section style={{ background: 'var(--navy)' }} id="inversion">
                <div className="container">
                    <span className="slbl reveal">Inversión transparente</span>
                    <h2 className="display reveal">Cada peso,<br /><em>justificado y trazable</em></h2>
                    <p className="lead reveal">Equipo de 3: 1 Senior Dev · 1 QA/SDET · 1 BA. Total: 1,890 horas de ingeniería distribuidas en ~158 días hábiles.</p>
                    <table className="invest-table reveal">
                        <thead>
                            <tr>
                                <th>Fase</th><th>Nombre</th><th>Dev (hrs)</th><th>QA (hrs)</th><th>BA (hrs)</th><th>Días hábiles</th><th style={{ textAlign: 'right' }}>Total MXN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['F1', 'Digital Foundation', 180, 80, 60, '~27 días · 5-6 sem', '$141,300'],
                                ['F2', 'Patient Platform', 320, 140, 100, '~47 días · 9-10 sem', '$285,500'],
                                ['F3', 'CRM Automation', 220, 100, 80, '~33 días · 6-7 sem', '$221,900'],
                                ['F4', 'Intelligence', 180, 80, 70, '~28 días · 5-6 sem', '$178,700'],
                                ['F5', 'Deep Tech & Scaling', 160, 70, 50, '~23 días · 4-5 sem', '$157,500'],
                            ].map(([f, n, d, q, b, days, t]) => (
                                <tr key={f}>
                                    <td style={{ color: 'var(--green)', fontWeight: 700 }}>{f}</td>
                                    <td style={{ fontWeight: 600 }}>{n}</td>
                                    <td style={{ color: 'var(--white-dim)' }}>{d}</td>
                                    <td style={{ color: 'var(--white-dim)' }}>{q}</td>
                                    <td style={{ color: 'var(--white-dim)' }}>{b}</td>
                                    <td style={{ color: 'var(--white-dim)', fontSize: '.82rem' }}>{days}</td>
                                    <td style={{ textAlign: 'right', fontWeight: 700 }}>{t}</td>
                                </tr>
                            ))}
                            <tr className="total-row">
                                <td colSpan={2}>TOTAL</td>
                                <td>1,060</td><td>470</td><td>360</td>
                                <td style={{ color: 'var(--green)' }}>~158 días</td>
                                <td style={{ textAlign: 'right', fontSize: '1rem' }}>~$984,900 MXN</td>
                            </tr>
                            <tr className="disc-row">
                                <td colSpan={6} style={{ color: 'var(--green)', fontWeight: 600 }}>🎁 Descuento especial lanzamiento (–10%) — proyecto completo 5 fases</td>
                                <td style={{ textAlign: 'right', color: 'var(--green)', fontSize: '1.1rem', fontWeight: 800 }}>$886,410 MXN</td>
                            </tr>
                            <tr className="mtto-row">
                                <td colSpan={6}>Mantenimiento mensual post-entrega (AWS + WhatsApp + LLM + Soporte 15 hrs)</td>
                                <td style={{ textAlign: 'right', color: 'var(--green)', fontWeight: 700 }}>~$8,750/mes</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="roi-block reveal">
                        <div>
                            <h3>¿En cuánto tiempo se recupera la inversión?</h3>
                            <p>A $900 por consulta y 30 pacientes los sábados, el Dr. Ruiz genera $108,000 MXN en un solo día. La Fase 1 completa ($141,300 MXN) se recupera en <strong style={{ color: 'var(--green)' }}>menos de 2 meses</strong> si el chatbot convierte apenas 5 pacientes adicionales por semana — exactamente lo que hace desde el Día 1.</p>
                            <p style={{ marginTop: '1rem' }}>El mantenimiento mensual completo equivale a <strong style={{ color: 'var(--green)' }}>menos de 10 consultas al mes</strong>. Menos de media jornada de sábado para tener toda la plataforma operando.</p>
                        </div>
                        <div className="roi-items">
                            {[
                                ['Ingreso 1 sábado (30 px)', '$108,000 MXN'],
                                ['Inversión Fase 1', '$141,300 MXN'],
                                ['Recuperación estimada', '< 2 meses'],
                                ['Duración total proyecto', '~158 días hábiles'],
                                ['Mantenimiento/mes', '~$8,750 MXN'],
                                ['Equivale a...', '< 10 consultas/mes'],
                            ].map(([l, v], i) => (
                                <div key={i} className="roi-item">
                                    <span className="roi-lbl">{l}</span>
                                    <span className="roi-val">{v}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* MTTO */}
            <section style={{ background: 'var(--navy-mid)' }} id="mtto">
                <div className="container">
                    <span className="slbl reveal">Costos mensuales auditados</span>
                    <h2 className="display reveal">Lo que pagas<br /><em>una vez entregado el proyecto</em></h2>
                    <p className="lead reveal">Precios verificados a marzo 2026. Tipo de cambio: $17.58 MXN/USD. Mensajes entrantes de WhatsApp son 100% gratuitos desde jul 2025.</p>
                    <div className="mtto-grid">
                        {[
                            { ico: '☁️', lbl: 'AWS Infraestructura', val: '$791', sub: 'EC2 t3.small + RDS t3.micro + S3 + Route 53' },
                            { ico: '💬', lbl: 'WhatsApp Business API', val: '$241', sub: '~800 msgs template/mes · Entrantes gratis' },
                            { ico: '🌐', lbl: 'Dominios', val: '$50', sub: 'drcesarruiz.com + saludosea.com · Anual' },
                            { ico: '🤖', lbl: 'LLM API (OpenAI)', val: '$88', sub: '~300K tokens/mes · GPT-4o mini Fase 1' },
                            { ico: '🔧', lbl: 'Soporte RobotInAi SLA', val: '$7,580', sub: '15 hrs/mes · 8h Dev + 4h QA + 3h BA' },
                        ].map((m, i) => (
                            <div key={i} className="mtto-card reveal" style={{ transitionDelay: `${i * .08}s` }}>
                                <div className="mtto-ico">{m.ico}</div>
                                <div className="mtto-lbl">{m.lbl}</div>
                                <div className="mtto-val">{m.val}</div>
                                <div className="mtto-sub">{m.sub}</div>
                            </div>
                        ))}
                        <div className="mtto-total reveal" style={{ transitionDelay: '.4s' }}>
                            <div className="mtto-ico">💰</div>
                            <p>Total mensual (Fase 1)</p>
                            <h3>~$8,750</h3>
                            <p>MXN / mes · Escala a ~$10,738 en Fase 4–5</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* OPCIONES */}
            <section style={{ background: 'var(--navy)' }} id="planes">
                <div className="container">
                    <span className="slbl reveal">Opciones de contratación</span>
                    <h2 className="display reveal">Elige el ritmo<br /><em>que se adapta a tu momento</em></h2>
                    <div className="opts-grid">
                        <div className="opt-card reveal">
                            <div className="opt-ttl">Entrada de bajo riesgo</div>
                            <div className="opt-price">$141,300 <span>MXN</span></div>
                            <div className="opt-save">~27 días hábiles · 5–6 semanas</div>
                            <div className="opt-desc"><strong>Solo Fase 1</strong> — Página Web + Control Inicial de Citas + Asistente Virtual. Resultados medibles en menos de 60 días.</div>
                            <ul className="opt-list">
                                <li>Página web y anuncios en Google</li>
                                <li><strong>Sistema y panel de citas inicial</strong></li>
                                <li>Asistente virtual de rescate de pacientes</li>
                                <li>Asignación de casos complejos a humanos</li>
                                <li>Panel para medir visitantes y contactos</li>
                            </ul>
                        </div>
                        <div className="opt-card reveal" style={{ transitionDelay: '.08s' }}>
                            <div className="opt-ttl">Plataforma core</div>
                            <div className="opt-price">$426,800 <span>MXN</span></div>
                            <div className="opt-save">~74 días hábiles · ~15 semanas</div>
                            <div className="opt-desc"><strong>Fases 1 + 2</strong> — Página web, asistente 24/7, expediente médico inteligente y portal de pacientes.</div>
                            <ul className="opt-list">
                                <li>Todo lo de la Fase 1</li>
                                <li>Expediente con cuentas separadas por rol</li>
                                <li>Portal web para uso exclusivo del paciente</li>
                                <li>Cuestionarios médicos enviados automáticamente</li>
                            </ul>
                        </div>
                        <div className="opt-card featured reveal" style={{ transitionDelay: '.16s' }}>
                            <div className="opt-badge">⭐ Recomendado</div>
                            <div className="opt-ttl">Proyecto completo</div>
                            <div className="opt-strike">~$984,900 MXN</div>
                            <div className="opt-price" style={{ color: 'var(--gold)' }}>$886,410 <span>MXN</span></div>
                            <div className="opt-save">↓ Ahorras $98,490 (–10%) · ~158 días hábiles</div>
                            <div className="opt-desc"><strong>Las 5 fases completas</strong> — El sistema completo e hiperautomatizado para el consultorio.</div>
                            <ul className="opt-list">
                                <li>Todo lo de Fases 1 y 2</li>
                                <li>Conexión de tu agenda local con Doctoralia</li>
                                <li>IA para generación de presupuestos de cirugía</li>
                                <li>Facturación electrónica transparente al SAT</li>
                                <li>Asistente que aprende solo de tus PDFs médicos</li>
                                <li>Creación automática de reportes para GNP / AXA</li>
                            </ul>
                        </div>
                        <div className="opt-card partner reveal" style={{ transitionDelay: '.24s' }}>
                            <div className="opt-ttl">Modelo partnership</div>
                            <div className="opt-price" style={{ color: 'var(--green)' }}>A negociar</div>
                            <div className="opt-save">Socio estratégico · Equity en Doctorela Plus SaaS</div>
                            <div className="opt-desc"><strong>Dr. Ruiz como anchor investor</strong> — Reducir costo en efectivo a cambio de participación accionaria como primer piloto oficial.</div>
                            <ul className="opt-list">
                                <li>Proyecto completo con inversión reducida</li>
                                <li>Participación accionaria en el SaaS</li>
                                <li>Rol de brand ambassador y piloto referencia</li>
                                <li>Términos documentados por separado</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            {/* INTENCIÓN */}
            <section className="intencion">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <span className="slbl reveal">Nuestra intención</span>
                    <h2 className="display reveal">No es solo software.<br /><em>Es tu tiempo de vuelta.</em></h2>
                    <p className="lead reveal">Dr. Ruiz, no queremos construir otra app. Queremos devolverte las horas que hoy se pierden en tareas administrativas — y asegurarnos de que ningún paciente más se pierda.</p>
                    <ul className="int-goals">
                        {[
                            'Reducir la pérdida de pacientes no atendidos hasta en un 60% — medible en los primeros 3 meses',
                            'Eliminar la dependencia de Excel, Doctoralia manual, notas de papel y 5 aplicaciones desconectadas',
                            'Automatizar la redacción de notas médicas directamente en tu nuevo expediente digital',
                            'Construir la base tecnológica moderna (Reportes automáticos, Facturas, Laboratorios) que el consultorio necesita',
                            'Crecer juntos como socios estratégicos mediante esta plataforma exclusiva',
                        ].map((g, i) => (
                            <li key={i} className="reveal" style={{ transitionDelay: `${i * .08}s` }}>
                                <div className="int-chk">✔</div><span>{g}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* CTA */}
            <section className="cta reveal" id="contacto">
                <span className="slbl">Siguiente paso</span>
                <h2>¿Listos para<br /><em>construir esto juntos?</em></h2>
                <p>Reunión formal el 14–15 de marzo de 2026. Presentamos la propuesta, resolvemos todas las preguntas abiertas y acordamos el modelo de contratación.</p>
                <div className="cta-btns">
                    <a href="#planes" className="btn-p">Ver opciones de contratación →</a>
                    <a href="#fases" className="btn-g">Revisar el roadmap</a>
                </div>
                <div className="cpills">
                    <div className="cpill"><span style={{ color: 'var(--green)' }}>🌐</span><a href="https://smart-flows.tech" target="_blank">smart-flows.tech</a></div>
                    <div className="cpill"><span style={{ color: 'var(--green)' }}>✉️</span><a href="mailto:athena@chat-bot.smart-flows.tech">athena@chat-bot.smart-flows.tech</a></div>
                </div>
            </section>

            <footer>
                <img src="white-pet-bot-no-back-no-name.png" alt="RobotInAi" style={{height:'48px',width:'auto',marginBottom:'.5rem'}} />
                <p>Propuesta de Transformación Digital · Dr. César Ruiz · Marzo 2026</p>
                <p style={{ marginTop: '.3rem', opacity: .4 }}>BRD v1.1 · 1,890 hrs de ingeniería · ~158 días hábiles · smart-flows.tech</p>
            </footer>
        </>
    );
}