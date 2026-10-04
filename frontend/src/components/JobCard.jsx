function JobCard({ job, onViewDetails }) {

    return (
        <div className="job-card">

            <h3>{job.title}</h3>

            <p>
                <strong>Company:</strong> {job.company}
            </p>

            <p>
                <strong>Location:</strong> {job.location}
            </p>

            <p>{job.description}</p>

            <p>
                <strong>Skills:</strong> {job.skills}
            </p>

            <button onClick={() => onViewDetails(job)}>
                View Details
            </button>

        </div>
    );
}

export default JobCard;