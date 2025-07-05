import { useProjectDetails } from "@/hooks";

export default function CoreContributors() {
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
            <div className="col-10 ps-lg-2 ps-xl-0">
                <p className="row m-0 mt-2 p-0 fs-6 text-start fw-bold">
                    {Name}
                </p>
                <p className="row m-0 p-0 fs-6 text-start color-light-3">
                    {Email}
                </p>
                <RoleView Name={Name} Roles={Roles}/>
            </div>
        </div>
    );
}

interface RoleViewProps {
    Name: string,
    Roles: string[];
};

function RoleView({ Name, Roles }: RoleViewProps) {
    const collapseId=`${Name}-roles`;

    return (
        <div className="row ps-2">
            <button className="row bg-transparent border-0 color-light-1" type='button' data-bs-toggle="collapse" data-bs-target={`#${collapseId}`} aria-expanded="false" aria-controls={collapseId}>
                <div className="col-2">
                    <i className="bi bi-arrow-return-right"></i>
                </div>
                <div className="col-10 p-0">
                    <p className="row m-0 fs-6 text-start">
                        Roles
                    </p>
                </div>
            </button>
            <div className="row collapse" id={collapseId}>
                <div className="col-2"></div>
                <div className="col-10 p-0">
                    {
                        Roles.map((role) => {
                            return (
                                <p className="row m-0 fs-6 fst-italic text-start">
                                    {role}
                                </p>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

interface RowsProps {
    rowContent: string[];
}

function UnorderedList({
    rowContent
}: RowsProps) {
    return (
        <div className="">

        </div>
    )
}