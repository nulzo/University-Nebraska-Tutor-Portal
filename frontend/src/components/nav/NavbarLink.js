function NavbarLink(props){
    return(
        <a
            className="no-underline hover:underline text-gray-500 transition hover:text-gray-500/75"
            href={props.href}
          >
            {props.text}
          </a>

    )
}

export default NavbarLink