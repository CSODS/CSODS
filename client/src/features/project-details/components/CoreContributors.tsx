import { useProjectDetails } from "@/hooks";

export default function Contributors() {
    const project = useProjectDetails();
    const githubLink = project.Project.GitHubUrl;

    const contributors = [
        {
            Name: "Contributor1",
            Email: "contributor1@gmail.com",
            Roles: ["Fullstack Developer", "Project Manager"]
        },
        {
            Name: "Contributor2",
            Email: "contributor2@gmail.com",
            Roles: ["Backend Developer"]
        },
        {
            Name: "Contributor3",
            Email: "contributor3@gmail.com",
            Roles: ["Frontend Developer"]
        },
    ];

    return (
        <div className="py-xl-4 px-md-2 py-lg-3 py-2 card card-frost-gradient-1 hover-shadow border-0 row-gap-3">
            {
                contributors.map(({Name, Email, Roles}, index) => {
                    return <ContributorRow key={`contributor-${index}`} contributorName={Name} contributorEmail={Email} contributorRoles={Roles}/>
                })
            }
        </div>
    );
}

interface ContributorRowProps {
    contributorName: string;
    contributorEmail: string;
    contributorRoles: string[];
}

function ContributorRow({ contributorName, contributorEmail, contributorRoles }: ContributorRowProps) {
    return (
        <div className="row mx-lg-4 mx-3">
            <div className="col-auto p-0">
                <i className="bi bi-person-circle color-frost-midnight fs-4"/>
            </div>
            <div className="col-5 ms-2 me-auto p-0">
                <p className="m-0 contributor-card-text text-start fw-bold color-frost-light-azure">
                    {contributorName}
                </p>
                <p className="m-0 fs-small text-start color-frost-pastel-gray-azure">
                    {contributorEmail}
                </p>
            </div>
            <div className="col-5 p-0 pe-1">
                {
                    contributorRoles.map((role, index) => {
                        return (
                            <div key={`role-${index}`} className="row">
                                <p className="m-0 contributor-card-text text-start color-frost-light-azure">
                                    {role}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}