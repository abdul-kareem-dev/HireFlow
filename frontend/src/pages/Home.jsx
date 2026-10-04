import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";

function Home() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        fetch(`${import.meta.env.VITE_API_URL}/api/jobs`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch jobs");
                }

                return response.json();
            })
            .then(data => {
                setJobs(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError("Unable to load jobs.");
                setLoading(false);
            });

    }, []);

    if (loading) {
        return <p className="page">Loading jobs...</p>;
    }

    if (error) {
        return <p className="page">{error}</p>;
    }

    return (
        <div className="page">

            <h1>Available Jobs</h1>

            {jobs.length === 0 ? (
                <p>No jobs available right now.</p>
            ) : (
                <div className="job-list">

                    {jobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onViewDetails={() =>
                                navigate(`/jobs/${job.id}`)
                            }
                        />
                    ))}

                </div>
            )}

        </div>
    );
}

export default Home;