'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Clock3, MapPin, Heart, Share2, Copy, ChevronDown, Navigation, Menu, X, Music2, Pause, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { event } from '@/lib/event';

const fade = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: .7 } } };

function Countdown() {
  const target = new Date(event.dateISO).getTime();
  const [now, setNow] = useState(0);
  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const diff = Math.max(0, target - now);
  const values: [string, number][] = [
    ['நாட்கள்', Math.floor(diff / 86400000)],
    ['மணி', Math.floor(diff / 3600000) % 24],
    ['நிமிடம்', Math.floor(diff / 60000) % 60],
    ['விநாடி', Math.floor(diff / 1000) % 60],
  ];
  return <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto">{values.map(([label, value]) => <div key={label} className="count-card"><div className="serif text-2xl sm:text-4xl md:text-5xl text-[#71364e] tabular-nums">{String(value).padStart(2, '0')}</div><div className="tamil text-xs sm:text-sm text-[#987783] mt-2">{label}</div></div>)}</div>;
}

export default function InvitationSite() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [shareUrl, setShareUrl] = useState(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.vercel.app');
  const playerRef = useRef<HTMLIFrameElement>(null);
  const [opened, setOpened] = useState(false);
  useEffect(() => { setShareUrl(window.location.href); }, []);

  const sendPlayerCommand = (func: 'playVideo' | 'pauseVideo' | 'unMute' | 'mute') => {
    playerRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args: [] }), 'https://www.youtube.com');
  };
  const startMusic = () => {
    sendPlayerCommand('unMute');
    sendPlayerCommand('playVideo');
    setMusicPlaying(true);
  };
  const toggleMusic = () => {
    if (musicPlaying) { sendPlayerCommand('pauseVideo'); setMusicPlaying(false); }
    else startMusic();
  };
  const shareText = `${event.honoree} – ${event.tamilTitle}\n${event.dateLabel}\n${event.inviteMessage}\n${shareUrl}`;
  async function share() {
    if (navigator.share) {
      try { await navigator.share({ title: `${event.honoree} – Invitation`, text: shareText, url: shareUrl }); } catch { /* User cancelled share sheet. */ }
    } else { await copyLink(); }
  }
  async function copyLink() {
    try { await navigator.clipboard.writeText(shareUrl); setCopied(true); window.setTimeout(() => setCopied(false), 2200); }
    catch { setCopied(false); }
  }
  const petals = useMemo(() => Array.from({ length: 18 }, (_, i) => ({ left: `${(i * 19) % 100}%`, delay: `${(i % 7) * -2}s`, duration: `${14 + (i % 6) * 3}s`, size: 8 + (i % 4) * 3 })), []);
  const navItems = [['#invitation', 'Invitation'], ['#family', 'Family'], ['#photos', 'Photos'], ['#details', 'Event Details'], ['#schedule', 'Schedule']] as const;

  return <main className="overflow-hidden">
    {/* YouTube player is embedded in-page. Browsers may require a user gesture before audible autoplay. */}
    <iframe
      ref={playerRef}
      className="music-player-frame"
      src={`https://www.youtube.com/embed/${event.musicVideoId}?autoplay=1&mute=0&loop=1&playlist=${event.musicVideoId}&controls=0&playsinline=1&enablejsapi=1&rel=0`}
      title="SAHASRASARVIKA background music"
      allow="autoplay; encrypted-media; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
    />
    <div className="no-print fixed right-4 top-4 z-50 flex gap-2">
      <button aria-label={musicPlaying ? 'Pause background music' : 'Play background music'} title={musicPlaying ? 'Pause music' : 'Play music'} onClick={toggleMusic} className="floating-control">{musicPlaying ? <Pause size={18}/> : <Music2 size={18}/>}</button>
      <button aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)} className="floating-control md:hidden">{mobileMenu ? <X size={18}/> : <Menu size={18}/>}</button>
    </div>
    {mobileMenu && <div className="no-print fixed inset-x-4 top-16 z-40 rounded-2xl bg-white/95 p-5 shadow-2xl grid gap-4 md:hidden">{navItems.map(([href, label]) => <a key={href} href={href} onClick={() => setMobileMenu(false)} className="text-[#71364e]">{label}</a>)}</div>}

    <section className="relative min-h-[94svh] flex items-center justify-center text-center hero-pattern px-4 sm:px-6 py-24 bg-[radial-gradient(ellipse_at_top,#f8e8ed_0%,#fffaf5_62%)]">
      {petals.map((petal, i) => <span key={i} className="petal" style={{ left: petal.left, animationDelay: petal.delay, animationDuration: petal.duration, width: petal.size, height: petal.size * 1.5 }}/>) }
      <div className="absolute inset-3 sm:inset-5 border border-[#c6a66e]/50 rounded-[28px] sm:rounded-[34px] pointer-events-none"/><div className="absolute inset-5 sm:inset-8 border border-[#c6a66e]/25 rounded-[22px] sm:rounded-[28px] pointer-events-none"/>
      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: .18 } } }} className="relative z-10 w-full max-w-5xl mx-auto">
        <motion.div variants={fade} className="ornament text-sm mb-7">✧ ❀ ✧ ❀ ✧</motion.div>
        <motion.p variants={fade} className="tamil text-[#9c6c7d] text-lg sm:text-xl">ஓம் ஸ்ரீ கணபதயே நமஹ . ஸ்ரீ வாசவி சகாயம் . ஸ்ரீ அங்காளம்மன் துணை</motion.p>
        <motion.p variants={fade} className="mt-8 uppercase tracking-[.25em] sm:tracking-[.35em] text-xs sm:text-sm text-[#987044]">With immense joy & gratitude</motion.p>
        <motion.h1 variants={fade} className="hero-name mt-5">{event.honoree}</motion.h1>
        <motion.div variants={fade} className="gold-line max-w-xs mx-auto my-7"/>
        <motion.h2 variants={fade} className="tamil text-2xl sm:text-4xl text-[#824b61]">{event.tamilTitle}</motion.h2>
        <motion.p variants={fade} className="serif italic text-[#a77b83] mt-4 text-lg sm:text-xl">{event.englishTitle}</motion.p>
        <motion.div variants={fade} className="mt-9 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-5 text-[#815b63]"><span className="inline-flex gap-2 items-center"><CalendarDays size={17}/>{event.dateLabel}</span><span className="hidden sm:inline">•</span><span className="inline-flex gap-2 items-center"><Clock3 size={17}/>{event.timeLabel}</span></motion.div>
        <motion.button variants={fade} onClick={() => { setOpened(true); startMusic(); document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary mt-10">Open Your Invitation <Heart size={16}/></motion.button>
        <motion.p variants={fade} className="tamil text-xs text-[#ad9297] mt-8">அன்புடன் அழைக்கிறோம்</motion.p>
      </motion.div>
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[#b4946c] animate-bounce"><ChevronDown/></div>
    </section>

    <nav className="no-print hidden md:flex justify-center flex-wrap gap-7 lg:gap-10 py-5 px-4 bg-white/85 border-y border-[#ead8d3] text-sm text-[#815b63] sticky top-0 z-30 backdrop-blur">{navItems.map(([href, label]) => <a key={href} href={href} className="nav-link">{label}</a>)}</nav>

    <section id="invitation" className="py-20 sm:py-28 section-wrap text-center"><motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} className="max-w-3xl mx-auto"><div className="ornament mb-5">✧ ❀ ✧</div><p className="tamil text-[#a47b82]">அன்பும் மகிழ்ச்சியும் நிறைந்த தருணம்</p><h2 className="section-title mt-3">You Are Cordially Invited</h2><p className="section-sub mt-7">{event.inviteMessage}</p><p className="tamil text-lg leading-9 text-[#7f5866] mt-5">எங்கள் குடும்பத்தின் மகிழ்ச்சியான இந்த நன்னாளில், தங்களின் குடும்பத்தினருடன் கலந்து கொண்டு விழாவை மேலும் சிறப்பிக்க அன்புடன் அழைக்கிறோம்.</p><div className="gold-line max-w-xs mx-auto my-8"/><p className="tamil text-xl sm:text-2xl font-bold text-[#71364e]">{event.hostLine}</p><p className="family-highlight mt-3">{event.familyLine}</p><div className="mt-8 inline-flex items-center gap-2 text-[#a47b82] text-sm"><Heart size={15}/>{opened ? 'உங்கள் வருகை எங்கள் மகிழ்ச்சியை மேலும் சிறப்பிக்கும்' : 'With love, from our family'}</div></motion.div></section>

    <section id="family" className="py-20 bg-[#fffaf5]"><div className="section-wrap text-center"><div className="ornament mb-4">✧ ❀ ✧</div><h2 className="section-title">With Love From Our Family</h2><p className="section-sub mb-10">அன்புடன் அழைக்கும் NKVS குடும்பத்தினர்</p><div className="grid sm:grid-cols-3 gap-4 max-w-5xl mx-auto">{event.familyMembers.map((name, index) => <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} key={name} className="soft-card p-7 family-name-card"><div className="family-number">0{index + 1}</div><p className="serif text-xl sm:text-2xl text-[#71364e] mt-3 font-semibold">{name}</p></motion.div>)}</div><p className="tamil text-sm text-[#8c6571] mt-8"> ✧  ❀  ✧ </p></div></section>

    <section id="photos" className="py-20 sm:py-24 section-wrap"><div className="text-center mb-12"><div className="ornament mb-4">✧ ❀ ✧</div><h2 className="section-title">The Heart of Our Home</h2><p className="section-sub">எங்கள் செல்லக் தேவதையும்… நாங்களும்!</p></div><div className="grid md:grid-cols-2 gap-6 lg:gap-9 max-w-5xl mx-auto"><div className="photo-card"><div className="photo-frame"><Image src="/images/baby-photo2.png" alt="Sahasrasarvika portrait photo placeholder" width={900} height={1100} priority className="photo-image"/></div><p className="serif text-2xl text-[#71364e] mt-5">Our Little Princess</p><p className="tamil text-sm text-[#987783] mt-2">எங்கள் இல்லத்தின் செல்ல மகள்</p></div><div className="photo-card"><div className="photo-frame"><Image src="/images/1.jpeg" alt="NKVS family photograph placeholder" width={1100} height={900} className="photo-image"/></div><p className="serif text-2xl text-[#71364e] mt-5">NKVS Family</p><p className="tamil text-sm text-[#987783] mt-2">அன்பும் ஒற்றுமையும் நிறைந்த குடும்பம்</p></div></div></section>

    <section className="py-20 bg-[#f8edf0]" id="countdown"><div className="section-wrap text-center"><div className="ornament mb-4">✧ ✧ ✧</div><h2 className="section-title">The Celebration Begins In</h2><p className="section-sub mb-9">இனிய நாளை எதிர்நோக்கி…</p><Countdown/></div></section>

    <section id="details" className="py-20 sm:py-24 section-wrap"><div className="text-center mb-12"><div className="ornament mb-4">✧ ❀ ✧</div><h2 className="section-title">Event Details</h2><p className="section-sub">விழா நடைபெறும் நாள் மற்றும் இடம்</p></div><div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto"><div className="soft-card p-7 sm:p-9 text-center detail-card"><div className="detail-icon"><CalendarDays/></div><h3 className="serif text-2xl text-[#71364e] mt-5">Date & Time</h3><p className="tamil mt-3 text-[#805c67]">{event.dateLabel}</p><p className="mt-2 text-sm text-[#8d6c77]">{event.timeLabel}</p></div><div className="soft-card p-7 sm:p-9 text-center detail-card"><div className="detail-icon"><MapPin/></div><h3 className="serif text-2xl text-[#71364e] mt-5">Venue</h3><p className="tamil mt-3 text-[#805c67]">{event.venueName}</p><p className="mt-2 text-sm text-[#8d6c77]">{event.venueAddress}</p><a className="btn-outline mt-5 text-sm" href={event.mapsUrl} target="_blank" rel="noreferrer"><Navigation size={15}/> Get Directions</a></div></div></section>

    <section id="schedule" className="py-20 bg-[#fff5f3]"><div className="section-wrap"><div className="text-center mb-12"><div className="ornament mb-4">✧ ❀ ✧</div><h2 className="section-title">Celebration Schedule</h2><p className="section-sub">விழா நிகழ்ச்சி நிரல்</p></div><div className="max-w-3xl mx-auto soft-card p-6 sm:p-10"><div className="space-y-7">{event.celebrationSchedule.map((item, index) => <div key={`${item.title}-${index}`}><div className="flex gap-4 sm:gap-5 items-start"><div className="serif text-lg sm:text-xl text-[#a77a3f] border border-[#d8c39d] rounded-full w-11 h-11 shrink-0 grid place-items-center">{String(index + 1).padStart(2, '0')}</div><div className="flex-1 min-w-0"><h3 className="tamil text-base sm:text-lg text-[#71364e] font-semibold">{item.title}</h3><p className="text-sm text-[#987783] mt-1">{item.subtitle}</p></div><span className="text-xs sm:text-sm text-[#987783] text-right max-w-[125px]">{item.time}</span></div>{index !== event.celebrationSchedule.length - 1 && <div className="gold-line mt-7"/>}</div>)}</div></div><p className="text-center text-xs text-[#a1848c] mt-5"> . . .</p></div></section>

    <section className="py-20 sm:py-24 section-wrap text-center"><div className="max-w-3xl mx-auto soft-card p-8 sm:p-12"><div className="ornament mb-4">✧ ❀ ✧</div><Sparkles className="mx-auto text-[#bd9452]" size={30}/><h2 className="serif text-3xl sm:text-4xl text-[#71364e] mt-5">We Await Your Presence</h2><p className="tamil text-xl sm:text-2xl leading-relaxed text-[#815b63] mt-5">எல்லோரும் குடும்பத்துடன் கண்டிப்பாக வருகை தந்து விழாவைச் சிறப்பிக்குமாறு அன்புடன் கேட்டுக்கொள்கிறோம்.</p><p className="tamil text-lg font-bold text-[#71364e] mt-4">உங்களின் வருகையை ஆவலுடன் எதிர்பார்க்கிறோம்</p></div></section>

    <section className="py-16 bg-[#f8edf0]"><div className="section-wrap text-center"><div className="ornament mb-4">✧ ❀ ✧</div><h2 className="section-title">Share the Joy</h2><p className="section-sub mb-8">இந்த அழைப்பிதழை உங்கள் அன்பானவர்களுடன் பகிருங்கள்</p><div className="flex flex-wrap justify-center gap-3"><button onClick={share} className="btn-primary"><Share2 size={16}/> WhatsApp / Share</button><button onClick={copyLink} className="btn-outline"><Copy size={16}/>{copied ? 'Copied!' : 'Copy Invitation Link'}</button></div><div className="soft-card bg-white p-5 inline-flex flex-col items-center mt-9"><QRCodeSVG value={shareUrl} size={150} fgColor="#78445a" bgColor="#ffffff"/><p className="text-xs text-[#8d6c77] mt-3">Scan to open invitation</p></div></div></section>

    <footer className="bg-[#633247] text-[#f8e9ed] text-center py-14 px-5"><div className="ornament text-[#e4c58e] mb-5">✧ ❀ ✧ ❀ ✧</div><p className="tamil text-sm">உங்கள் வருகையே எங்கள் மகிழ்ச்சி</p><h2 className="serif text-3xl sm:text-4xl text-[#f2d9a6] mt-4">SAHASRASARVIKA . N</h2><p className="tamil mt-3 text-lg">ருதுமங்கள ஸ்தான புண்யாவாஜனம்</p><p className="text-xs text-[#e2c5ce] mt-7">14 November 2026 · With love, NKVS Family</p><p className="text-[10px] text-[#d8b8c2] mt-8">Made with ♡ for a beautiful celebration</p></footer>
  </main>;
}
