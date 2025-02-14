import { createRoot } from "react-dom/client";
import HtmlPreview from "../previews/htmlpreview/HtmlPreview";
import ReactPreview from "../previews/reactpreview/ReactPreview";
import JavaScriptPreview from "../previews/javascriptpreview/JavascriptPreview";
import SQLPreview from "../previews/sql/SQLPreview";

type PreviewElement = HTMLElement | HTMLTextAreaElement;

export function findPreviewElements(): PreviewElement[] {
  const elements = document.querySelectorAll<PreviewElement>(
    `[data-reactId], 
     [data-htmlId], 
     [data-javascriptId], 
     textarea.sql-sample`
  );
  return Array.from(elements);
}

export const renderInlineSnippets = () => {
  const elements = findPreviewElements();

  elements.forEach((element) => {
    const container = document.createElement("div");
    container.className = "preview-container";

    if (element instanceof HTMLElement) {
      container.style.cssText = element.style.cssText;
    }

    element.parentNode?.insertBefore(container, element);
    element.style.display = "none";

    const htmlId = element.getAttribute("data-htmlId");
    const reactId = element.getAttribute("data-reactId");
    const javascriptId = element.getAttribute("data-javascriptId");
    const sqlCode =
      element instanceof HTMLTextAreaElement
        ? element.value.trim()
        : element.textContent?.trim() || "";

    const root = createRoot(container);

    if (htmlId) {
      root.render(<HtmlPreview tutorialID={Number(htmlId)} />);
    } else if (reactId) {
      root.render(<ReactPreview tutorialID={Number(reactId)} />);
    } else if (javascriptId) {
      root.render(<JavaScriptPreview tutorialID={Number(javascriptId)} />);
    } else if (sqlCode) {
      root.render(<SQLPreview code={sqlCode} />);
    }
  });
};
