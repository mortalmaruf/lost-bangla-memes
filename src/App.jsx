import { useState, useRef, useEffect, useCallback } from "react";

const MEMES = [
  {
    id: 1,
    title: "Khela Hobe",
    year: "2013 → 2021",
    type: "video",
    src: "https://file-to-link-01a8714ef194.herokuapp.com/dl/183360?code=d68471ad21120c621f43de74-8765770656",
    thumbnail: null,
    tags: ["political"],
    views: "10M+",
    description:
      "\"Khela Hobe\" (The game is on) was coined by politician Shamim Osman at a 2013 Narayanganj rally as a challenge to opponents. His unique delivery turned it into a massive viral meme by 2019–2020. By 2021 it became the primary campaign slogan in West Bengal elections — later entering Bollywood cinema as a universal term for a looming challenge.",
  },
];

const ALL_TAGS = ["all", ...new Set(MEMES.flatMap((m) => m.tags))];

// ── Noise texture SVG (pure CSS AMOLED grain) ──
const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`;

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  --black:#000000;
  --void:#050505;
  --deep:#0a0a0a;
  --card:#0f0f0f;
  --card2:#141414;
  --border:#1f1f1f;
  --border2:#2a2a2a;
  --accent:#ff2d55;
  --accent2:#ff6b35;
  --gold:#ffd60a;
  --cyan:#00e5ff;
  --text:#f0f0f0;
  --muted:#555;
  --muted2:#888;
  --font-display:'Bebas Neue',sans-serif;
  --font-body:'Space Grotesk',sans-serif;
  --glow: 0 0 20px rgba(255,45,85,0.4);
  --glow2: 0 0 40px rgba(255,45,85,0.15);
}

html{scroll-behavior:smooth}

body{
  background:var(--black);
  color:var(--text);
  font-family:var(--font-body);
  min-height:100vh;
  overflow-x:hidden;
}

/* ── Scrollbar ── */
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:var(--black)}
::-webkit-scrollbar-thumb{background:var(--accent);border-radius:2px}

/* ── App ── */
.app{
  background:var(--black);
  background-image:${NOISE};
  min-height:100vh;
}

/* ── Header ── */
.site-header{
  position:relative;
  padding:56px 24px 40px;
  overflow:hidden;
  border-bottom:1px solid var(--border);
}

.header-bg{
  position:absolute;
  inset:0;
  background:
    radial-gradient(ellipse 60% 80% at 20% 50%, rgba(255,45,85,0.08) 0%, transparent 60%),
    radial-gradient(ellipse 40% 60% at 80% 20%, rgba(0,229,255,0.04) 0%, transparent 60%),
    var(--void);
  z-index:0;
}

.header-scan{
  position:absolute;
  inset:0;
  background:repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(255,255,255,0.008) 2px,
    rgba(255,255,255,0.008) 4px
  );
  z-index:0;
  pointer-events:none;
}

.header-inner{
  max-width:1100px;
  margin:0 auto;
  position:relative;
  z-index:1;
}

.logo-row{
  display:flex;
  align-items:flex-end;
  gap:0;
  margin-bottom:8px;
  flex-wrap:wrap;
}

.logo-tape{
  font-size:3.2rem;
  line-height:1;
  margin-right:14px;
  animation:pulse-tape 3s ease-in-out infinite;
}

@keyframes pulse-tape{
  0%,100%{filter:drop-shadow(0 0 8px rgba(255,214,10,0.5))}
  50%{filter:drop-shadow(0 0 20px rgba(255,214,10,0.9))}
}

.logo-title{
  font-family:var(--font-display);
  font-size:clamp(2.8rem,8vw,5rem);
  letter-spacing:2px;
  line-height:0.95;
  color:var(--text);
  text-shadow:0 0 60px rgba(255,45,85,0.3);
}

.logo-title span{
  color:var(--accent);
  text-shadow: var(--glow);
}

.logo-bengali{
  font-size:0.8rem;
  color:var(--muted2);
  letter-spacing:2px;
  margin-top:8px;
  text-transform:uppercase;
}

.header-tagline{
  font-size:0.88rem;
  color:var(--muted2);
  margin-top:12px;
  max-width:500px;
  line-height:1.6;
  font-weight:300;
}

.header-stat-row{
  display:flex;
  gap:24px;
  margin-top:20px;
  flex-wrap:wrap;
}

.header-stat{
  display:flex;
  flex-direction:column;
  gap:2px;
}

.stat-num{
  font-family:var(--font-display);
  font-size:1.6rem;
  color:var(--accent);
  letter-spacing:1px;
  line-height:1;
}

.stat-label{
  font-size:0.65rem;
  color:var(--muted);
  text-transform:uppercase;
  letter-spacing:1.5px;
}

/* ── Controls ── */
.controls{
  max-width:1100px;
  margin:0 auto;
  padding:28px 24px 0;
  display:flex;
  flex-direction:column;
  gap:14px;
}

.search-wrap{
  position:relative;
  max-width:400px;
}

.search-icon{
  position:absolute;
  left:14px;
  top:50%;
  transform:translateY(-50%);
  color:var(--muted);
  font-size:0.85rem;
  pointer-events:none;
}

.search-input{
  width:100%;
  padding:11px 16px 11px 38px;
  background:var(--card);
  border:1px solid var(--border2);
  border-radius:6px;
  color:var(--text);
  font-family:var(--font-body);
  font-size:0.88rem;
  outline:none;
  transition:border-color 0.2s, box-shadow 0.2s;
  font-weight:400;
}

.search-input:focus{
  border-color:var(--accent);
  box-shadow:0 0 0 3px rgba(255,45,85,0.08);
}

.search-input::placeholder{color:var(--muted)}

.tag-filters{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  align-items:center;
}

.filter-label{
  font-size:0.65rem;
  color:var(--muted);
  text-transform:uppercase;
  letter-spacing:2px;
  margin-right:4px;
}

.tag-btn{
  padding:5px 14px;
  border-radius:3px;
  border:1px solid var(--border2);
  background:transparent;
  color:var(--muted2);
  font-family:var(--font-body);
  font-size:0.72rem;
  cursor:pointer;
  text-transform:uppercase;
  letter-spacing:1px;
  font-weight:600;
  transition:all 0.15s;
  position:relative;
  overflow:hidden;
}

.tag-btn::before{
  content:'';
  position:absolute;
  inset:0;
  background:var(--accent);
  transform:scaleX(0);
  transform-origin:left;
  transition:transform 0.18s;
  z-index:-1;
}

.tag-btn:hover{
  border-color:var(--accent);
  color:var(--text);
}

.tag-btn:hover::before{transform:scaleX(1)}

.tag-btn.active{
  background:var(--accent);
  border-color:var(--accent);
  color:#fff;
  box-shadow:var(--glow);
}

/* ── Results bar ── */
.results-bar{
  max-width:1100px;
  margin:20px auto 0;
  padding:0 24px;
  display:flex;
  align-items:center;
  gap:12px;
}

.results-count{
  font-size:0.7rem;
  color:var(--muted);
  text-transform:uppercase;
  letter-spacing:2px;
}

.results-line{
  flex:1;
  height:1px;
  background:var(--border);
}

/* ── Grid ── */
.meme-grid{
  max-width:1100px;
  margin:24px auto 80px;
  padding:0 24px;
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
  gap:16px;
}

/* ── Card ── */
.meme-card{
  background:var(--card);
  border:1px solid var(--border);
  border-radius:8px;
  overflow:hidden;
  cursor:pointer;
  transition:border-color 0.25s, box-shadow 0.25s, transform 0.25s;
  display:flex;
  flex-direction:column;
  position:relative;
}

.meme-card::before{
  content:'';
  position:absolute;
  inset:0;
  border-radius:8px;
  background:linear-gradient(135deg, rgba(255,45,85,0.03) 0%, transparent 60%);
  pointer-events:none;
  z-index:1;
  transition:opacity 0.25s;
  opacity:0;
}

.meme-card:hover{
  transform:translateY(-6px);
  border-color:var(--accent);
  box-shadow:0 20px 60px rgba(255,45,85,0.2), 0 0 0 1px rgba(255,45,85,0.1);
}

.meme-card:hover::before{opacity:1}

/* ── Media ── */
.card-media{
  position:relative;
  aspect-ratio:16/9;
  background:var(--void);
  overflow:hidden;
}

.card-media video,
.card-media img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
  transition:transform 0.4s;
}

.meme-card:hover .card-media video,
.meme-card:hover .card-media img{
  transform:scale(1.04);
}

/* play overlay */
.card-overlay{
  position:absolute;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  background:rgba(0,0,0,0.45);
  transition:opacity 0.25s;
  z-index:2;
}

.meme-card:hover .card-overlay{opacity:0}

.play-btn{
  width:52px;
  height:52px;
  border-radius:50%;
  background:rgba(255,45,85,0.9);
  border:2px solid rgba(255,255,255,0.2);
  display:flex;
  align-items:center;
  justify-content:center;
  box-shadow:0 0 24px rgba(255,45,85,0.5);
  transition:transform 0.2s, box-shadow 0.2s;
}

.play-btn svg{
  width:20px;
  height:20px;
  fill:white;
  margin-left:3px;
}

.meme-card:hover .play-btn{
  transform:scale(1.1);
  box-shadow:0 0 40px rgba(255,45,85,0.8);
}

/* badges */
.badge-row{
  position:absolute;
  top:10px;
  left:10px;
  right:10px;
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  z-index:3;
}

.type-badge{
  font-size:0.6rem;
  font-weight:700;
  letter-spacing:1.5px;
  padding:3px 8px;
  border-radius:3px;
  text-transform:uppercase;
}

.type-badge.video{background:var(--accent);color:#fff}
.type-badge.image{background:#0066ff;color:#fff}

.views-badge{
  font-size:0.65rem;
  color:var(--muted2);
  background:rgba(0,0,0,0.7);
  padding:3px 8px;
  border-radius:3px;
  backdrop-filter:blur(4px);
  border:1px solid var(--border);
}

/* progress bar on hover */
.card-progress{
  position:absolute;
  bottom:0;
  left:0;
  height:2px;
  background:var(--accent);
  width:0%;
  transition:width 0.1s linear;
  z-index:3;
}

/* ── Card Body ── */
.card-body{
  padding:16px;
  flex:1;
  display:flex;
  flex-direction:column;
  gap:10px;
}

.card-meta{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:8px;
}

.card-year{
  font-size:0.68rem;
  color:var(--gold);
  font-weight:600;
  letter-spacing:0.5px;
  font-family:var(--font-display);
}

.card-tags{
  display:flex;
  flex-wrap:wrap;
  gap:4px;
}

.tag{
  font-size:0.62rem;
  background:rgba(255,45,85,0.08);
  border:1px solid rgba(255,45,85,0.2);
  color:rgba(255,45,85,0.8);
  padding:2px 7px;
  border-radius:3px;
  text-transform:uppercase;
  letter-spacing:0.8px;
  font-weight:600;
}

.card-title{
  font-family:var(--font-display);
  font-size:1.35rem;
  letter-spacing:1px;
  color:var(--text);
  line-height:1.2;
  transition:color 0.2s;
}

.meme-card:hover .card-title{color:var(--accent)}

.card-desc{
  font-size:0.78rem;
  color:var(--muted2);
  line-height:1.6;
  flex:1;
  font-weight:300;
  display:-webkit-box;
  -webkit-line-clamp:3;
  -webkit-box-orient:vertical;
  overflow:hidden;
}

.card-footer{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding-top:10px;
  border-top:1px solid var(--border);
}

.card-cta{
  font-size:0.7rem;
  color:var(--accent);
  text-transform:uppercase;
  letter-spacing:1.5px;
  font-weight:700;
  display:flex;
  align-items:center;
  gap:5px;
}

.card-cta-arrow{
  transition:transform 0.2s;
}

.meme-card:hover .card-cta-arrow{transform:translateX(4px)}

/* ── Modal ── */
.modal-backdrop{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.95);
  backdrop-filter:blur(12px);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:200;
  padding:16px;
  animation:fadeIn 0.2s ease;
}

@keyframes fadeIn{from{opacity:0}to{opacity:1}}

.modal-box{
  background:var(--card);
  border:1px solid var(--border2);
  border-radius:12px;
  max-width:780px;
  width:100%;
  overflow:hidden;
  animation:slideUp 0.25s cubic-bezier(0.34,1.56,0.64,1);
  position:relative;
  box-shadow:0 40px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,45,85,0.1);
}

@keyframes slideUp{
  from{transform:translateY(30px) scale(0.97);opacity:0}
  to{transform:translateY(0) scale(1);opacity:1}
}

.modal-close{
  position:absolute;
  top:12px;right:12px;
  z-index:10;
  background:rgba(0,0,0,0.8);
  border:1px solid var(--border2);
  color:var(--text);
  width:36px;height:36px;
  border-radius:50%;
  cursor:pointer;
  font-size:0.9rem;
  display:flex;align-items:center;justify-content:center;
  transition:all 0.15s;
  backdrop-filter:blur(4px);
}

.modal-close:hover{
  background:var(--accent);
  border-color:var(--accent);
  box-shadow:var(--glow);
}

.modal-media{
  background:#000;
  aspect-ratio:16/9;
  position:relative;
}

.modal-media video,
.modal-media img{
  width:100%;height:100%;
  object-fit:contain;display:block;
}

.modal-info{
  padding:20px 24px 24px;
  display:flex;flex-direction:column;gap:12px;
}

.modal-top{
  display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;
}

.modal-title{
  font-family:var(--font-display);
  font-size:2rem;
  letter-spacing:2px;
  line-height:1;
  color:var(--text);
}

.modal-meta{
  display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:4px;
}

.modal-year{
  font-size:0.72rem;
  color:var(--gold);
  font-weight:700;
  font-family:var(--font-display);
  letter-spacing:1px;
}

.modal-views{
  font-size:0.72rem;
  color:var(--cyan);
  font-weight:600;
  letter-spacing:0.5px;
}

.modal-desc{
  font-size:0.85rem;
  color:var(--muted2);
  line-height:1.75;
  font-weight:300;
  border-left:2px solid var(--accent);
  padding-left:14px;
}

/* ── Empty State ── */
.empty-state{
  grid-column:1/-1;
  text-align:center;
  padding:80px 20px;
  color:var(--muted);
}

.empty-state span{font-size:3rem;display:block;margin-bottom:12px}

/* ── Footer ── */
.site-footer{
  text-align:center;
  padding:32px;
  border-top:1px solid var(--border);
  color:var(--muted);
  font-size:0.78rem;
  background:var(--void);
  letter-spacing:0.5px;
}

.site-footer a{color:var(--accent);text-decoration:none}

.footer-dot{margin:0 8px;color:var(--border2)}

/* ── Responsive ── */
@media(max-width:600px){
  .meme-grid{grid-template-columns:1fr}
  .logo-title{font-size:2.4rem}
  .modal-title{font-size:1.5rem}
}
`;

