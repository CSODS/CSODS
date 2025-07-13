

export default function GitHubStatistics() {
    const statistics = {
        "Stars": 1024,
        "Forks": 512,
        "Issues": 256,
        "Contributors": 3
    };

    return (
        <div className="col bg-frost-midnight border-0 rounded-3">
            <StatisticsTable Statistics={statistics}/>
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
        <div className="py-2 row d-flex justify-content-center align-items-center">
            {
                Object.entries(Statistics).map((value, index) => {
                    const columnKey = `column-${index}`
                    return <StatisticColumn key={columnKey} Name={value[0]} Value={value[1]}/>;
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
        <div className="col-auto mx-sm-5 mx-3">
            <div className="row ps-sm-4 p-0 fw-bold">
                <p className="m-0 mb-3 p-0 text-start color-frost-light-azure fs-p">{Name}</p>
            </div>
            <div className="row ps-sm-4 p-0 fw-medium">
                <p className="m-0 p-0 text-start color-frost-pastel-gray-azure fs-p">{Value}</p>
            </div>
        </div>
    );
}