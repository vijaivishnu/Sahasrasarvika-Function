/**
 * SAHASRASARVIKA invitation content.
 * Update the ceremony time in dateISO (IST, +05:30) and timeLabel when confirmed.
 * Add, remove, or reorder schedule entries in celebrationSchedule.
 */
export const event = {
  honoree: 'SAHASRASARVIKA . N',
  tamilTitle: 'ருதுமங்கள ஸ்தான புண்யாவாஜன அழைப்பிதழ்',
  englishTitle: 'A Celebration of Grace & New Beginnings',
  // Date is fixed. Currently targets midnight; replace 00:00 with the confirmed time.
  dateISO: '2026-11-14T00:00:00+05:30',
  dateLabel: 'சனிக்கிழமை, 14 நவம்பர் 2026',
  timeLabel: '11.00 AM Onwards',
  venueName: 'Sri Vasavi Kalyana Mandapam',
  venueAddress: 'Mission Street, Noyyal, Tiruppur – 641604',
  mapsUrl: 'https://maps.app.goo.gl/dH5Liw8HcCeoa73Q7',
  familyMembers: ['NAGARAJAN R', 'KANAGATHARA N', 'VIJAIVISHNU N' ],
  musicVideoId: 'BZoYHI24iuc',
  hostLine: 'அன்புடன் அழைக்கும்',
  familyLine: 'NKVS FAMILY',
  inviteMessage: '. . .',
  celebrationSchedule: [
    { title: 'நிகழ்ச்சி தொடக்கம்', subtitle: 'Welcome & Gathering', time: '11.00 AM Onwards' },
    { title: 'புண்யாவாஜனம்', subtitle: 'Traditional Ceremony', time: '11.15 AM' },
    { title: 'மதிய விருந்து', subtitle: 'Lunch & Togetherness', time: '12.30 PM Onwards' },
    { title: 'தளிபம்', subtitle: 'Makeup & Family Moments', time: '12.30 PM Onwards' },
  ],
};
