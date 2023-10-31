export default function EditAvatar({ name }: any) {
    return (
        <div className="text-muted-primary bg-yellow-500 inline-block h-32 w-32 rounded-full hover:bg-yellow-500/75">
            <div className="font-bold text-[2.5em] h-32 tracking-wider flex justify-center content-center no-underline align-center center-align text-center align-middle items-center place-content-center">
                {name}
            </div>
        </div>
    )
}