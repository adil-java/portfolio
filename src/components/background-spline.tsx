export function BackgroundSpline() {
  return (
    <div 
      id="spline-background"
      className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0 select-none print:hidden hidden md:dark:block opacity-[0.28] md:opacity-[0.45] transition-opacity duration-500"
    >
      <iframe
        src="https://my.spline.design/nexbotrobotcharacterconceptforpersonaluse-bRRmYkkoH9GOqcwsHt82Qdbv/"
        frameBorder="0"
        width="100%"
        height="100%"
        loading="lazy"
        className="w-full h-full border-none scale-[2.0] md:scale-[2.5] origin-center pointer-events-none filter contrast-125 dark:contrast-100"
        title="Nexbot Robot Character Spline Background"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var isLowEnd = (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) || 
                               (navigator.deviceMemory && navigator.deviceMemory < 4) ||
                               (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
                if (isLowEnd) {
                  var el = document.getElementById('spline-background');
                  if (el) el.remove();
                }
              } catch (e) {
                console.error("Spline optimizer error:", e);
              }
            })();
          `
        }}
      />
    </div>
  );
}
