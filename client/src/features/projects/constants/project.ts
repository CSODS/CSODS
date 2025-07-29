export const DEVELOPMENT_TYPES = {
  GAME_DEV: "Game Development",
  WEB_DEV: "Web Development",
  SOFTWARE_DEV: "Software Development",
  API_DEV: "API Development",
} as const;

export const ICONS = {
  [DEVELOPMENT_TYPES.GAME_DEV]: "bi bi-controller",
  [DEVELOPMENT_TYPES.WEB_DEV]: "bi bi-browser-chrome",
  [DEVELOPMENT_TYPES.SOFTWARE_DEV]: "bi bi-code-square",
  [DEVELOPMENT_TYPES.API_DEV]: "bi bi-gear-wide-connected",
} as const;

//  TODO: ADD FRAMEWORKS TO THE QUERY PARAMETERS WHEN THE BACKEND SUPPORTS IT.
export const PROJECT_QUERY_PARAMETERS = {
  PROJECT_TITLE: "project_title",
  DEVELOPMENT_TYPE: "dev_type_id",
  PROGRAMMING_LANGUAGE: "language_id",
  DATABASE_TECHNOLOGY: "database_id",
  APPLICATION_INDUSTRY: "industry_id",
} as const;

export const DEFAULT_PROJECT_IMAGES = [
  "https://placehold.co/1280x720/1a3d63/white?text=img-1",
  "https://placehold.co/1280x720/1a3d63/white?text=img-2",
  "https://placehold.co/1280x720/1a3d63/white?text=img-3",
];

export const DEFAULT_USER = {
  name: "Project Owner",
  email: "projectowner@gmail.com",
};
export const PROJECT_LIST = [
  {
    Project: {
      ProjectId: 1,
      ProjectNumber: "0235",
      UserId: 1,
      ProjectTitle: "Nexus Banking",
      DevTypeId: 1,
      PrimaryLanguageId: 1,
      SecondaryLanguageId: null,
      DatabaseTechnologyId: 2,
      ApplicationIndustryId: 3,
      GitHubUrl: "https://github.com/CSODS/CSODS.git",
    },
    ProjectFrameworks: [
      {
        ProjectId: 1,
        FrameworkId: 1,
      },
    ],
  },
  {
    Project: {
      ProjectId: 2,
      ProjectNumber: "0476",
      UserId: 1,
      ProjectTitle: "Death Note",
      DevTypeId: 3,
      PrimaryLanguageId: 5,
      SecondaryLanguageId: 3,
      DatabaseTechnologyId: 5,
      ApplicationIndustryId: 2,
      GitHubUrl: "https://github.com/CSODS/CSODS.git",
    },
    ProjectFrameworks: [
      {
        ProjectId: 1,
        FrameworkId: 6,
      },
    ],
  },
];

export const DEFAULT_PROJECT = {
  Project: {
    ProjectId: 1,
    ProjectNumber: "0235",
    UserId: 1,
    ProjectTitle: "Nexus Banking",
    DevTypeId: 1,
    PrimaryLanguageId: 1,
    SecondaryLanguageId: null,
    DatabaseTechnologyId: 2,
    ApplicationIndustryId: 3,
    GitHubUrl: "https://github.com/CSODS/CSODS.git",
  },
  ProjectFrameworks: [
    {
      ProjectId: 1,
      FrameworkId: 1,
    },
  ],
};

export const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dictum nunc id placerat malesuada. Nam vitae felis vestibulum, laoreet urna eget, posuere metus. Cras non aliquam ligula. Duis non turpis ac quam molestie venenatis iaculis ut urna. Sed sit amet tempor sapien. Integer dapibus augue ligula. Vestibulum malesuada scelerisque iaculis. Pellentesque a molestie lorem. Quisque non ipsum ligula. Quisque efficitur gravida sem, ut accumsan velit maximus et. Donec in iaculis mauris. Morbi in interdum nisi, eu aliquam quam. Quisque consequat maximus neque, sed vehicula arcu cursus quis. Phasellus placerat laoreet est, sit amet faucibus dolor pellentesque quis. Suspendisse elementum, est in rhoncus viverra, risus odio bibendum neque, nec dictum eros felis pulvinar libero. Interdum et malesuada fames ac ante ipsum primis in faucibus.

Praesent placerat erat ex, sed sodales augue laoreet vel. Sed quis tristique risus. Mauris id ligula eu tortor aliquet faucibus. Vivamus quis suscipit lorem. Mauris tellus nibh, tincidunt eu mollis aliquam, vehicula quis ligula. Etiam ornare ut tortor facilisis luctus. Etiam hendrerit, nisl vitae suscipit interdum, ex lorem hendrerit nunc, ac euismod tellus lorem nec justo. Fusce mollis efficitur nibh, in imperdiet velit aliquet ut.

Donec a urna at nisi pellentesque dignissim et ut elit. Quisque luctus mollis nunc, sit amet suscipit nibh hendrerit in. Nunc finibus pretium purus sed vehicula. Praesent sit amet felis eget lacus accumsan luctus. Pellentesque eget consequat augue. Nam sed mauris id mauris molestie porttitor id vel mi. Nulla facilisi. Sed facilisis iaculis tortor, id congue ante porttitor et. Praesent lacinia consequat nisi vitae convallis. Duis tincidunt convallis diam, sit amet sodales dolor malesuada porttitor. Duis condimentum, tellus eget rhoncus condimentum, massa libero ultrices turpis, in imperdiet risus ipsum ac dui. Praesent quis ultricies tortor.

Integer quis porttitor purus, eget aliquet arcu. Vivamus sit amet aliquam ligula. Phasellus pulvinar tortor massa, in gravida augue bibendum non. Aliquam tristique, lorem ac imperdiet hendrerit, odio ex pharetra metus, vitae egestas mauris sapien in tellus. Curabitur eget imperdiet elit. Nunc eget tincidunt enim. Aenean commodo velit ut leo luctus, a condimentum tortor finibus. Donec consequat, purus ut sagittis condimentum, lectus ligula ornare nisi, sed auctor ligula massa sed mauris. Sed vehicula nulla augue, eu volutpat eros condimentum eleifend. Praesent orci tortor, vulputate a erat a, imperdiet convallis arcu.

Donec consequat at ipsum id tincidunt. In tristique purus turpis. Maecenas convallis rhoncus felis, sed fringilla dolor pharetra vitae. Suspendisse ac purus tortor. Aenean elementum vehicula ligula sed pellentesque. Nunc ut odio sit amet leo varius porta ut vel felis. Morbi est elit, efficitur at gravida id, malesuada non sem. Cras nec finibus ante. Sed sit amet erat at mauris consectetur ultrices ut a metus. Quisque vehicula, odio ut eleifend congue, dolor nisi euismod ante, ac viverra urna turpis quis felis. Sed erat justo, faucibus ac consectetur at, pretium nec neque. Phasellus ac est mollis, ultricies ipsum ut, vehicula libero. Mauris viverra a nunc a commodo. Integer ac nisi in ipsum fermentum tempus. Integer auctor orci quis volutpat porta.`;

export const PROJECT_DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec purus mi, interdum nec odio et, rhoncus ornare risus. In molestie turpis a commodo lobortis. Suspendisse tristique nibh eros, ut semper lacus volutpat eu. Quisque varius mauris vel est ullamcorper pellentesque. Fusce vel arcu mi. Etiam ornare venenatis ligula, eget pretium magna mattis ac. Nam pellentesque hendrerit malesuada. In eu odio convallis, gravida magna vitae, rhoncus erat.";
