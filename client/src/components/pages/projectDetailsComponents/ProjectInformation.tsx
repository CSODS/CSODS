import { IProjectTags } from "../../../viewModels/csods/csodsApiInterfaces";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AllTagsContext, ProjectContext, UserContext } from "../ProjectDetails";
import { ICONS } from "../../../constants/project_data/tags";
import { ProjectDataService } from "../../../utils/data/ProjectDataService";
import { PROJECT_DESCRIPTION } from "../../../constants/defaults";

const DevIconContext = createContext<string>('');
const ProjectTagsContext = createContext<IProjectTags | undefined>(undefined);

export default function ProjectInformationCard() {
    const project = useContext(ProjectContext);
    const allTags = useContext(AllTagsContext);

    const projectDataService = useMemo(() => {
        return new ProjectDataService(allTags)
    }, [allTags]);

    const projectTags = useMemo(() => {
        return projectDataService.getProjectTagValues(project)
    }, [project, projectDataService]);

    const [devTypeIcon, setDevTypeIcon] = useState<string>('');

    useEffect(() => {
        const loadIcon = () => {
            if (projectTags) {  
                type DevType = keyof typeof ICONS;
                const iconKey = projectTags.DevType as DevType;
                setDevTypeIcon(ICONS[iconKey]);
            }
        }
        loadIcon();
    }, [projectTags]);

    return (
        <DevIconContext.Provider value={devTypeIcon}>
            <div className="p-3 py-4 card project-card-dark-4 translucent-70 border-light-1 rounded-3 align-items-center justify-content-center">
                <Header/>
                <SubHeader/>
                <Description/>
                <ProjectTagsContext.Provider value={projectTags}>
                    <Tags/>
                </ProjectTagsContext.Provider>
                <GitHubStatistics/>
            </div>
        </DevIconContext.Provider>
    );
}

//#region Header

function Header() {
    return (
        <div className="px-2 w-100 row row-cols-2">
            <div className="col-9">
                <ProjectTitle/>
            </div>
            <div className="col-3 d-flex align-items-center justify-content-end">
                <ProjectStatus Status="Ongoing"/>
            </div>
        </div>
    );
}

function ProjectTitle() {
    const project = useContext(ProjectContext);
    const icon = useContext(DevIconContext);

    return (
        <div className="d-flex flex-row justify-content-start align-items-center">
            <div className="me-2 pb-1">
                <i className={`${icon} color-light-2 fs-1`}></i>
            </div>
            <h5 className="ms-2 card-title text-start fs-1 color-light-2 bolder">
                {project.Project.ProjectTitle}
            </h5>
        </div>
    );
}

interface ProjectStatusProps {
    Status: string
};

function ProjectStatus({
    Status
}: ProjectStatusProps) {
    return (
        <div className="d-flex flex-row justify-content-center align-items-center">
            <div className="btn bg-dark-2 translucent-30 color-util-alert border-light-1 rounded-pill">
                <div className="p-0 d-flex flex-row justify-content-center align-items-center">
                    <i className="col m-0 bi bi-dash-circle-fill"></i>
                    <p className="col ms-4 my-0">{Status}</p>
                </div>
            </div>
        </div>
    )
}

//#endregion Header

function SubHeader() {
    const user = useContext(UserContext);

    return (
        <div className="px-2 mt-1 mb-0 row w-100">
            <div className="col-12">
                <div className="row py-0 d-flex align-items-start justify-content-start">
                    <p className="col my-0">
                        <p className="my-0 fs-5 text-start">{user.Name}</p>
                    </p>
                    <p className="col my-0">
                        <p className="my-0 fs-5 text-end">Uploaded: January 1, 1001</p>
                    </p>
                </div>
                <div className="row py-0 d-flex align-items-start justify-content-start">
                    <div className="my-0">
                        <p className="my-0 pb-2 fs-5 border-2 border-bottom text-start color-light-3">
                            {user.Email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Description() {
    const project = useContext(ProjectContext);

    return(
        <div className="px-2 mt-2 mb-0 row w-100">
            <p className="my-0 fs-6 text-start">
                {PROJECT_DESCRIPTION}
            </p>
        </div>
    );
}

function Tags() {
    const projectTags = useContext(ProjectTagsContext);

    if (!projectTags)
        return <div></div>;

    const tagValues = Object.values(projectTags);
    return(
        <div className="px-2 mt-2 row w-100">
            <div className="col d-flex flex-wrap align-items-start">
                {
                    tagValues.map((tag, index) => {
                        if (typeof tag === 'string') {
                            return (
                            <div key={`tag-${index}`} className='mt-1 py-1 px-3 ms-0 me-2 bg-dark-1 btn btn-dark-3 rounded-pill fs-xs'>
                                {tag}
                            </div>
                            )
                        }
                        else if (Array.isArray(tag)) {
                            return (
                            tag.map((subTag, subIndex) => {
                                return subTag ? (
                                    <div key={`tag-${subIndex}`} className='mt-1 py-1 px-3 ms-0 me-2 bg-dark-1 btn btn-dark-3 rounded-pill fs-xs'>
                                    {subTag}  
                                    </div>
                                ) : <div/>
                            }))
                        }
                        else {
                            return <div></div>;
                        }
                    })
                }
            </div>
        </div>
    )
}

//#region GitHub Statistics

function GitHubStatistics() {
    const statistics = {
        "Stars": 1024,
        "Forks": 512,
        "Issues": 256,
        "Contributors": 3
    };

    return (
        <div className="px-2 mt-4 mb-4 row w-100">
            <div className="col bg-dark-1 translucent-40 border-0 rounded-3">
                <StatisticsTable Statistics={statistics}/>
            </div>
        </div>
    );
}

interface StatisticTableProps {
    Statistics: Record<string, number> 
};

function StatisticsTable({
    Statistics
}: StatisticTableProps) {
    return (
        <div className="row row-cols-4 row-gap-4 px-4 py-3">
            {
                Object.entries(Statistics).map((value) => {
                    return <StatisticColumn Name={value[0]} Value={value[1]}/>;
                })
            }
        </div>
    );
}

interface StatisticProps {
    Name: string,
    Value: number
};

function StatisticColumn({
    Name,
    Value
}: StatisticProps) {
    return(
        <div className="col mb-2">
            <div className="row ps-4 fw-bold">
                <p className="mt-0 mb-3 fw-bolder text-start p-0">{Name}</p>
            </div>
            <div className="row ps-4 fw-medium">
                <p className="my-0 text-start p-0 color-light-3">{Value}</p>
            </div>
        </div>
    );
}

//#endregion GitHub Statistics