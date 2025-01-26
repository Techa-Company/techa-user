"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi"; // Importing trash icon from react-icons
import useModalStore from "../stores/modalSlice";
import usePageDataStore from "../stores/pageDataSlice";
import { useQueryState } from "nuqs";
import { StudentDatabaseDisplayDto } from "@/app/_assets/_api/_types/_dtos/InlineSqlDtos";
import {
  DeleteStudentDatabaseApiHandler,
  GetStudentDatabasesByFilter,
  SaveStudentDatabaseApiHandler,
} from "@/app/_assets/_api/_handlers/InlineSqlHandler";
import { useAuth } from "@/app/_assets/_components/contexts/AuthContext";
import { UpdateProjectApiHandler } from "@/app/_assets/_api/_handlers/InlineReactHandler";
import { ProjectUpdateDTO } from "@/app/_assets/_api/_types/_dtos/InlineReactDtos";

const ChooseDatabaseModal = () => {
  const { isChooseDatabaseModalVisible: isOpen, setModalVisibility } =
    useModalStore();
  const setVisibility = (visibility: boolean) =>
    setModalVisibility("isChooseDatabaseModalVisible", visibility);
  const { user } = useAuth();
  const { projects } = usePageDataStore();
  const [projectId, setProjectId] = useQueryState("project");
  const currentProject = projectId
    ? projects.find((x) => x.Id == parseInt(projectId))
    : null;

  const [studentDatabases, setStudentDatabases] = useState<
    StudentDatabaseDisplayDto[]
  >([]);
  const [dbName, setDbName] = useState<string>("");
  const [selectedDb, setSelectedDb] = useState<number | null>(null);

  const handleAddDatabase = async () => {
    if (!dbName) {
      alert("Database name is required.");
      return;
    }

    try {
      if (!user?.Id) return;
      const newDatabase = await SaveStudentDatabaseApiHandler({
        DbName: dbName,
        StudentId: user.Id, // Replace this with your dynamic student ID.
      });
      if (newDatabase.IsSuccess) {
        alert("Database added successfully!");
        setStudentDatabases((prevData) => [...prevData, newDatabase.Data]);
        setDbName("");
      }
    } catch (error) {
      console.error("Error adding database:", error);
    }
  };
  const handleChooseDatabase = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value);
    console.log("kkk");
    setSelectedDb(selectedId);
    const response = await UpdateProjectApiHandler({
      ...(currentProject as ProjectUpdateDTO),
      StudentDBId: selectedId,
    });

    if (response.data.IsSuccess) {
      alert("Selected Database has Changed Successfully!");
    }
  };
  const handleDeleteDatabase = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this database?")) {
      try {
        await DeleteStudentDatabaseApiHandler(id);
        setStudentDatabases(studentDatabases.filter((db) => db.Id !== id));
      } catch (error) {
        console.error("Error deleting database:", error);
      }
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedDb(0);
      setDbName("");
    }
    if (isOpen) {
      if (currentProject && currentProject.StudentDBId) {
        setSelectedDb(currentProject.StudentDBId);
      }
      const fetchStudentDatabases = async () => {
        try {
          const response = await GetStudentDatabasesByFilter({
            StudentId: user?.Id,
          });
          if (response.data.IsSuccess) {
            const obj = response.data.Data as StudentDatabaseDisplayDto[];
            setStudentDatabases(obj);
            console.log(currentProject, "curent projec");
            if (currentProject && currentProject.StudentDBId) {
              setSelectedDb(currentProject.StudentDBId);
            }
          }
        } catch (error) {
          console.error("Error fetching student databases:", error);
        }
      };

      fetchStudentDatabases();
    }
  }, [isOpen]);

  return (
    <div
      className={`w-full ${
        isOpen ? "md:right-8" : "max-md:right-full md:-right-80"
      } transition-all fixed z-[48] md:max-w-80 rounded-md border border-blue-700 py-4 px-4 bg-blue-100 text-blue-900`}
    >
      {/* Choose Student Database */}
      <div className="mb-4">
        <label htmlFor="database-select" className="block mb-2 font-medium">
          Select a Database
        </label>
        <select
          id="database-select"
          value={selectedDb || ""}
          onChange={handleChooseDatabase}
          className="w-full mb-2 px-2 py-1 border rounded"
        >
          <option value={"0"}>Choose a database</option>
          {studentDatabases.map((db) => (
            <option key={db.Id} value={db.Id}>
              {db.DbName}
            </option>
          ))}
        </select>
      </div>
      {/* List Student Databases */}
      <ul className="space-y-3 mb-4">
        {studentDatabases.map((db) => (
          <li
            key={db.Id}
            className="flex rounded truncate border-blue-400 border justify-between items-center p-2 border-b"
          >
            <div className="text-wrap w-full">
              <div className="flex justify-between">
                <p className="font-medium">{db.DbName}</p>
                <button
                  onClick={() => handleDeleteDatabase(db.Id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FiTrash size={18} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Add Student Database Form */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter database name"
          value={dbName}
          onChange={(e) => setDbName(e.target.value)}
          className="w-full mb-2 px-2 py-1 border rounded"
        />
        <button
          onClick={handleAddDatabase}
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-full"
        >
          Add Database
        </button>
      </div>

      {/* Red Close Button */}
      <button
        onClick={() => setVisibility(false)}
        disabled={!studentDatabases.length || selectedDb == 0}
        className={`w-full py-2 px-4 rounded font-bold text-white bg-red-600 
     disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-red-800
  `}
      >
        Close
      </button>
    </div>
  );
};

export default ChooseDatabaseModal;
