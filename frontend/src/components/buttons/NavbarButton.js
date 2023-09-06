function NavbarButton(props){
    return(
        <a
            className="no-underline hover:underline link-primary font-bold"
            href={props.href}
          >
            {props.text}
          </a>

    )
}

export default NavbarButton
