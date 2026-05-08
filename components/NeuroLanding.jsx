'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BookOpenText, BrainCircuit, Dna, ExternalLink, FlaskConical, Heart, HeartPulse, Image as ImageIcon, Mail, Menu, MessageCircle, PhoneCall, PlayCircle, Quote, Send, ShieldCheck, Sparkles, X } from 'lucide-react';

const COMPANY_EMAIL = 'neutechnology.indonesia@gmail.com';
const COMPANY_WHATSAPP = '6281315888745';

const assessments = [
  ['Gratis', 'Skrining Kesehatan Mental Umum ', 'GMHQ-5 WHO', 'IN / ENG'],
  ['Request / Buy Access', 'Skrining Kecemasan Umum ', 'Hamilton Adapted', 'IN / ENG'],
  ['Tersedia', 'Skrining Depresi Umum ', 'PHQ-9', 'IN / ENG'],
  ['Tersedia', 'Skrining Gangguan Tidur ', 'SIS', 'IN / ENG'],
  ['Tersedia', 'Skrining NPD ', 'By Neurotech ID', 'IN / ENG'],
  ['Menyusul', 'Model skrining psikologis lainnya', 'Library bertahap', 'IN / ENG'],
];

const researchCards = [
  ['01', '2026', 'ResearchGate / IJMB', 'Peran Kognitif dalam Produktivitas Karyawan', 'Riset menunjukkan kesehatan mental memengaruhi produktivitas secara langsung dan tidak langsung melalui job engagement serta fungsi kognitif seperti fokus, memori kerja, dan pengambilan keputusan.', 'Mental Health · Cognitive Functioning · Productivity', 'https://www.researchgate.net/publication/401506627_The_Impact_of_Mental_Health_on_Employee_Productivity_Mediating_Roles_of_Job_Engagement_and_Cognitive_Functioning'],
  ['02', '2026', 'JMIR / ScienceDirect', 'Efektivitas iCBT pada Produktivitas Nasional', 'Studi layanan iCBT di Irlandia mencatat penurunan absenteeism 6,85%, presenteeism 5,84%, dan productivity loss 9,48% setelah intervensi digital cognitive behavioral therapy.', 'iCBT · Absenteeism · Presenteeism', 'https://www.jmir.org/2026/1/e80689/PDF'],
  ['03', '2025', 'OECD Library', 'Tren Kesehatan Mental Global OECD', 'Laporan OECD menempatkan kesehatan mental sebagai isu strategis kesehatan publik dan ekonomi. Presenteeism, absensi, serta beban sosial menjadi perhatian penting dalam kebijakan kerja modern.', 'OECD · Workplace Mental Health · Economy', 'https://www.oecd.org/en/publications/2025/11/health-at-a-glance-2025_a894f72e/full-report/mental-health_24af6094.html'],
  ['04', 'Oxford', 'Oxford Saïd Business School', 'Korelasi Kebahagiaan dan Output Kerja', 'Studi Oxford menemukan pekerja yang lebih bahagia 13% lebih produktif. Temuan ini memperkuat posisi wellness bukan fasilitas tambahan, tetapi strategi performa organisasi.', 'Happiness · Performance · Human Capital', 'https://www.ox.ac.uk/news/2019-10-24-happy-workers-are-13-more-productive'],
  ['05', 'Indonesia', 'Jurnal Health Sains', 'Kesehatan Mental vs Keterampilan Kerja di Indonesia', 'Studi di Indonesia menemukan kesehatan mental berpengaruh positif terhadap produktivitas kerja sebesar 31,92%. Ketika dikombinasikan dengan work skills, pengaruhnya meningkat menjadi 52,27%.', 'Indonesia · Work Skills · Productivity', 'https://jurnal.healthsains.co.id/index.php/jhs/article/download/1116/1276'],
];

