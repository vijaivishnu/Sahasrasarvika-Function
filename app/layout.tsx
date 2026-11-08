import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'SAHASRASARVIKA N | ருதுமங்கள ஸ்தான புண்யாவாஜன அழைப்பிதழ்',
  description: 'With love, we invite you to celebrate a beautiful family occasion on 14 November 2026.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.vercel.app'),
  openGraph: { title: 'SAHASRASARVIKA – ருதுமங்கள ஸ்தான புண்யாவாஜன அழைப்பிதழ்', description: 'A beautiful celebration of grace and new beginnings.', type: 'website' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ta"><body>{children}</body></html>;
}
