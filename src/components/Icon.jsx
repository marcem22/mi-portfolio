export default function Icon({ name, className = "icon" }) {
  switch (name) {
    case "cube":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      );

    case "layout":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="9" y1="9" x2="9" y2="21"/>
        </svg>
      );

    case "nodes":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="5" cy="12" r="2"/>
          <circle cx="19" cy="5" r="2"/>
          <circle cx="19" cy="19" r="2"/>
          <line x1="7" y1="12" x2="17" y2="6"/>
          <line x1="7" y1="12" x2="17" y2="18"/>
        </svg>
      );

    default:
      return null;
  }
}