const lifeStories = [
  {
    category: 'Keluarga',
    title: 'Bahagia Itu Sederhana: Belajar dari Senyum di Teras Rumah Pak Bayu',
    excerpt: 'Tentang seorang ayah yang belajar memisahkan lelah pekerjaan dari hangatnya rumah.',
    image: '/assets/neuro-01-vision.png',
    story: 'Sore itu, deru mesin motor matic tua Pak Bayu berhenti tepat di depan pagar. Di balik helmnya, gurat lelah setelah seharian berkutat dengan rutinitas kantor terlihat jelas. Namun, begitu ia melihat pintu rumah terbuka dan dua pasang kaki kecil berlari menyambutnya, lelah itu seolah luruh bersama debu jalanan. Di ambang pintu, istrinya berdiri dengan senyum teduh yang selalu sama setiap harinya. Tidak ada kemewahan mencolok di rumah itu, namun ada sesuatu yang jauh lebih berharga: rasa cukup. Pak Bayu percaya rumah yang nyaman adalah rumah yang penuh tawa, bukan sekadar perabotan mahal. Ia menjaga ruang dalam kepalanya dengan aturan sederhana: masalah kantor berhenti di pagar rumah. Saat bersama keluarga, ia meletakkan ponsel, mendengar cerita anak-anaknya, dan hadir sepenuhnya. Karena pada akhirnya, kekayaan sejati adalah saat kita mampu tersenyum tulus di depan teras rumah kita sendiri.',
    reflection: 'Apakah ada momen sederhana di rumah yang paling membuat Anda merasa “kaya” hari ini?'
  },
  { category: 'Rumah', title: 'Ibu yang Menyimpan Lelah di Balik Senyum Pagi', excerpt: 'Kekuatan seorang ibu yang tetap memilih lembut, meski hari-harinya penuh tuntutan.', image: '/assets/neuro-04-wellness.png', story: 'Pagi selalu datang lebih cepat untuk Ibu Rani. Ia menyiapkan sarapan, memastikan seragam anak-anak rapi, lalu berangkat bekerja dengan sisa kantuk yang belum selesai. Tidak semua orang tahu betapa beratnya menjaga semua orang tetap baik-baik saja. Namun ia belajar memberi jeda untuk dirinya sendiri: menarik napas, minum air perlahan, dan mengakui bahwa ia juga manusia yang boleh lelah. Dari sana, ia menemukan kembali kelembutan yang tidak memaksakan diri, melainkan lahir dari penerimaan.' },
  { category: 'Kerja', title: 'Karyawan Muda yang Belajar Tidak Membenci Senin', excerpt: 'Pekerjaan tidak harus menjadi musuh, selama kita belajar membaca batas tubuh dan emosi.', image: '/assets/neuro-03-ai-neuroscience.png', story: 'Setiap Minggu malam, Dimas selalu merasa dadanya penuh. Senin baginya seperti gerbang panjang menuju tekanan. Sampai suatu hari ia mulai mencatat emosinya, mengenali pola tidurnya, dan berani bicara kepada atasan tentang beban kerja yang tidak realistis. Perlahan ia menyadari bahwa membenci Senin bukan solusi. Yang ia butuhkan adalah sistem kerja yang lebih sehat, ritme yang masuk akal, dan keberanian untuk menjaga dirinya tanpa merasa bersalah.' },
  { category: 'Refleksi', title: 'Secangkir Teh Setelah Target yang Tidak Selesai', excerpt: 'Tidak semua hari harus dimenangkan. Kadang hidup meminta kita berhenti sebentar.', image: '/assets/neuro-02-research.png', story: 'Nadia menatap angka target yang belum tercapai. Dulu ia akan menyalahkan diri sendiri semalaman. Hari itu ia memilih membuat teh hangat, duduk diam, dan menulis tiga hal kecil yang tetap berhasil ia lakukan. Ia menemukan bahwa kegagalan satu hari tidak menghapus seluruh perjuangan. Kadang produktivitas terbaik dimulai dari kemampuan memeluk diri sendiri dengan jujur.' },
  { category: 'Keluarga', title: 'Anak yang Menunggu Ayahnya Pulang Tanpa Hadiah', excerpt: 'Ia tidak meminta mainan baru. Ia hanya ingin ayahnya duduk, mendengar, dan hadir.', image: '/assets/neuro-05-future.png', story: 'Raka selalu menunggu suara pagar dibuka. Bukan karena ia berharap hadiah, tetapi karena ia ingin ayahnya mendengar cerita tentang gambar yang ia buat di sekolah. Ayahnya akhirnya belajar bahwa hadir bukan berarti sekadar ada di ruangan yang sama. Hadir berarti mematikan layar, menatap mata anak, dan menjadikan beberapa menit kecil sebagai rumah yang aman.' },
  { category: 'Komunitas', title: 'Ruang Kantor yang Berubah Setelah Satu Orang Berani Bicara', excerpt: 'Sebuah tim mulai saling menjaga saat seseorang berani berkata ia sedang tidak baik-baik saja.', image: '/assets/neuro-01-vision.png', story: 'Di ruang rapat yang biasanya kaku, seorang staf berkata pelan bahwa ia merasa kewalahan. Hening beberapa detik, lalu seseorang mengangguk dan berkata, “Saya juga pernah begitu.” Dari satu kalimat jujur, tim mulai membangun kebiasaan baru: check-in emosi, pembagian beban yang lebih manusiawi, dan budaya kerja yang tidak memalukan orang yang meminta bantuan.' },
  { category: 'Wellness', title: 'Tidur yang Akhirnya Pulang Setelah Malam-Malam Panjang', excerpt: 'Perjalanan kecil memperbaiki tidur ikut memperbaiki cara seseorang bekerja dan mencintai.', image: '/assets/neuro-04-wellness.png', story: 'Malam bagi Sinta pernah menjadi medan perang. Pikiran berlari, tubuh lelah, tetapi tidur tak kunjung datang. Ia mulai memperbaiki ritme: mengurangi layar, mendengar audio relaksasi, dan mencatat kecemasan sebelum tidur. Tidur yang pulang pelan-pelan membuat pagi terasa lebih ramah, pekerjaan lebih jernih, dan rumah lebih hangat.' },
  { category: 'Pengampunan', title: 'Maaf yang Tidak Pernah Terlambat', excerpt: 'Kedamaian kadang dimulai dari keberanian mengakui salah dan memilih langkah baru.', image: '/assets/neuro-02-research.png', story: 'Arman menyimpan satu kesalahan terlalu lama. Ia takut dihakimi, takut kehilangan wajah, takut dianggap buruk. Namun dalam satu malam yang sunyi, ia menuliskannya dan memutuskan meminta maaf. Tidak semua luka langsung sembuh, tetapi langkah pertama membuka ruang baru: ruang untuk bertanggung jawab, belajar, dan hidup lebih ringan.' },
  { category: 'Kebaikan', title: 'Teman Kantor yang Diam-Diam Menyelamatkan Hari', excerpt: 'Bukan pidato besar, hanya pesan singkat: “Kamu sudah berusaha.”', image: '/assets/neuro-03-ai-neuroscience.png', story: 'Hari itu Mira hampir menyerah. Laporan ditolak, tubuh lelah, dan kepalanya penuh suara keras. Lalu sebuah pesan masuk dari rekan kerja: “Kamu sudah berusaha. Istirahat dulu, besok kita rapikan bareng.” Kalimat pendek itu tidak menyelesaikan semua masalah, tetapi cukup untuk membuatnya bertahan satu hari lagi.' },
  { category: 'Syukur', title: 'Saat Rumah Kecil Terasa Lebih Luas dari Dunia', excerpt: 'Rumah sederhana menjadi luas ketika penghuninya saling memberi ruang dan menguatkan.', image: '/assets/neuro-05-future.png', story: 'Rumah kecil itu tidak punya banyak barang baru. Namun setiap malam, mereka makan bersama, bertanya kabar, dan saling mendengar. Di sana, luas tidak diukur dari meter persegi, melainkan dari seberapa aman seseorang bisa menjadi dirinya sendiri. Dari rumah kecil itu, mereka belajar bahwa cukup bukan berarti kurang.' },
  { category: 'Resiliensi', title: 'Langkah Pagi Seorang Supervisor yang Hampir Menyerah', excerpt: 'Ia belajar meminta bantuan dan kembali memimpin tanpa kehilangan kemanusiaannya.', image: '/assets/neuro-04-wellness.png', story: 'Sebagai supervisor, Bima merasa harus selalu kuat. Ia menyimpan tekanan sampai tubuhnya memberi tanda: sulit tidur, mudah marah, dan kehilangan fokus. Ketika ia akhirnya meminta bantuan, ia tidak menjadi pemimpin yang lebih lemah. Justru ia menjadi lebih utuh, lebih peka, dan lebih mampu menjaga timnya dengan cara yang manusiawi.' },
  { category: 'Harapan', title: 'Catatan Kecil di Meja Kerja yang Membuat Seseorang Bertahan', excerpt: 'Satu kalimat baik menjadi pengingat bahwa kita tidak harus melewatinya sendirian.', image: '/assets/neuro-01-vision.png', story: 'Di meja kerja yang penuh berkas, ada catatan kecil: “Pelan-pelan, kamu tidak sendiri.” Tidak jelas siapa yang menulisnya. Namun kalimat itu menjadi jangkar untuk seseorang yang hampir tenggelam oleh tekanan. Harapan sering tidak datang dalam bentuk besar. Kadang ia hadir sebagai tulisan kecil yang membuat kita mau mencoba lagi.' },
];