// ── Video Card ─────────────────────────────────────────────────────────────────
function VideoCard({ meme, onClick }) {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(isNaN(p) ? 0 : p);
  };

  return (
    <div
      className="meme-card"
      onClick={() => onClick(meme)}
      role="button"
      tabIndex={0}
    >
      <div className="card-media">
        <video
          ref={videoRef}
          src={meme.src}
          muted loop playsInline preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onMouseEnter={() => videoRef.current?.play()}
          onMouseLeave={() => {
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
              setProgress(0);
            }
          }}
        />
        <div className="badge-row">
          <span className="type-badge video">VIDEO</span>
          {meme.views && <span className="views-badge">👁 {meme.views}</span>}
        </div>
        <div className="card-overlay">
          <div className="play-btn">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div className="card-progress" style={{ width: `${progress}%` }} />
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className="card-year">{meme.year}</span>
          <div className="card-tags">
            {meme.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
        <h3 className="card-title">{meme.title}</h3>
        <p className="card-desc">{meme.description}</p>
        <div className="card-footer">
          <span className="card-cta">Watch full <span className="card-cta-arrow">→</span></span>
        </div>
      </div>
    </div>
  );
}

// ── Image Card ─────────────────────────────────────────────────────────────────
function ImageCard({ meme, onClick }) {
  return (
    <div className="meme-card" onClick={() => onClick(meme)} role="button" tabIndex={0}>
      <div className="card-media">
        <img src={meme.src} alt={meme.title} loading="lazy" />
        <div className="badge-row">
          <span className="type-badge image">IMAGE</span>
          {meme.views && <span className="views-badge">👁 {meme.views}</span>}
        </div>
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className="card-year">{meme.year}</span>
          <div className="card-tags">
            {meme.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
        <h3 className="card-title">{meme.title}</h3>
        <p className="card-desc">{meme.description}</p>
        <div className="card-footer">
          <span className="card-cta">View <span className="card-cta-arrow">→</span></span>
        </div>
      </div>
    </div>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────────
function Modal({ meme, onClose }) {
  useEffect(() => {
    const h = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!meme) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-media">
          {meme.type === "video"
            ? <video src={meme.src} controls autoPlay loop playsInline />
            : <img src={meme.src} alt={meme.title} />
          }
        </div>
        <div className="modal-info">
          <div>
            <div className="modal-top">
              <h2 className="modal-title">{meme.title}</h2>
            </div>
            <div className="modal-meta">
              <span className="modal-year">{meme.year}</span>
              {meme.views && <span className="modal-views">👁 {meme.views} views</span>}
              <div className="card-tags">
                {meme.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </div>
          <p className="modal-desc">{meme.description}</p>
        </div>
      </div>
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTag, setActiveTag] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = MEMES.filter(m => {
    const tagMatch = activeTag === "all" || m.tags.includes(activeTag);
    const searchMatch =
      search === "" ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());
    return tagMatch && searchMatch;
  });

  return (
    <>
      <style>{CSS}</style>
      <div className="app">

        {/* Header */}
        <header className="site-header">
          <div className="header-bg" />
          <div className="header-scan" />
          <div className="header-inner">
            <div className="logo-row">
              <span className="logo-tape">📼</span>
              <h1 className="logo-title">LOST <span>BANGLA</span> MEMES</h1>
            </div>
            <p className="logo-bengali">আমাদের ইন্টারনেটের হারানো রত্ন · Digital Archive</p>
            <p className="header-tagline">
              A graveyard for the memes that shaped Bangladesh's internet culture.
              Preserved so no one forgets.
            </p>
            <div className="header-stat-row">
              <div className="header-stat">
                <span className="stat-num">{MEMES.length}</span>
                <span className="stat-label">Archived</span>
              </div>
              <div className="header-stat">
                <span className="stat-num">{MEMES.filter(m=>m.type==="video").length}</span>
                <span className="stat-label">Videos</span>
              </div>
              <div className="header-stat">
                <span className="stat-num">{MEMES.filter(m=>m.type==="image").length}</span>
                <span className="stat-label">Images</span>
              </div>
              <div className="header-stat">
                <span className="stat-num">{ALL_TAGS.length - 1}</span>
                <span className="stat-label">Categories</span>
              </div>
            </div>
          </div>
        </header>

        {/* Controls */}
        <div className="controls">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search memes, tags, years..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="tag-filters">
            <span className="filter-label">Filter:</span>
            {ALL_TAGS.map(tag => (
              <button
                key={tag}
                className={`tag-btn ${activeTag === tag ? "active" : ""}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results bar */}
        <div className="results-bar">
          <span className="results-count">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
          <div className="results-line" />
        </div>

        {/* Grid */}
        <main className="meme-grid">
          {filtered.length === 0
            ? <div className="empty-state"><span>📭</span><p>Nothing found.</p></div>
            : filtered.map(m =>
                m.type === "video"
                  ? <VideoCard key={m.id} meme={m} onClick={setSelected} />
                  : <ImageCard key={m.id} meme={m} onClick={setSelected} />
              )
          }
        </main>

        {/* Footer */}
        <footer className="site-footer">
          <p>
            Lost Bangla Memes
            <span className="footer-dot">·</span>
            Built with nostalgia
            <span className="footer-dot">·</span>
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <span className="footer-dot">·</span>
            হারিয়ে যাওয়া মুহূর্তগুলো ধরে রাখি
          </p>
        </footer>

        {selected && <Modal meme={selected} onClose={() => setSelected(null)} />}
      </div>
    </>
  );
}
