import { normalizeText } from '../utils/text';

export type PrefixRule = string | string[];

export interface BucketPrefixRules {
  bucketId: string;
  rules: PrefixRule[];
}

export function textMatchesPrefixRule(normalizedText: string, rule: PrefixRule): boolean {
  if (typeof rule === 'string') {
    return normalizedText.includes(normalizeText(rule));
  }

  // Combination rule: every part must appear somewhere in the text.
  return rule.every((part) => normalizedText.includes(normalizeText(part)));
}

export function resolveBucketsByPrefixRules(
  inputText: string,
  bucketRules: BucketPrefixRules[]
): string[] {
  const normalizedText = normalizeText(inputText);
  const buckets: string[] = [];

  for (const { bucketId, rules } of bucketRules) {
    if (rules.some((rule) => textMatchesPrefixRule(normalizedText, rule))) {
      buckets.push(bucketId);
    }
  }

  return buckets;
}
