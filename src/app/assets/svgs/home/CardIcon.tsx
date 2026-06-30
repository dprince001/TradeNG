const CardIcon = ({ size = 20, color = '#1D1E20' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="20" height="14" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M2 10h20" stroke={color} strokeWidth="1.5" />
    <path d="M6 15h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default CardIcon;
