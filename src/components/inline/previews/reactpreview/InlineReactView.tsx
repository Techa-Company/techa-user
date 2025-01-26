"use client";
import React from "react";

interface InlineReactViewProps {
  tutorialID: number;
  setVisibility: (isVisible: boolean) => void;
}

const InlineReactView: React.FC<InlineReactViewProps> = ({
  tutorialID,
  setVisibility,
}) => {
  return (
    <div className="relative bg-white rounded-lg shadow-lg w-full h-[90vh] p-6 mt-4 border border-gray-200">
      {/* Inline Content Header */}
      <h2 className="text-xl font-bold mb-4">React Tutorial {tutorialID}</h2>

      {/* Inline iframe for the interactive tutorial */}
      <iframe
        src={`/inline/react/${tutorialID}?isInline=true`}
        className="w-full h-4/5 rounded-lg"
      />

      {/* Reset Button to return to the initial view */}
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={() => setVisibility(false)}
      >
        &times;
      </button>
    </div>
  );
};

export default InlineReactView;
