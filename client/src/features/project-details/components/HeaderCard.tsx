import { createContext, useContext } from "react";
import { BtnPill } from "@/components";
import { useNavigateWithTag, useProjectDetails, useProjectIcon, useProjectTagList, useUser } from "@/hooks";

const DevIconContext = createContext<string>('');

export default function HeaderCard() {
    const projectTagList = useProjectTagList();
    const devTypeIcon = useProjectIcon();

    return (
        <DevIconContext.Provider value={devTypeIcon}>
            <section className="bg-frost-gradient-1 mx-0 px-lg-5 px-sm-4 px-3 pt-sm-4 pb-sm-2 pt-2 pb-1">
                {/* Row 1 */}
                <section className="m-0 row row-cols-sm-2 row-cols-1 d-flex">
                    <Icon/>
                    <TitleAndStatus status="Ongoing"/>
                </section>
                {/* Row 2 */}
                <section className="m-0 mt-1 pb-md-3 pb-2 row border-bottom border-3">
                    <ProjectOwner/>
                </section>
                {/* Tag row */}
                <TagRow tagList={projectTagList}/>
            </section>
        </DevIconContext.Provider>
    )
}

function Icon() {
    const icon = useContext(DevIconContext);

    return (
        <div className="col-sm-auto m-0 p-0 d-flex justify-content-start">
            <i className={`m-0 me-3 p-0 ${icon} fs-1 color-frost-light-azure`}/>
        </div>
    )
}

interface TitleAndStatusProps {
    status: string;
}

function TitleAndStatus({ status }: TitleAndStatusProps) {
    const project = useProjectDetails();

    return (
        <div className="col m-0 p-0 d-flex flex-fill align-items-center">
            <h5 className="col m-0 p-0 text-start fs-1 fw-bold color-frost-light-azure">
                {project.Project.ProjectTitle}
            </h5>
            <div className="col p-0 d-flex justify-content-end align-items-center">
                <div className="m-0 px-2 py-1 bg-frost-midnight translucent-90 color-util-alert border border-0 rounded-3">
                    <div className="m-0 p-0 px-1 d-flex flex-row justify-content-center align-items-center">
                        <i className="col m-0 p-0 bi bi-dash-circle-fill fs-p"></i>
                        <p className="col ms-2 my-0 p-0 fs-p">{status}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


function ProjectOwner() {
    const user = useUser();

    return (
        <div className="col m-0">
            <div className="row">
                <p className="col m-0 p-0 text-start fs-p color-frost-light-azure"> {user.Name} </p>
                <p className="col m-0 p-0 text-end fs-p color-frost-light-azure">Uploaded: January 1, 1001</p>
            </div>
            <div className="row">
                <p className="m-0 p-0 text-start fs-p color-frost-pastel-gray-azure"> {user.Email} </p>
            </div>
        </div>
    )
}

interface TagRowProps {
    tagList: string[];
}

function TagRow({ tagList }: TagRowProps) {
    return (
        <section className="w-100 m-0 my-sm-3 mt-1 mb-2 row">
            <div className="col m-0 p-0 d-flex flex-wrap align-items-start">
                {
                    tagList.map((tag, index) => {
                        const key = `tag-${index}`;
                        return <Tag key={key} tag={tag}/>
                    })
                }
            </div>
        </section>
    )
}

interface TagProps {
    tag: string;
}

function Tag({ tag }: TagProps) {
    const callbackFn = useNavigateWithTag(tag);

    return (
        <BtnPill 
            btnColor='midnight'
            callBackFn={callbackFn}
            hoverBehavior='lighten'
            opacity={100}
            margin={[{t: 1, e: 2}]}
            padding={[{x: 3, y: 1}]}
        >
            <p className="m-0 p-0 fs-small color-frost-light-azure">
                {tag}
            </p>
        </BtnPill>
    )
}
