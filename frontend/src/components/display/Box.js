export default function Box({children}) {
    return (
        <div
            className={"flex flex-col overflow-hidden py-6 sm:py-12"}>
            <div
                className="px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-400 w-1/2 sm:mx-auto sm:rounded-lg sm:px-10">
                <div className="mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}