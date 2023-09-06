function OutlineButton(props){
    return(
        <a
            className="inline-block rounded border border-primary px-12 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring active:bg-primary-500"
            href={props.href}
        >
            {props.text}
        </a>
    )
}

export default OutlineButton