import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function JobDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);

    useEffect(() => {

        fetch(`http://localhost:8085/api/jobs/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Job not found");
                }

                return response.json();
            })
            .then(data => setJob(data))
            .catch(error => {
                console.error(error);
                setJob(null);
            });

    }, [id]);

    if (!job) {
        return <p>Loading job...</p>;
    }

    return (
        <div className="page">

            <h1>{job.title}</h1>

            <p>
                <strong>Company:</strong> {job.company}
            </p>

            <p>
                <strong>Location:</strong> {job.location}
            </p>

            <h3>Description</h3>
            <p>{job.description}</p>

            <h3>Skills</h3>
            <p>{job.skills}</p>

            <button onClick={() => navigate(`/apply/${job.id}`)}>
                Apply Now
            </button>

        </div>
    );
}

export default JobDetails;