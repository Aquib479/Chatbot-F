import { Link } from 'react-router-dom';

type Props = {
    to: string,
    text: string,
    onClick?: () => Promise<void>;
}

const NavList = (props: Props) => {
    return (
        <Link
            onClick={props.onClick}
            className='navlink text-[0.8rem]'
            to={props.to}
        >
            {props.text}
        </Link>
    )
}

export default NavList