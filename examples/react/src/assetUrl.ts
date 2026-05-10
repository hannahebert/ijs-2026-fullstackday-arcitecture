export type AssetType = "product" | "category" | "banner" | "avatar";
export type AssetSize = "sm" | "md" | "lg" | "xl";

const SIZES: Record<AssetSize, number> = {
  sm: 100,
  md: 300,
  lg: 600,
  xl: 1200,
};

export const getAssetUrl = (
  type: AssetType,
  seed: string | number,
  size: AssetSize = "md",
  options: { format?: "jpg" | "webp"; fallback?: string } = {},
): string => {
  const dim = SIZES[size];
  const prefix = type[0];
  const url = `https://picsum.photos/seed/${prefix}-${seed}/${dim}/${dim}`;
  return options.fallback ?? url;
};
