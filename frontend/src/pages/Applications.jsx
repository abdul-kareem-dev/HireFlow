import { useEffect, useState } from "react";

function Applications() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const email = "abdul@example.com";

    useEffect(() => {

        fetch(`http://localhost:8085/api/applications/user/${email}`)
            .then(response => response.json())
            .then(data => {
                setApplications(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching applications:", error);
                setLoading(false);
            });

    }, []);

    if (loading) {
        return <p>Loading applications...</p>;
    }

    return (
        <div>

            <h1>My Applications</h1>

            {applications.length === 0 ? (
                <p>You have not applied for any jobs yet.</p>
            ) : (

                applications.map(application => (
                    <div className="application-item" key={application.id}>

                        <h2>{application.job.title}</h2>

                        <p>
                            <strong>Company:</strong>{" "}
                            {application.job.company}
                        </p>

                        <p>
                            <strong>Location:</strong>{" "}
                            {application.job.location}
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            <span className={`status-badge ${application.status.toLowerCase()}`}>
                                {application.status.replace("_", " ")}
                            </span>
                        </p>

                        <p>
                            <strong>Applied:</strong>{" "}
                            {new Date(application.appliedAt).toLocaleString()}
                        </p>

                    </div>
                ))

            )}

        </div>
    );
}

export default Applications;