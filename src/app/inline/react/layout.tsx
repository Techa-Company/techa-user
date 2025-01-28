"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./[reactId]/stores/store";
import Link from "next/link";
import withAuth from "@/app/assets/components/hoc/withAuth";
import usePageDataStore from "./components/stores/pageDataSlice";
import InlineReactNavbar from "./components/navbar/InlineReactNavbar";
import { useQueryState } from "nuqs";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { error } = usePageDataStore();
  const [isInline, setIsInline] = useQueryState("isInline");
  useEffect(() => {
    // Client-side only code
    if (typeof window !== "undefined") {
      window.MonacoEnvironment = {
        getWorker(moduleId, label) {
          switch (label) {
            case "css":
            case "less":
            case "scss":
              return new Worker(
                new URL(
                  "monaco-editor/esm/vs/language/css/css.worker",
                  import.meta.url
                )
              );
            case "handlebars":
            case "html":
            case "razor":
              return new Worker(
                new URL(
                  "monaco-editor/esm/vs/language/html/html.worker",
                  import.meta.url
                )
              );
            case "json":
              return new Worker(
                new URL(
                  "monaco-editor/esm/vs/language/json/json.worker",
                  import.meta.url
                )
              );
            case "javascript":
            case "typescript":
              return new Worker(
                new URL(
                  "monaco-editor/esm/vs/language/typescript/ts.worker",
                  import.meta.url
                )
              );
            case "tailwindcss":
              return new Worker(
                new URL(
                  "monaco-tailwindcss/tailwindcss.worker",
                  import.meta.url
                )
              );
            default:
              throw new Error(`Unknown label ${label}`);
          }
        },
      };
    }
  }, []);
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        {!isInline && <InlineReactNavbar />}
        {error ? (
          <div className="w-80 h-24 rounded-lg border absolute z-50 left-1/2 bg-white text-red-600 text-wrap p-3 flex flex-col items-center justify-center text-center">
            {error}
            <Link
              href={"/inline/react/personal"}
              replace
              className="px-3 py-1.5 border border-gray-600 my-1.5 hover:bg-cyan-500/10 text-cyan-900 rounded-lg"
            >
              ورود به محیط اجرای برخط شخصی
            </Link>
          </div>
        ) : (
          <div className="w-full h-full bg-[#181818]">{children}</div>
        )}
      </DndProvider>
    </Provider>
  );
};

export default withAuth(Layout, ["Student"]);
