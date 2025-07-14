import { useProjectDetails } from "@/hooks";
import '../styles/scrollableStyles.module.css';

interface ContributorsProps {
    contributorsRef?: React.Ref<HTMLDivElement | null>;
}

export default function Contributors({ contributorsRef }: ContributorsProps) {
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
        }
    ];

    return (
        <div ref={contributorsRef}>
            <div  className="h-100 px-3 p-2 card card-frost-gradient-1 hover-shadow border-0">
                <div className="row m-0">
                    <h2 className="m-0 pb-1 p-0 border-bottom border-2 border-frost-midnight fw-bold text-start color-frost-midnight">
                        Contributors
                    </h2>
                </div>
                <div className="row m-0 pt-2 row-gap-1 scrollbar-azure overflow-y-auto">
                    {
                        contributors.map(({Name, Email, Roles}, index) => {
                            return <ContributorRow key={`contributor-${index}`} contributorName={Name} contributorEmail={Email} contributorRoles={Roles}/>
                        })
                    }
                </div>
            </div>
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
        <div className="row m-0">
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