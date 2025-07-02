export const PROJECT_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec purus mi, interdum nec odio et, rhoncus ornare risus. In molestie turpis a commodo lobortis. Suspendisse tristique nibh eros, ut semper lacus volutpat eu. Quisque varius mauris vel est ullamcorper pellentesque. Fusce vel arcu mi. Etiam ornare venenatis ligula, eget pretium magna mattis ac. Nam pellentesque hendrerit malesuada. In eu odio convallis, gravida magna vitae, rhoncus erat.';

export function GET_DEFAULT_PROJECT_LIST() {
    return (
        [
            {
                Project: {
                    ProjectId: 1,
                    ProjectNumber: '0235',
                    UserId: 1,
                    ProjectTitle: 'Nexus Banking',
                    DevTypeId: 1,
                    PrimaryLanguageId: 1,
                    SecondaryLanguageId: null,
                    DatabaseTechnologyId: 2,
                    ApplicationIndustryId: 3,
                    GitHubUrl: 'https://github.com/CSODS/CSODS.git'
                },
                ProjectFrameworks: [
                    {
                    ProjectId: 1,
                    FrameworkId: 1
                    }
                ]
            },
            {
                Project: {
                    ProjectId: 2,
                    ProjectNumber: '0476',
                    UserId: 1,
                    ProjectTitle: 'Death Note',
                    DevTypeId: 3,
                    PrimaryLanguageId: 5,
                    SecondaryLanguageId: 3,
                    DatabaseTechnologyId: 5,
                    ApplicationIndustryId: 2,
                    GitHubUrl: 'https://github.com/CSODS/CSODS.git'
                },
                ProjectFrameworks: [
                    {
                    ProjectId: 1,
                    FrameworkId: 6
                    }
                ]
            }
        ]
    )
}

export const PROJECT_LIST = (
    [
        {
            Project: {
                ProjectId: 1,
                ProjectNumber: '0235',
                UserId: 1,
                ProjectTitle: 'Nexus Banking',
                DevTypeId: 1,
                PrimaryLanguageId: 1,
                SecondaryLanguageId: null,
                DatabaseTechnologyId: 2,
                ApplicationIndustryId: 3,
                GitHubUrl: 'https://github.com/CSODS/CSODS.git'
            },
            ProjectFrameworks: [
                {
                ProjectId: 1,
                FrameworkId: 1
                }
            ]
        },
        {
            Project: {
                ProjectId: 2,
                ProjectNumber: '0476',
                UserId: 1,
                ProjectTitle: 'Death Note',
                DevTypeId: 3,
                PrimaryLanguageId: 5,
                SecondaryLanguageId: 3,
                DatabaseTechnologyId: 5,
                ApplicationIndustryId: 2,
                GitHubUrl: 'https://github.com/CSODS/CSODS.git'
            },
            ProjectFrameworks: [
                {
                ProjectId: 1,
                FrameworkId: 6
                }
            ]
        }
    ]
)

export const DEFAULT_PROJECT = {
    Project: {
        ProjectId: 1,
        ProjectNumber: '0235',
        UserId: 1,
        ProjectTitle: 'Nexus Banking',
        DevTypeId: 1,
        PrimaryLanguageId: 1,
        SecondaryLanguageId: null,
        DatabaseTechnologyId: 2,
        ApplicationIndustryId: 3,
        GitHubUrl: 'https://github.com/CSODS/CSODS.git'
    },
    ProjectFrameworks: [
        {
        ProjectId: 1,
        FrameworkId: 1
        }
    ]
}

export const DEFAULT_USER = {
    Name: 'Project Owner',
    Email: 'projectowner@gmail.com'
}

export const TAGS = {
    DevTypes: [],
    ProgrammingLanguages: [],
    Frameworks: [],
    DatabaseTechnologies: [],
    ApplicationIndustries: []
}