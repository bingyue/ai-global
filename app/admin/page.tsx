import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getServerSupabase } from "@/lib/supabase/server";
import { pageMetadata } from "@/lib/metadata";
export const metadata:Metadata={...pageMetadata("管理后台","AI Global内容与增长运营后台。","/admin"),robots:{index:false,follow:false}};
export const dynamic = "force-dynamic";
export default async function AdminPage(){const supabase=await getServerSupabase();if(!supabase)redirect("/login?next=/admin&error=unavailable");const {data:{user}}=await supabase.auth.getUser();if(!user)redirect("/login?next=/admin");const {data:profile}=await supabase.from("profiles").select("role").eq("id",user.id).single();if(!profile||!["admin","editor"].includes(String(profile.role)))redirect("/account");return <AdminDashboard/>}
