const WalletIcon = ({ size = 20, color = '#1D1E20' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 7H4C2.9 7 2 7.9 2 9v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z"
      stroke={color}
      strokeWidth="1.5"
    />
    <path d="M16 3H8L6 7h12l-2-4z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="17" cy="14" r="1.5" fill={color} />
  </svg>
);

export default WalletIcon;
