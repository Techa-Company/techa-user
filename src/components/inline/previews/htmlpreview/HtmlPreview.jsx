"use client";
import React, { useState, useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Play, Terminal, RefreshCw, Sparkles, Eye, EyeOff, Lock, Unlock } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const HtmlPreview = ({ code: initialCode }) => {
  const [code, setCode] = useState("<div>Loading...</div>");
  const [isEditable, setEditable] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);

  const runCodeInIframe = async () => {
    if (!code.trim()) {
      toast.warning("کدی برای اجرا وجود ندارد");
      return;
    }

    setIsRunning(true);
    setIframeKey((prev) => prev + 1);
    setIsPreviewVisible(true);

    // Use requestAnimationFrame for better timing
    await new Promise((resolve) => requestAnimationFrame(() => resolve()));

    const iframe = iframeRef.current;
    if (!iframe) {
      setIsRunning(false);
      return;
    }

    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) {
        setIsRunning(false);
        return;
      }

      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                margin: 0; 
                padding: 1rem; 
                background: white; 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                min-height: 100vh;
              }
              .error { color: #dc2626; padding: 1rem; background: #fef2f2; border: 1px solid #fecaca; border-radius: 0.5rem; margin: 0.5rem 0; }
            </style>
          </head>
          <body>
            ${code}
          </body>
        </html>
      `);
      iframeDoc.close();

      // Fallback timeout for loading
      setTimeout(() => setIsRunning(false), 1000);
    } catch (error) {
      console.error("Error running code:", error);
      setIsRunning(false);
      toast.error("خطا در اجرای کد");
    }
  };

  const handleAIModification = async () => {
    if (!code.trim()) {
      toast.warning("کدی برای بهبود وجود ندارد");
      return;
    }

    setIsAILoading(true);
    try {
      const response = await fetch(
        `https://pool.techa.me/api/Modification/html?prompt=${encodeURIComponent(code)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.IsSuccess && data.Data) {
        setCode(data.Data);
        toast.success("کد با موفقیت توسط هوش مصنوعی بهبود یافت");
      } else {
        toast.error(data.Message || "خطا در ویرایش کد توسط هوش مصنوعی");
      }
    } catch (error) {
      console.error("AI Modification error:", error);
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setIsAILoading(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode || "<div>Loading...</div>");
    toast.info("کد بازنشانی شد");
  };

  return (
    <div
      className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200"
      dir="ltr"
    >
      <ToastContainer
        position="bottom-left"
        rtl={true}
        theme="light"
        toastClassName="font-sans"
      />

      {/* Header - Light Theme */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between bg-white px-4 py-5 border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-start">
          <button
            onClick={() => setEditable(!isEditable)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors duration-200"
          >
            {isEditable ? (
              <>
                <span className="text-xs font-medium">قفل ویرایش</span>
                <Lock className="w-4 h-4" />
              </>
            ) : (
              <>
                <span className="text-xs font-medium">ویرایش</span>
                <Unlock className="w-4 h-4" />
              </>
            )}
          </button>

          <button
            onClick={handleAIModification}
            disabled={isAILoading}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-200 disabled:opacity-50 shadow-sm"
          >
            <span dir="rtl" className="text-xs font-medium">
              {isAILoading ? "در حال پردازش..." : "بهبود با AI"}
            </span>
            {isAILoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={runCodeInIframe}
            disabled={isRunning}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-500 hover:bg-green-600 text-white transition-colors duration-200 disabled:opacity-50 shadow-sm"
          >
            <span className="text-xs font-medium">اجرا</span>
            {isRunning ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => setIsPreviewVisible(!isPreviewVisible)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 transition-colors duration-200"
          >
            <span className="text-xs font-medium">
              {isPreviewVisible ? "مخفی کردن" : "نمایش"} پیش‌نمایش
            </span>
            {isPreviewVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>

          {/* <button
            onClick={resetCode}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 transition-colors duration-200"
          >
            <span className="text-xs font-medium">بازنشانی</span>
            <RefreshCw className="w-4 h-4" />
          </button> */}
        </div>

        <div className="flex items-center gap-2 mb-2 lg:mb-0">
          <span className="text-gray-800 font-semibold !text-2xl" dir="rtl">
            اجرای برخط HTML
          </span>
          <Terminal className="w-8 h-8 text-green-500" />
        </div>
      </div>

      {/* Editor Section */}
      <div className="p-5">
        <div className="bg-gray-50 rounded-lg border border-gray-300 overflow-hidden">
          <MonacoEditor
            height="300px"
            language="html"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              readOnly: !isEditable,
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              glyphMargin: false,
              folding: true,
              tabSize: 2,
              renderLineHighlight: "all",
              wordWrap: "on",
              lineHeight: 1.5,
              padding: { top: 10, bottom: 10 },
              scrollbar: {
                vertical: 'visible',
                horizontal: 'visible'
              }
            }}
            theme="vs-light"
            loading={<div className="flex items-center justify-center h-full text-gray-600">در حال بارگذاری ویرایشگر...</div>}
          />
        </div>

        {/* Editor Status Bar */}
        <div className="flex justify-between items-center mt-2 px-2 text-xs text-gray-500">
          <span>HTML</span>
          <span>{isEditable ? "حالت ویرایش" : "حالت مشاهده"}</span>
        </div>
      </div>

      {/* Preview Section */}
      {isPreviewVisible && (
        <div className="bg-white mx-4 mb-4 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
          <div dir="rtl" className="p-5 bg-gray-50 border-b border-gray-300 flex justify-between items-center">
            <span className="text-2xl font-medium text-gray-700">
              پیش‌نمایش زنده
            </span>
            {isRunning && (
              <div className="flex items-center gap-1 text-xs text-blue-600">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>در حال بارگذاری...</span>
              </div>
            )}
          </div>
          <div className="h-96 relative bg-white">
            <iframe
              key={iframeKey}
              ref={iframeRef}
              title="HTML Preview Output"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HtmlPreview;