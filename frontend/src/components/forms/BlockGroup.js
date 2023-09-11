export default function BlockGroup({completed, children}) {
    if (completed) {
        return (
            <blockquote
                className={"p-4 my-4 border-l-4 [&>*]:py-4 leading-10 rounded-md border-green-500"}>
                {children}
            </blockquote>
        );
    } else {
        return (
            <blockquote
                className={"p-4 my-4 border-l-4 [&>*]:py-4 leading-10 rounded-md border-gray-300 dark:border-gray-500 dark:bg-gray-800"}>
                {children}
            </blockquote>
        );
    }
}