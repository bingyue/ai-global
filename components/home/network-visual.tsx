export function NetworkVisual() {
  return <div className="relative mx-auto aspect-square w-full max-w-[590px]" aria-label="AI全球商业网络抽象图">
    <div className="absolute inset-[7%] rounded-full border border-white/10" /><div className="absolute inset-[20%] rounded-full border border-dashed border-white/10" />
    <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" role="img" aria-hidden="true">
      <defs><linearGradient id="line" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#27d3e2" stopOpacity=".9"/><stop offset=".55" stopColor="#356dff" stopOpacity=".55"/><stop offset="1" stopColor="#8b5cf6" stopOpacity=".18"/></linearGradient></defs>
      <g fill="none" stroke="url(#line)" strokeWidth="1">
        <path d="M300 300 118 180M300 300 480 142M300 300 510 330M300 300 430 490M300 300 170 490M300 300 82 335"/><path d="M118 180 480 142 510 330 430 490 170 490 82 335Z" strokeOpacity=".25"/><path d="M118 180 510 330M480 142 170 490M82 335 430 490" strokeDasharray="3 8" strokeOpacity=".3"/>
      </g>
      <g><circle className="network-node" fill="#27d3e2" cx="118" cy="180" r="5"/><circle className="network-node" fill="#356dff" style={{animationDelay:"-.8s"}} cx="480" cy="142" r="5"/><circle className="network-node" fill="#8b5cf6" style={{animationDelay:"-1.5s"}} cx="510" cy="330" r="5"/><circle className="network-node" fill="#27d3e2" style={{animationDelay:"-2.1s"}} cx="430" cy="490" r="5"/><circle className="network-node" fill="#356dff" style={{animationDelay:"-2.7s"}} cx="170" cy="490" r="5"/><circle className="network-node" fill="#8b5cf6" style={{animationDelay:"-3.2s"}} cx="82" cy="335" r="5"/></g>
    </svg>
    {[{label:"品牌",p:"left-[6%] top-[23%]"},{label:"内容",p:"right-[4%] top-[15%]"},{label:"广告",p:"right-[-1%] top-[52%]"},{label:"客户",p:"right-[15%] bottom-[6%]"},{label:"搜索",p:"left-[20%] bottom-[5%]"},{label:"社媒",p:"left-[-1%] top-[55%]"}].map((node) => <div key={node.label} className={`absolute ${node.p} rounded-full border border-white/12 bg-[#0d2233]/90 px-3 py-1.5 font-mono text-[10px] tracking-[.12em] text-white/55 backdrop-blur`}>{node.label}</div>)}
    <div className="absolute left-1/2 top-1/2 flex size-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[var(--brand)]/35 bg-[#0b1e2b] shadow-[0_0_100px_rgba(39,211,226,.18),0_0_140px_rgba(53,109,255,.12)]">
      <span className="font-display text-3xl font-semibold tracking-[-.04em] text-white">AI Global</span><span className="mt-2 font-mono text-[9px] tracking-[.2em] text-[var(--brand)]">GROWTH NODE</span>
    </div>
    <span className="absolute left-[48%] top-[2%] font-mono text-[9px] tracking-[.18em] text-white/30">GLOBAL / 01</span><span className="absolute bottom-[2%] right-[44%] font-mono text-[9px] tracking-[.18em] text-white/30">COMMERCE / AI</span>
  </div>;
}