export default function App() {
  const slides = useMemo(() => [
    { id: 'home', nav: 'Home', type: 'home', image: '/assets/neuro-01-vision.png' },
    { id: 'ruang-aman', nav: 'Ruang Aman', type: 'safe', label: '01 / Ruang Aman', eyebrow: 'Safe Onboarding for Personal & Business Growth', title: '', intro: 'Daftarkan bisnis Anda untuk terhubung & tumbuh. Ruang Aman menjadi gerbang awal bagi personal user maupun pemilik bisnis untuk masuk ke ekosistem Escape, E-Course, dan produk layanan NeuroTech ID.', image: '/assets/neuro-01-vision.png', align: 'center', icon: BrainCircuit },
    { id: 'produk-layanan', nav: 'Produk Layanan', type: 'products', label: '02 / Produk Layanan', eyebrow: 'Corporate Wellness, AI & Neuroscience Services', title: 'Produk layanan untuk bisnis yang ingin tumbuh bersama manusia yang lebih sehat.', intro: 'Catatan layanan ini dapat dikembangkan menjadi T&C dan perjanjian penggunaan khusus untuk user bisnis, termasuk batas akses, consent, privasi data, dan ruang lingkup pemanfaatan hasil.', image: '/assets/neuro-03-ai-neuroscience.png', icon: HeartPulse },
    { id: 'dukungan-komunitas', nav: 'Dukungan Komunitas', type: 'community', label: '03 / Dukungan Komunitas', eyebrow: 'Community Support, Storytelling & Music Window', title: 'Mari melihat dunia dan cerita mereka. Kita tidak sendirian.', intro: 'Kita bisa berpegangan tangan, saling memberi dukungan, dan membangun ruang aman untuk cerita satu arah yang jujur, hangat, dan tetap terjaga.', image: '/assets/neuro-05-future.png', icon: Sparkles },
    { id: 'riset-pengembangan', nav: 'Riset & Pengembangan', type: 'research', label: '04 / Riset & Pengembangan', eyebrow: 'International Research Library & Evidence-Based Development', title: 'Riset internasional untuk keputusan bisnis yang lebih manusiawi.', image: '/assets/neuro-02-research.png', icon: FlaskConical },
    { id: 'tentang-kami', nav: 'Tentang Kami', type: 'about', label: '05 / Tentang Kami', eyebrow: 'Kesehatan Mental, Keberlangsungan & Kehidupan', title: 'Cerita tentang kami.', image: '/assets/neuro-04-wellness.png', icon: Dna },
    { id: 'galeri-kehidupan', nav: 'Galeri Kehidupan', type: 'gallery', label: '06 / Galeri Kehidupan', eyebrow: 'Life Gallery, Inspirasi & Refleksi', title: 'Cerita-cerita kecil yang mengingatkan kita untuk tetap hidup dengan utuh.', image: '/assets/neuro-01-vision.png', icon: Sparkles },
  ], []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const refs = useRef([]);

  const goTo = useCallback((target) => {
    const next = Math.max(0, Math.min(slides.length - 1, target));
    setActiveIndex(next);
    refs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [slides.length]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.dataset?.index) setActiveIndex(Number(visible.target.dataset.index));
    }, { threshold: [0.6, 0.75, 0.9] });
    refs.current.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="landing-shell">
      <Header goTo={goTo} />
      <SideMenu slides={slides} activeIndex={activeIndex} goTo={goTo} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {slides.map((slide, index) => {
        const refCallback = (node) => { refs.current[index] = node; };
        if (slide.type === 'home') return <HomeSection key={slide.id} slide={slide} index={index} refCallback={refCallback} />;
        if (slide.type === 'safe') return <SafeSpaceSection key={slide.id} slide={slide} index={index} refCallback={refCallback} goToProducts={() => goTo(2)} />;
        if (slide.type === 'products') return <ProductSection key={slide.id} slide={slide} index={index} refCallback={refCallback} />;
        if (slide.type === 'community') return <CommunitySection key={slide.id} slide={slide} index={index} refCallback={refCallback} />;
        if (slide.type === 'research') return <ResearchSection key={slide.id} slide={slide} index={index} refCallback={refCallback} />;
        if (slide.type === 'about') return <AboutSection key={slide.id} slide={slide} index={index} refCallback={refCallback} />;
        if (slide.type === 'gallery') return <GallerySection key={slide.id} slide={slide} index={index} refCallback={refCallback} goToCommunity={() => goTo(3)} />;
        return <SimpleSection key={slide.id} slide={slide} index={index} refCallback={refCallback} />;
      })}
    </main>
  );
}

