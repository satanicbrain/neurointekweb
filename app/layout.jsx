import './globals.css';

export const metadata = {
  title: 'PT Neuro Sains Inti Technology ID | Escape',
  description: 'Corporate wellness, digital mental health support, neuroscience-based research, community support, and life gallery by PT Neuro Sains Inti Technology ID.',
  keywords: ['Neuro Sains', 'NeuroTech ID', 'Escape', 'mental health', 'corporate wellness', 'neuroscience', 'employee emotion tracking'],
  openGraph: {
    title: 'PT Neuro Sains Inti Technology ID | Escape',
    description: 'Ruang untuk kesehatan mental, produktivitas, riset, dan kesejahteraan manusia di dalam organisasi.',
    type: 'website',
    images: ['/assets/neuro-01-vision.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#05070b',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
