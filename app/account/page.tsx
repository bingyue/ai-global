import type { Metadata } from "next";
import { AccountPanel } from "@/components/account/account-panel";
import { pageMetadata } from "@/lib/metadata";
export const metadata:Metadata={...pageMetadata("会员账户","AI Global会员账户与收藏。","/account"),robots:{index:false,follow:false}};
export default function AccountPage(){return <section className="bg-[var(--paper)] py-14 md:py-20"><div className="container-main"><AccountPanel/></div></section>}
