import { createContext, useContext } from "react";
import { BtnSelector, ColorSelector, CssSelector, HoverSelector, TranslucentSelector } from "@/types";
import { useProjectDataService, useProjectDetails, useProjectIcon, useUser } from "@/hooks";
import { ICONS, DEFAULTS } from "@/constants";
import { BtnGroup } from "@/components";

const PROJECT_DESCRIPTION = DEFAULTS.PROJECT_DESCRIPTION;

const DevIconContext = createContext<string>('');

export default function ProjectInformationCard() {
    const project = useProjectDetails();
    const projectDataService = useProjectDataService();

    const projectTags = projectDataService.getProjectTagValues(project);
    const projectTagList = projectDataService.getProjectTagList(projectTags);

    const devTypeIcon = useProjectIcon(projectTags.DevType as keyof typeof ICONS);

    return (
        <DevIconContext.Provider value={devTypeIcon}>
            <div className="px-md-3 px-1 py-md-4 py-3 card project-card-dark-4 translucent-70 border-light-1 rounded-3 align-items-center justify-content-center">
                <Header/>
                <SubHeader/>
                <Description/>
                <TagRow tagList={projectTagList}/>
                <GitHubStatistics/>
            </div>
        </DevIconContext.Provider>
    );
}

//#region Header

function Header() {
    return (
        <div className="px-md-2 px-1 w-100 row row-cols-1 row-cols-md-2">
            <div className="col-md-9">
                <ProjectTitle/>
            </div>
            <div className="col-md-3 m-0 d-flex">
                <ProjectStatus Status="Ongoing"/>
            </div>
        </div>
    );
}

function ProjectTitle() {
    const project = useProjectDetails();
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
        <div className="d-flex flex-row flex-fill justify-content-md-end align-items-center">
            <div className="px-3 py-1 bg-dark-2 translucent-30 color-util-alert border border-light-1 rounded-pill">
                <div className="m-0 p-0 d-flex flex-row justify-content-center align-items-center">
                    <i className="col m-0 bi bi-dash-circle-fill"></i>
                    <p className="col ms-4 my-0">{Status}</p>
                </div>
            </div>
        </div>
    )
}

//#endregion Header

function SubHeader() {
    const user = useUser();

    return (
        <div className="px-2 mt-1 mb-0 row w-100">
            <div className="col-12">
                <div className="row py-0 d-md-none d-flex">
                    <div className="col my-0">
                        <p className="my-0 fs-6 text-start">Uploaded: January 1, 1001</p>
                    </div>
                </div>
                <div className="row py-0 d-flex align-items-start justify-content-start">
                    <div className="col my-0">
                        <p className="my-0 fs-6 text-start">{user.Name}</p>
                    </div>
                    <div className="col my-0 d-none d-md-block">
                        <p className="my-0 fs-6 text-end">Uploaded: January 1, 1001</p>
                    </div>
                </div>
                <div className="row py-0 d-flex align-items-start justify-content-start">
                    <div className="my-0">
                        <p className="my-0 pb-2 fs-6 border-2 border-bottom text-start color-light-3">
                            {user.Email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Description() {
    const project = useProjectDetails();

    return(
        <div className="px-2 mt-2 mb-0 row w-100">
            <p className="my-0 fs-6 text-start">
                {PROJECT_DESCRIPTION}
            </p>
        </div>
    );
}

interface TagRowProps {
    tagList: string[];
}

function TagRow({ tagList }: TagRowProps) {
    const btnSelector: BtnSelector = 'btn-dark-3';
    const hoverSelector: HoverSelector = 'hover-lighten';
    const colorSelector: ColorSelector = 'color-light-1';
    const opacitySelector: TranslucentSelector = 'translucent-100';

    const btnSelectors: (CssSelector | string)[] = [
        'mt-1 py-1 px-3 ms-0 me-2 btn rounded-pill fs-xs',
        btnSelector,
        hoverSelector,
        colorSelector,
        opacitySelector
    ];

    const colSelectors = ["ps-3 col d-flex flex-wrap align-items-start"];

    return <BtnGroup TagList={tagList} btnSelectors={btnSelectors} colSelectors={colSelectors}/>
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
        <div className="px-4 py-3 row row-cols-md-4 row-cols-2 row-gap-md-4 row-gap-1">
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
            <div className="row ps-md-4 p-0 fw-bold">
                <p className="m-0 mb-3 p-0 text-start">{Name}</p>
            </div>
            <div className="row ps-md-4 ps-0 fw-medium">
                <p className="m-0 p-0 text-start color-light-3">{Value}</p>
            </div>
        </div>
    );
}

//#endregion GitHub Statistics