function Header({ goTo }) {
  return <header className="site-header"><button className="brand icon-only" onClick={() => goTo(0)} aria-label="Kembali ke Home"><span className="brand-mark"><img src="/assets/logo-butterfly.png" alt="Logo" /></span></button></header>;
}

function SideMenu({ slides, activeIndex, goTo, menuOpen, setMenuOpen }) {
  return (
    <aside className={`side-menu ${menuOpen ? 'open' : ''}`} aria-label="Navigasi utama">
      <button className="side-menu-trigger" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'} aria-expanded={menuOpen}><span>{menuOpen ? <X size={17} /> : <Menu size={17} />}</span><small>Menu</small></button>
      <nav className="side-menu-list">
        {slides.map((slide, index) => <button key={slide.id} className={activeIndex === index ? 'active' : ''} onClick={() => { goTo(index); setMenuOpen(false); }}><small>{index === 0 ? '•' : String(index).padStart(2, '0')}</small><span>{slide.nav}</span></button>)}
      </nav>
    </aside>
  );
}

function HomeSection({ slide, index, refCallback }) {
  return <section id={slide.id} ref={refCallback} data-index={index} className="hero-section home-section"><div className="hero-bg" style={{ backgroundImage: `url(${slide.image})` }} /><div className="home-overlay" /><div className="home-vignette" /><div className="home-lockup reveal"><p className="home-company">PT NEUROSAINS INTI TECHNOLOGY ID</p><div className="home-title-row"><h1 className="home-title">ESCAPE</h1></div><p className="home-tagline">RUANG UNTUK KESEHATAN MENTAL &amp; PRODUKTIVITAS</p></div></section>;
}

function Chrome({ slide, index, refCallback, className, children }) {
  return <section id={slide.id} ref={refCallback} data-index={index} className={`hero-section ${className}`}><div className="hero-bg" style={{ backgroundImage: `url(${slide.image})` }} /><div className="hero-noise" /><div className="hero-overlay" /><div className="hero-vignette" />{children}</section>;
}

function Heading({ slide, className = '' }) {
  const Icon = slide.icon;
  return <div className={className}><div className="meta-row"><span className="icon-pill"><Icon size={20} /></span><span className="section-label">{slide.label}</span></div><p className="eyebrow">{slide.eyebrow}</p><h2>{slide.title}</h2></div>;
}


