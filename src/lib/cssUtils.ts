/**
 * DOMから指定したCSSカスタムプロパティの値を取得する
 * @param propertyName --から始まるカスタムプロパティ名 (例: --menu-gap)
 * @returns 取得した値 (例: "0.75rem")
 */
export function getCssVariable(propertyName: string): string | null {
  if (typeof window === 'undefined') {
    return null; // サーバーサイドレンダリング(SSR)時はCSSがhtmlに反映されないのでnullを返す
  }
  return getComputedStyle(document.documentElement).getPropertyValue(propertyName).trim();
}