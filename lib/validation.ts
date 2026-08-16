import { z } from "zod";

const optionalText = z.string().trim().max(500).optional().or(z.literal(""));

export const leadSchema = z.object({
  name: z.string().trim().min(2, "请填写姓名").max(50),
  company: z.string().trim().min(2, "请填写公司或项目名称").max(100),
  position: optionalText,
  phone: optionalText,
  wechat: optionalText,
  email: z.email("请输入有效邮箱"),
  website: optionalText,
  service_type: z.string().trim().min(1, "请选择服务方向"),
  budget_range: optionalText,
  start_time: optionalText,
  target_market: z.string().trim().min(1, "请填写目标市场"),
  description: z.string().trim().min(10, "请用至少10个字描述需求").max(2000),
  consent: z.boolean().refine((value) => value, "请确认隐私与联系授权"),
});

export const newsletterSchema = z.object({
  email: z.email("请输入有效邮箱"),
  name: optionalText,
  interest: optionalText,
});

export const reportDownloadSchema = z.object({
  report_slug: z.string().min(1),
  name: z.string().trim().min(2, "请填写姓名"),
  company: z.string().trim().min(2, "请填写公司"),
  position: optionalText,
  phone_or_wechat: z.string().trim().min(3, "请填写手机或微信"),
  email: z.email("请输入有效邮箱"),
  interest: z.string().trim().min(1, "请选择关注方向"),
  consent: z.boolean().refine((value) => value, "请确认隐私与联系授权"),
});

export const simpleApplicationSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.email(),
  company: optionalText,
  type: z.string().trim().min(1),
  message: z.string().trim().min(10).max(2000),
});