function SafeSpaceSection({ slide, index, refCallback, goToProducts }) {
  return (
    <Chrome slide={slide} index={index} refCallback={refCallback} className="safe-section align-center">
      <div className="hero-overlay safe-overlay" />
      <div className="safe-content reveal">
        <div className="safe-heading">
          <Heading slide={slide} />
          <p className="safe-intro">{slide.intro}</p>
        </div>
        <div className="safe-paths" aria-label="Pilihan perjalanan Ruang Aman">
          <article className="safe-path-card">
            <div className="safe-path-icon"><BookOpenText size={19} /></div>
            <p className="product-category">Untuk Personal</p>
            <h3>Masuk ke Galeri E-Course</h3>
            <p>Pengguna personal diarahkan ke galeri E-Course sebagai ruang belajar awal. Materi akan menyusul dan bisa diganti dari data atau link yang Anda siapkan nanti.</p>
            <a className="line-button" href="#galeri-kehidupan">Buka Galeri E-Course</a>
          </article>
          <article className="safe-path-card business-path">
            <div className="safe-path-icon"><HeartPulse size={19} /></div>
            <p className="product-category">Untuk Pemilik Bisnis</p>
            <h3>Terhubung ke Produk & Layanan</h3>
            <p>Pemilik bisnis diarahkan ke halaman Produk Layanan untuk melihat Employee Emotion Tracking, Corporate Mental Health Program, Digital Wellness, asesmen, dan custom layanan.</p>
            <button className="line-button primary" type="button" onClick={goToProducts}>Lihat Produk Layanan</button>
          </article>
          <article className="safe-note">
            <ShieldCheck size={18} />
            <div>
              <h3>Panduan link sudah disiapkan</h3>
              <p>Link personal saat ini menuju <strong>#galeri-kehidupan</strong> sebagai placeholder E-Course. Link bisnis memakai tombol internal ke section <strong>Produk Layanan</strong>. Detail lokasi penggantian ada di README.</p>
            </div>
          </article>
        </div>
      </div>
    </Chrome>
  );
}

function ProductSection({ slide, index, refCallback }) {
  return (
    <Chrome slide={slide} index={index} refCallback={refCallback} className="product-section align-left">
      <div className="hero-overlay product-overlay" /><div className="product-content reveal"><div className="product-heading"><Heading slide={slide} /><p className="product-intro">{slide.intro}</p></div><div className="product-scroll" aria-label="Detail produk dan layanan">
        <article className="product-block"><p className="product-category">Digital Mental Health Support</p><h3>Employee Emotion Tracking</h3><p className="product-subtitle">Providing companies with insight to make better, more human-centered decisions.</p><p>Untuk menghasilkan kinerja optimal, seseorang perlu berada dalam kondisi sehat secara jasmani dan psikis. Emotion tracking dari Escape membantu perusahaan melihat gambaran global atau kelompok terkait tingkat emosi dan kestabilan kinerja karyawan, sekaligus mengurangi risiko burnout yang dapat menurunkan bahkan menghilangkan produktivitas. Kami percaya jiwa yang sehat akan menciptakan perusahaan yang berdaya.</p><h3>Mental Health Corporate Program</h3><p>Program ini membantu organisasi memahami kesehatan mental secara tepat dan terstruktur dalam rangka membangun ekosistem positif untuk kesehatan jiwa di dalam organisasi. Layanan berfokus pada penguatan aspek individu, regulasi internal, serta pola interaksi yang sehat dan membangun. Tujuannya adalah menjelaskan batas permasalahan, membaca kemampuan organisasi, dan menentukan strategi manajemen yang tepat guna.</p></article>
        <article className="product-block"><p className="product-category">Digital Wellness</p><h3>Escape</h3><p>Kesehatan mental sangat berkaitan dengan kualitas tidur seseorang. Kami menyediakan bantuan agar karyawan dapat mencapai kondisi tidur yang lebih dalam dan optimal. Didukung oleh tim profesional dan riset bertaraf internasional, aplikasi Escape dapat menjadi solusi untuk menunjang kinerja karyawan melalui perbaikan kualitas tidur.</p><h3>ProLife</h3><p>Kesehatan fisik dapat dimulai dari langkah sederhana. Kami percaya tubuh dan mental yang sehat akan berkontribusi maksimal pada kinerja organisasi. Kesehatan fisik juga menjadi gambaran kuat agar individu dapat merasakan kesejahteraan hidup yang lebih baik, menyebarkan hal positif, dan mendorong peran aktif dalam kelompok maupun masyarakat.</p><div className="mini-list"><span>Catatan Keuangan</span><span>Habit Tracking</span><span>Movement</span></div></article>
        <article className="product-block assessment-block"><div className="highlight-line"><strong>&gt;99+</strong><span>Model Skrining Psikologis Tersedia Di Sini</span></div><p className="product-category">Asesmen Psikologis Digital · Bahasa Indonesia & English</p><p>Membangun bisnis bukan hanya soal strategi, tapi soal menempatkan hati di tempat yang tepat. Layanan asesmen kami hadir untuk membantu Anda mengenal tim lebih dalam—bukan sekadar kompetensi, tetapi juga kenyamanan mereka dalam berkarya. Mari ciptakan lingkungan kerja yang lebih hangat dan produktif bersama.</p><p>Tes Digital Adaptasi 2026 by Neutech ID. Untuk tahap awal, akses gratis dibuka untuk satu skrining terlebih dahulu.</p><div className="assessment-table" role="table" aria-label="Daftar skrining psikologis">{assessments.map(([status, name, model, lang]) => <div className="assessment-row" role="row" key={`${status}-${name}`}><span className="status-pill">{status}</span><span>{name}</span><small>{model}</small><em>{lang}</em></div>)}</div><p className="disclaimer-note">Catatan hasil: seluruh output skrining bersifat edukatif dan pendukung keputusan awal, bukan diagnosis medis atau psikologis final. Interpretasi mendalam, rekomendasi klinis, dan keputusan organisasi sebaiknya melibatkan profesional yang berwenang serta memperhatikan persetujuan, kerahasiaan, dan konteks pengguna.</p></article>
        <article className="product-block custom-block"><p className="product-category">Custom Layanan</p><blockquote>Di balik setiap angka dan target yang besar, ada manusia-manusia hebat yang berjuang dengan sepenuh hati. Mari bantu mereka menemukan potensi terbaiknya melalui pendekatan yang tepat. Karena bisnis yang sehat, dimulai dari tim yang bahagia dan dipahami. Bersama Neutech ID, mari melangkah membangun masa depan yang lebih sejahtera.</blockquote></article>
      </div></div>
    </Chrome>
  );
}

