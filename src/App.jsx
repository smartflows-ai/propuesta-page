import { useEffect, useState } from 'react';

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,700&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy: #050d1a; --navy-mid: #0a1628; --navy-light: #111f38;
    --green: #00e676; --green-glow: rgba(0,230,118,0.14);
    --white: #f8fafb; --white-dim: rgba(248,250,251,0.68); --white-faint: rgba(248,250,251,0.1);
    --gold: #d4a853; --red: #ff5252; --cyan: #26c6da; --purple: #ab47bc; --orange: #ff7043;
    --border: rgba(255,255,255,0.08);
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

  /* MODULE OVERVIEW CARDS */
  .mod-overview { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.1rem; margin-top: 2.5rem; }
  .mod-ov-card { background: var(--navy-light); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; transition: all .3s; cursor: pointer; text-decoration: none; color: inherit; position: relative; overflow: hidden; }
  .mod-ov-card:hover { border-color: rgba(0,230,118,.3); transform: translateY(-4px); }
  .mod-ov-card::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; }
  .mod-ov-card.m1::before { background: var(--green); }
  .mod-ov-card.m2::before { background: var(--gold); }
  .mod-ov-card.m3::before { background: var(--cyan); }
  .mod-ov-card.m4::before { background: var(--purple); }
  .mod-ov-card.mx::before { background: var(--orange); }
  .mod-ov-icon { font-size: 1.6rem; margin-bottom: .6rem; }
  .mod-ov-name { font-family: 'Fraunces', serif; font-size: .95rem; font-weight: 700; margin-bottom: .3rem; }
  .mod-ov-price { font-family: 'Fraunces', serif; font-size: 1.3rem; font-weight: 900; color: var(--green); margin-bottom: .3rem; }
  .mod-ov-meta { font-size: .73rem; color: var(--white-dim); line-height: 1.4; }

  /* MODULE DETAIL SECTIONS */
  .mod-header { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 2rem; }
  .mod-header-left { flex: 1; min-width: 280px; }
  .mod-header-right { display: flex; flex-direction: column; align-items: flex-end; gap: .4rem; }
  .mod-price-big { font-family: 'Fraunces', serif; font-size: 2.2rem; font-weight: 900; color: var(--green); line-height: 1; }
  .mod-meta-pill { display: inline-flex; align-items: center; gap: .3rem; font-size: .72rem; color: var(--white-dim); background: var(--navy-light); border: 1px solid var(--border); padding: .3rem .7rem; border-radius: 50px; }
  .mod-saving { font-size: .78rem; color: var(--green); font-weight: 600; }
  .mod-num { font-family: 'Fraunces', serif; font-size: .85rem; font-weight: 700; letter-spacing: 1px; margin-bottom: .5rem; }

  /* FEATURE ROWS */
  .feat-list { display: flex; flex-direction: column; gap: .55rem; }
  .feat-row { display: grid; grid-template-columns: 42px 1fr auto; align-items: start; gap: .8rem; padding: 1rem 1.2rem; background: var(--navy-light); border: 1px solid var(--border); border-radius: 12px; transition: border-color .25s; }
  .feat-row:hover { border-color: rgba(0,230,118,.18); }
  .feat-row.star { border-left: 3px solid var(--gold); }
  .feat-row.star .feat-icon { color: var(--gold); }
  .feat-icon { font-size: 1.4rem; text-align: center; padding-top: .1rem; }
  .feat-body h4 { font-size: .88rem; font-weight: 700; margin-bottom: .15rem; color: var(--white); }
  .feat-body p { font-size: .8rem; color: var(--white-dim); line-height: 1.5; }
  .feat-tags { display: flex; gap: .35rem; flex-wrap: wrap; align-self: center; }
  .feat-tag { font-size: .62rem; font-weight: 800; letter-spacing: .7px; text-transform: uppercase; padding: .22rem .55rem; border-radius: 50px; white-space: nowrap; }
  .feat-tag.both { background: rgba(0,230,118,.1); color: var(--green); border: 1px solid rgba(0,230,118,.25); }
  .feat-tag.crm { background: rgba(38,198,218,.1); color: var(--cyan); border: 1px solid rgba(38,198,218,.2); }
  .feat-tag.patient { background: rgba(171,71,188,.1); color: var(--purple); border: 1px solid rgba(171,71,188,.2); }
  .feat-tag.excluded { background: rgba(255,255,255,.04); color: rgba(255,255,255,.3); border: 1px solid rgba(255,255,255,.06); }

  /* COMPARISON TABLE */
  .compare-wrap { margin-top: 2.5rem; overflow-x: auto; }
  .compare-table { width: 100%; border-collapse: separate; border-spacing: 0; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
  .compare-table th { padding: 1.1rem 1.3rem; text-align: left; font-size: .78rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; border-bottom: 2px solid var(--border); }
  .compare-table th:first-child { background: var(--navy-light); color: var(--white-dim); }
  .compare-table th.prop-a { background: linear-gradient(135deg, rgba(0,230,118,.08), rgba(0,230,118,.03)); color: var(--green); }
  .compare-table th.prop-b { background: linear-gradient(135deg, rgba(212,168,83,.08), rgba(212,168,83,.03)); color: var(--gold); }
  .compare-table td { padding: .85rem 1.3rem; border-bottom: 1px solid var(--border); font-size: .86rem; }
  .compare-table tr:last-child td { border-bottom: none; }
  .compare-table tr:hover td { background: rgba(255,255,255,.015); }
  .compare-table .mod-name-cell { font-weight: 600; color: var(--white); }
  .compare-table .mod-name-cell small { display: block; font-weight: 400; color: var(--white-dim); font-size: .76rem; margin-top: .15rem; }
  .compare-table .check { color: var(--green); font-weight: 700; font-size: 1rem; }
  .compare-table .star-feat { color: var(--gold); font-weight: 700; }
  .compare-table .not-inc { color: rgba(255,255,255,.2); }
  .compare-table .total-row td { background: var(--navy-light); font-weight: 700; border-top: 2px solid var(--border); }
  .compare-table .total-row .price-cell { font-family: 'Fraunces', serif; font-size: 1.3rem; font-weight: 900; }
  .compare-table .bundle-row td { background: rgba(0,230,118,.04); }
  .compare-table .bundle-row .price-cell { color: var(--green); font-family: 'Fraunces', serif; font-size: 1.1rem; font-weight: 900; }

  /* PROP CARDS */
  .prop-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 2.5rem; }
  .prop-card { border-radius: var(--radius-lg); padding: 2.2rem; position: relative; overflow: hidden; transition: all .3s; }
  .prop-card:hover { transform: translateY(-4px); }
  .prop-card.prop-a { background: linear-gradient(135deg, var(--navy-light), rgba(0,230,118,.04)); border: 1px solid rgba(0,230,118,.2); }
  .prop-card.prop-b { background: linear-gradient(135deg, var(--navy-light), rgba(212,168,83,.06)); border: 2px solid rgba(212,168,83,.35); box-shadow: 0 0 50px rgba(212,168,83,.08); }
  .prop-badge-top { position: absolute; top: -1px; right: 24px; background: var(--gold); color: var(--navy); padding: .3rem .9rem; border-radius: 0 0 8px 8px; font-size: .68rem; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; }
  .prop-label { font-size: .7rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: .5rem; }
  .prop-card.prop-a .prop-label { color: var(--green); }
  .prop-card.prop-b .prop-label { color: var(--gold); }
  .prop-title { font-family: 'Fraunces', serif; font-size: 1.4rem; font-weight: 900; margin-bottom: .6rem; }
  .prop-desc { color: var(--white-dim); font-size: .88rem; line-height: 1.6; margin-bottom: 1.3rem; }
  .prop-modules { list-style: none; display: flex; flex-direction: column; gap: .35rem; margin-bottom: 1.5rem; }
  .prop-modules li { font-size: .82rem; color: var(--white-dim); padding-left: 1.1rem; position: relative; line-height: 1.5; }
  .prop-modules li::before { content: '✓'; position: absolute; left: 0; color: var(--green); font-weight: 700; font-size: .75rem; }
  .prop-modules li.extra::before { content: '+'; color: var(--gold); }
  .prop-price-section { border-top: 1px solid var(--border); padding-top: 1.2rem; }
  .prop-price-strike { text-decoration: line-through; color: rgba(255,255,255,.25); font-size: .88rem; }
  .prop-price-final { font-family: 'Fraunces', serif; font-size: 2rem; font-weight: 900; line-height: 1.1; }
  .prop-card.prop-a .prop-price-final { color: var(--green); }
  .prop-card.prop-b .prop-price-final { color: var(--gold); }
  .prop-price-note { font-size: .74rem; color: var(--white-dim); margin-top: .3rem; }

  /* NOTE BLOCK */
  .note-block { margin-top: 1.5rem; padding: 1.3rem 1.6rem; background: rgba(255,112,67,.06); border: 1px solid rgba(255,112,67,.2); border-radius: var(--radius); }
  .note-block p { color: var(--white-dim); font-size: .85rem; line-height: 1.65; }
  .note-block strong { color: var(--orange); }

  /* CTA */
  .cta { background: linear-gradient(135deg, var(--navy-mid), var(--navy)); border-top: 1px solid var(--border); text-align: center; padding: 5.5rem 2.5rem; position: relative; overflow: hidden; }
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

  /* MOCKUP GALLERY */
  .mockup-gallery { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; margin: 2rem 0 1rem; }
  .mockup-gallery .mockup-card { flex: 0 1 calc(33.333% - .67rem); min-width: 220px; }
  .mockup-card { position: relative; border-radius: var(--radius); overflow: hidden; border: 1px solid var(--border); background: var(--navy-light); transition: all .4s cubic-bezier(.4,0,.2,1); cursor: pointer; aspect-ratio: 4/3; }
  .mockup-card:hover { border-color: rgba(0,230,118,.35); transform: translateY(-5px) scale(1.02); box-shadow: 0 20px 60px rgba(0,0,0,.5), 0 0 30px rgba(0,230,118,.08); z-index: 3; }
  .mockup-card img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s cubic-bezier(.4,0,.2,1), filter .3s; filter: brightness(.92); }
  .mockup-card:hover img { transform: scale(1.05); filter: brightness(1); }
  .mockup-card .mockup-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(5,13,26,.92) 0%, rgba(5,13,26,.3) 40%, transparent 65%); display: flex; flex-direction: column; justify-content: flex-end; padding: 1rem 1.1rem; opacity: 1; transition: opacity .3s; }
  .mockup-card .mockup-label { font-size: .76rem; font-weight: 700; color: var(--white); line-height: 1.3; }
  .mockup-card .mockup-sublabel { font-size: .66rem; color: var(--white-dim); margin-top: .15rem; }
  .mockup-card .mockup-expand { position: absolute; top: .7rem; right: .7rem; width: 28px; height: 28px; background: rgba(0,0,0,.5); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.15); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: .7rem; color: var(--white-dim); opacity: 0; transition: opacity .25s; }
  .mockup-card:hover .mockup-expand { opacity: 1; }
  .mockup-placeholder { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: .6rem; background: linear-gradient(135deg, var(--navy-light), rgba(0,230,118,.03)); }
  .mockup-placeholder-icon { font-size: 2.2rem; opacity: .4; }
  .mockup-placeholder-text { font-size: .72rem; color: var(--white-dim); opacity: .5; text-align: center; padding: 0 1rem; }

  /* LIGHTBOX */
  .lightbox { position: fixed; inset: 0; z-index: 1000; background: rgba(5,13,26,.95); backdrop-filter: blur(20px); display: flex; align-items: center; justify-content: center; padding: 2rem; opacity: 0; pointer-events: none; transition: opacity .3s ease; }
  .lightbox.open { opacity: 1; pointer-events: all; }
  .lightbox img { max-width: 90vw; max-height: 85vh; object-fit: contain; border-radius: var(--radius); border: 1px solid var(--border); box-shadow: 0 30px 80px rgba(0,0,0,.7); }
  .lightbox-close { position: absolute; top: 1.5rem; right: 1.5rem; width: 40px; height: 40px; background: rgba(255,255,255,.08); border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--white); font-size: 1.1rem; cursor: pointer; transition: all .2s; }
  .lightbox-close:hover { background: rgba(255,82,82,.2); border-color: var(--red); }
  .lightbox-caption { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); color: var(--white); font-size: .85rem; text-align: center; max-width: 540px; background: rgba(5,13,26,.85); backdrop-filter: blur(12px); padding: .8rem 1.4rem; border-radius: var(--radius); border: 1px solid var(--border); }
  .lightbox-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; background: rgba(5,13,26,.7); backdrop-filter: blur(8px); border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--white); font-size: 1.2rem; cursor: pointer; transition: all .2s; }
  .lightbox-nav:hover { background: rgba(0,230,118,.15); border-color: var(--green); }
  .lightbox-nav.prev { left: 1.5rem; }
  .lightbox-nav.next { right: 1.5rem; }

  @media(max-width:900px){
    .mockup-gallery .mockup-card { flex: 0 1 calc(50% - .5rem); }
  }
  @media(max-width:500px){
    .mockup-gallery .mockup-card { flex: 0 1 100%; }
  }

  /* EXTRA DROPDOWN */
  .extra-dropdown { background: var(--navy-light); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; transition: border-color .3s; }
  .extra-dropdown:hover { border-color: rgba(255,112,67,.25); }
  .extra-dropdown-header { display: flex; justify-content: space-between; align-items: center; padding: 1.4rem 1.8rem; cursor: pointer; user-select: none; gap: 1rem; scroll-margin-top: 80px; }
  .extra-dropdown-left { display: flex; align-items: center; gap: 1rem; }
  .extra-dropdown-right { display: flex; align-items: center; gap: 1rem; text-align: right; }
  .extra-chevron { font-size: .7rem; color: var(--white-dim); transition: transform .3s; }
  .extra-dropdown-body { padding: 0 1.8rem 1.8rem; border-top: 1px solid var(--border); }
  @media(max-width:700px){
    .extra-dropdown-header { flex-direction: column; align-items: flex-start; }
    .extra-dropdown-right { align-self: flex-end; }
  }

  /* MARKETING CARDS */
  .mkt-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; margin: 1.5rem 0; }
  .mkt-card { background: var(--navy); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; position: relative; overflow: hidden; }
  .mkt-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
  .mkt-card.setup::before { background: var(--green); }
  .mkt-card.monthly::before { background: var(--orange); }
  .mkt-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
  .mkt-card-type { font-size: .65rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: .2rem .6rem; border-radius: 50px; }
  .mkt-card.setup .mkt-card-type { background: rgba(0,230,118,.1); color: var(--green); }
  .mkt-card.monthly .mkt-card-type { background: rgba(255,112,67,.1); color: var(--orange); }
  .mkt-card-price { font-family: 'Fraunces', serif; font-size: 1.6rem; font-weight: 900; color: var(--green); }
  .mkt-card.monthly .mkt-card-price { color: var(--orange); }
  .mkt-card-price span { font-size: .7rem; font-weight: 400; color: var(--white-dim); }
  .mkt-card-features { display: flex; flex-direction: column; gap: .6rem; margin-top: .8rem; }
  .mkt-feat { display: flex; gap: .6rem; align-items: flex-start; }
  .mkt-feat-icon { font-size: .9rem; flex-shrink: 0; margin-top: .1rem; }
  .mkt-feat-text h5 { font-size: .8rem; font-weight: 600; color: var(--white); margin-bottom: .1rem; }
  .mkt-feat-text p { font-size: .72rem; color: var(--white-dim); line-height: 1.4; }
  .mkt-ads-note { background: rgba(255,112,67,.06); border: 1px solid rgba(255,112,67,.2); border-radius: var(--radius); padding: 1rem 1.3rem; margin-top: 1.2rem; }
  .mkt-ads-note h5 { font-size: .82rem; font-weight: 700; color: var(--orange); margin-bottom: .3rem; }
  .mkt-ads-note p { font-size: .78rem; color: var(--white-dim); line-height: 1.5; }
  .mkt-synergy { background: rgba(0,230,118,.05); border: 1px solid rgba(0,230,118,.15); border-radius: var(--radius); padding: 1rem 1.3rem; margin-top: .8rem; }
  .mkt-synergy p { font-size: .78rem; color: var(--white-dim); line-height: 1.5; }
  .mkt-badge { display: inline-flex; align-items: center; gap: .4rem; font-size: .68rem; font-weight: 600; color: var(--orange); background: rgba(255,112,67,.08); border: 1px solid rgba(255,112,67,.2); padding: .25rem .7rem; border-radius: 50px; margin-top: .8rem; }
  @media(max-width:700px){
    .mkt-cards { grid-template-columns: 1fr; }
  }

  /* MODULE SELECTOR — 2 col layout */
  .selector-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; margin-top: 2.5rem; align-items: start; }
  .selector-left { display: flex; flex-direction: column; gap: .7rem; }
  .selector-right { position: sticky; top: 100px; display: flex; flex-direction: column; gap: .7rem; }
  .sel-card { display: grid; grid-template-columns: 32px 1fr auto; align-items: center; gap: .8rem; padding: 1rem 1.2rem; background: var(--navy-light); border: 1px solid var(--border); border-radius: var(--radius); transition: all .3s; cursor: pointer; user-select: none; position: relative; }
  .sel-card:hover { border-color: rgba(0,230,118,.25); }
  .sel-card.selected { border-color: rgba(0,230,118,.4); background: linear-gradient(135deg, var(--navy-light), rgba(0,230,118,.04)); }
  .sel-card.dimmed { border-color: var(--border); border-style: dashed; }
  .sel-card.dimmed:hover { border-color: rgba(0,230,118,.25); border-style: solid; }
  .sel-card.dimmed .sel-info h4 { color: var(--white-dim); }
  .sel-card.dimmed .sel-price { color: var(--white-dim); }
  .sel-card.locked { cursor: default; }
  .sel-card.dep-auto { border-color: rgba(38,198,218,.3); background: linear-gradient(135deg, var(--navy-light), rgba(38,198,218,.04)); }
  .sel-checkbox { width: 24px; height: 24px; border-radius: 6px; border: 2px solid var(--border); display: flex; align-items: center; justify-content: center; transition: all .25s; flex-shrink: 0; font-size: .75rem; }
  .sel-card.selected .sel-checkbox { background: var(--green); border-color: var(--green); color: var(--navy); }
  .sel-card.dep-auto .sel-checkbox { background: var(--cyan); border-color: var(--cyan); color: var(--navy); }
  .sel-card.locked .sel-checkbox { background: var(--green); border-color: var(--green); color: var(--navy); opacity: .7; }
  .sel-card.dimmed .sel-checkbox { border-color: rgba(255,255,255,.1); }
  .sel-info h4 { font-size: .86rem; font-weight: 700; margin-bottom: .1rem; }
  .sel-info p { font-size: .73rem; color: var(--white-dim); line-height: 1.35; }
  .sel-dep-tag { display: inline-flex; align-items: center; gap: .25rem; font-size: .58rem; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; padding: .15rem .45rem; border-radius: 50px; margin-top: .25rem; }
  .sel-dep-tag.base { background: rgba(0,230,118,.1); color: var(--green); border: 1px solid rgba(0,230,118,.2); }
  .sel-dep-tag.auto { background: rgba(38,198,218,.1); color: var(--cyan); border: 1px solid rgba(38,198,218,.2); }
  .sel-dep-tag.note { background: rgba(255,112,67,.08); color: var(--orange); border: 1px solid rgba(255,112,67,.15); }
  .sel-price { font-family: 'Fraunces', serif; font-size: 1.1rem; font-weight: 900; color: var(--green); white-space: nowrap; text-align: right; }
  .sel-card.dimmed .sel-price { color: var(--white-dim); }

  /* Right panel: summary */
  .sel-summary-card { background: var(--navy-light); border: 1px solid var(--border); border-radius: var(--radius); padding: 1rem 1.2rem; display: flex; justify-content: space-between; align-items: center; transition: all .3s; }
  .sel-summary-card.active { border-color: rgba(0,230,118,.2); }
  .sel-summary-card.active .sel-sum-price { color: var(--green); }
  .sel-summary-card.inactive { border-style: dashed; }
  .sel-summary-card.inactive .sel-sum-name { color: rgba(248,250,251,.4); }
  .sel-summary-card.inactive .sel-sum-price { color: rgba(248,250,251,.3); text-decoration: line-through; }
  .sel-sum-name { font-size: .82rem; color: var(--white-dim); }
  .sel-sum-price { font-family: 'Fraunces', serif; font-size: 1rem; font-weight: 700; color: var(--white-dim); transition: color .3s; }
  .sel-total-bar { display: flex; justify-content: space-between; align-items: center; padding: 1.2rem 1.5rem; background: var(--green); border-radius: var(--radius); margin-top: .3rem; color: var(--navy); }
  .sel-total-label { font-size: .88rem; font-weight: 800; }
  .sel-total-count { font-size: .72rem; font-weight: 600; opacity: .75; }
  .sel-total-price { font-family: 'Fraunces', serif; font-size: 1.8rem; font-weight: 900; }
  .sel-deps-note { font-size: .72rem; color: var(--white-dim); margin-top: .6rem; line-height: 1.5; padding: .7rem 1rem; background: var(--navy-light); border: 1px solid var(--border); border-radius: 10px; }
  .sel-deps-note span { color: var(--cyan); font-weight: 700; }

  @media(max-width:900px){
    .selector-layout { grid-template-columns: 1fr; }
    .selector-right { position: static; }
  }
  @media(max-width:600px){
    .sel-card { grid-template-columns: 28px 1fr; gap: .6rem; padding: .85rem; }
    .sel-price { grid-column: 1 / -1; text-align: left; font-size: 1rem; }
    .sel-total-bar { flex-direction: column; gap: .4rem; text-align: center; }
  }

  /* LEGEND */
  .legend { display: flex; gap: 1.2rem; flex-wrap: wrap; margin-bottom: 1.5rem; padding: 1rem 1.3rem; background: var(--navy-light); border: 1px solid var(--border); border-radius: 12px; }
  .legend-item { display: flex; align-items: center; gap: .4rem; font-size: .75rem; color: var(--white-dim); }
  .legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

  /* RESPONSIVE */
  @media(max-width:900px){
    .hero-inner { grid-template-columns:1fr; text-align:center; gap:2rem; }
    .hero-actions { justify-content:center; }
    .hero h1 { font-size: 2.8rem; }
    .hstats { display:none; }
    nav a:not(.nav-btn) { display:none; }
    .prop-cards { grid-template-columns: 1fr; }
    .mod-header { flex-direction: column; align-items: flex-start; }
    .mod-header-right { align-items: flex-start; }
    .compare-table { font-size: .8rem; }
    .feat-row { grid-template-columns: 36px 1fr; }
    .feat-tags { grid-column: 1 / -1; }
  }
  @media(max-width:600px){
    section { padding:3.5rem 1.2rem; }
    header { padding:.8rem 1.2rem; }
    .hero { padding: 7rem 1.2rem 3rem; }
    .display { font-size:1.9rem; }
    .hero h1 { font-size: 2.2rem; }
    .btn-p, .btn-g { width: 100%; justify-content:center; }
    .mod-overview { grid-template-columns: 1fr; }
  }
