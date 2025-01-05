
export default async function CourseDetail({ params }) {

    const courseId = (await params).courseId

    return (
        <div className=''>
            <h1>Course Page</h1>
            <p>Course ID: {courseId}</p>
        </div>
    );
};

