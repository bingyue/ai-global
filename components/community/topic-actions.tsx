"use client";

import { useState } from "react";
import { Bookmark, Heart, MessageCircle } from "lucide-react";

export function TopicActions({likes,replies}:{likes:number;replies:number}){const [liked,setLiked]=useState(false);const [saved,setSaved]=useState(false);return <div className="flex gap-2"><button onClick={()=>setLiked(v=>!v)} className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs ${liked?"border-[#efb5b5] bg-[#fff0f0] text-[#b63232]":"border-[var(--line)] text-[var(--muted)]"}`} aria-pressed={liked}><Heart className={`size-3.5 ${liked?"fill-current":""}`}/>{likes+(liked?1:0)}</button><span className="flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3 py-1.5 text-xs text-[var(--muted)]"><MessageCircle className="size-3.5"/>{replies}</span><button onClick={()=>setSaved(v=>!v)} className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs ${saved?"border-[var(--brand)] bg-[var(--brand-wash)] text-[var(--brand-dark)]":"border-[var(--line)] text-[var(--muted)]"}`} aria-pressed={saved}><Bookmark className={`size-3.5 ${saved?"fill-current":""}`}/>{saved?"已收藏":"收藏"}</button></div>}
