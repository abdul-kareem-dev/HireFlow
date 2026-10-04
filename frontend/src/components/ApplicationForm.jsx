import { useState } from "react";

function ApplicationForm({ job, onApplicationSubmitted }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [resumeUrl, setResumeUrl] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {

        event.preventDefault();

        const application = {
            applicantName: name,
            applicantEmail: email,
            resumeUrl: resumeUrl
        };

        try {

            const response = await fetch(
                `http://localhost:8085/api/applications/job/${job.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(application)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Application failed");
                return;
            }

            setMessage("Application submitted successfully!");

            setName("");
            setEmail("");
            setResumeUrl("");

            if (onApplicationSubmitted) {
                onApplicationSubmitted(data);
            }

        } catch (error) {

            console.error(error);
            setMessage("Unable to connect to the backend.");

        }
    };

    return (
        <div className="application-form">

            <h2>Apply for {job.title}</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                <input
                    type="url"
                    placeholder="Resume URL"
                    value={resumeUrl}
                    onChange={(event) => setResumeUrl(event.target.value)}
                    required
                />

                <button type="submit">
                    Submit Application
                </button>

            </form>

            {message && (
                <p>{message}</p>
            )}

        </div>
    );
}

export default ApplicationForm;