function CommunitySection({ slide, index, refCallback }) {
  const features = [[MessageCircle, 'Kolom Cerita Satu Arah', 'Ruang komentar tanpa balasan, sehingga setiap orang bisa menulis cerita dengan lebih aman, tenang, dan tidak merasa dihakimi.'], [Heart, 'Tombol Dukungan', 'Love atau like sederhana untuk memberi tanda bahwa cerita seseorang didengar dan mendapat dukungan dari komunitas.'], [ShieldCheck, 'Anonim atau Nama Pilihan', 'Pengguna dapat memilih tampil anonim atau menulis nama sendiri sesuai kenyamanan saat membagikan cerita.'], [Sparkles, 'Moderasi Admin', 'Admin dapat menghapus komentar yang dirasa tidak pantas agar ruang komunitas tetap sehat, teduh, dan saling menjaga.']];
  const cats = [['Curhat & Realitas', 'Di sini kamu bisa cerita sejujurnya tanpa nama, tentang kejadian yang kamu alami hari ini, dan membiarkan dunia tahu betapa kerasnya hidup ini.'], ['Inspiratif & Kebaikan', 'Biarkan dunia tahu tentang kebaikan dan harapan. Ceritakan kisah inspiratif serta pengalaman yang kamu punya untuk membangun semangat orang lain di sini.'], ['Pengakuan Dosa & Pengampunan', 'Biarkan ia lepas di sini. Manusia pasti pernah membuat kesalahan. Mari jeda sejenak, menuliskannya, lalu memulai langkah baru menuju penebusan.']];
  return <Chrome slide={slide} index={index} refCallback={refCallback} className="community-section align-left"><div className="hero-overlay community-overlay" /><div className="community-content reveal"><div className="community-heading"><Heading slide={slide} /><p className="community-intro">{slide.intro}</p></div><div className="community-scroll" aria-label="Detail dukungan komunitas"><article className="community-block lead-block"><p className="product-category">Dukungan Komunitas</p><p>Mari melihat dunia dan cerita mereka. Kita tidak sendirian, kita bisa berpegangan tangan, dan kita punya dukungan. Ruang ini dibangun agar cerita manusia dapat hadir apa adanya tanpa kehilangan rasa aman.</p></article><article className="community-block"><p className="product-category">Fitur Utama Tersedia</p><div className="community-feature-grid">{features.map(([Icon, title, text]) => <div className="community-feature" key={title}><Icon size={18} /><h3>{title}</h3><p>{text}</p></div>)}</div></article><article className="community-block"><p className="product-category">Kategori Cerita</p><div className="community-category-list">{cats.map(([title, text]) => <div className="community-category" key={title}><h3>{title}</h3><p>{text}</p></div>)}</div><YouTubeBox /></article><article className="community-block custom-block"><p className="product-category">Catatan Pengalaman</p><blockquote>Komunitas ini bukan ruang diagnosis dan bukan pengganti bantuan profesional. Ia hadir sebagai ruang berbagi, mendengar, dan memberi dukungan ringan agar setiap orang merasa lebih ditemani dalam prosesnya.</blockquote></article></div></div></Chrome>;
}

function YouTubeBox() {
  return <div className="youtube-mini" aria-label="Jendela musik rekomendasi dari YouTube"><div className="youtube-mini-head"><PlayCircle size={17} /><span>Musik Rekomendasi</span><small>via YouTube</small></div><div className="youtube-frame"><iframe src="https://www.youtube.com/embed/jfKfPfyJRdk?rel=0&modestbranding=1" title="Musik rekomendasi untuk ruang komunitas" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" /></div></div>;
}

