import { useContext } from "react";
import { ProjectContext } from "../projectDetailsComponents/ProjectDetailsProvider";

export default function CoreContributors() {
    const project = useContext(ProjectContext);
    const githubLink = project.Project.GitHubUrl;

    const contributors = [
        {
            Name: "Name",
            Email: "contributor@gmail.com",
            Roles: ["Fullstack Developer", "Project Manager"]
        },
        {
            Name: "Name",
            Email: "contributor@gmail.com",
            Roles: ["Backend Developer"]
        },
        {
            Name: "Name",
            Email: "contributor@gmail.com",
            Roles: ["Frontend Developer"]
        },
    ];

    return (
        <div className="p-4 pt-0 d-flex flex-column position-sticky" style={{top: '90px'}}>
            <p className="ms-1 ps-3 mt-0 mb-1 row fs-5 text-start text-decoration-underline">
                Core Contributors
            </p>
            <div className="row">
                {
                    contributors.map((contributor, index) => {
                        const key = index.toString();
                        const name = contributor.Name;
                        const email = contributor.Email;
                        const roles = contributor.Roles;
                        return <ContributorCard Key={key} Name={name} Email={email} Roles={roles}/>
                    })
                }
            </div>
        </div>
    );
}

interface ContributorCardProps {
    Key: string,
    Name: string;
    Email: string;
    Roles: string[];
}

function ContributorCard({
    Key,
    Name,
    Email,
    Roles
}: ContributorCardProps) {
    return (
        <div key={Key} className="p-0 d-flex flex-row justify-content-start align-items-start">
            <div className="col-2 p-0">
                <i className="m-0 bi bi-person-circle fs-1 color-light-1"></i>
            </div>
            <div className="col-10">
                <p className="row m-0 mt-2 p-0 fs-6 text-start fw-bold">
                    {Name}
                </p>
                <p className="row m-0 p-0 fs-6 text-start color-light-3">
                    {Email}
                </p>
                <RoleView Roles={Roles}/>
            </div>
        </div>
    );
}

interface RoleViewProps {
    Roles: string[];
};

function RoleView({ Roles }: RoleViewProps) {
    return (
        <div className="row ps-2">
            <div className="col-1">
                <i className="bi bi-arrow-return-right"></i>
            </div>
            <div className="col-11">
                {
                    Roles.map((role) => {
                        return (
                            <p className="row m-0 fs-6 text-start">
                                {role}
                            </p>
                        )
                    })
                }
            </div>
        </div>
    );
}