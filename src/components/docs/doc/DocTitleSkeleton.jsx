// components/CourseTitleSkeleton.js
"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DocTitleSkeleton = () => {
    return (
        <Skeleton height={36} width={250} />
    );
};

export default DocTitleSkeleton;
