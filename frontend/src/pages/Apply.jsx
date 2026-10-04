import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm";

function Apply() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);

    useEffect(() => {

        fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`)
            .then(response => response.json())
            .then(data => setJob(data))
            .catch(error =>
                console.error("Error fetching job:", error)
            );

    }, [id]);

    if (!job) {
        return <p>Loading...</p>;
    }

    return (
        <div className="page">

            <ApplicationForm
                job={job}
                onApplicationSubmitted={() =>
                    navigate("/applications")
                }
            />

        </div>
    );
}

export default Apply;