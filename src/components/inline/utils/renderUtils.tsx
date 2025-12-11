import { createRoot } from "react-dom/client";
import HtmlPreview from "../previews/htmlpreview/HtmlPreview";
import ReactPreview from "../previews/reactpreview/ReactPreview";
import JavaScriptPreview from "../previews/javascriptpreview/JavascriptPreview";
import SQLPreview from "../previews/sql/SQLPreview";

export function findPreviewElements(): HTMLPreElement[] {
  // فقط pre با این کلاس‌ها
  const elements = document.querySelectorAll<HTMLPreElement>(
    "pre.language-jsx, pre.language-sql, pre.language-markup, pre.language-javascript"
  );
  return Array.from(elements);
}
export const renderInlineSnippets = () => {
  const elements = findPreviewElements();

  console.log(`Found ${elements.length} preview elements`);

  elements.forEach((pre) => {
    // اگر از قبل جایگزین شده، ردش کن
    console.log("Ok");
    console.log(pre);
    if (pre.style.display === "none" || pre.closest(".preview-container")) {
      console.log("Ok");
      return;
    }

    const codeElement = pre.querySelector("code");
    console.log(codeElement);
    if (!codeElement) return;

    const code = codeElement.textContent?.trim() || "";
    console.log(code);

    // ساخت کانتینر جایگزین
    const container = document.createElement("div");
    container.className = "preview-container my-4 no-reset max-w-w";

    pre.parentNode?.insertBefore(container, pre);
    pre.style.display = "none";

    const root = createRoot(container);

    if (pre.classList.contains("language-markup")) {
      if (code.includes("<script")) {
        console.log(code.includes("<script"));
        root.render(<JavaScriptPreview code={code} />);
      } else {
        console.log("HHHHHH");
        root.render(<HtmlPreview code={code} />);
      }
    } else if (pre.classList.contains("language-jsx")) {
      root.render(<ReactPreview code={code} />);
    } else if (pre.classList.contains("language-javascript")) {
      root.render(<JavaScriptPreview code={code} />);
    } else if (pre.classList.contains("language-sql")) {
      root.render(<SQLPreview code={code} />);
    }
  });
};