`;

const modules = [
    {
        id: 'm1', n: '01', cls: 'm1', color: 'var(--green)',
        icon: '📱', name: 'App del Paciente (PWA)', tagline: 'SLIM',
        subtitle: 'Web app instalable en iPhone y Android — sin App Store',
        price: '$72,000', meta: 'Dev 70h · QA 28h · BA 23h · ~18 días',
        saving: '−$88K vs. nativa completa',
        mockups: [
            { file: 'mockups/m1-01-login-home.webp', label: 'Login + Home del Paciente', sublabel: 'Acceso seguro y dashboard principal' },
            { file: 'mockups/m1-02-rehab-plan.webp', label: 'Plan de Rehabilitación', sublabel: 'Ejercicios con video integrado' },
            { file: 'mockups/m1-03-expediente.webp', label: 'Expediente Clínico Móvil', sublabel: 'Documentos y estudios en el teléfono' },
        ],
        features: [
            { star: false, icon: '🔐', title: 'Login seguro con usuario', desc: 'El paciente entra con su usuario y contraseña.', tags: ['both'] },
            { star: false, icon: '📂', title: 'Expediente clínico visible en el teléfono (lectura)', desc: 'El doctor carga los documentos PDF e imágenes desde el CRM; el paciente los consulta en la app. Fuera de Alcance: visualización 3D, archivos interactivos o especializados.', tags: ['both'] },
            { star: true, icon: '🏋️', title: 'Plan de rehabilitación digital con ejercicios', desc: 'Ejercicios ordenados por categoría con link de video corto en iframe; coordinado con fisioterapia.', tags: ['both'] },
            { star: false, icon: '🔔', title: 'Recordatorios push del plan de rehab', desc: '"Hoy te toca sesión 3" — frecuencia configurable por el paciente.', tags: ['patient'] },
            { star: false, icon: '📅', title: 'Adaptación con Calendario Doctoralia', desc: 'Doctor ve calendario de citas y se integra a Doctoralia.', tags: ['crm'] },
            { star: false, icon: '🗓️', title: 'Paciente puede crear citas', desc: 'Paciente puede crear y cancelar citas. TBD: ver citas creadas.', tags: ['patient'] },
            { star: false, icon: '⏰', title: 'Recordatorios push automáticos de citas de seguimiento', desc: 'Notificación al paciente 24h antes de cada cita de seguimiento.', tags: ['patient'] },
            { star: false, icon: '🚫', title: 'Presencia en App Store / Google Play', desc: 'PWA se instala desde un link — paciente toca "Agregar a inicio" en su navegador.', tags: ['excluded'] },
        ]
    },
    {
        id: 'm2', n: '02', cls: 'm2', color: 'var(--gold)',
        icon: '🎖️', name: 'Tarjeta Digital de Lealtad + QR', tagline: '',
        subtitle: 'Sistema de puntos, canje y tienda de productos propios',
        price: '$66,500', meta: 'Dev 80h · QA 35h · BA 30h · ~22 días',
        saving: '',
        mockups: [
            { file: 'mockups/m2-01-qr-scan.webp', label: 'Escaneo QR en Recepción', sublabel: 'Check-in instantáneo del paciente' },
            { file: 'mockups/m2-02-loyalty-dashboard.webp', label: 'Dashboard de Puntos', sublabel: 'Progreso y beneficios acumulados' },
            { file: 'mockups/m2-03-push-notification.webp', label: 'Notificación Push', sublabel: '"¡Te falta 1 visita para tu consulta gratis!"' },
        ],
        features: [
            { star: true, icon: '🔄', title: 'Acumulación de visitas: cada consulta suma', desc: 'Al llegar a 10, la siguiente es gratis o descuento. El umbral (10 visitas) es configurable por el admin desde el CRM + escaneo de QRs.', tags: ['crm'] },
            { star: true, icon: '📲', title: 'QR único por paciente escaneable en recepción', desc: 'Violeta escanea el QR del teléfono del paciente con tablet o PC — registra la visita al instante.', tags: ['patient'] },
            { star: false, icon: '📈', title: 'Visitas acumuladas, beneficio disponible, historial de canjes', desc: '"Llevas 7 visitas — te faltan 3 para tu consulta gratis."', tags: ['patient'] },
            { star: false, icon: '🔔', title: 'Notificación push cuando está cerca de canjear', desc: '"¡Te falta 1 visita para tu consulta gratis!" — incentiva que regrese.', tags: ['patient'] },
        ]
    },
    {
        id: 'm3', n: '03', cls: 'm3', color: 'var(--cyan)',
        icon: '🗂️', name: 'CRM Base + Login por Roles + Agenda', tagline: '',
        subtitle: 'Back-office del consultorio — lo que usa el equipo interno',
        price: '$68,000', meta: 'Dev 90h · QA 40h · BA 35h · ~26 días',
        saving: '',
        mockups: [
            { file: 'mockups/m3-01-crm-dashboard.webp', label: 'Dashboard del Doctor', sublabel: 'Métricas, pacientes del día y alertas' },
            { file: 'mockups/m3-02-agenda.webp', label: 'Agenda Consultas / Rehab', sublabel: 'Calendario unificado por tipo de cita' },
            { file: 'mockups/m3-03-pre-consulta.webp', label: 'Resumen Pre-Consulta', sublabel: 'Todo sobre el paciente antes de que entre' },
            { file: 'mockups/m3-04-mensajes-whatsapp.webp', label: 'Visualización de Mensajes WhatsApp', sublabel: 'Conversaciones del agente visibles en el CRM' },
        ],
        features: [
            { star: false, icon: '👥', title: 'Login diferenciado por rol', desc: 'Dr. Ruiz, Violeta (recepción), Renata (enfermería), Luis (fisio). Cada rol ve solo lo que necesita.', tags: ['crm'] },
            { star: false, icon: '📂', title: 'Perfil del paciente completo', desc: 'Datos, historial de consultas, documentos, resultado de cuestionarios — todo en un solo lugar.', tags: ['crm'] },
            { star: false, icon: '📅', title: 'Vista de agenda: consultas y rehabilitación', desc: 'Separado por tipo (consulta / rehab) en un solo calendario — evita confusión.', tags: ['crm'] },
            { star: false, icon: '📝', title: 'Resumen pre-consulta automático', desc: '"Paciente: Juan López — 7 visitas acumuladas — VAS: 6/10 — Oswestry: 42%"', tags: ['crm'] },
            { star: false, icon: '🔔', title: 'Notificaciones internas por categoría', desc: 'Nueva cita, canje de lealtad, resultado de escala. Cada rol recibe solo lo que le aplica.', tags: ['crm'] },
            { star: true, icon: '🤖', title: 'Integración Agente Inteligente vía WhatsApp + CRM vista de mensajes', desc: 'Agente conversacional conectado a WhatsApp que atiende pacientes 24/7. Todas las conversaciones quedan visibles dentro del CRM para seguimiento del equipo.', tags: ['both'] },
        ]
    },
    {
        id: 'm4', n: '04', cls: 'm4', color: 'var(--purple)',
        icon: '📋', name: 'Cuestionarios Pre-consulta + Escalas', tagline: '',
        subtitle: 'El paciente llega evaluado — el doctor llega preparado',
        price: '$42,000', meta: 'Dev 55h · QA 25h · BA 20h · ~17 días',
        saving: '',
        mockups: [
            { file: 'mockups/m4-01-escala-movil.webp', label: 'Escala de Dolor en Móvil', sublabel: 'Paciente completando escala antes de cita' },
            { file: 'mockups/m4-02-resultados-crm.webp', label: 'Resultados en CRM', sublabel: 'Oswestry con tendencia histórica' },
            { file: 'mockups/m4-03-link-externo.webp', label: 'Formularios Clínicos', sublabel: 'Escalas personalizadas por categoría' },
            { file: 'mockups/m4-04-respuesta-whatsapp.webp', label: 'Respuesta Humana vía WhatsApp', sublabel: 'Empleado responde cuestionario por el paciente' },
        ],
        features: [
            { star: true, icon: '🩺', title: 'Cuestionarios diferenciados por padecimiento', desc: 'Columna lumbar vs. rodilla. El contenido ya existe — lo está desarrollando el Dr. Ruiz con otra doctora. Reduce costo real.', tags: ['both'] },
            { star: false, icon: '🔔', title: 'Enviados por push 24h antes de cada cita', desc: 'El paciente lo llena en 3-5 min desde la app antes de llegar al consultorio.', tags: ['patient'] },
            { star: false, icon: '📊', title: 'Escalas clínicas personalizables (CRM)', desc: 'Crear formularios con las escalas más usadas por el Dr. Ruiz, configurar categorías y exportar resultados.', tags: ['crm'] },
            { star: false, icon: '📋', title: 'Escalas clínicas (Paciente)', desc: 'El paciente puede ver las escalas personalizadas por categorías y contestarlas directamente desde la app.', tags: ['patient'] },
            { star: false, icon: '📏', title: 'Escala Oswestry — índice de discapacidad lumbar', desc: '10 preguntas, scoring automático, interpretación: mínima / moderada / severa / completa.', tags: ['both'] },
            { star: false, icon: '📎', title: 'Resultados auto-adjuntados al perfil CRM', desc: 'El médico ve el resumen antes de la consulta — no tiene que preguntar lo básico.', tags: ['crm'] },
            { star: false, icon: '👩‍⚕️', title: 'Respuestas de empleados habilitadas', desc: 'Violeta, Renata o Luis pueden responder cuestionarios en nombre del paciente cuando es necesario (ej. pacientes mayores o en consulta presencial).', tags: ['crm'] },
        ]
    },
];

const modulesExtra = [
    {
        id: 'mx1', n: 'Extra', cls: 'mx', color: 'var(--orange)',
        icon: '🛒', name: 'Tienda + Pagos',
        subtitle: 'Tienda de productos, inventario y cobros con Stripe',
        price: '$28,000', meta: 'Dev 40h · QA 18h · BA 15h · ~12 días',
        mockups: [
            { file: 'mockups/mx-01-catalogo.webp', label: 'Catálogo de Productos', sublabel: 'Precios exclusivos para pacientes frecuentes' },
            { file: 'mockups/mx-02-inventario.webp', label: 'Inventario en CRM', sublabel: 'Stock, alertas y movimientos de venta' },
            { file: 'mockups/mx-03-detalle-producto.webp', label: 'Detalle con Descuento', sublabel: 'Precio especial visible para el paciente' },
            { file: 'mockups/mx-04-pagos-stripe.webp', label: 'Pagos con Stripe', sublabel: 'Pago en app, OXXO, 7-Eleven y más' },
        ],
        features: [
            { star: true, icon: '🛍️', title: 'Tienda de productos con precios especiales', desc: 'Cremas, suplementos, proteínas del Dr. Ruiz — descuentos visibles solo en la app del paciente.', tags: ['patient'] },
            { star: false, icon: '📦', title: 'Inventario básico de productos', desc: 'Stock, precios, movimientos de venta. Alertas de bajo stock configurables para no quedarse sin producto.', tags: ['crm'] },
            { star: true, icon: '💳', title: 'Integración con Stripe para pagos en línea', desc: 'Cobro de consultas, productos y servicios directamente desde la app. Links de pago enviables por WhatsApp. Comisión estándar de Stripe.', tags: ['both'] },
        ]
    },
    {
        id: 'mx2', n: 'Extra', cls: 'mx', color: 'var(--orange)',
        icon: '📣', name: 'Marketing Digital',
        subtitle: 'Sistema de captación de pacientes para traumatología',
        price: '$8,000', meta: 'Setup único + mensualidad',
        marketing: true,
        mockups: [
            { file: 'mockups/mx-05-marketing-digital.webp', label: 'Marketing Digital', sublabel: 'Campañas y promociones segmentadas' },
            { file: 'mockups/mx-06-google-ads-dashboard.webp', label: 'Dashboard Google Ads', sublabel: 'Métricas de campañas y conversiones' },
            { file: 'mockups/mx-07-resultados-captacion.webp', label: 'Resultados de Captación', sublabel: 'Pacientes nuevos y ROI mensual' },
        ],
        setup: {
            price: '$8,000',
            label: 'Setup inicial',
            type: 'Pago único',
            features: [
                { icon: '⚙️', title: 'Configuración completa de Google Ads', desc: 'Campañas creadas desde cero, listas para generar pacientes.' },
                { icon: '🔎', title: 'Investigación de keywords', desc: 'Keywords enfocadas a traumatología en Monterrey.' },
                { icon: '✍️', title: 'Redacción de anuncios', desc: 'Anuncios orientados a generar pacientes reales.' },
                { icon: '📞', title: 'Configuración de conversiones', desc: 'Tracking de WhatsApp y llamadas como conversiones.' },
                { icon: '🔍', title: 'SEO básico del sitio', desc: 'Optimización inicial del sitio web — palabras clave y estructura.' },
                { icon: '📍', title: 'Google Business Profile', desc: 'Revisión estratégica del perfil para posicionamiento local.' },
            ]
        },
        monthly: {
            price: '$3,000',
            label: 'Mantenimiento',
            type: 'Mensual',
            features: [
                { icon: '📊', title: 'Gestión de Google Ads', desc: 'Revisión quincenal, ajuste de keywords y optimización para menor costo por paciente.' },
                { icon: '📈', title: 'Seguimiento de resultados', desc: 'Análisis de mensajes, llamadas y contactos generados. Identificación de mejores campañas.' },
                { icon: '🎯', title: 'Ajustes estratégicos', desc: 'Recomendaciones y cambios puntuales en campañas según desempeño.' },
                { icon: '🔍', title: 'SEO ligero', desc: 'Ajustes menores en sitio web y mejoras ocasionales en contenido o estructura.' },
            ]
        },
        adSpend: { min: '$3,000', max: '$6,000' },
    },
];

function MockupGallery({ mockups, onOpen }) {
    const [imgErrors, setImgErrors] = useState({});
    const handleError = (file) => setImgErrors(prev => ({ ...prev, [file]: true }));

    return (
        <div className="mockup-gallery">
            {mockups.map((m, i) => (
                <div
                    key={m.file}
                    className="mockup-card reveal"
                    style={{ transitionDelay: `${i * .1}s` }}
                    onClick={() => !imgErrors[m.file] && onOpen(mockups, i)}
                >
                    {imgErrors[m.file] ? (
                        <div className="mockup-placeholder">
                            <div className="mockup-placeholder-icon">🖼️</div>
                            <div className="mockup-placeholder-text">{m.label}</div>
                        </div>
                    ) : (
                        <img
                            src={m.file}
                            alt={m.label}
                            loading="lazy"
                            onError={() => handleError(m.file)}
                        />
                    )}
                    <div className="mockup-overlay">
                        <div className="mockup-label">{m.label}</div>
                        <div className="mockup-sublabel">{m.sublabel}</div>
                    </div>
                    {!imgErrors[m.file] && <div className="mockup-expand">⤢</div>}
                </div>
            ))}
        </div>
    );
}

export default function App() {
    const [scrolled, setScrolled] = useState(false);
    const [lightbox, setLightbox] = useState({ open: false, images: [], index: 0 });
    const [selected, setSelected] = useState({ m1: true, m2: false, m3: false, m4: false, mx1: false, mx2: false });
    const [extraOpen, setExtraOpen] = useState({});

    // Dependency tree: m1 is base, m2 needs m1, m3 needs m1, m4 needs m1+m3, extras need m1+m3
    const deps = { m1: [], m2: ['m1'], m3: ['m1'], m4: ['m1', 'm3'], mx1: ['m1', 'm3'], mx2: ['m1', 'm3'] };
    const priceNum = (str) => parseInt(str.replace(/[$,]/g, ''), 10);

    const handleToggle = (id) => {
        setSelected(prev => {
            const next = { ...prev };
            next[id] = !prev[id];
            return next;
        });
    };

    const allSelectables = [...modules, ...modulesExtra];

    // Get missing dependencies for a selected module (informational warning)
    const getMissingDeps = (id) => {
        if (!selected[id]) return [];
        return deps[id].filter(dep => !selected[dep]);
    };

    // Price is based purely on what the client has selected
    const selectedModules = allSelectables.filter(m => selected[m.id]);
    const totalPrice = selectedModules.reduce((sum, m) => sum + priceNum(m.price), 0);
    const formatPrice = (n) => '$' + n.toLocaleString('en-US');

    const openLightbox = (images, index) => setLightbox({ open: true, images, index });
    const closeLightbox = () => setLightbox(prev => ({ ...prev, open: false }));
    const navLightbox = (dir) => setLightbox(prev => ({
        ...prev,
        index: (prev.index + dir + prev.images.length) % prev.images.length
    }));

    useEffect(() => {
        const handleKey = (e) => {
            if (!lightbox.open) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') navLightbox(1);
            if (e.key === 'ArrowLeft') navLightbox(-1);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [lightbox.open]);

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
        const observeAll = () => document.querySelectorAll('.reveal:not(.in),.reveal-r:not(.in)').forEach(el => io.observe(el));
        observeAll();
        const mo = new MutationObserver(observeAll);
        mo.observe(document.body, { childList: true, subtree: true });
        return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); mo.disconnect(); };
    }, []);

    const tagLabel = (t) => {
        if (t === 'both') return 'App + CRM';
        if (t === 'crm') return 'CRM';
        if (t === 'patient') return 'Paciente';
        if (t === 'excluded') return 'No incluido';
        return t;
    };

    const renderFeatures = (features) => (
        <div className="feat-list">
            {features.map((f, i) => (
                <div key={i} className={`feat-row reveal ${f.star ? 'star' : ''}`} style={{ transitionDelay: `${i * .04}s` }}>
                    <div className="feat-icon">{f.star ? '★' : f.icon}</div>
                    <div className="feat-body">
                        <h4>{f.title}{f.propB && <span style={{ marginLeft: '.5rem', fontSize: '.68rem', color: 'var(--gold)', fontWeight: 700 }}>SOLO PROP. B</span>}</h4>
                        <p>{f.desc}</p>
                    </div>
                    <div className="feat-tags">
                        {f.tags.map((t, j) => <span key={j} className={`feat-tag ${t}`}>{tagLabel(t)}</span>)}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <>
            <style>{style}</style>

            {/* HEADER */}
            <header style={scrolled ? { boxShadow: '0 4px 26px rgba(0,0,0,.45)' } : {}}>
                <img src="white-pet-bot-no-back-no-name.png" alt="RobotInAi" style={{ height: '42px', width: 'auto' }} />
                <nav>
                    <a href="#modulos">Módulos</a>
                    <a href="#inversion">Inversión</a>
                    <a href="#contacto" className="nav-btn">Contacto →</a>
                </nav>
            </header>

            {/* HERO */}
            <section className="hero">
                <div className="hero-bg" /><div className="hero-grid" />
                <div className="hero-inner">
                    <div>
                        <div className="hero-badge reveal"><div className="pulse" /> Propuesta exclusiva · Dr. César Ruiz · 2026</div>
                        <h1 className="reveal" style={{ color: 'var(--white)' }}>Tus pacientes<br /><em>regresan, acumulan</em><br />y nunca se van</h1>
                        <p className="hero-sub reveal">Un ecosistema digital modular: app instalable, tarjeta de lealtad con QR, CRM con roles y cuestionarios clínicos automáticos.</p>
                        <div className="hero-actions reveal">
                            <a href="#modulos" className="btn-p">Explorar módulos →</a>
                            <a href="#inversion" className="btn-g">Ver inversión</a>
                        </div>
                    </div>
                    <div className="hstats">
                        <div className="hstat reveal-r"><div className="hstat-num">4+1</div><div className="hstat-lbl">Módulos independientes que se ensamblan según la necesidad de la clínica</div></div>
                        <div className="hstat reveal-r" style={{ transitionDelay: '.1s' }}><div className="hstat-num">−$88K</div><div className="hstat-lbl">Ahorro vs. app nativa en App Store — PWA instalable sin intermediarios</div></div>
                        <div className="hstat reveal-r" style={{ transitionDelay: '.2s' }}><div className="hstat-num">~83 días</div><div className="hstat-lbl">Días hábiles estimados para los 4 módulos base completos</div></div>
                    </div>
                </div>
            </section>

            {/* MODULE OVERVIEW */}
            <section style={{ background: 'var(--navy-mid)' }} id="modulos">
                <div className="container">
                    <span className="slbl reveal">Ecosistema modular</span>
                    <h2 className="display reveal">4 módulos base.<br /><em>1 módulo extra. Tú eliges.</em></h2>
                    <p className="lead reveal">Cada módulo resuelve un problema concreto del consultorio. Se contratan juntos con descuento o se priorizan según la necesidad inmediata.</p>
                    <div className="mod-overview">
                        {[...modules, ...modulesExtra].map((m, i) => (
                            <a key={i} href={`#${m.id}`} className={`mod-ov-card ${m.cls} reveal`} style={{ transitionDelay: `${i * .07}s` }}>
                                <div className="mod-ov-icon">{m.icon}</div>
                                <div className="mod-ov-name">{m.id.startsWith('mx') ? `Extra — ${m.name}` : `Módulo ${m.n}`}</div>
                                <div style={{ fontSize: '.8rem', color: 'var(--white-dim)', marginBottom: '.4rem' }}>{m.name.replace(/^Módulo Extra — /, '')}</div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* MODULE DETAILS */}
            {modules.map((m, idx) => (
                <section key={m.id} id={m.id} style={{ background: idx % 2 === 0 ? 'var(--navy)' : 'var(--navy-mid)' }}>
                    <div className="container">
                        <div className="mod-header reveal">
                            <div className="mod-header-left">
                                <div className="mod-num" style={{ color: m.color }}>MÓDULO {m.n} {m.tagline && <span style={{ background: 'rgba(0,230,118,.1)', color: 'var(--green)', padding: '.15rem .5rem', borderRadius: '50px', fontSize: '.68rem', marginLeft: '.5rem' }}>{m.tagline}</span>}</div>
                                <h2 className="display"><em>{m.icon} {m.name}</em></h2>
                                <p className="lead" style={{ marginBottom: '.5rem' }}>{m.subtitle}</p>
                            </div>
                            <div className="mod-header-right">
                                <div className="mod-price-big">{m.price} <span style={{ fontSize: '.9rem', fontWeight: 400, color: 'var(--white-dim)' }}>MXN</span></div>
                                <div className="mod-meta-pill">{m.meta}</div>
                                {m.saving && <div className="mod-saving">{m.saving}</div>}
                            </div>
                        </div>
                        <div className="legend reveal">
                            <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--gold)' }} /> Feature estrella</div>
                            <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--green)' }} /> App + CRM</div>
                            <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--purple)' }} /> Paciente</div>
                            <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--cyan)' }} /> CRM</div>
                            <div className="legend-item"><div className="legend-dot" style={{ background: 'rgba(255,255,255,.2)' }} /> No incluido / posterior</div>
                        </div>
                        <MockupGallery mockups={m.mockups} onOpen={openLightbox} />
                        {renderFeatures(m.features)}
                    </div>
                </section>
            ))}

            {/* MÓDULOS EXTRA */}
            <section id="mx1" style={{ background: 'var(--navy)' }}>
                <div className="container">
                    <div className="mod-num reveal" style={{ color: 'var(--orange)', marginBottom: '0.5rem' }}>MÓDULOS EXTRA — ELIGE MÁS</div>
                    <p className="lead reveal">Complementos opcionales para potenciar tu plataforma.</p>

                    {modulesExtra.map((mx, idx) => (
                        <div key={mx.id} id={idx > 0 ? mx.id : undefined} className="extra-dropdown reveal" style={{ marginTop: idx === 0 ? '2rem' : '1.5rem' }}>
                            <div className="extra-dropdown-header" onClick={(e) => { setExtraOpen(prev => ({ ...prev, [mx.id]: !prev[mx.id] })); if (!extraOpen[mx.id]) setTimeout(() => e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); }}>
                                <div className="extra-dropdown-left">
                                    <span style={{ fontSize: '1.3rem' }}>{mx.icon}</span>
                                    <div>
                                        <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '1.15rem' }}>{mx.name}</h3>
                                        <p style={{ fontSize: '.82rem', color: 'var(--white-dim)', marginTop: '.1rem' }}>{mx.subtitle}</p>
                                    </div>
                                </div>
                                <div className="extra-dropdown-right">
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                        <div className="mod-price-big" style={{ fontSize: '1.4rem' }}>
                                            {mx.marketing ? `Desde ${mx.price}` : mx.price} <span style={{ fontSize: '.75rem', fontWeight: 400, color: 'var(--white-dim)' }}>MXN</span>
                                        </div>
                                        {mx.marketing && <span style={{ fontSize: '.65rem', color: 'var(--orange)', fontWeight: 600 }}>+ {mx.monthly.price}/mes mantenimiento</span>}
                                    </div>
                                    <span className="extra-chevron" style={{ transform: extraOpen[mx.id] ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                                </div>
                            </div>
                            {extraOpen[mx.id] && (
                                <div className="extra-dropdown-body">
                                    <MockupGallery mockups={mx.mockups} onOpen={openLightbox} />
                                    {mx.marketing ? (
                                        <>
                                            <div className="mkt-cards">
                                                <div className="mkt-card setup">
                                                    <div className="mkt-card-header">
                                                        <div>
                                                            <div className="mkt-card-type">{mx.setup.type}</div>
                                                            <h4 style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '1.05rem', marginTop: '.4rem' }}>{mx.setup.label}</h4>
                                                        </div>
                                                        <div className="mkt-card-price">{mx.setup.price} <span>MXN</span></div>
                                                    </div>
                                                    <div className="mkt-card-features">
                                                        {mx.setup.features.map((f, i) => (
                                                            <div key={i} className="mkt-feat">
                                                                <span className="mkt-feat-icon">{f.icon}</span>
                                                                <div className="mkt-feat-text"><h5>{f.title}</h5><p>{f.desc}</p></div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="mkt-card monthly">
                                                    <div className="mkt-card-header">
                                                        <div>
                                                            <div className="mkt-card-type">{mx.monthly.type}</div>
                                                            <h4 style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '1.05rem', marginTop: '.4rem' }}>{mx.monthly.label}</h4>
                                                        </div>
                                                        <div className="mkt-card-price">{mx.monthly.price} <span>MXN/mes</span></div>
                                                    </div>
                                                    <div className="mkt-card-features">
                                                        {mx.monthly.features.map((f, i) => (
                                                            <div key={i} className="mkt-feat">
                                                                <span className="mkt-feat-icon">{f.icon}</span>
                                                                <div className="mkt-feat-text"><h5>{f.title}</h5><p>{f.desc}</p></div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mkt-ads-note">
                                                <h5>💰 Inversión en publicidad (Ads)</h5>
                                                <p>Inversión recomendada: <strong style={{ color: 'var(--white)' }}>{mx.adSpend.min} – {mx.adSpend.max} MXN mensuales</strong> pagados directamente a Google Ads. Se maneja de forma independiente al costo del servicio — sin markup, sin intermediarios.</p>
                                            </div>
                                            <div className="mkt-synergy">
                                                <p>🚀 <strong style={{ color: 'var(--green)' }}>Ventaja competitiva:</strong> Al integrar el marketing con la plataforma desarrollada, el sitio optimizado mejora el Quality Score de Google Ads, reduciendo el costo por clic y maximizando el retorno de la inversión publicitaria.</p>
                                            </div>
                                            <div className="mkt-badge">👩‍💼 Operado por el área de Marketing</div>
                                            <div className="note-block" style={{ marginTop: '.8rem' }}>
                                                <p><strong>Nota:</strong> La mensualidad corresponde a mantenimiento y optimización, no a gestión intensiva. Los resultados pueden variar dependiendo de la inversión en publicidad, la competencia y el seguimiento a los pacientes.</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {renderFeatures(mx.features)}
                                            <div className="note-block" style={{ marginTop: '1.5rem' }}>
                                                <p><strong>Nota:</strong> Alcance sujeto a revisión final. Las horas y costo se basan en el catálogo inicial de productos del Dr. Ruiz. Recomendamos definir el catálogo mínimo viable antes de comprometer este módulo.</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* INVESTMENT SUMMARY */}
            <section style={{ background: 'var(--navy-mid)' }} id="inversion">
                <div className="container">
                    <span className="slbl reveal">Inversión</span>
                    <h2 className="display reveal">Arma tu propuesta.<br /><em>Tú eliges los módulos.</em></h2>
                    <p className="lead reveal">Selecciona los módulos que necesitas. Las dependencias se activan automáticamente — cada precio es final y corresponde exactamente a lo que recibes.</p>

                    <div className="selector-layout">
                        {/* LEFT: checkboxes */}
                        <div className="selector-left">
                            {allSelectables.map((m) => {
                                const isSelected = selected[m.id];
                                const missingDeps = getMissingDeps(m.id);
                                let cardClass = 'sel-card';
                                if (isSelected) cardClass += ' selected';
                                else cardClass += ' dimmed';

                                return (
                                    <div key={m.id} className={cardClass} onClick={() => handleToggle(m.id)}>
                                        <div className="sel-checkbox">
                                            {isSelected ? '✓' : ''}
                                        </div>
                                        <div className="sel-info">
                                            <h4>{m.icon} {m.id.startsWith('mx') ? `Extra — ${m.name}` : `Módulo ${m.n} — ${m.name}`}</h4>
                                            <p>{m.subtitle}</p>
                                            {missingDeps.length > 0 && <div className="sel-dep-tag auto">⚠ Requiere {missingDeps.map(d => d.toUpperCase().replace('M', 'M0')).join(', ')}</div>}
                                            {m.marketing && <div className="sel-dep-tag note">Setup único + $3,000/mes</div>}
                                        </div>
                                        <div className="sel-price">{m.price}</div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* RIGHT: live summary */}
                        <div className="selector-right">
                            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.2rem', fontWeight: 900, marginBottom: '.3rem' }}>Resumen en vivo</h3>
                            <p style={{ fontSize: '.78rem', color: 'var(--white-dim)', marginBottom: '.8rem' }}>El total se actualiza al seleccionar módulos.</p>

                            {allSelectables.map((m) => {
                                const isSelected = selected[m.id];
                                let sumClass = 'sel-summary-card';
                                if (isSelected) sumClass += ' active';
                                else sumClass += ' inactive';

                                return (
                                    <div key={m.id} className={sumClass}>
                                        <span className="sel-sum-name">
                                            {m.icon} {m.id.startsWith('mx') ? m.name : `M${m.n}`}
                                        </span>
                                        <span className="sel-sum-price">{m.price}</span>
                                    </div>
                                );
                            })}

                            <div className="sel-total-bar">
                                <div>
                                    <div className="sel-total-label">Total</div>
                                    <div className="sel-total-count">{selectedModules.length} módulo{selectedModules.length !== 1 ? 's' : ''}</div>
                                </div>
                                <div className="sel-total-price">{formatPrice(totalPrice)} MXN</div>
                            </div>

                            <div className="sel-deps-note">
                                <span>Nota:</span> Todos los módulos requieren <strong style={{ color: 'var(--green)' }}>M01</strong>. El <strong style={{ color: 'var(--purple)' }}>M04</strong> y los <strong style={{ color: 'var(--orange)' }}>Extras</strong> requieren además <strong style={{ color: 'var(--cyan)' }}>M03</strong>. Verás un aviso si falta alguna dependencia.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section style={{ background: 'var(--navy)', borderTop: '1px solid var(--border)', textAlign: 'center', padding: '4rem 2.5rem' }} id="contacto">
                <div className="container" style={{ maxWidth: '600px' }}>
                    <span className="slbl reveal">Contacto</span>
                    <h2 className="display reveal" style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)' }}>¿Dudas sobre la propuesta?</h2>
                    <div className="cpills reveal" style={{ marginTop: '1.5rem' }}>
                        <div className="cpill"><span style={{ color: 'var(--green)' }}>🌐</span><a href="https://smart-flows.tech" target="_blank" rel="noreferrer">smart-flows.tech</a></div>
                        <div className="cpill"><span style={{ color: 'var(--green)' }}>✉️</span><a href="mailto:athena@chat-bot.smart-flows.tech">athena@chat-bot.smart-flows.tech</a></div>
                    </div>
                </div>
            </section>

            <footer>
                <img src="white-pet-bot-no-back-no-name.png" alt="RobotInAi" style={{ height: '48px', width: 'auto', marginBottom: '.5rem' }} />
                <p style={{ color: 'var(--white)' }}>Propuesta Modular · Dr. César Ruiz · 2026</p>
                <p style={{ marginTop: '.3rem', color: 'var(--white)' }}>smart-flows.tech</p>
            </footer>

            {/* LIGHTBOX */}
            <div className={`lightbox ${lightbox.open ? 'open' : ''}`} onClick={closeLightbox}>
                {lightbox.open && lightbox.images[lightbox.index] && (
                    <>
                        <div className="lightbox-close" onClick={closeLightbox}>✕</div>
                        {lightbox.images.length > 1 && (
                            <>
                                <div className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); navLightbox(-1); }}>‹</div>
                                <div className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); navLightbox(1); }}>›</div>
                            </>
                        )}
                        <img
                            src={lightbox.images[lightbox.index].file}
                            alt={lightbox.images[lightbox.index].label}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="lightbox-caption">
                            {lightbox.images[lightbox.index].label} — {lightbox.images[lightbox.index].sublabel}
                            <div style={{ fontSize: '.72rem', marginTop: '.3rem', opacity: .5 }}>
                                {lightbox.index + 1} / {lightbox.images.length} · ESC para cerrar · ← → para navegar
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
