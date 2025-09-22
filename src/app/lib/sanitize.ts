import sanitizeHtmlLib from "sanitize-html";

/**
 * サーバー側サニタイズ用ユーティリティ
 * Kuroco から取得した HTML (contents / summary 等) を安全に整形
 */
export function sanitizeHtml(input: string): string {
  if (!input) return "";
  return sanitizeHtmlLib(input, {
    allowedTags: [
      ...sanitizeHtmlLib.defaults.allowedTags,
      "img",
      "h1",
      "h2",
      "h3",
      "h4",
      "pre",
      "code"
    ],
    allowedAttributes: {
      ...sanitizeHtmlLib.defaults.allowedAttributes,
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"]
    },
    // 不要なスキーマを排除し http/https のみ (data URI 画像などを避ける)
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: (tagName, attribs) => {
        return {
          tagName: "a",
            attribs: {
              ...attribs,
              rel: "noopener noreferrer",
              target: attribs.target || "_blank"
            }
        };
      }
    },
    // 空要素連発などを整理
    allowVulnerableTags: false
  });
}
