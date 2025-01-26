import ReactDOM from "react-dom";
import HtmlPreview from "../previews/htmlpreview/HtmlPreview";
import ReactPreview from "../previews/reactpreview/ReactPreview";
import JavaScriptPreview from "../previews/javascriptpreview/JavascriptPreview";

/**
 * Finds all elements with a data-reactId or data-htmlId attribute.
 * Returns these elements as an array.
 */
export function findPreviewElements() {
  const elements = document.querySelectorAll(
    `[data-reactId], [data-htmlId], [data-javascriptId]`
  );
  return Array.from(elements);
}

/**
 * Renders the appropriate preview component based on the data attribute present on the element.
 * - If the element has data-htmlId, it renders HtmlPreview.
 * - If the element has data-reactId, it renders ReactPreview.
 */
export const renderInlineSnippets = () => {
  const elements = findPreviewElements();

  elements.forEach((element) => {
    const htmlId = element.getAttribute("data-htmlId");
    const reactId = element.getAttribute("data-reactId");
    const javascriptId = element.getAttribute("data-javascriptid");

    if (htmlId) {
      const tutorialID = parseInt(htmlId, 10);
      ReactDOM.render(<HtmlPreview tutorialID={tutorialID} />, element);
    } else if (reactId) {
      const tutorialID = parseInt(reactId, 10);
      ReactDOM.render(<ReactPreview tutorialID={tutorialID} />, element);
    } else if (javascriptId) {
      const tutorialID = parseInt(javascriptId, 10);
      ReactDOM.render(<JavaScriptPreview tutorialID={tutorialID} />, element);
    }
  });
};
