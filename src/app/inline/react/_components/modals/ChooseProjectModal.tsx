"use client";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import useModalStore from "../stores/modalSlice";
import {
  GetProjectsByFilter,
  SaveProjectApiHandler,
} from "@/app/_assets/_api/_handlers/InlineReactHandler"; // Assuming SaveProjectApiHandler is the function to add a project
import { useAuth } from "@/app/_assets/_components/contexts/AuthContext";
import { ProjectDisplayDTO } from "@/app/_assets/_api/_types/_dtos/InlineReactDtos";
import { useQueryState } from "nuqs";

const ChooseProjectModal: React.FC = () => {
  const { user } = useAuth();
  const [projectId, setProjectId] = useQueryState("project");

  const [projects, setProjects] = useState<ProjectDisplayDTO[]>();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  useEffect(() => {
    if (!projects && user) {
      GetProjectsByFilter({ StudentId: user?.Id, GetAllItems: false }).then(
        (res) => {
          if (res.data.IsSuccess) {
            const data: ProjectDisplayDTO[] = res.data.Data;
            setProjects(data);
          }
        }
      );
    }
  }, [user, projects]);

  const handleClose = () => {};

  const handleSelectProject = () => {
    if (selectedProject !== null) {
      setProjectId(selectedProject.toString());
      handleClose();
    }
  };

  const handleAddProject = async () => {
    if (newProjectName.trim()) {
      const response = await SaveProjectApiHandler({
        Title: newProjectName,
        Description: "new project",
        StudentId: user?.Id as number,
      });
      if (response.data.IsSuccess) {
        if (projects != undefined) {
          const newProjects = [...projects, response.data.Data];
          setProjects(newProjects);
          setNewProjectName("");
          setIsAddingProject(false);
          setSelectedProject(response.data.Data.Id);
        }
      }
    }
  };

  if (!true) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-xl text-white mb-4">Choose a Project</h2>
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {projects?.map((project: ProjectDisplayDTO) => (
            <li key={project.Id}>
              <button
                onClick={() => setSelectedProject(project.Id)}
                className={`w-full p-2 rounded ${
                  selectedProject === project.Id ? "bg-blue-600" : "bg-gray-800"
                } text-white`}
              >
                {project.Title}
              </button>
            </li>
          ))}
          {!isAddingProject && (
            <li>
              <button
                onClick={() => setIsAddingProject(true)}
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                + Add Project
              </button>
            </li>
          )}
          {isAddingProject && (
            <li>
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                onBlur={handleAddProject}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddProject();
                  }
                }}
                placeholder="Enter project name"
                className="w-full p-2 rounded bg-gray-800 text-white"
                autoFocus
              />
            </li>
          )}
        </ul>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 mr-2 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none"
            onClick={handleSelectProject}
          >
            Select Project
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ChooseProjectModal;
