const BankIcon = ({ size = 20, color = '#1D1E20' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21h18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 10h18" stroke={color} strokeWidth="1.5" />
    <path d="M5 10V21" stroke={color} strokeWidth="1.5" />
    <path d="M19 10V21" stroke={color} strokeWidth="1.5" />
    <path d="M9 10V21" stroke={color} strokeWidth="1.5" />
    <path d="M15 10V21" stroke={color} strokeWidth="1.5" />
    <path d="M12 3L3 10h18L12 3z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export default BankIcon;
