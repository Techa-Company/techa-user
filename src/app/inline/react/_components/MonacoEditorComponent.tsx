"use client";
import {
  Monaco,
  MonacoDiffEditor,
  Editor as MonacoEditor,
} from "@monaco-editor/react";
import { useEffect, useState, useCallback, useRef } from "react";
import {
  configureMonacoTailwindcss,
  tailwindcssData,
} from "monaco-tailwindcss";
import useTabStore from "./stores/tabSlice";
import useComponentStore from "./stores/componentSlice";
import * as monaco from "monaco-editor"; // Ensure monaco-editor is installed and correctly imported

interface MonacoEditorComponentProps {
  code: string;
  setCode: (code: string) => void;
}

const MonacoEditorComponent: React.FC<MonacoEditorComponentProps> = ({
  code,
  setCode,
}) => {
  const { createTab, setActiveTabName } = useTabStore();
  const { components } = useComponentStore();
  const [editorInstance, setEditorInstance] = useState<Monaco | null>(null);
  const actionAddedRef = useRef<{ [key: string]: boolean }>({});

  const onMountTailwindInject = (editor: Monaco) => {
    console.log(editor);
    editor.languages.css.cssDefaults.setOptions({
      data: {
        dataProviders: {
          tailwindcssData,
        },
      },
    });

    configureMonacoTailwindcss(editor);

    // Save the editor instance to state
    setEditorInstance(editor);
  };

  const CreateTabAction = useCallback(
    (ed: MonacoDiffEditor) => {
      if (editorInstance) {
        const position = editorInstance.editor.getEditors()[0].getPosition();

        if (position) {
          const model = editorInstance.editor.getEditors()[0].getModel();
          if (model) {
            const wordAtPosition = model.getWordAtPosition(position);
            if (wordAtPosition) {
              const word = model.getValueInRange({
                startLineNumber: position.lineNumber,
                startColumn: wordAtPosition.startColumn,
                endLineNumber: position.lineNumber,
                endColumn: wordAtPosition.endColumn,
              });
              const template = components.find((component) =>
                component.Title.includes(word)
              );
              if (template) {
                createTab({
                  code: template.Script,
                  name: template.Title,
                  id: template.Id,
                });
                setActiveTabName(template.Title);
              }
            }
          }
        }
      }
    },
    [editorInstance, components, createTab, setActiveTabName]
  );

  useEffect(() => {
    if (editorInstance && components.length > 0) {
      // Create or update models for each component and add to Monaco
      components.forEach((component) => {
        // Create a model for the component script
        let model = editorInstance.editor.getModel(
          editorInstance.Uri.parse(`inmemory://model/${component.Title}.js`)
        );

        if (!model) {
          // Model doesn't exist, so create a new one
          model = editorInstance.editor.createModel(
            component.Script,
            "javascript",
            editorInstance.Uri.parse(`inmemory://model/${component.Title}.js`)
          );
        }
        // Add extra lib for the component script
        editorInstance.languages.typescript.javascriptDefaults.addExtraLib(
          component.Script,
          `inmemory://model/${component.Title}.js`
        );
      });

      const ctrlClickAction = {
        id: "ctrlClickAction",
        label: "Go to Definition",
        keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.KeyO], // Change to the desired keybinding
        contextMenuGroupId: "navigation",
        contextMenuOrder: 1.5,
        run: CreateTabAction as any,
      };

      const editComponentAction = {
        id: "edit-component-action",
        label: "Edit Component",
        contextMenuGroupId: "1_modification",
        run: CreateTabAction as any,
      };

      if (!actionAddedRef.current["edit-component-action"]) {
        editorInstance.editor.addEditorAction(editComponentAction);
        actionAddedRef.current["edit-component-action"] = true;
      }

      if (!actionAddedRef.current["ctrlClickAction"]) {
        editorInstance.editor.addEditorAction(ctrlClickAction);
        actionAddedRef.current["ctrlClickAction"] = true;
      }

      // Cleanup the models and extra libs on component unmount
      return () => {
        components.forEach((component) => {
          const modelUri = editorInstance?.Uri.parse(
            `inmemory://model/${component.Title}.js`
          );
          if (modelUri) {
            const model = editorInstance?.editor.getModel(modelUri);
            if (model) {
              model.dispose();
            }
          }

          // Remove extra lib (there is no direct method to remove, so reinitialize the extra libs without this one)
          const extraLibs =
            editorInstance?.languages.typescript.javascriptDefaults.getExtraLibs();
          console.log(extraLibs);
          editorInstance?.languages.typescript.javascriptDefaults.addExtraLib(
            component.Script
          );
        });
      };
    }
  }, [editorInstance, components, CreateTabAction]);

  return (
    <div className={`w-full relative block h-full`}>
      <MonacoEditor
        value={code}
        options={{
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true,
          },
          inlineSuggest: {
            enabled: true,
          },
          contextmenu: true,
        }}
        onChange={(e) => {
          setCode(e as string);
        }}
        beforeMount={onMountTailwindInject}
        language="javascript"
        defaultLanguage="javascript"
        theme="vs-dark"
        className={" h-full"}
      />
    </div>
  );
};

export default MonacoEditorComponent;
