// Based on next-themes official script
// This prevents theme flicker by applying the theme before React hydrates

export function ThemeScript() {
  const script = `!function(){try{var e=document.documentElement,t=e.classList;t.remove("light","dark");var n=localStorage.getItem("clinicflow-theme");if("system"===n||(!n||"system"===n)){var o="(prefers-color-scheme: dark)",s=window.matchMedia(o);s.media!==o||s.matches?(e.style.colorScheme="dark",t.add("dark")):(e.style.colorScheme="light",t.add("light"))}else if(n){var a="dark"===n?"dark":"light";e.style.colorScheme=a,t.add(a)}}catch(e){}}()`;

  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
