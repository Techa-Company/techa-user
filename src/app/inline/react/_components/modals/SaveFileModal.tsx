import axios from "axios";
import React, { FormEvent, useState } from "react";
import LoadingSpinner from "../widgets/LoadingSpinner";
import { useAuth } from "@/app/assets/components/contexts/AuthContext";
import { useParams } from "next/navigation";
import {
  SaveReactTemplate,
  UpdateReactTempate,
} from "@/app/assets/api/handlers/InlineReactHandler";
import useTabsStore from "../stores/tabSlice";
import useModalStore from "../stores/modalSlice";
import useComponentStore from "../stores/componentSlice";
import DirectoryTree from "./directorytree/DirectoryTree";
interface SaveFileModalProps {
  id?: number;
  code: string;
  name: string;
}
const SaveFileModal: React.FC<SaveFileModalProps> = ({ code, name, id }) => {
  const { isAdmin } = useAuth();
  const { currentTab } = useTabsStore();
  const { addComponent } = useComponentStore();
  const { setModalVisibility } = useModalStore();
  const setVisibility = (visible: boolean) =>
    setModalVisibility("isSaveModalVisible", visible);
  const { reactId: tutorialId } = useParams();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState(name);
  const [fileId, setFileId] = useState(tutorialId);
  const [directoryId, setDirectoryId] = useState(0);
  const [componentType, setComponentType] = useState("usercomponent"); // Default value
  const [isOverWrite, setOverWrite] = useState(false);
  // Function to check if a string is a valid JSX component file name
  const isValidJSXFileName = (str: string) =>
    /^[A-Z][A-Za-z0-9]*\.jsx$/.test(str);
  const modifiedCodeWithoutImports = code.replace(/import .* from '.*';/g, "");

  // Replace the export statement with the fileName without the file extension
  const modifiedCode = modifiedCodeWithoutImports.replace(
    /export default /,
    ""
  );
  const onConfirmHandler = () => {
    setError("");
    if (!isValidJSXFileName(fileName)) {
      setError("Invalid JSX component file name");
      return;
    }
    console.log(id);
    if (id) {
      onConfirmOverwriteHandler();
      return;
    }
    try {
      // Find and remove import lines

      // Check if fileName is a valid JSX component file name

      setIsLoading(true);

      SaveReactTemplate({
        IsMain: false,
        Script: code,
        DirectoryId: directoryId,
        Title: fileName,
        RelatedTemplates: [],
      })
        .then((res) => {
          console.log(res);
          if (res.data.IsSuccess) {
            addComponent(res.data.Data);
          } //setVisibility(false);
          else {
            if (res.data.StatusCode == 2) {
              setError(res.data.Message);
              if (res.status == 409) setOverWrite(true);
            }
          }
        })
        .catch((req) => {
          if (req.response.status == 409) {
            // Boro be Overwrite Confirm
            setOverWrite(true);
          } else {
            console.log("Error: ", req);
            setError("Error: " + req);
          }
        })
        .finally(() => {
          setIsLoading(false);
          setVisibility(false);
        });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const onConfirmOverwriteHandler = () => {
    setError("");
    try {
      if (id) {
        setIsLoading(true);
        UpdateReactTempate({ Script: code, Id: id, Title: fileName })
          .then((res) => {
            if (res.data.IsSuccess) setVisibility(false);
          })
          .catch((req) => {
            console.log("Error: ", req);
            setError("Error: " + req);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const onCloseHandler = (event: FormEvent, reset = false) => {
    if (reset) {
      setIsLoading(false);
      setOverWrite(false);
    }
    setVisibility(false);
  };
  return (
    <div className="fixed w-screen h-screen z-50 flex items-center justify-center text-center text-white">
      <div
        className="fixed w-screen h-screen bg-gray-800/50"
        onClick={onCloseHandler}
      />
      {!isOverWrite ? (
        <div className="bg-[#1f1f1f] border border-black rounded-md p-2 flex flex-col z-[51]">
          <h2>آیا از انتخاب خود مطمعنید؟</h2>
          {isAdmin && (
            <div className="flex items-center text-center mt-4" dir="rtl">
              <label className="px-1">نوع کامپوننت:</label>
              <div className="flex items-center">
                <label className="px-1">
                  <input
                    type="radio"
                    value="tutorial"
                    checked={componentType === "tutorialcomponent"}
                    onChange={() => setComponentType("tutorialcomponent")}
                    className="form-radio"
                  />
                  Tutorial
                </label>
                <label className="px-1">
                  <input
                    type="radio"
                    value="user"
                    checked={componentType === "usercomponent"}
                    className="form-radio"
                  />
                  User
                </label>
              </div>
            </div>
          )}

          {/*componentType === "tutorialcomponent" ? <IdInput /> : <NameInput />*/}

          <div
            className={`flex items-center text-center mt-4 ${
              componentType != "usercomponent" && "hidden"
            }`}
            dir="rtl"
          >
            <label className="px-1">نام فایل:</label>
            <input
              type="text"
              className="shadow-md rounded-md py-1 px-2.5 text-black mx-2"
              placeholder="Text.jsx"
              dir="ltr"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
          <div className="flex mt-2 pt-1 pb-4 flex-col bg-cyan-700/20 rounded-md">
            <label className=" pb-0.5">انتخاب مسیر</label>
            <DirectoryTree
              onSelectDirectory={(directory_id) => {
                setDirectoryId(directory_id);
                console.log(directory_id);
              }}
            />
          </div>
          <div
            className={`flex items-center text-center mt-4 ${
              componentType != "tutorialcomponent" && "hidden"
            }`}
            dir="rtl"
          >
            <label className="px-1">آیدی کامپوننت:</label>
            <input
              type="number"
              className="shadow-md rounded-md py-1 px-2.5 text-black mx-2 "
              placeholder="123"
              value={fileId}
              onChange={(e) => setFileId(e.target.value)}
            />
          </div>
          <span className="text-red-600">{error}</span>

          <button
            type="button"
            className="hover:bg-cyan-950 shadow-md rounded-md mt-3 mx-1.5 border border-cyan-600 p-2 disabled:opacity-60"
            onClick={onConfirmHandler}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : "ذخیره"}
          </button>
          <h3 className="mt-2"></h3>
        </div>
      ) : (
        <div className="bg-[#1f1f1f] border border-black  p-2 flex flex-col z-[51]">
          <h2 dir="rtl">{`این فایل با ${
            componentType == "usercomponent"
              ? `نام ${fileName}`
              : `آیدی ${fileId}`
          } وجود دارد.`}</h2>
          <span className="text-red-600">{error}</span>
          <button
            type="button"
            className="hover:bg-cyan-950 shadow-md rounded-md mt-3 mx-1.5 border border-cyan-600 p-2 disabled:opacity-60"
            onClick={onConfirmOverwriteHandler}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : "جایگذاری"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SaveFileModal;
