"use client";
import React, { FC } from "react";
import useModalStore from "../stores/modalSlice";
import { ExecuteSqlQueryHandler } from "@/app/_assets/_api/_handlers/InlineSqlHandler";
import { STORED_PROCEDURES_WITH_PARAMETERS_QUERY } from "@/app/_assets/_utils/queries";
interface StoredProceduresModalProps {
  onAddClick: (procedure: { name: string }) => void;
}
const StoredProceduresModal: FC<StoredProceduresModalProps> = ({
  onAddClick,
}) => {
  const procedures: { name: string }[] = [];

  const { setModalVisibility } = useModalStore();
  const setVisibility = (visible: boolean) =>
    setModalVisibility("isSPModalVisible", visible);

  const fetchData = async () => {
    const result = await ExecuteSqlQueryHandler(
      STORED_PROCEDURES_WITH_PARAMETERS_QUERY
    );
    console.log(result, "stored procedures");
    /*const resultData = parsedData<ProcedureParameter[]>(
       result.data.Data.Dataset
     );
     setData(resultData);*/
  };

  fetchData();

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#1f1f1f] w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Stored Procedures</h2>
        <ul>
          {procedures.map((procedure, index) => (
            <li
              key={index}
              className="flex items-center justify-between border-b py-2"
            >
              <a
                href={`/Tutorial/SQLTest/GetEditSpScript?Name=${procedure.name}`}
                target="_blank"
                className="text-white hover:underline cursor-pointer"
              >
                {procedure.name}
              </a>
              <button
                onClick={() => onAddClick(procedure)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                [ADD]
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <button
            onClick={() => setVisibility(false)} // Handle close action
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoredProceduresModal;
