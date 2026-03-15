import { useEffect } from 'react';

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900&family=DM+Sans:wght@400;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy: #050d1a; --navy-mid: #0a1628;
    --green: #00e676; --green-glow: rgba(0,230,118,0.2);
    --white: #f8fafb; --white-dim: rgba(248,250,251,0.6);
    --border: rgba(255,255,255,0.08);
  }
  html, body { height: 100%; }
  body { background: var(--navy); color: var(--white); font-family: 'DM Sans', sans-serif; overflow: hidden; }

  .wip-wrap {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }
  .wip-wrap::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,230,118,.08), transparent 60%);
    pointer-events: none;
  }
  .wip-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    opacity: .04;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .wip-bg-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
    pointer-events: none;
  }
  .wip-bg-logo img {
    width: clamp(280px, 55vw, 480px);
    height: auto;
    filter: drop-shadow(0 0 60px rgba(0,230,118,.15));
    animation: wip-logo-pulse 4s ease-in-out infinite;
  }

  .wip-content {
    position: relative;
    z-index: 1;
    text-align: center;
  }

  .wip-letters {
    display: inline-flex;
    gap: 0.15em;
    font-family: 'Fraunces', serif;
    font-size: clamp(3.5rem, 12vw, 7rem);
    font-weight: 900;
    letter-spacing: -0.02em;
    color: var(--white);
    margin-bottom: 0.5rem;
  }
  .wip-letters span {
    display: inline-block;
  }

  .wip-sub {
    font-size: clamp(0.85rem, 2.5vw, 1rem);
    color: var(--white-dim);
    letter-spacing: 0.25em;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 2rem;
    animation: wip-fade 2.5s ease-in-out infinite;
  }

  .wip-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1.5rem;
  }
  .wip-dots span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 20px var(--green-glow);
    animation: wip-pulse 1.2s ease-in-out infinite;
  }
  .wip-dots span:nth-child(1) { animation-delay: 0s; }
  .wip-dots span:nth-child(2) { animation-delay: 0.2s; }
  .wip-dots span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes wip-logo-pulse {
    0%, 100% { opacity: 0.1; transform: scale(1); }
    50% { opacity: 0.2; transform: scale(1.08); }
  }
  @keyframes wip-fade {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  @keyframes wip-pulse {
    0%, 100% { transform: scale(1); box-shadow: 0 0 20px var(--green-glow); }
    50% { transform: scale(1.3); box-shadow: 0 0 30px rgba(0,230,118,.4); }
  }
`;

export default function App() {
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900&family=DM+Sans:wght@400;600&display=swap';
        document.head.appendChild(link);
    }, []);

    return (
        <>
            <style>{style}</style>
            <div className="wip-wrap">
                <div className="wip-bg-logo">
                    <img src="white-pet-bot-no-back-no-name.png" alt="" aria-hidden />
                </div>
                <div className="wip-content">
                    <div className="wip-letters">
                        {'WIP'.split('').map((letter, i) => (
                            <span key={i}>{letter}</span>
                        ))}
                    </div>
                    <p className="wip-sub">Work In Progress</p>
                    <div className="wip-dots">
                        <span />
                        <span />
                        <span />
                    </div>
                </div>
            </div>
        </>
    );
}