function ResearchSection({ slide, index, refCallback }) {
  const [form, setForm] = useState({ company: '', name: '', email: '', phone: '', need: '' });
  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  const message = `Halo NeuroTech ID, saya ingin membangun riset untuk bisnis.\n\nPerusahaan: ${form.company || '-'}\nNama: ${form.name || '-'}\nEmail: ${form.email || '-'}\nWA: ${form.phone || '-'}\nKebutuhan riset: ${form.need || '-'}`;
  const mailHref = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent('Permintaan Riset Bisnis - NeuroTech ID')}&body=${encodeURIComponent(message)}`;
  const waHref = `https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(message)}`;
  return <Chrome slide={slide} index={index} refCallback={refCallback} className="research-section align-left"><div className="hero-overlay research-overlay" /><div className="research-content reveal"><div className="research-heading"><Heading slide={slide} /><p className="research-intro">Manusia sebagai aset utama bukan lagi sekadar retorika, melainkan komitmen yang harus dilandasi oleh data. Melalui riset-riset terbaru ini, kita tidak hanya membaca statistik; kita sedang belajar memahami bagaimana mendukung kesejahteraan manusia agar perusahaan dapat tumbuh bersama jiwa-jiwa yang sehat dan tangguh.</p><div className="research-cta-panel"><p>Bangun riset untuk bisnis Anda bersama kami NeuroTech ID.</p><a href={waHref} target="_blank" rel="noreferrer" className="glow-button"><PhoneCall size={15} /> Konsultasi via WhatsApp</a></div></div><div className="research-scroll" aria-label="Perpustakaan riset dan form permintaan"><article className="research-block"><div className="research-form-head"><Mail size={18} /><div><p className="product-category">Form Permintaan Riset</p><h3>Hubungkan kebutuhan bisnis dengan data yang bisa dipertanggungjawabkan.</h3></div></div><form className="research-form" onSubmit={(event) => event.preventDefault()}><Field label="Nama Perusahaan" value={form.company} onChange={update('company')} placeholder="PT / Instansi / Brand" /><Field label="Nama PIC" value={form.name} onChange={update('name')} placeholder="Nama penghubung" /><Field label="Email Perusahaan" value={form.email} onChange={update('email')} placeholder="email@perusahaan.com" type="email" /><Field label="Nomor WhatsApp" value={form.phone} onChange={update('phone')} placeholder="08xx / 62xx" /><label className="wide-field"><span>Kebutuhan Riset</span><textarea value={form.need} onChange={update('need')} placeholder="Contoh: asesmen karyawan, employee emotion tracking, sleep & wellness, burnout prevention..." /></label><div className="form-actions"><a href={mailHref} className="line-button"><Mail size={15} /> Kirim ke Email</a><a href={waHref} target="_blank" rel="noreferrer" className="line-button primary"><Send size={15} /> Kirim ke WhatsApp</a></div></form></article><article className="research-block"><div className="library-head"><BookOpenText size={18} /><div><p className="product-category">Perpustakaan Jurnal Internasional</p><h3>Bahan bacaan terhubung ke sumber data eksternal.</h3></div></div><p className="library-note">Intisari disusun dalam Bahasa Indonesia agar mudah dibaca oleh user bisnis. Link eksternal disediakan agar klien dapat melihat sumbernya langsung dari perpustakaan jurnal, lembaga riset, atau publikasi internasional.</p><div className="research-card-list">{researchCards.map(([no, year, source, title, summary, keyword, link]) => <a href={link} target="_blank" rel="noreferrer" className="research-card" key={title}><div className="research-cover"><span>{no}</span><strong>{source}</strong><small>{year}</small></div><div className="research-card-copy"><p>{keyword}</p><h4>{title}</h4><span>{summary}</span><em>Pelajari lebih dalam <ExternalLink size={13} /></em></div></a>)}</div></article></div></div></Chrome>;
}

function Field({ label, ...props }) { return <label><span>{label}</span><input {...props} /></label>; }

function AboutSection({ slide, index, refCallback }) {
  return <Chrome slide={slide} index={index} refCallback={refCallback} className="about-section align-center"><div className="hero-overlay about-overlay" /><div className="about-content reveal"><div className="about-heading"><Heading slide={slide} /><p className="about-keywords">Keywords: Kesehatan Mental, Keberlangsungan & Kehidupan</p></div><div className="about-scroll" aria-label="Cerita tentang kami"><p>Merawat perusahaan di Indonesia bukan sekadar tentang mendirikan bangunan dan menyusun neraca keuangan. Hal ini juga tentang merawat sebuah ekosistem kehidupan yang saling bertaut. Visi masa depan yang tangguh lahir ketika kita menyadari bahwa di balik setiap baris laporan pencapaian, terdapat ribuan pasang tangan yang juga memegang tanggung jawab sebagai orang tua, anak, dan anggota masyarakat. Kepedulian terhadap kesehatan mental adalah jembatan yang menghubungkan ambisi profesional dengan kehangatan ruang keluarga, memastikan bahwa kemajuan ekonomi bertumbuh bersama kesejahteraan mereka yang bergantung kepada Anda.</p><p>Kami meyakini, kantor bukan lagi menjadi tempat yang menguras energi, melainkan ruang yang menumbuhkan dan menunjukkan potensi terbaik setiap orang yang terlibat di dalamnya. Perusahaan yang memprioritaskan kesejahteraan psikologis memahami bahwa produktivitas yang berkelanjutan hanya bisa tumbuh di atas tanah empati. Ketika lingkungan kerja memberikan rasa aman secara emosional, kreativitas mengalir tanpa sumbatan, dan kolaborasi terjalin karena rasa saling percaya. Inilah titik di mana keberhasilan organisasi menjadi sejalan dengan kesehatan mental setiap individunya, menciptakan standar baru bagi budaya kerja di Indonesia yang lebih memanusiakan manusia.</p><p>Lebih jauh lagi, visi ini membawa dampak yang meluas hingga ke ambang pintu rumah setiap karyawan. Pekerja yang pulang dengan kondisi mental yang stabil dan bahagia akan membawa energi positif bagi keluarganya. Mereka mampu hadir sepenuhnya untuk momen-momen berharga, menjadi pendengar yang baik bagi anak-anak, dan pendamping yang hangat bagi pasangan. Kebahagiaan di rumah ini kemudian menjadi bahan bakar tak terbatas yang dibawa kembali ke kantor setiap pagi, menciptakan sebuah lingkaran kebaikan yang terus berputar dan menguatkan struktur sosial kita.</p><p>Visi besar tentang kesehatan mental adalah investasi jangka panjang untuk Indonesia yang lebih maju. Kontribusi nyata membangun peradaban kerja di mana kesuksesan tidak lagi diukur dari seberapa keras seseorang dipaksa bekerja, melainkan dari seberapa sehat mereka bisa terus berkarya bersama. Memandang manusia tidak hanya sebagai aset, namun bagian kehidupan kita. Fokus pada kesehatan mental perusahaan tidak hanya sedang mengejar target jangka pendek, tetapi sedang menanam benih untuk masa depan yang lebih cerah, stabil, dan tulus.</p><div className="signature-block"><span>Salam Hangat</span><strong>Lakudus S.Psi M.M C.Ht</strong><small>BOC PT Neurosains Inti Technology ID</small></div></div></div></Chrome>;
}

function GallerySection({ slide, index, refCallback, goToCommunity }) {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <Chrome slide={slide} index={index} refCallback={refCallback} className="gallery-section align-center">
      <div className="hero-overlay gallery-overlay" />
      <div className="gallery-content reveal">
        <div className="gallery-heading gallery-heading-top">
          <Heading slide={slide} />
          <p className="gallery-intro">
            Isinya cerita-cerita inspiratif tentang keluarga, pekerjaan, pengampunan, harapan, dan cara manusia menjaga ruang dalam kepalanya agar tetap bisa pulang dengan hati yang utuh.
          </p>
        </div>

        <div className="gallery-slider-wrap" aria-label="Slider Galeri Kehidupan">
          <div className="life-gallery-slider">
            {lifeStories.map((story, i) => (
              <button className="life-card slider-card" key={story.title} type="button" onClick={() => setSelectedStory(story)}>
                <img src={story.image} alt={story.title} />
                <span>{String(i + 1).padStart(2, '0')} · {story.category}</span>
                <h4>{story.title}</h4>
                <p>{story.excerpt}</p>
              </button>
            ))}
          </div>
          <p className="slider-hint">Geser galeri ke samping, klik gambar untuk membaca cerita dan refleksinya.</p>
        </div>
      </div>

      {selectedStory && (
        <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} goToCommunity={goToCommunity} />
      )}
    </Chrome>
  );
}

function formatStoryParagraphs(text) {
  if (!text) return [];
  const cleanText = text.replace(/\s+/g, ' ').trim();
  const sentences = cleanText.match(/[^.!?]+[.!?]+(?:[”"])?|[^.!?]+$/g) || [cleanText];
  const paragraphs = [];

  for (let i = 0; i < sentences.length; i += 2) {
    paragraphs.push(sentences.slice(i, i + 2).join(' ').trim());
  }

  return paragraphs.filter(Boolean);
}

function StoryModal({ story, onClose, goToCommunity }) {
  const paragraphs = formatStoryParagraphs(story.story);

  return (
    <div className="story-modal" role="dialog" aria-modal="true" aria-label={story.title} onClick={onClose}>
      <article className="story-modal-card" onClick={(event) => event.stopPropagation()}>
        <button className="story-close" type="button" onClick={onClose} aria-label="Tutup cerita"><X size={18} /></button>
        <div className="story-modal-image">
          <img src={story.image} alt={story.title} />
          <span>{story.category}</span>
        </div>
        <div className="story-modal-copy">
          <p className="product-category">Galeri Kehidupan</p>
          <h3>{story.title}</h3>
          <div className="story-body" aria-label="Isi cerita inspiratif">
            {paragraphs.map((paragraph, paragraphIndex) => (
              <p key={`${story.title}-${paragraphIndex}`}>{paragraph}</p>
            ))}
          </div>
          {story.reflection && (
            <div className="modal-reflection">
              <Quote size={17} />
              <div>
                <h4>Kolom Refleksi</h4>
                <p>{story.reflection}</p>
                <button type="button" onClick={() => { onClose(); goToCommunity(); }}>Balas di Dukungan Komunitas <Send size={14} /></button>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

function SimpleSection({ slide, index, refCallback }) {
  return <Chrome slide={slide} index={index} refCallback={refCallback} className={`align-${slide.align}`}><div className="hero-content"><div className="hero-copy reveal"><Heading slide={slide} /><p className="body-copy">{slide.body}</p></div></div></Chrome>;
}
