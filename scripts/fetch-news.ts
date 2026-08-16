import { fetchNewsPipeline } from "../lib/news-pipeline";

async function main() {
  const result = await fetchNewsPipeline();
  console.log(JSON.stringify(result, null, 2));
  if (result.errors.length) process.exitCode = 2;
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
